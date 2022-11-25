import { NextApiRequest, NextApiResponse } from "next";
import { requestAccessToken } from "../../../lib/twitter/requestAccessToken";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const code = req.query.code;

  try {
    const accessToken = await requestAccessToken(code as string);

    res.status(200).json(accessToken);
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
}
