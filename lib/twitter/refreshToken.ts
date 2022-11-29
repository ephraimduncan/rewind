import { CLIENT_ID, CLIENT_SECRET } from "../config";

const BasicAuthToken = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`, "utf8").toString("base64");

export async function refreshToken(refreshToken: string) {
  try {
    const response = await fetch("https://api.twitter.com/2/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${BasicAuthToken}`,
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
    });

    return await response.json();
  } catch (error) {
    // TODO: Fix errors with http-errors package
    console.log(error);
    return error;
  }
}
