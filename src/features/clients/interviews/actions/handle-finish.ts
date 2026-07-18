"use server";

import { prisma } from "@/config";
import { getSession } from "@/lib/get-Session";
import { AppError } from "@/middleware";

import { getInterviewIdSchema } from "../schema/interviewid-schema";
import { redirect } from "next/navigation";
import { interviewProcessingPath } from "@/constants/route";
import { interviewQueue } from "@/lib/queue";

export async function finishInterview(interviewId: string) {
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

      include: {
        interviewQuestion: {
          select: {
            id: true,
          },
        },

        answers: {
          select: {
            id: true,
            score: true,
          },
        },
      },
    });

    if (!interview) {
      throw new AppError("Interview not found", "INTERVIEW_NOT_FOUND", 404);
    }

    const totalQuestions = interview.interviewQuestion.length;

    if (interview.answers.length < totalQuestions) {
      throw new AppError("Please answer all questions", "NOT_COMPLETE", 400);
    }

    if (interview.status === "COMPLETED") {
      throw new AppError(
        "Interview already completed",
        "INTERVIEW_ALREADY_COMPLETED",
        409,
      );
    }

    await prisma.interview.update({
      where: {
        id: interview.id,
      },

      data: {
        status: "IN_PROGRESS",
      },

      select: {
        id: true,
        score: true,
        status: true,
      },
    });

    await interviewQueue.add(
      "evaluate-interview",
      {
        interviewId,
      },
      {
        deduplication: {
          id: `evaluate-interview`,
        },

        attempts: 3,

        backoff: {
          type: "exponential",
          delay: 2000,
        },
      },
    );
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    console.error("[FINISH_INTERVIEW_ERROR]", error);

    throw new AppError(
      "Failed to finish interview",
      "INTERVIEW_FINISH_FAILED",
      500,
    );
  }

  redirect(interviewProcessingPath(interviewId));
}
