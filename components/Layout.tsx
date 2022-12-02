import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">{children}</div>

      <Footer />
    </div>
  );
}
