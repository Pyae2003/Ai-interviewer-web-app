"use server";

import { prisma } from "@/config";
import { getSession } from "@/lib/get-Session";
import { AppError } from "@/middleware";

export async function getInterviewsHistory() {
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

      select: {
        id: true,
        score: true,
        status: true,
        createdAt: true,

        _count: {
          select: {
            interviewQuestion: true,
            answers: true,
          },
        },

        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    const groupedData = Object.values(
      interviews.reduce(
        (acc, interview) => {
          const categoryId = interview.category.id;

          if (!acc[categoryId]) {
            acc[categoryId] = {
              categoryId,
              categoryName: interview.category.name,
              interviews: [],
            };
          }

          acc[categoryId].interviews.push({
            id: interview.id,
            score: interview.score,
            status: interview.status,
            createdAt: interview.createdAt,

            totalQuestions: interview._count.interviewQuestion,

            answeredQuestions: interview._count.answers,
          });

          return acc;
        },

        {} as Record<
          string,
          {
            categoryId: string;
            categoryName: string;

            interviews: {
              id: string;
              score: number | null;
              status: string;
              createdAt: Date;

              totalQuestions: number;
              answeredQuestions: number;
            }[];
          }
        >,
      ),
    );

    return {
      success: true,

      data: groupedData,
    };
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    console.error("[GET_INTERVIEW_HISTORY_ERROR]", error);

    throw new AppError(
      "Failed to fetch interview history",
      "INTERVIEW_HISTORY_FETCH_FAILED",
      500,
    );
  }
}
