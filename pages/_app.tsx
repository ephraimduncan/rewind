import "../styles/fonts.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "../context/UserProvider";
import React from "react";

export default function App({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    const s = document.createElement("script");
    s.setAttribute("src", "https://platform.twitter.com/widgets.js");
    s.setAttribute("async", "true");
    document.head.appendChild(s);
  }, []);

  return (
    <SessionProvider>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
