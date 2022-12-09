import { NEXT_PUBLIC_VERCEL_URL, VERCEL_URL } from "./config";

export function serverUrl() {
  if (VERCEL_URL) {
    return "https://rewind-zeta.vercel.app";
  }

  return "http://localhost:3000";
}

export function clientUrl() {
  if (VERCEL_URL) {
    return "https://rewind-zeta.vercel.app";
  }

  return "http://localhost:3000";
}
