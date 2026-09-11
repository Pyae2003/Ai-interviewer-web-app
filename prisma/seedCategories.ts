import { prisma } from "@/config";
import { CategoryGroupType, Difficulty } from "@/generated/prisma/enums";
import { createCategoryGroups } from "./categoryAndQuestion";


export async function seedCategories(
  types: Parameters<typeof createCategoryGroups>[0] = {
    careers: CategoryGroupType.POSITION,
    foundations: CategoryGroupType.OTHER,
  },
) {
  console.log("🌱 Seeding category groups...");

  try {
    // Call the factory; the function itself is not iterable.
    const validGroupTypes = new Set(Object.values(CategoryGroupType));
    if (
      !types ||
      !validGroupTypes.has(types.careers) ||
      !validGroupTypes.has(types.foundations)
    ) {
      throw new Error("Provide valid Prisma enum values for careers and foundations.");
    }
    const groups = createCategoryGroups(types);
    const difficulties = [Difficulty.EASY, Difficulty.MEDIUM, Difficulty.HARD];
    const groupSlugs = new Set<string>();
    const categoryNames = new Set<string>();

    // Validate and normalize all input before opening a database transaction.
    for (const group of groups) {
      group.name = group.name.trim();
      group.slug = group.slug.trim();
      if (!group.name || !group.slug || groupSlugs.has(group.slug)) {
        throw new Error(`Empty or duplicate group identity: ${group.slug}`);
      }
      groupSlugs.add(group.slug);
      for (const category of group.categories) {
        category.name = category.name.trim();
        if (!category.name || categoryNames.has(category.name)) {
          throw new Error(`Empty or duplicate category name: ${category.name}`);
        }
        categoryNames.add(category.name);
        const questions = new Set<string>();
        for (const item of category.questions) {
          item.question = item.question.trim();
          if (!item.question || questions.has(item.question)) {
            throw new Error(`Empty or duplicate question in ${category.name}`);
          }
          if (!difficulties.includes(item.difficulty)) {
            throw new Error(`Invalid difficulty in ${category.name}`);
          }
          questions.add(item.question);
        }
        for (const difficulty of difficulties) {
          const count = category.questions.filter(q => q.difficulty === difficulty).length;
          if (count !== 10) {
            throw new Error(`${category.name}: expected 10 ${difficulty} questions, got ${count}`);
          }
        }
      }
    }

    const summary = await prisma.$transaction(
      async (tx) => {
        const result = {
          groups: 0,
          categories: 0,
          inserted: 0,
          updated: 0,
          unchanged: 0,
        };

        for (const group of groups) {
          const groupData = {
            name: group.name,
            description: group.description,
            type: group.type,
            isActive: group.isActive,
          };
          const dbGroup = await tx.categoryGroup.upsert({
            where: { slug: group.slug },
            update: groupData,
            create: { ...groupData, slug: group.slug },
          });
          result.groups++;

          for (const category of group.categories) {
            const categoryData = {
              name: category.name,
              description: category.description,
              sortOrder: category.sortOrder ?? 0,
              categoryGroupId: dbGroup.id,
              isActive: true,
            };
            const dbCategory = await tx.category.upsert({
              where: { name: category.name },
              update: categoryData,
              create: categoryData,
            });
            result.categories++;

            const existing = await tx.question.findMany({
              where: { categoryId: dbCategory.id },
              select: { question: true, difficulty: true },
            });
            const existingByText = new Map(
              existing.map(q => [q.question.trim(), q]),
            );
            // Ambiguous existing identities must be resolved explicitly.
            if (existingByText.size !== existing.length) {
              throw new Error(`Existing duplicate question text in ${category.name}; resolve duplicates before seeding.`);
            }

            const missing = category.questions.filter(
              q => !existingByText.has(q.question),
            );
            if (missing.length > 0) {
              const created = await tx.question.createMany({
                data: missing.map(q => ({
                  categoryId: dbCategory.id,
                  question: q.question,
                  difficulty: q.difficulty,
                })),
                // No skipDuplicates: pre-filtering handles sequential reruns,
                // and actual constraint failures should not be silently hidden.
              });
              result.inserted += created.count;
            }

            for (const question of category.questions) {
              const previous = existingByText.get(question.question);
              if (!previous) continue;
              if (
                previous.difficulty === question.difficulty &&
                previous.question === question.question
              ) {
                result.unchanged++;
                continue;
              }
              // Keep existing IDs and relationships while synchronizing content.
              const changed = await tx.question.updateMany({
                where: {
                  categoryId: dbCategory.id,
                  question: previous.question,
                },
                data: {
                  question: question.question,
                  difficulty: question.difficulty,
                },
              });
              if (changed.count !== 1) {
                throw new Error(`Question identity changed while seeding ${category.name}`);
              }
              result.updated += changed.count;
            }
          }
        }
        return result;
      },
      { maxWait: 10_000, timeout: 120_000 },
    );

    // Emit success only after the entire transaction commits.
    console.log("🎉 Category seed committed successfully.");
    console.table(summary);
    return summary;
  } catch (error) {
    console.error("❌ Category seed failed; no success is reported.", error);
    throw error;
  }
}
