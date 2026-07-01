"use server";

import { prisma } from "@/config";
import { getSession } from "@/lib/get-Session";
import { AppError } from "@/middleware";
import { getInterviewIdSchema } from "../../interviews/schema/interviewid-schema";

export async function getInterviewHistoryDetail(interviewId: string) {
  const validation = getInterviewIdSchema.safeParse({
    id: interviewId,
  });

  if (!validation.success) {
    throw new AppError(
      validation.error.issues[0]?.message ?? "Invalid interview id",
      "INVALID_INTERVIEW_ID",
      400,
    );
  }

  const session = await getSession();

  if (!session?.user?.id) {
    throw new AppError("Unauthorized", "UNAUTHORIZED", 401);
  }

  try {
    const interview = await prisma.interview.findFirst({
      where: {
        id: validation.data.id,
        userId: session.user.id,
        status: "COMPLETED",
      },

      select: {
        id: true,
        score: true,
        status: true,
        createdAt: true,

        category: {
          select: {
            id: true,
            name: true,
          },
        },

        _count: {
          select: {
            interviewQuestion: true,
            answers: true,
          },
        },

        interviewQuestion: {
          orderBy: {
            orderIndex: "asc",
          },

          select: {
            id: true,
            questionText: true,
            difficulty: true,
            orderIndex: true,

            interviewAnswer: {
              take: 1,

              select: {
                id: true,

                answer: true,

                score: true,

                isCorrect: true,

                feedback: true,

                idealAnswer: true,

                strengths: true,

                weaknesses: true,

                missingPoints: true,

                recommendations: true,
              },
            },
          },
        },
      },
    });

    if (!interview) {
      throw new AppError("Interview not found", "INTERVIEW_NOT_FOUND", 404);
    }

    const questions = interview.interviewQuestion.map((question) => {
      const answer = question.interviewAnswer[0];

      return {
        id: question.id,

        orderIndex: question.orderIndex,

        questionText: question.questionText,

        difficulty: question.difficulty,

        answer: answer?.answer ?? "",

        score: answer?.score ?? 0,

        isCorrect: answer?.isCorrect ?? false,

        feedback: answer?.feedback ?? "",

        idealAnswer: answer?.idealAnswer ?? "",

        strengths: answer.strengths ?? "",

        weaknesses: answer?.weaknesses ?? "",

        missingPoints: answer?.missingPoints ?? [],
      };
    });

    return {
      success: true,

      data: {
        categoryName: interview.category.name,

        status: interview.status,

        createdAt: interview.createdAt,

        score: interview.score ?? 0,

        totalQuestions: interview._count.interviewQuestion,

        questions,
      },
    };
  } catch (error) {
    console.error("[GET_INTERVIEW_HISTORY_DETAIL_ERROR]", error);

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      "Failed to fetch interview detail",
      "INTERVIEW_DETAIL_FETCH_FAILED",
      500,
    );
  }
}
