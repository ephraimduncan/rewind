import { NextApiRequest, NextApiResponse } from "next";
import { requestAccessToken } from "../../../lib/twitter/requestAccessToken";
import { requestUserData } from "../../../lib/twitter/requestUserData";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const code = req.query.code;

  try {
    const accessToken = await requestAccessToken(code as string);
    const { access_token } = accessToken;

    const user = await requestUserData(access_token);

    res.status(200).json(user);
    //
  } catch (error) {
    console.log(error);

    res.send({ error });
  }
}
