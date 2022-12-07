import type { NextApiRequest, NextApiResponse } from "next";
import { getSharedBookmarks } from "../../../lib/mongodb/bookmark";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await getSharedBookmarks();

    return res.send(response);
  } catch (error) {
    console.log(error);

    res.status(401).json({ error });
  }
}
