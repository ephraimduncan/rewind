import React, { ReactNode } from "react";
import { TwitterUser } from "../types/twitter";

interface UserContextType {
  user?: TwitterUser;
  fetchUser: (accessToken: string) => void;
}

export const UserContext = React.createContext<UserContextType>({
  fetchUser: () => console.log("hello"),
});

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = React.useState({ id: "", name: "", username: "", type: "twitter" });

  const fetchUser = async (accessToken: string) => {
    let response = await fetch("http://localhost:3000/api/twitter/user", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accessToken }),
    });

    response = await response.json();
    setUser(response as any); // Remove any type
  };

  return <UserContext.Provider value={{ user, fetchUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => React.useContext(UserContext);
