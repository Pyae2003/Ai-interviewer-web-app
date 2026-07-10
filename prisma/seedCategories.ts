import { prisma } from "@/config";
import { categoryGroups } from "./categoryAndQuestion";

export async function seedCategories() {
  console.log("🌱 Seeding Category Groups...");

  try {
    await prisma.$transaction(
      async (tx) => {
        for (const group of categoryGroups) {
          console.log(`📂 ${group.name}`);
          const dbGroup = await tx.categoryGroup.upsert({
            where: {
              slug: group.slug,
            },

            update: {
              name: group.name,
              description: group.description,
              type: group.type,
              isActive: true,
            },

            create: {
              name: group.name,
              slug: group.slug,
              description: group.description,
              type: group.type,
              isActive: true,
            },
          });

          for (const category of group.categories) {
            console.log(`   📁 ${category.name}`);

            const dbCategory = await tx.category.upsert({
              where: {
                name: category.name,
              },

              update: {
                name: category.name,
                description: category.description,
                sortOrder: category.sortOrder ?? 0,
                categoryGroupId: dbGroup.id,
                isActive: true,
              },

              create: {
                name: category.name,
                description: category.description,
                sortOrder: category.sortOrder ?? 0,
                categoryGroupId: dbGroup.id,
                isActive: true,
              },
            });

            const existingQuestions = await tx.question.findMany({
              where: {
                categoryId: dbCategory.id,
              },

              select: {
                question: true,
              },
            });

            const existingSet = new Set(
              existingQuestions.map((q) => q.question.trim()),
            );

            const newQuestions = category.questions
              .filter((q) => !existingSet.has(q.question.trim()))
              .map((q) => ({
                categoryId: dbCategory.id,

                question: q.question.trim(),

                difficulty: q.difficulty,
              }));

            if (newQuestions.length > 0) {
              await tx.question.createMany({
                data: newQuestions,

                skipDuplicates: true,
              });

              console.log(` ✅ ${newQuestions.length} Questions inserted`);
            } else {
              console.log(`      ✔ No new questions`);
            }
          }
        }
      },
      {
        timeout: 120000,
      },
    );

    console.log("🎉 Category Groups Seed Completed");
  } catch (error) {
    console.error("❌ Category Seed Failed");

    console.error(error);

    throw error;
  }
}
