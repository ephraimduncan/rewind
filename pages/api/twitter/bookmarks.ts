import jwt from "jsonwebtoken";
import * as config from "../../../lib/config";
import type { UserJWTPayload } from "../../../types";
import type { NextApiRequest, NextApiResponse } from "next";
import { Client } from "twitter-api-sdk";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      res.status(405).send({ message: "Only POST requests allowed" });
      return;
    }

    const { accessToken } = req.body;
    const payload = jwt.verify(accessToken as string, config.JWT_ACCESS_SECRET) as UserJWTPayload;
    if (!payload.accessToken) {
      throw new Error("Not Authenticated: JWT Access Token");
    }

    const id = payload.id;
    const access_token = payload.accessToken;
    const client = new Client(access_token);

    const bookmarks = await client.bookmarks.getUsersIdBookmarks(id);

    res.send(bookmarks);
  } catch (error) {
    console.log(error, "Bookmarks");

    res.status(401).json({ error });
  }
}
