import React from "react";
import * as NextRouter from "next/router";
import Link from "next/link";
import * as cookie from "cookies-next";
import { TwitterUserProps } from "../types/twitter";
import { GetServerSideProps } from "next";

export default function Home(props: { isLoggedIn: boolean; bookmarks: any }) {
  const router = NextRouter.useRouter();

  React.useEffect(() => {
    router.replace(router.asPath);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isLoggedIn]);

  return (
    <div>
      <p>Hello!</p>
      {props.isLoggedIn && <pre>{JSON.stringify(props.bookmarks, null, 2)}</pre>}

      {!props.isLoggedIn && (
        <div>
          <p>You are not Logged in!</p>
          <Link href="/api/auth/login">
            <button>Log In</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const accessToken = cookie.getCookie("oauth2_access_token", { req, res });
  if (!accessToken) return { props: { isLoggedIn: false } };

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
    props: { bookmarks, isLoggedIn: true },
  };
};
