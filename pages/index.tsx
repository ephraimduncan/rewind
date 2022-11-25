import { getCookie } from "cookies-next";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";
import { TwitterUser } from "../types/twitter";

export default function Home(user: TwitterUser) {
  return (
    <div>
      <p>Hello!</p>
      {user && <div>{user.username}</div>}
      {!user && (
        <div>
          <p>You are not Logged in! Login with:</p>
          <Link href="/api/auth/login">
            <button>Log In</button>
          </Link>
        </div>
      )}

      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const accessToken = getCookie("oauth2_token", { req, res });

  const response = await fetch("http://localhost:3000/api/twitter/user", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ accessToken }),
  });

  const user = await response.json();

  return {
    props: user,
  };
};
