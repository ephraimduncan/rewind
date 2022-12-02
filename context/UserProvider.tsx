import React, { ReactNode } from "react";
import { TwitterUser } from "../types/twitter";

interface UserContextType {
  user?: TwitterUser;
  fetchUser: (accessToken: string) => void;
  removeUser?: () => void;
}

export const UserContext = React.createContext<UserContextType>({
  fetchUser: () => console.log("hello"),
});

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    const lsUser = JSON.parse(localStorage.getItem("current_user")!);

    if (lsUser) {
      setUser(lsUser);
    }
  }, []);

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
    localStorage.setItem("current_user", JSON.stringify(response));
    setUser(response as any); // Remove any type
  };

  const removeUser = () => {
    localStorage.removeItem("current_user");
  };

  return (
    <UserContext.Provider value={{ user, fetchUser, removeUser }}>{children}</UserContext.Provider>
  );
};

export const useUser = () => React.useContext(UserContext);
