import React from "react";
import { TwitterUser } from "../types/twitter";

// Refactor for Use with Next.js getServerSideProps
export function useUser() {
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [data, setData] = React.useState<TwitterUser | null>(null);

  React.useEffect(() => {
    setLoading(true);

    fetch("http://localhost:3000/api/twitter/user")
      .then((res) => res.json())
      .then((jsonResponse) => setData(jsonResponse))
      .catch(() => setError("Not Authenticated"))
      .finally(() => setLoading(false));
  }, []);

  return { error, data, loading };
}
