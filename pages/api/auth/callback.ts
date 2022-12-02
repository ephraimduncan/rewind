import { NextApiRequest, NextApiResponse } from "next";
import { addCookieToResponse } from "../../../lib/cookie";
import { upsertUser } from "../../../lib/mongodb/user";
import { requestAccessToken } from "../../../lib/twitter/requestAccessToken";
import { requestUserData } from "../../../lib/twitter/requestUserData";
import { TwitterUser } from "../../../types/twitter";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const code = req.query.code;

  try {
    const accessToken = await requestAccessToken(code as string);

    const { access_token, refresh_token, expires_in } = accessToken;

    const userData = await requestUserData(access_token);
    if (!userData) return res.send("Error");

    const user: TwitterUser = {
      id: userData.data?.id!,
      name: userData.data?.name!,
      type: "twitter",
      username: userData.data?.username!,
      profile_image_url: userData.data?.profile_image_url!,
      url: userData.data?.url!,
      verified: userData.data?.verified!,
    };

    await upsertUser(user);

    // Store Tokens In a Database or Something
    addCookieToResponse("oauth2_access_token", req, res, user, access_token, expires_in);
    addCookieToResponse("oauth2_refresh_token", req, res, user, refresh_token, expires_in);

    res.redirect("/");
  } catch (error) {
    console.log(error);

    res.json({ error });
  }
}
