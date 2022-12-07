import { Bookmark, TwitterUser } from "../../types/twitter";
import clientPromise from "../mongodb";

export async function getSharedBookmarks() {
  const client = await clientPromise;
  const shared = client.db("twitter-next-auth").collection("shared");

  return await shared.find().toArray();
}

export async function addBookmarkToShared(bookmark: Bookmark, user: TwitterUser) {
  const client = await clientPromise;
  const collection = client.db("twitter-next-auth").collection("shared");

  return await collection.updateOne(
    { id: bookmark.id },
    {
      $set: {
        id: bookmark.id,
        text: bookmark.text,
        user: user,
      },
    },
    { upsert: true }
  );
}
