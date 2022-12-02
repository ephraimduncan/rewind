import React from "react";
import * as cookie from "cookies-next";
import { GetServerSideProps } from "next";
import { useUser } from "../context/UserProvider";
import Layout from "../components/Layout";
import { TwitterTweetEmbed } from "react-twitter-embed";

export default function BookmarkPage(props: { bookmarks: any }) {
  const { user } = useUser();

  return (
    <Layout>
      <div>
        {props.bookmarks.data.map((bookmark: any) => {
          return <TwitterTweetEmbed tweetId={bookmark.id} key={bookmark.id} />;
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
