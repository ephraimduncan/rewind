import { CLIENT_ID } from "../config";

export function generateAuthURL() {
  const rootUrl = "https://twitter.com/i/oauth2/authorize";
  const options = {
    redirect_uri: "http://localhost:3000/api/auth/callback",
    client_id: CLIENT_ID,
    state: "state",
    response_type: "code",
    code_challenge: "nVfaCSBEgbH8hEV2ZFN47x092wADQcFRR8AcMO1JqHE",
    code_challenge_method: "S256",
    scope: ["users.read", "tweet.read", "follows.read", "follows.write", "offline.access"].join(
      " "
    ),
  };
  const qs = new URLSearchParams(options).toString();
  return `${rootUrl}?${qs}`;
}
