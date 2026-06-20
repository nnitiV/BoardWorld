import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get("is_logged_in")?.value === "true";
  const userRole = request.cookies.get("user_role")?.value;
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/cart") ||
    pathname.startsWith("/orders") ||
    pathname.startsWith("/checkout")
  ) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (pathname.startsWith("/admin")) {
    if (!isLoggedIn || userRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  if (pathname === "/login" || pathname === "/register") {
    if (isLoggedIn) {
      const redirectUrl = userRole === "ADMIN" ? "/admin" : "/orders";
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/cart/:path*",
    "/checkout/:path*",
    "/orders/:path*",
    "/admin/:path*",
    "/login",
    "/register",
  ],
};
