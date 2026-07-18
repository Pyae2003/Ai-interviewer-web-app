import { Queue, QueueOptions } from "bullmq";
import { redisConnection } from "./redis";



declare global {
  var interviewQueue: Queue | undefined;
}

const queueOptions: QueueOptions = {

  connection: redisConnection as any, 
  
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 2000, 
    },
    

    removeOnComplete: {
      age: 60 * 60, 
      count: 500,   
    },
    removeOnFail: {
      age: 2 * 60 * 60, 
      count: 1000,
    },
  },
};

// ၄။ Export Queue Instance
export const interviewQueue =
  global.interviewQueue ??
  new Queue("evaluate-interview", queueOptions);

if (process.env.NODE_ENV !== "production") {
  global.interviewQueue = interviewQueue;
}

interviewQueue.on("error", (error) => {
  console.error(`[BullMQ] Interview Queue Error:`, error);
});