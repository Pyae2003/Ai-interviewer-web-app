import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { ADMIN_PREFIX, loginPath } from "@/constants/route";

export async function middleware(
  request: NextRequest,
) {
  const pathname = request.nextUrl.pathname;

  try {
    const session =
      await auth.api.getSession({
        headers: request.headers,
      });

    /**
     * Admin Route Protection
     */
    if (pathname.startsWith(ADMIN_PREFIX)) {
      if (!session) {
        const loginUrl = new URL(
          loginPath,
          request.url,
        );

        loginUrl.searchParams.set(
          "callbackUrl",
          pathname,
        );

        return NextResponse.redirect(loginUrl);
      }

      if (session.user.role !== "ADMIN") {
        return NextResponse.redirect(
          new URL("/403", request.url),
        );
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error(
      "[MIDDLEWARE_ERROR]",
      error,
    );

    return NextResponse.redirect(
      new URL("/login", request.url),
    );
  }
}

export const config = {
  matcher: [
    "/admin/:path*",
  ],
};