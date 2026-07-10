import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/lib/auth";

const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/sign-up",
  "/reset-password",
  "/change-password",
  "/auth/admin/log-in"
];

const AUTH_ROUTES = [
  "/login",
  "/sign-up",
];

const ADMIN_PREFIX = "/admin";

const API_AUTH_PREFIX = "/api/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith(API_AUTH_PREFIX)) {
    return NextResponse.next();
  }

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const isLoggedIn = !!session?.user;

  const isAdmin =
    session?.user?.role?.toLowerCase() === "admin";

  const isBanned =
    Boolean((session?.user as any)?.banned);

  const isPublic =
    PUBLIC_ROUTES.some((route) =>
      pathname === route || pathname.startsWith(route + "/")
    );

  const isAuthPage =
    AUTH_ROUTES.some((route) =>
      pathname.startsWith(route)
    );

  const isAdminPage =
    pathname.startsWith(ADMIN_PREFIX);

  const isApi =
    pathname.startsWith("/api");



  if (!isLoggedIn && !isPublic && !isApi) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }


  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(
      new URL("/dashboard", request.url)
    );
  }


  if (isLoggedIn && isBanned) {
    if (isApi) {
      return NextResponse.json(
        {
          success: false,
          message: "Your account has been banned.",
        },
        {
          status: 403,
        },
      );
    }

    return NextResponse.redirect(
      new URL("/banned", request.url),
    );
  }


  if (isAdminPage && !isAdmin) {
    if (isApi) {
      return NextResponse.json(
        {
          success: false,
          message: "Forbidden",
        },
        {
          status: 403,
        },
      );
    }

    return NextResponse.redirect(
      new URL("/403", request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|favicon.ico|images|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};