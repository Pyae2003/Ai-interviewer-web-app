"use server";

import { prisma } from "@/config";
import { getSession } from "@/lib/get-Session";
import { AppError } from "@/middleware";
import { actionClient } from "@/lib/safe-action";
import { answerQuestionSchema } from "../schema/answer-schema";

export const saveInterviewAnswer = actionClient
  .inputSchema(answerQuestionSchema)
  .action(async ({ parsedInput }) => {
    const { interviewId, interviewQuestionId, answer } = parsedInput;

    try {
      const session = await getSession();

      if (!session) {
        throw new AppError("Unauthorized", "UNAUTHORIZED", 401);
      }

      /**
       * Verify interview ownership
       */
      const interview = await prisma.interview.findFirst({
        where: {
          id: interviewId,
          userId: session.user.id,
        },
        select: {
          id: true,
        },
      });

      if (!interview) {
        throw new AppError("Interview not found", "INTERVIEW_NOT_FOUND", 404);
      }

      /**
       * Verify question belongs
       * to this interview
       */
      const interviewQuestion = await prisma.interviewQuestion.findFirst({
        where: {
          id: interviewQuestionId,
          interviewId,
        },
        select: {
          id: true,
          questionId: true,
        },
      });

      if (!interviewQuestion) {
        throw new AppError("Question not found", "QUESTION_NOT_FOUND", 404);
      }

      /**
       * Update existing answer
       * OR create new answer
       */
      const savedAnswer = await prisma.interviewAnswer.upsert({
        where: {
           interviewQuestionId : interviewQuestion.id ,
        },

        update: {
          answer,
        },

        create: {
          interviewId,
          questionId: interviewQuestion.questionId,
          interviewQuestionId,
          answer,
        },

        select: {
          id: true,
          answer: true,
        },
      });

      return {
        success: true,
        message: "Answer saved successfully",
        data: savedAnswer,
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      console.error("[SAVE_INTERVIEW_ANSWER_ERROR]", error);

      throw new AppError("Failed to save answer", "ANSWER_SAVE_FAILED", 500);
    }
  });
