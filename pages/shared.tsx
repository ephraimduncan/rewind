import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import { TwitterTweetEmbed } from "react-twitter-embed";
import TweetSkeleton from "../components/TweetSkeleton";
import { Bookmark } from "../types/twitter";
import BookmarkModal from "../components/BookmarkModal";
import * as cookie from "cookies-next";

export default function SharedPage({ bookmark, accessToken }: any) {
  function addToTwitterBookmarks(bookmark: Bookmark) {
    fetch("http://localhost:3000/api/twitter/createBookmark", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookmarkId: bookmark.id,
        accessToken: accessToken,
      }),
    })
      .then((res) => res.json())
      .catch((error) => console.log(error));
  }

  return (
    <Layout>
      <div>
        {bookmark.map((bm: any) => {
          return (
            <div key={bm.id} className="my-8 flex flex-col max-w-fit mx-auto">
              <TwitterTweetEmbed
                tweetId={bm.id}
                options={{ align: "center" }}
                placeholder={<TweetSkeleton />}
              />

              <BookmarkModal
                shareBookmark={async () => {
                  addToTwitterBookmarks(bm.id);
                  console.log("Added bookmark to my bookmark");
                }}
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
  const response = await fetch("http://localhost:3000/api/mongodb/shared");

  const bookmark = await response.json();

  return {
    props: { bookmark, accessToken },
  };
};
