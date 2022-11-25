// https://stackoverflow.com/a/62005551

import cacheData from "memory-cache";
import { cache } from "react";
import { TwitterUser } from "../types/twitter";

export default async function fetchWithCache(
  url: RequestInfo | URL,
  options: RequestInit | undefined
): Promise<TwitterUser> {
  const value = cacheData.get(url);

  if (value) {
    return value;
  } else {
    const hours = 24;
    const res = await fetch(url, options);
    const data = await res.json();
    cacheData.put(url, data.data, hours * 1000 * 60 * 60);
    return data.data;
  }
}
