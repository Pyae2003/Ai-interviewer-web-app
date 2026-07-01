"use server";

import { prisma } from "@/config";
import { getSession } from "@/lib/get-Session";
import { AppError } from "@/middleware";
import { GetUsersParams } from "../type/user-type";

export async function getUsersInfofn({
  search,
  page = 1,
  limit = 10,
}: GetUsersParams) {
  const session = await getSession();

  if (!session?.user?.id) {
    throw new AppError("Unauthorized", "UNAUTHORIZED", 401);
  }

  if (session.user.role !== "admin") {
    throw new AppError("Forbidden", "FORBIDDEN", 403);
  }

  const safeLimit = Math.min(Math.max(limit, 1), 50);

  const safePage = Math.max(page, 1);

  const skip = (safePage - 1) * safeLimit;

  const where = search?.trim()
    ? {
        name: {
          contains: search.trim(),
          mode: "insensitive" as const,
        },
      }
    : undefined;

  try {
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        take: safeLimit,
        skip,

        where,

        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          banned: true,
          createdAt: true,
          lastLogin: true,

          _count: {
            select: {
              interview: true,
            },
          },
        },

        orderBy: {
          createdAt: "desc",
        },
      }),

      prisma.user.count({
        where,
      }),
    ]);

    console.log(users);

    return {
      success: true,

      data: users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,

        role: user.role,

        status: user.banned ? "BANNED" : "ACTIVE",

        interviews: user._count.interview,
        banned: user.banned === true,

        joinedAt: user.createdAt,

        lastLogin: user.lastLogin,
      })),

      pagination: {
        page: safePage,
        limit: safeLimit,
        total,
        totalPages: Math.ceil(total / safeLimit),
      },
    };
  } catch (error) {
    console.error("[ADMIN_GET_USERS_ERROR]", error);

    throw new AppError("Failed to load users", "GET_USERS_FAILED", 500);
  }
}
