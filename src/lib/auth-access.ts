import "server-only";

import { cache } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { AppError } from "@/middleware";

function hasRole(
  role: string | string[] | null | undefined,
  expectedRole: string,
) {
  const roles = Array.isArray(role)
    ? role
    : String(role ?? "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

  return roles.includes(expectedRole);
}

export const getFreshSession = cache(async () => {
  return auth.api.getSession({
    headers: await headers(),
    query: {
      disableCookieCache: true,
    },
  });
});

export async function requireVerifiedUserPage() {
  const session = await getFreshSession();

  if (!session) {
    redirect("/login");
  }

  if (session.user.banned) {
    redirect("/account-suspended");
  }

  if (!session.user.emailVerified) {
    redirect("/verify-email");
  }

  return session;
}

export async function requireAdminPage() {
  const session = await requireVerifiedUserPage();

  if (!hasRole(session.user.role, "admin")) {
    redirect("/forbidden");
  }

  return session;
}

export async function requireVerifiedUserAction() {
  const session = await getFreshSession();

  if (!session) {
    throw new AppError(
      "Authentication required.",
      "UNAUTHORIZED",
      401,
    );
  }

  if (session.user.banned) {
    throw new AppError(
      "Your account has been suspended.",
      "USER_BANNED",
      403,
    );
  }

  if (!session.user.emailVerified) {
    throw new AppError(
      "Please verify your email address.",
      "EMAIL_NOT_VERIFIED",
      403,
    );
  }

  return session;
}

export async function requireAdminAction() {
  const session = await requireVerifiedUserAction();

  if (!hasRole(session.user.role, "admin")) {
    throw new AppError(
      "Administrator permission is required.",
      "FORBIDDEN",
      403,
    );
  }

  return session;
}