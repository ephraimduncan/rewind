import type { NextApiRequest, NextApiResponse } from "next";
import { addBookmarkToShared } from "../../../lib/mongodb/bookmark";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      res.status(405).send({ message: "Only POST requests allowed" });
      return;
    }
    const { bookmark, user } = req.body;
    const response = await addBookmarkToShared(bookmark, user!);

    return res.send(response);
  } catch (error) {
    console.log(error);

    res.status(401).json({ error });
  }
}
