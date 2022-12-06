import React from "react";
import * as cookie from "cookies-next";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import { TwitterTweetEmbed } from "react-twitter-embed";
import TweetSkeleton from "../components/TweetSkeleton";

export default function BookmarkPage(props: { bookmarks: any }) {
  return (
    <Layout>
      <div>
        {props.bookmarks.data.map((bm: any) => {
          return (
            <div key={bm.id} className="my-8">
              <TwitterTweetEmbed
                tweetId={bm.id}
                options={{ align: "center" }}
                placeholder={<TweetSkeleton />}
              />
            </div>
          );
        })}
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const accessToken = cookie.getCookie("oauth2_access_token", { req, res });

  const response = await fetch("http://localhost:3000/api/twitter/bookmarks", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ accessToken }),
  });

  const bookmarks = await response.json();

  return {
    props: { bookmarks },
  };
};
