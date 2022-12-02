export interface TwitterUser {
  id: string;
  name: string;
  username: string;
  type: string;
  profile_image_url: string;
  url: string;
  verified: boolean;
}

export interface TwitterUserProps {
  accessToken?: string;
  isLoggedIn: boolean;
}
