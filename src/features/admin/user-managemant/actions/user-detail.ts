"use server";

import { prisma } from "@/config";
import { getSession } from "@/lib/get-Session";
import { AppError } from "@/middleware";
import { userIdSchema } from "../schema/get-userid-schema";

type GetUserDetailParams = {
  userId: string;
};

export async function getUserDetail({ userId }: GetUserDetailParams) {
  const validatedId = userIdSchema.safeParse({
    userId : userId,
  });

  console.log(validatedId)

  if (!validatedId.success) {
    throw new AppError(
      validatedId.error.issues[0]?.message ?? "Invalid interview id",
      "INVALID_INTERVIEW_ID",
      400,
    );
  }

  const session = await getSession();

  /*

* Authentication
  */
  if (!session?.user?.id) {
    throw new AppError("Unauthorized", "UNAUTHORIZED", 401);
  }

  /*

* Admin Only
  */
  if (session.user.role !== "admin") {
    throw new AppError("Forbidden", "FORBIDDEN", 403);
  }

  if (!validatedId.data.userId || validatedId.data.userId.trim().length === 0) {
    throw new AppError("Invalid user id", "INVALID_USER_ID", 400);
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },

      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        banned: true,
        createdAt: true,
        lastLogin: true,

        interview: {
          select: {
            id: true,
            score: true,
            status: true,
            createdAt: true,

            category: {
              select: {
                name: true,
              },
            },
          },

          orderBy: {
            createdAt: "desc",
          },

          take: 5,
        },
      },
    });

    if (!user) {
      throw new AppError("User not found", "USER_NOT_FOUND", 404);
    }

    const totalInterviews = user.interview.length;

    const completedInterviews = user.interview.filter(
      (i) => i.status === "COMPLETED",
    );

    const avgScore =
      completedInterviews.length > 0
        ? Math.round(
            completedInterviews.reduce(
              (sum, item) => sum + (item.score ?? 0),
              0,
            ) / completedInterviews.length,
          )
        : 0;

    const passed = completedInterviews.filter(
      (i) => (i.score ?? 0) >= 70,
    ).length;

    const failed = completedInterviews.filter(
      (i) => (i.score ?? 0) < 70,
    ).length;

    return {
      success: true,

      data: {
        id: user.id,

        name: user.name,

        email: user.email,

        role: user.role,

        status: user.banned ? "BANNED" : "ACTIVE",

        joinedAt: user.createdAt,

        lastLogin: user.lastLogin,

        banned : user.banned === true,

        interviews: totalInterviews,

        avgScore,

        passed,

        failed,

        recentInterviews: user.interview.map((interview) => ({
          id: interview.id,

          category: interview.category.name,

          score: interview.score ?? 0,

          status: interview.status,

          createdAt: interview.createdAt,
        })),
      },
    };
  } catch (error) {
    console.error("[ADMIN_GET_USER_DETAIL_ERROR]", error);

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      "Failed to load user detail",
      "GET_USER_DETAIL_FAILED",
      500,
    );
  }
}
