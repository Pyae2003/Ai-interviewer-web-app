"use server";

import { prisma } from "@/config";
import { calculateAverageScore } from "@/lib/calculate-average-score";
import { getSession } from "@/lib/get-Session";
import { AppError } from "@/middleware";
import { getInterviewIdSchema } from "../schema/interviewid-schema";

export async function getInterviewResult(interviewId: string) {
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

        answers: {
          orderBy: {
            interviewQuestion: {
              orderIndex: "asc",
            },
          },

          select: {
            id: true,
            answer: true,
            score: true,
            feedback: true,
            idealAnswer: true,
            strengths: true,
            weaknesses: true,
            isCorrect: true,

            interviewQuestion: {
              select: {
                id: true,
                orderIndex: true,
                questionText: true,
                difficulty: true,
              },
            },
          },
        },
      },
    });
    if (!interview) {
      throw new AppError("Interview not found", "INTERVIEW_NOT_FOUND", 404);
    }

    if (interview.status !== "COMPLETED") {
      throw new AppError(
        "Interview is already completed!",
        "INTERVIEW_IS_ALREADY_COMPLETED",
        400,
      );
    }

    const totalQuestions = interview.answers.length;

    const answeredQuestions = interview.answers.filter(
      (answer) => answer.answer.trim().length > 0,
    ).length;

    const completionRate =
      totalQuestions === 0
        ? 0
        : Math.round((answeredQuestions / totalQuestions) * 100);

    const easyAnswers = interview.answers.filter(
      (item) => item.interviewQuestion.difficulty === "EASY",
    );

    const mediumAnswers = interview.answers.filter(
      (item) => item.interviewQuestion.difficulty === "MEDIUM",
    );

    const hardAnswers = interview.answers.filter(
      (item) => item.interviewQuestion.difficulty === "HARD",
    );

    const easyScore = calculateAverageScore(easyAnswers);

    const mediumScore = calculateAverageScore(mediumAnswers);

    const hardScore = calculateAverageScore(hardAnswers);

    return {
      completed: true,
      interviewId: interviewId,
      categoryName: interview.category.name,
      status: interview.status,
      createdAt: interview.createdAt,
      score: interview.score ?? 0,
      totalQuestions,
      answeredQuestions,
      completionRate,
      easyScore,
      mediumScore,
      hardScore,

      answers: interview.answers.map((answer) => ({
        id: answer.id,

        questionText: answer.interviewQuestion.questionText,

        orderIndex: answer.interviewQuestion.orderIndex,

        difficulty: answer.interviewQuestion.difficulty,

        answer: answer.answer,

        score: answer.score ?? 0,

        isCorrect: answer.isCorrect ?? false,
        feedback: answer.feedback,

        idealAnswer: answer.idealAnswer,

        strengths: answer.strengths ?? "",

        weaknesses: answer.weaknesses ?? "",
      })),
    };
  } catch (error) {
    console.error("[GET_INTERVIEW_RESULT_ERROR]", error);

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      "Unable to load interview result",
      "RESULT_FETCH_FAILED",
      500,
    );
  }
}
