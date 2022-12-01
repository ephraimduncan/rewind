import React from "react";
import * as NextRouter from "next/router";
import Link from "next/link";
import * as cookie from "cookies-next";
import { TwitterUserProps } from "../types/twitter";
import { GetServerSideProps } from "next";
import { useUser } from "../context/UserProvider";

export default function Home(prop: TwitterUserProps) {
  const router = NextRouter.useRouter();
  const { user, fetchUser, removeUser } = useUser();

  React.useEffect(() => {
    if (prop.accessToken) {
      fetchUser(prop.accessToken);
    }
  }, [prop.accessToken]);

  React.useEffect(() => {
    router.replace(router.asPath);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prop.isLoggedIn]);

  return (
    <div>
      <p>Hello!</p>
      {prop.isLoggedIn && user && (
        <div>
          Welcome {user.name}
          <div>
            <Link href="/bookmark">
              <button>Go to your Bookmarks</button>
            </Link>
          </div>
          <div>
            <Link href="/api/auth/logout">
              <button onClick={removeUser}>Log Out</button>
            </Link>
          </div>
        </div>
      )}

      {!prop.isLoggedIn && (
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

  return {
    props: { accessToken, isLoggedIn: true },
  };
};
