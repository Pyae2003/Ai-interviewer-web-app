import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";
import { env } from "./env";

const connectionString = `${env.DIRECT_URL}`;
const adapter = new PrismaPg({ connectionString });

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
    errorFormat: process.env.NODE_ENV === "development" ? "pretty" : "minimal",
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

prisma.$on("error" as never, (e: Error) => {
  console.error("Prisma Client Error:", e);
});

// Export connection test function
export const testDatabaseConnection = async (): Promise<boolean> => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    console.log("✅ Database connected successfully");

    return true;
  } catch (error) {
    console.error("❌ Database connection failed:", error);

    return false;
  }
};

const gracefulShutdown = async () => {
  try {
    await prisma.$disconnect();

    console.log("🔌 Prisma disconnected successfully");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error during Prisma disconnect:", error);

    process.exit(1);
  }
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
