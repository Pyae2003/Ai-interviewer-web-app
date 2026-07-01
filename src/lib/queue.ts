import { Queue } from "bullmq";
import { redisConnection } from "./redis";
export const interviewQueue = new Queue("interview", {
  connection: redisConnection as any,
  defaultJobOptions: {
    attempts: 3, // retry 3 times
    backoff: {
      type: "exponential",
      delay: 2000,
    },
    removeOnComplete: true,
    removeOnFail: false,
  },
});