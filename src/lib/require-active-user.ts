import { getSession } from "@/lib/get-Session";
import { prisma } from "@/config";
import { AppError } from "@/middleware";

export async function requireActiveUser() {
  const session = await getSession();

  if (!session?.user?.id) {
    throw new AppError(
      "Unauthorized",
      "UNAUTHORIZED",
      401,
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      id: true,
      role: true,
      banned: true,
    },
  });

  if (!user) {
    throw new AppError(
      "User not found",
      "USER_NOT_FOUND",
      404,
    );
  }

  if (user.banned) {
    throw new AppError(
      "Your account has been banned",
      "ACCOUNT_BANNED",
      403,
    );
  }

  return user;
}