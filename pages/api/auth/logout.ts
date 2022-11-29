import * as cookie from "cookies-next";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  cookie.deleteCookie("oauth2_access_token", { req, res });
  cookie.deleteCookie("oauth2_refresh_token", { req, res });

  res.status(200).redirect("/");
}
