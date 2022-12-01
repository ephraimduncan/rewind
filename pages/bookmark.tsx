import React from "react";
import * as cookie from "cookies-next";
import { GetServerSideProps } from "next";
import { useUser } from "../context/UserProvider";

export default function Home(props: { bookmarks: any }) {
  const { user } = useUser();

  return (
    <div>
      <p>Hello! {user?.name} </p>
      <p>These are your bookmarks </p>
      <pre>{JSON.stringify(props.bookmarks, null, 2)}</pre>
    </div>
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
