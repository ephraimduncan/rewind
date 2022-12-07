import React from "react";
import * as cookie from "cookies-next";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import { TwitterTweetEmbed } from "react-twitter-embed";
import TweetSkeleton from "../components/TweetSkeleton";
import Pagination from "../components/Pagination";

export default function BookmarkPage(props: { bookmarks: any; accessToken: string }) {
  const [bookmarks, setBookmarks] = React.useState(props.bookmarks);
  const [loading, setLoading] = React.useState(false);

  function fetchBookmark(token: string) {
    setLoading(true);
    fetch("http://localhost:3000/api/twitter/paginateBookmark", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paginationToken: token,
        accessToken: props.accessToken,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setBookmarks(res);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }

  console.log(bookmarks);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center text-3xl">Fetching New Bookmarks</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div>
        {bookmarks.data.map((bm: any) => {
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
      <Pagination
        nextToken={bookmarks.meta?.next_token}
        nextBookmark={() => fetchBookmark(bookmarks.meta?.next_token)}
        previousToken={bookmarks.meta?.previous_token}
        previousBookmark={() => fetchBookmark(bookmarks.meta?.previous_token)}
      />
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
    props: { bookmarks, accessToken },
  };
};
