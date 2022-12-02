import { Client } from "twitter-api-sdk";
import { findMyUser, TwitterResponse } from "twitter-api-sdk/dist/types";
import { TwitterUser } from "../../types/twitter";
import fetchWithCache from "../fetchWithCache";

export async function requestUserData(accessToken: string): Promise<TwitterResponse<findMyUser>> {
  const client = new Client(accessToken);

  try {
    const user = await client.users.findMyUser({
      "user.fields": ["id", "name", "url", "username", "verified", "profile_image_url"],
    });

    return user;
  } catch (error) {
    console.log(error);
    return { errors: [{ title: "Get user error", type: "User" }] };
  }
}
