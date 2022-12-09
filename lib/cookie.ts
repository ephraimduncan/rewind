import jwt from "jsonwebtoken";
import { TwitterUser } from "../types/twitter";
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "./config";
import { setCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";

export function addCookieToResponse(
  tokenType: "oauth2_access_token" | "oauth2_refresh_token",
  req: NextApiRequest,
  res: NextApiResponse,
  user: any,
  accessToken: string,
  expire: number
) {
  const { id, type } = user;

  const token = jwt.sign(
    {
      id,
      type,
      accessToken,
    },
    tokenType === "oauth2_access_token" ? JWT_ACCESS_SECRET : JWT_REFRESH_SECRET
  );

  setCookie(tokenType, token, {
    req,
    res,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: expire,
    expires: new Date(Date.now() + expire * 1000),
  });
}
