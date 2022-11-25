import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { JWT_SECRET } from "../../../lib/config";
import { UserJWTPayload } from "../../../types";
import { getUser } from "../../../lib/mongodb/user";
import { requestUserData } from "../../../lib/twitter/requestUserData";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      res.status(405).send({ message: "Only POST requests allowed" });
      return;
    }

    const accessToken = req.body.accessToken;
    const payload = jwt.verify(accessToken as string, JWT_SECRET) as UserJWTPayload;

    const userFromDB = await getUser(payload.id);
    if (!userFromDB) {
      throw new Error("Not Authenticated: User From DB");
    }

    if (!payload.accessToken) {
      throw new Error("Not Authenticated: JWT Access Token");
    }

    const userFromAPI = await requestUserData(payload.accessToken);

    if (userFromAPI?.id !== userFromDB.id) {
      throw new Error("Not Authenticated: ID Are not the same");
    }

    res.json(userFromDB);
  } catch (error) {
    res.status(401).json({ error });
  }
}
