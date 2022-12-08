import type { NextApiRequest, NextApiResponse } from "next";
import { searchSharedBoomkarks } from "../../../lib/mongodb/search";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      res.status(405).send({ message: "Only POST requests allowed" });
      return;
    }

    const { searchValue } = req.body;

    const response = await searchSharedBoomkarks(searchValue);

    return res.send(response);
  } catch (error) {
    console.log(error);

    res.status(401).json({ error });
  }
}
