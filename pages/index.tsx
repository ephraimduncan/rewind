import React from "react";
import Features from "../components/Features";
import CallToAction from "../components/CallToAction";
import Hero from "../components/Hero";
import Layout from "../components/Layout";
import { GetServerSideProps } from "next";
import * as cookie from "cookies-next";
import { useUser } from "../context/UserProvider";
import * as NextRouter from "next/router";
import { TwitterUserProps } from "../types/twitter";

export default function Home(prop: TwitterUserProps) {
  const router = NextRouter.useRouter();
  const { fetchUser } = useUser();

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
    <div className="overflow-hidden">
      <Layout>
        <Hero />
        <Features />
        <CallToAction />
      </Layout>
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
