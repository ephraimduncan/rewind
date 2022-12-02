import clientPromise from "../mongodb";
import { TwitterUser } from "../../types/twitter";

export async function getUser(id: string) {
  const client = await clientPromise;
  const collection = client.db("twitter-next-auth").collection("users");

  return collection.findOne({ id: id });
}

export async function upsertUser(user: TwitterUser) {
  const client = await clientPromise;
  const collection = client.db("twitter-next-auth").collection("users");

  return await collection.updateOne(
    { id: user.id },
    {
      $set: {
        id: user.id,
        username: user.username,
        name: user.name,
        verified: user.verified,
        url: user.url,
        profile_image_url: user.profile_image_url,
        type: "twitter",
      },
    },
    { upsert: true }
  );
}
