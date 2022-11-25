import jwt from "jsonwebtoken";
import { TwitterUser } from "../types/twitter";
import { JWT_SECRET } from "./config";
import { setCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";

export function addCookieToResponse(
  req: NextApiRequest,
  res: NextApiResponse,
  user: TwitterUser,
  accessToken: string
) {
  const { id, type } = user;

  const token = jwt.sign(
    {
      id,
      accessToken,
      type,
    },
    JWT_SECRET
  );

  setCookie("oauth2_token", token, {
    res,
    req,
    httpOnly: process.env.NODE_ENV === "development",
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(Date.now() + 7200 * 1000),
  });
}
