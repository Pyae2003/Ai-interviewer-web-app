import Redis from "ioredis";
const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  throw new Error(
    "REDIS_URL environment variable is missing",
  );
}
declare global {
  var redisConnection: Redis | undefined;
}

export const redisConnection =
  global.redisConnection ??
  new Redis(redisUrl, {
    maxRetriesPerRequest: null,
    enableReadyCheck: true,
    lazyConnect: true,

    retryStrategy(times) {
      return Math.min(times * 50, 2000);
    },
  });

// Logging (production observability)

redisConnection.on("connect", () => console.log("Redis connecting..."));
redisConnection.on("ready", () => console.log("Redis ready"));
redisConnection.on("reconnecting", () => console.log("Redis reconnecting"));
redisConnection.on("error", (err) => console.error("Redis error:", err));

// Prevent multiple instances in dev
if (process.env.NODE_ENV !== "production") {
  global.redisConnection = redisConnection;
}