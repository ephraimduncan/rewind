import { NextApiRequest, NextApiResponse } from "next";
import { addCookieToResponse } from "../../../lib/cookie";
import { upsertUser } from "../../../lib/mongodb/user";
import { requestAccessToken } from "../../../lib/twitter/requestAccessToken";
import { requestUserData } from "../../../lib/twitter/requestUserData";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const code = req.query.code;

  try {
    const accessToken = await requestAccessToken(code as string);
    const { access_token } = accessToken;

    const userData = await requestUserData(access_token);
    if (!userData) return res.send("Error");

    const user = await upsertUser(userData!);

    addCookieToResponse(req, res, userData, access_token);

    res.redirect("/");
  } catch (error) {
    console.log(error);

    res.send({ error });
  }
}
