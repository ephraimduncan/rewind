import { GetServerSideProps } from "next";
import React from "react";
import Layout from "../components/Layout";
import { Bookmark } from "../types/twitter";

export default function SharedPage({ bookmark }: any) {
  return (
    <Layout>
      <pre>{JSON.stringify(bookmark, null, 2)}</pre>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/mongodb/shared");

  const bookmark = await res.json();

  return {
    props: { bookmark },
  };
};
