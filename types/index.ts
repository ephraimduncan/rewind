import { TwitterUser } from "./twitter";

export type UserJWTPayload = Pick<TwitterUser, "id" | "type"> & { accessToken: string };
