"use server";

import { prisma } from "@/config";
import { AppError } from "@/middleware";
import { getSession } from "@/lib/get-Session";
import { getInterviewIdSchema } from "../schema/interviewid-schema";

export async function getInterviewQuestions(interviewId: string) {
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

  if (!session) {
    throw new AppError("Unauthorized", "UNAUTHORIZED", 401);
  }

  try {
    const interview = await prisma.interview.findFirst({
      where: {
        id: validation.data.id,
        userId: session.user.id,
      },

      select: {
        id: true,

        category: {
          select: {
            id: true,
            name: true,
          },
        },

        interviewQuestion: {
          select: {
            id: true,
            questionId: true,
            questionText: true,
            difficulty: true,
            orderIndex: true,
          },

          orderBy: {
            orderIndex: "asc",
          },
        },
      },
    });

    if (!interview) {
      throw new AppError("Interview not found", "INTERVIEW_NOT_FOUND", 404);
    }

    const questions = interview.interviewQuestion ?? [];

    if (questions.length === 0) {
      throw new AppError("No questions found", "QUESTIONS_NOT_FOUND", 404);
    }

    return {
      success: true,

      data: {
        interview_Id: interview.id,

        category: interview.category,

        totalQuestions: questions.length,

        questions: interview.interviewQuestion,
      },
    };
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    console.error("[GET_INTERVIEW_QUESTIONS_ERROR]", error);

    throw new AppError(
      "Failed to fetch interview questions",
      "QUESTION_FETCH_FAILED",
      500,
    );
  }
}
