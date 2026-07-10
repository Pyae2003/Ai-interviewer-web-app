"use server";

import { prisma } from "@/config";
import { getSession } from "@/lib/get-Session";
import { AppError } from "@/middleware";

export type ProfileHeaderResponse = {
  success: true;
  data: {
    id: string;
    name: string;
    email: string;
    role: string;
    image: string | null;
    joined: Date;

    totalInterviews: number;
    totalCategories: number;

    averageScore: number;
    bestScore: number;

    lastInterview: Date | null;

    performance:
      | "Excellent"
      | "Very Good"
      | "Good"
      | "Average"
      | "Needs Improvement";
  };
};

export async function getProfileHeader(): Promise<ProfileHeaderResponse> {
  const session = await getSession();

  if (!session?.user?.id) {
    throw new AppError("Unauthorized", "UNAUTHORIZED", 401);
  }

  try {
    const [user, interviewStats, categoryCount, latestInterview] =
      await prisma.$transaction([
        prisma.user.findUnique({
          where: {
            id: session.user.id,
          },

          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            image: true,
            banned: true,
            createdAt: true,
          },
        }),

        prisma.interview.aggregate({
          where: {
            userId: session.user.id,
            status: "COMPLETED",
          },

          _count: {
            id: true,
          },

          _avg: {
            score: true,
          },

          _max: {
            score: true,
          },
        }),

        prisma.interview.findMany({
          where: {
            userId: session.user.id,
            status: "COMPLETED",
          },

          distinct: ["categoryId"],

          select: {
            categoryId: true,
          },
        }),

        prisma.interview.findFirst({
          where: {
            userId: session.user.id,
            status: "COMPLETED",
          },

          orderBy: {
            createdAt: "desc",
          },

          select: {
            createdAt: true,
          },
        }),
      ]);

    if (!user) {
      throw new AppError("User not found", "USER_NOT_FOUND", 404);
    }

    if (user.banned) {
      throw new AppError("Your account has been banned", "ACCOUNT_BANNED", 403);
    }

    const averageScore = Math.round(interviewStats._avg.score ?? 0);

    let performance: ProfileHeaderResponse["data"]["performance"] =
      "Needs Improvement";

    if (averageScore >= 90) {
      performance = "Excellent";
    } else if (averageScore >= 80) {
      performance = "Very Good";
    } else if (averageScore >= 70) {
      performance = "Good";
    } else if (averageScore >= 60) {
      performance = "Average";
    }

    return {
      success: true,

      data: {
        id: user.id,

        name: user.name ?? "Unknown User",

        email: user.email,

        role: user.role ?? "USER",

        image: user.image,

        joined: user.createdAt,

        totalInterviews: interviewStats._count.id,

        totalCategories: categoryCount.length,

        averageScore,

        bestScore: interviewStats._max.score ?? 0,

        lastInterview: latestInterview?.createdAt ?? null,

        performance,
      },
    };
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    console.error("[GET_PROFILE_HEADER_ERROR]", error);

    throw new AppError("Failed to fetch profile", "PROFILE_FETCH_FAILED", 500);
  }
}
