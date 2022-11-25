import jwt from "jsonwebtoken";
import * as db from "../../../lib/mongodb/user";
import * as auth from "../../../lib/twitter/requestUserData";
import * as config from "../../../lib/config";
import type { UserJWTPayload } from "../../../types";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      res.status(405).send({ message: "Only POST requests allowed" });
      return;
    }

    const accessToken = req.body.accessToken;
    const payload = jwt.verify(accessToken as string, config.JWT_SECRET) as UserJWTPayload;
    if (!payload.accessToken) {
      throw new Error("Not Authenticated: JWT Access Token");
    }

    const userFromDB = await db.getUser(payload.id);
    if (!userFromDB) {
      throw new Error("Not Authenticated: User From DB");
    }

    const userFromAPI = await auth.requestUserData(payload.accessToken);
    if (userFromAPI?.id !== userFromDB.id) {
      throw new Error("Not Authenticated: ID Are not the same");
    }

    res.json(userFromDB);
  } catch (error) {
    console.log(error);

    res.status(401).json({ error });
  }
}
