import type { NextApiRequest, NextApiResponse } from "next";
import { generateAuthURL } from "../../../lib/twitter/generateAuthURL";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const loginURL = generateAuthURL();

  res.status(200).redirect(loginURL);
}
