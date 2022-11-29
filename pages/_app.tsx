import "../styles/globals.css";
import type { AppProps } from "next/app";

// Provider. I need an Auth Provider
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
