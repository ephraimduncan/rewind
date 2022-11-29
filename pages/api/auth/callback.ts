import { NextApiRequest, NextApiResponse } from "next";
import { addCookieToResponse } from "../../../lib/cookie";
import { upsertUser } from "../../../lib/mongodb/user";
import { requestAccessToken } from "../../../lib/twitter/requestAccessToken";
import { requestUserData } from "../../../lib/twitter/requestUserData";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const code = req.query.code;

  try {
    const accessToken = await requestAccessToken(code as string);

    const { access_token, refresh_token, expires_in } = accessToken;

    const userData = await requestUserData(access_token);
    if (!userData) return res.send("Error");

    await upsertUser(userData!);

    // Store Tokens In a Database or Something
    addCookieToResponse("oauth2_access_token", req, res, userData, access_token, expires_in);
    addCookieToResponse("oauth2_refresh_token", req, res, userData, refresh_token, expires_in);

    res.redirect("/");
  } catch (error) {
    console.log(error);

    res.json({ error });
  }
}
