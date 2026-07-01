"use server";

import { headers } from "next/headers";

import { prisma } from "@/config";
import { auth } from "@/lib/auth";
import { getSession } from "@/lib/get-Session";

import { AppError } from "@/middleware";

import { userIdSchema } from "../schema/get-userid-schema";

type BanUserParams = {
  userId: string;
  reason?: string;
};

export async function banUserByAdmin({ userId, reason }: BanUserParams) {
  const validated = userIdSchema.safeParse({
    userId,
  });

  if (!validated.success) {
    throw new AppError(
      validated.error.issues[0]?.message ?? "Invalid user id",
      "INVALID_USER_ID",
      400,
    );
  }

  const session = await getSession();

  if (!session?.user?.id) {
    throw new AppError("Unauthorized", "UNAUTHORIZED", 401);
  }

  if (session.user.role !== "admin") {
    throw new AppError("Forbidden", "FORBIDDEN", 403);
  }

  if (session.user.id === userId) {
    throw new AppError(
      "You cannot ban your own account",
      "SELF_BAN_NOT_ALLOWED",
      400,
    );
  }

  try {
    const targetUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        banned: true,
      },
    });

    if (!targetUser) {
      throw new AppError("User not found", "USER_NOT_FOUND", 404);
    }

    if (targetUser.role === "admin") {
      throw new AppError(
        "Admin accounts cannot be banned",
        "ADMIN_BAN_DENIED",
        403,
      );
    }

    if (targetUser.banned) {
      throw new AppError("User already banned", "USER_ALREADY_BANNED", 400);
    }

    await auth.api.banUser({
      body: {
        userId: targetUser.id,
        banReason: reason ?? "Violation of platform policies",
        banExpiresIn: 60 * 60 * 24 * 30,
      },
      headers: await headers(),
    });

    await auth.api.revokeUserSessions({
      body: {
        userId: targetUser.id, // required
      },
      // This endpoint requires session cookies.
      headers: await headers(),
    });
    await prisma.session.deleteMany({
      where: {
        userId: targetUser.id,
      },
    });

    return {
      success: true,
      message: "User banned successfully",
      data: {
        id: targetUser.id,
        name: targetUser.name,
        email: targetUser.email,
      },
    };
  } catch (error) {
    console.error("[ADMIN_BAN_USER_ERROR]", error);

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError("Failed to ban user", "BAN_USER_FAILED", 500);
  }
}
