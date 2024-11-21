import { NextRequest, NextResponse } from "next/server";
import { PATHS, TOKEN } from "./interface/interface";

export function middleware(request: NextRequest) {
  const token = request.cookies.get(TOKEN.NAME)?.value;

  if (
    token &&
    (request.nextUrl.pathname === PATHS.SIGNIN ||
      request.nextUrl.pathname === PATHS.SIGNUP)
  ) {
    return NextResponse.redirect(new URL(PATHS.MAIN, request.url));
  }

  if (
    !token &&
    request.nextUrl.pathname !== PATHS.SIGNIN &&
    request.nextUrl.pathname !== PATHS.SIGNUP
  ) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/companies",
    "/companies/:path*",
    "/profile",
    "/profile/edit",
    "/users",
    "/users/:path*",
    "/quiz",
    "/quiz/:path*",
    "/signin",
    "/signup",
  ],
};
