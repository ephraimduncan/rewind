import jwt from "jsonwebtoken";
import * as config from "../../../lib/config";
import type { UserJWTPayload } from "../../../types";
import type { NextApiRequest, NextApiResponse } from "next";
import { Client } from "twitter-api-sdk";
import { getUsersIdBookmarks, TwitterParams } from "twitter-api-sdk/dist/types";

// const tweet = {
//   id,
//   metadata: {
//     text,
//     author,
//     media,
//     video,
//     polls,
//     url_meta,
//     created_at, //
//     public_metrics, //
//     referenced_tweets, //
//   },
// };

// const params: TwitterParams<getUsersIdBookmarks> =

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      res.status(405).send({ message: "Only POST requests allowed" });
      return;
    }

    const { accessToken } = req.body;
    const payload = jwt.verify(accessToken as string, config.JWT_ACCESS_SECRET) as UserJWTPayload;
    if (!payload.accessToken) {
      throw new Error("Not Authenticated: JWT Access Token");
    }

    const id = payload.id;
    const access_token = payload.accessToken;
    const client = new Client(access_token);

    const bookmarks = await client.bookmarks.getUsersIdBookmarks(id, {
      expansions: [
        "author_id",
        "attachments.media_keys",
        "referenced_tweets.id",
        "referenced_tweets.id.author_id",
        "attachments.poll_ids",
      ],
      "user.fields": [
        "id",
        "name",
        "profile_image_url",
        "protected",
        "url",
        "username",
        "verified",
      ],
      "tweet.fields": [
        "attachments",
        "author_id",
        "public_metrics",
        "created_at",
        "id",
        "in_reply_to_user_id",
        "referenced_tweets",
        "text",
        "entities",
      ],
      "media.fields": [
        "duration_ms",
        "height",
        "media_key",
        "preview_image_url",
        "type",
        "url",
        "width",
        "public_metrics",
      ],
      "poll.fields": ["duration_minutes", "end_datetime", "id", "options", "voting_status"],
    });

    // const getAuthorInfo = (author_id: any) => {
    //   return bookmarks.includes?.users?.find((user) => user.id === author_id);
    // };

    // const getReferencedTweets = (mainTweet: { referenced_tweets: any[] }) => {
    //   return (
    //     mainTweet?.referenced_tweets?.map((referencedTweet) => {
    //       const fullReferencedTweet = bookmarks.includes?.tweets?.find(
    //         (tweet) => tweet.id === referencedTweet.id
    //       );

    //       return {
    //         type: referencedTweet.type,
    //         author: getAuthorInfo(fullReferencedTweet?.author_id),
    //         ...fullReferencedTweet,
    //       };
    //     }) || []
    //   );
    // };

    // const getExternalUrls = (tweet: any) => {
    //   const externalURLs = tweet.entities?.urls;
    //   const mappings: any = {};
    //   if (externalURLs) {
    //     externalURLs.map((url: any) => {
    //       mappings[`${url.url}`] =
    //         !url.display_url.startsWith("pic.twitter.com") &&
    //         !url.display_url.startsWith("twitter.com")
    //           ? url.expanded_url
    //           : "";
    //     });
    //   }
    //   var processedText = tweet.text;
    //   Object.entries(mappings).map(([k, v], i) => {
    //     processedText = processedText.replace(k, v);
    //   });
    //   return processedText;
    // };

    // // removing/replacing t.co links for main tweet
    // (bookmarks.data as any).text = getExternalUrls(bookmarks?.data);
    // bookmarks?.includes?.tweets?.map((twt: any) => {
    //   // removing/replacing t.co links for referenced tweets
    //   twt.text = getExternalUrls(twt);
    // });

    // const media = (bookmarks.data as any).attachments?.media_keys?.map((key: string | undefined) =>
    //   bookmarks?.includes?.media?.find((media) => media.media_key === key)
    // );

    // const referenced_tweets = getReferencedTweets(bookmarks.data as any);

    // const getTwitterMedia = async (id: any) => {
    //   try {
    //     const response = await fetch(
    //       `https://api.twitter.com/1.1/statuses/show.json?id=${id}&tweet_mode=extended`,
    //       {
    //         headers: {
    //           Authorization: `Bearer ${accessToken}`,
    //         },
    //       }
    //     );
    //     const data = await response.json();
    //     const videoData = data.extended_entities.media[0].video_info;
    //     return videoData;
    //   } catch (error) {
    //     console.log(id, error);
    //   }
    // };

    // const returnBookMarks = [
    //   {
    //     ...bookmarks.data,
    //     media: media || [],
    //     video:
    //       media && (media[0].type == "video" || media[0].type == "animated_gif")
    //         ? await getTwitterMedia(id)
    //         : null,
    //     polls: bookmarks.includes?.polls,
    //     url_meta:
    //       media || referenced_tweets.length > 0
    //         ? null
    //         : (bookmarks.data as any).entities?.urls?.[0],
    //     referenced_tweets: referenced_tweets,
    //     author: getAuthorInfo((bookmarks.data as any).author_id),
    //   },
    // ];

    return bookmarks;
  } catch (error) {
    console.log(error, "Bookmarks");

    res.status(401).json({ error });
  }
}
