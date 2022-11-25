import { TwitterUser } from "../../types/twitter";
import fetchWithCache from "../fetchWithCache";

export async function requestUserData(accessToken: string): Promise<TwitterUser | null> {
  try {
    const response = await fetchWithCache("https://api.twitter.com/2/users/me", {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
}
