import * as db from "../../../lib/mongodb/user";
import type { NextApiRequest, NextApiResponse } from "next";
import { addBookmarkToShared } from "../../../lib/mongodb/bookmark";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      res.status(405).send({ message: "Only POST requests allowed" });
      return;
    }
    const { bookmark, user } = req.body;

    const userFromDB = await db.getUser(user.id);
    if (!userFromDB) {
      throw new Error("Not Authenticated: User From DB");
    }

    const response = await addBookmarkToShared(bookmark, user!);

    console.log(response);

    return res.send(response);
  } catch (error) {
    console.log(error);

    res.status(401).json({ error });
  }
}
