"use server";

import { prisma } from "@/config";
import { getSession } from "@/lib/get-Session";
import { AppError } from "@/middleware";
import { AdminUserStatsResponse } from "../type/user-type";

export async function getAdminUserStats(): Promise<AdminUserStatsResponse> {
  const session = await getSession();

  if (!session?.user?.id) {
    throw new AppError("Unauthorized", "UNAUTHORIZED", 401);
  }

  if (session.user.role !== "admin") {
    throw new AppError("Forbidden", "FORBIDDEN", 403);
  }

  try {
    const [totalUsers, activeUsers, admins, bannedUsers] = await Promise.all([
      prisma.user.count(),

      prisma.user.count({
        where: {
          banned: false,
        },
      }),

      prisma.user.count({
        where: {
          role: "admin",
        },
      }),

      prisma.user.count({
        where: {
          banned: true,
        },
      }),
    ]);

    console.log("hello ",totalUsers,activeUsers,admins,bannedUsers);

    return {
      success: true,

      data: {
        totalUsers,
        activeUsers,
        admins,
        bannedUsers,
      },
    };
  } catch (error) {
    console.error("[ADMIN_USER_STATS_ERROR]", error);

    throw new AppError(
      "Failed to load user statistics",
      "USER_STATS_FAILED",
      500,
    );
  }
}
