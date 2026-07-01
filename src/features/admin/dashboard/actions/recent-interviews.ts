"use server";

import { prisma } from "@/config";
import { UserRole } from "@/generated/prisma/enums";
import { getSession } from "@/lib/get-Session";
import { AppError } from "@/middleware";

export type RecentInterview = {
  id: string;
  userName: string;
  userEmail: string;
  categoryName: string;
  score: number | null;
  status: string;
  createdAt: Date;
};

type RecentInterviewResponse = {
  success: boolean;
  data: RecentInterview[];
};

export const recentInterviewsFn =
  async (): Promise<RecentInterviewResponse> => {
    const session = await getSession();

    if (!session?.user?.id) {
      throw new AppError(
        "Unauthorized",
        "UNAUTHORIZED",
        401,
      );
    }

    if (session.user.role !== UserRole.admin) {
      throw new AppError(
        "Forbidden",
        "FORBIDDEN",
        403,
      );
    }

    try {
      const interviews =
        await prisma.interview.findMany({
          take: 5,

          orderBy: {
            createdAt: "desc",
          },

          select: {
            id: true,

            score: true,

            status: true,

            createdAt: true,

            user: {
              select: {
                name: true,
                email: true,
              },
            },

            category: {
              select: {
                name: true,
              },
            },
          },
        });

      return {
        success: true,

        data: interviews.map(
          (interview) => ({
            id: interview.id,

            userName:
              interview.user.name ??
              "Unknown User",

            userEmail:
              interview.user.email,

            categoryName:
              interview.category.name,

            score: interview.score,

            status: interview.status,

            createdAt:
              interview.createdAt,
          }),
        ),
      };
    } catch (error) {
      console.error(
        "[RECENT_INTERVIEWS_ERROR]",
        error,
      );

      throw new AppError(
        "Failed to load recent interviews",
        "RECENT_INTERVIEWS_FAILED",
        500,
      );
    }
  };