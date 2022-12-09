import { CLIENT_ID, CLIENT_SECRET } from "../config";
import * as url from "../url";

const BasicAuthToken = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`, "utf8").toString("base64");

export async function requestAccessToken(code: string) {
  try {
    const response = await fetch("https://api.twitter.com/2/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${BasicAuthToken}`,
      },
      body: new URLSearchParams({
        code,
        client_id: CLIENT_ID,
        grant_type: "authorization_code",
        redirect_uri: `${url.serverUrl()}/api/auth/callback`,
        code_verifier: "a79573be9c1291549f7d013d28165a5a8903d2cf796e510ad062c64a",
      }),
    });

    return await response.json();
  } catch (error) {
    // TODO: Fix errors with http-errors package
    return error;
  }
}
