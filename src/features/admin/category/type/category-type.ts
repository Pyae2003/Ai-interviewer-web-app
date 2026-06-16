import { Prisma } from "@/generated/prisma/client";

export type Category = Prisma.CategoryGetPayload<{
    select: {
        id: true,
        name: true,
        description: true,
        isActive: true,
        sortOrder: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            questions: true,
          },
        },
      },
}>;