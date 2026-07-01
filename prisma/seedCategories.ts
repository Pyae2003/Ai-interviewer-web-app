import { prisma } from "@/config";
import { categories } from "./categoryAndQuestion";

export async function seedCategories() {
  for (const category of categories) {
    const dbCategory =
      await prisma.category.upsert({
        where: {
          name: category.name,
        },

        update: {
          description:
            category.description,

          sortOrder:
            category.sortOrder,

          isActive: true,
        },

        create: {
          name: category.name,

          description:
            category.description,

          sortOrder:
            category.sortOrder,

          isActive: true,
        },
      });

    await prisma.question.deleteMany({
      where: {
        categoryId: dbCategory.id,
      },
    });

    await prisma.question.createMany({
      data: category.questions.map(
        (q) => ({
          categoryId:
            dbCategory.id,

          question:
            q.question,

          difficulty:
            q.difficulty,
        }),
      ),
    });
  }
}