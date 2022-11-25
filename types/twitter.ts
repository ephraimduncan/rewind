export interface TwitterUser {
  id: string;
  name: string;
  username: string;
  type: string;
}

export interface TwitterUserProps extends TwitterUser {
  isLoggedIn: boolean;
}
