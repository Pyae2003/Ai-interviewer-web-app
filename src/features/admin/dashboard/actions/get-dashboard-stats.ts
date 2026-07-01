"use server";

import { prisma } from "@/config";
import { UserRole } from "@/generated/prisma/enums";
import { getSession } from "@/lib/get-Session";
import { AppError } from "@/middleware";

export async function getDashboardStats() {
  const session = await getSession();

  if (!session) {
    throw new AppError("Unauthorized", "UNAUTHORIZED", 401);
  }

  if (session.user.role !== UserRole.admin) {
    throw new AppError("Forbidden", "FORBIDDEN", 403);
  }

  try {
    const [
      totalUsers,
      totalAdmins,
      totalInterviews,
      totalQuestions,
      totalCategories,
    ] = await Promise.all([
      prisma.user.count({
        where: {
          role: UserRole.user,
        },
      }),

      prisma.user.count({
        where: {
          role: UserRole.admin,
        },
      }),

      prisma.interview.count(),

      prisma.question.count(),

      prisma.category.count(),
    ]);

    return {
      success: true,

      data: {
        users: totalUsers,

        admins: totalAdmins,

        interviews: totalInterviews,

        questions: totalQuestions,

        categories: totalCategories,
      },
    };
  } catch (error) {
    console.error("[GET_DASHBOARD_STATS_ERROR]", error);

    throw new AppError(
      "Failed to load dashboard statistics",
      "DASHBOARD_STATS_ERROR",
      500,
    );
  }
}
