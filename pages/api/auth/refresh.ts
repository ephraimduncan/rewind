import { NextApiRequest, NextApiResponse } from "next";
import { addCookieToResponse } from "../../../lib/cookie";
import { upsertUser } from "../../../lib/mongodb/user";
import { refreshToken as rf } from "../../../lib/twitter/refreshToken";
import { requestUserData } from "../../../lib/twitter/requestUserData";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  const { refreshToken } = req.body;

  try {
    const token = await rf(refreshToken as string);
    const { access_token, refresh_token } = token;

    const userData = await requestUserData(access_token);
    if (!userData) return res.send("Error");

    // TODO: Confirm whether to remove it or not
    // By the time a user refreshes, it will already be available in the Database
    // await upsertUser(userData!);

    addCookieToResponse("oauth2_access_token", req, res, userData, access_token);
    addCookieToResponse("oauth2_refresh_token", req, res, userData, refresh_token);

    res.redirect("/");
  } catch (error) {
    console.log(error);

    res.json({ error });
  }
}

// For the input prompt, display an input tag, style it and on submit, sent it via next api routes
