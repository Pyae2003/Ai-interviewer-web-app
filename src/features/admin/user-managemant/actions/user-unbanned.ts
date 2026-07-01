"use server";

import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { prisma } from "@/config";
import { getSession } from "@/lib/get-Session";

import { AppError } from "@/middleware";

import { userIdSchema } from "../schema/get-userid-schema";

type UnbanUserParams = {
  userId: string;
};

export async function unbanUserByAdmin({ userId }: UnbanUserParams) {
  /**
   * Validate Input
   */
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

  /**
   * Authentication
   */
  const session = await getSession();

  if (!session?.user?.id) {
    throw new AppError("Unauthorized", "UNAUTHORIZED", 401);
  }

  /**
   * Authorization
   */
  if (session.user.role !== "admin") {
    throw new AppError("Forbidden", "FORBIDDEN", 403);
  }

  try {
    /**
     * Find Target User
     */
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

    /**
     * Optional:
     * Prevent unbanning another admin
     */
    if (targetUser.role === "admin") {
      throw new AppError(
        "Cannot manage another admin account",
        "ADMIN_ACTION_FORBIDDEN",
        403,
      );
    }

    /**
     * User already active
     */
    if (!targetUser.banned) {
      throw new AppError("User is not banned", "USER_NOT_BANNED", 400);
    }

    /**
     * Unban User
     */
    await auth.api.unbanUser({
      body: {
        userId: targetUser.id,
      },
      headers: await headers(),
    });


    return {
      success: true,
      message: "User unbanned successfully",
      data: {
        id: targetUser.id,
        name: targetUser.name,
        email: targetUser.email,
      },
    };
  } catch (error) {
    console.error("[ADMIN_UNBAN_USER_ERROR]", error);

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError("Failed to unban user", "UNBAN_USER_FAILED", 500);
  }
}
