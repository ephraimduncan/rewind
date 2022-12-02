import React from "react";
import Navbar from "../components/Navbar";
import Features from "../components/Features";
import Footer from "../components/Footer";
import CallToAction from "../components/CallToAction";
import Hero from "../components/Hero";

export default function Dashboard() {
  return (
    <div className="overflow-hidden">
      <Navbar />
      <Hero />
      <Features />
      <CallToAction />
      <Footer />
    </div>
  );
}
