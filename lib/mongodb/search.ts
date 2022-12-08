import clientPromise from "../mongodb";

export async function searchSharedBoomkarks(textToSearch: string) {
  const client = await clientPromise;
  const shared = client.db("twitter-next-auth").collection("shared");

  await shared.createIndex({ text: "text" });

  const query = { $text: { $search: textToSearch } };
  const results = await shared.find(query).toArray();

  return results;
}
