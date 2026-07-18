import { Worker, Job } from "bullmq";
import { prisma } from "@/config";
import { evaluateAllAnswers } from "@/lib/ai/evaluate-answers";
import { generateSummary } from "@/features/clients/interviews/actions/generate-summary";
import { redisConnection } from "@/lib/redis";

type InterviewJob = {
  interviewId: string;
};

export const interviewWorker = new Worker(
  "evaluate-interview",
  async (job: Job<InterviewJob>) => {
    const { interviewId } = job.data;

    console.log(`[Worker] Starting interview: ${interviewId}`);

    try {
      // STEP 1: Load Interview
      await job.updateProgress(5);

      const interview = await prisma.interview.findUnique({
        where: { id: interviewId },
        include: {
          answers: {
            include: {
              question: {
                include: {
                  category: { select: { name: true } },
                },
              },
            },
          },
        },
      });

      if (!interview) throw new Error("Interview not found");

      if (interview.status !== "IN_PROGRESS") {
        throw new Error("Interview not in PROCESSING state");
      }

      if (interview.answers.length === 0) {
        throw new Error("No answers found");
      }

      await job.log("Interview loaded");
      await job.updateProgress(10);

      // STEP 2: AI Evaluation
      await job.log("Starting AI evaluation");

      const results = await evaluateAllAnswers(
        interview.answers.map((a) => ({
          question: a.question.question,
          answer: a.answer,
          category: a.question.category.name,
          difficulty: a.question.difficulty,
        }))
      );

      if (!results || results.length === 0) {
        throw new Error("AI evaluation failed");
      }

      await job.updateProgress(60);

      // STEP 3: Save Results (Transaction)
      await job.log("Saving results");

      await prisma.$transaction(
        results.map((result, index) => {
          if (!result) throw new Error("Missing result");

          return prisma.interviewAnswer.update({
            where: { id: interview.answers[index].id },
            data: {
              score: result.score,
              feedback: result.feedback,
              idealAnswer: result.idealAnswer,
              strengths: result.strengths,
              weaknesses: result.weaknesses,
              isCorrect: result.score >= 60,
            },
          });
        })
      );

      await job.updateProgress(80);

      // STEP 4: Summary
      const summary = await generateSummary(results);

      await job.updateProgress(90);

      // STEP 5: Final Update
      await prisma.interview.update({
        where: { id: interviewId },
        data: {   
          status: "COMPLETED",
          score: summary.averageScore,
        },
      });

      await job.updateProgress(100);

      return {
        success: true,
        interviewId,
        score: summary.averageScore,
      };
    } catch (error) {
      console.error(`[Worker Error] ${interviewId}`, error);

      await prisma.interview.update({
        where: { id: interviewId },
        data: {
          status: "FAILED",
          // errorMessage: error?.message ?? "Unknown error",
          // failedAt: new Date(),
        },
      });

      throw error;
    }
  },
  {
    connection: redisConnection as any ,
    concurrency: 3,
  }
);

const shutdown = async () => {
  console.log("Closing worker...");

  await interviewWorker.close();

  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);