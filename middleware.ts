import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { JWT_ACCESS_SECRET } from "./lib/config";
import { UserJWTPayload } from "./types";
import { jwtVerify } from "jose";

class AuthError extends Error {}

export const config = {
  matcher: ["/bookmark", "/dashboard", "/shared"],
};

async function verifyAuth(req: NextRequest) {
  const token = req.cookies.get("oauth2_access_token")?.value;

  if (!token) throw new AuthError("Missing user token");

  try {
    const verified = await jwtVerify(token, new TextEncoder().encode(JWT_ACCESS_SECRET));
    return verified.payload as UserJWTPayload;
  } catch (err) {
    throw new AuthError("Your token has expired.");
  }
}

export async function middleware(req: NextRequest) {
  // validate the user is authenticated
  const verifiedToken = await verifyAuth(req).catch((err) => {
    console.error(err.message);
  });

  if (!verifiedToken) {
    if (req.nextUrl.pathname.startsWith("/api/")) {
      return new NextResponse(JSON.stringify({ error: { message: "authentication required" } }), {
        status: 401,
      });
    } else {
      return NextResponse.redirect(new URL("/api/auth/login", req.url));
    }
  }

  // If user is authenticated, continue.
  return NextResponse.next();
}
