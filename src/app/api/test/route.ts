import { redisConnection } from "@/lib/redis";

export async function GET() {
  await redisConnection.set("hello", "world");

  const value = await redisConnection.get("hello");

  return Response.json({
    value,
  });
}