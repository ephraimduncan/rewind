export interface TwitterUser {
  id: string;
  name: string;
  username: string;
  type: string;
}

export interface TwitterUserWithError extends TwitterUser {
  error: any;
}
