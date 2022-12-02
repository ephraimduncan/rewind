import React from "react";
import Features from "../components/Features";
import CallToAction from "../components/CallToAction";
import Hero from "../components/Hero";
import Layout from "../components/Layout";

export default function Dashboard() {
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
