import type { NextApiRequest, NextApiResponse } from "next";
import * as auth from "../../../lib/twitter/generateAuthURL";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const loginURL = auth.generateAuthURL();

  res.status(200).redirect(loginURL);
}
