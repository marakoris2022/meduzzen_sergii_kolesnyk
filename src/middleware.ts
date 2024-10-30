import { NextRequest, NextResponse } from "next/server";
import { TOKEN } from "./interface/interface";

export function middleware(request: NextRequest) {
  const token = request.cookies.get(TOKEN.NAME)?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/companies", "/profile", "/users"],
};
