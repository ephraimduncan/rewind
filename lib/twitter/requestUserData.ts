import { TwitterUser } from "../../types/twitter";

export async function requestUserData(accessToken: string): Promise<TwitterUser | null> {
  try {
    const response = await fetch("https://api.twitter.com/2/users/me", {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const jsonResponse = await response.json();

    return jsonResponse.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
