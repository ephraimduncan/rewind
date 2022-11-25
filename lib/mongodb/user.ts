import clientPromise from "../mongodb";
import { TwitterUser } from "../../types/twitter";

export async function upsertUser(user: TwitterUser) {
  const client = await clientPromise;
  const collection = client.db("twitter-next-auth").collection("users");

  return await collection.updateOne(
    { twitterId: user.id },
    {
      $set: {
        twitterId: user.id,
        username: user.username,
        name: user.name,
        type: "twitter",
      },
    },
    { upsert: true }
  );
}
