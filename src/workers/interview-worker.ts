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

    console.log(`[Worker] Starting interview: ${interviewId} (Attempt: ${job.attemptsMade + 1})`);

    try {
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

      // 🐛 FIX 1: Allow FAILED status for BullMQ Retries
      if (interview.status !== "IN_PROGRESS" && interview.status !== "FAILED") {
        throw new Error(`Interview not in valid state (Current: ${interview.status})`);
      }

      // Retry လုပ်တဲ့အချိန် FAILED ဖြစ်နေခဲ့ရင် IN_PROGRESS ကို ပြန်ပြောင်းပေးမယ်
      if (interview.status === "FAILED") {
        await prisma.interview.update({
          where: { id: interviewId },
          data: { status: "IN_PROGRESS" }
        });
      }

      if (interview.answers.length === 0) {
        throw new Error("No answers found");
      }

      await job.log("Interview loaded");
      await job.updateProgress(10);

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

      await job.log("Saving results");

      // 🐛 FIX 2: Add maxWait and timeout for the transaction
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
        }),
        {
          maxWait: 5000,   // Wait 5 seconds for a database connection
          timeout: 20000,  // Give the transaction 20 seconds to complete
        }
      );

      await job.updateProgress(80);

      const summary = await generateSummary(results);

      await job.updateProgress(90);

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
        },
      });

      throw error;
    }
  },
  {
    connection: redisConnection as any,
    concurrency: 3, // 💡 Note: If DB connection limit is low, reduce this to 1 or 2.
  }
);

const shutdown = async () => {
  console.log("Closing worker...");
  await interviewWorker.close();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);