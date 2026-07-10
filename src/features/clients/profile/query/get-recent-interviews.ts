"use server";

import { prisma } from "@/config";
import { getSession } from "@/lib/get-Session";
import { AppError } from "@/middleware";

export type RecentActivityResponse = {
  success: true;
  data: ActivityItem[];
};

export type ActivityItem = {
  id: string;

  category: string;

  score: number;
  createdAt: Date;
};

export async function getRecentActivity(): Promise<RecentActivityResponse> {
  const session = await getSession();

  if (!session?.user?.id) {
    throw new AppError("Unauthorized", "UNAUTHORIZED", 401);
  }

  try {
    const interviews = await prisma.interview.findMany({
      where: {
        userId: session.user.id,
        status: "COMPLETED",
      },

      orderBy: {
        createdAt: "desc",
      },

      take: 2,

      select: {
        id: true,

        score: true,

        createdAt: true,

        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const activities = interviews.map((item) => {
      const score = item.score ?? 0;

      return {
        id: item.id,

        category: item.category.name,

        score,

        createdAt: item.createdAt,
      };
    });

    return {
      success: true,
      data: activities,
    };
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    console.error("[GET_RECENT_ACTIVITY_ERROR]", error);

    throw new AppError(
      "Failed to fetch recent activity",
      "RECENT_ACTIVITY_FETCH_FAILED",
      500,
    );
  }
}
