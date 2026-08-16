"use client";

import {
  motion,
  MotionConfig,
} from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import type { Category } from "@/features/admin/category/type/category-type";
import { CategoryStatistics } from "./categories/category-statistics";
import { InterviewAction } from "./categories/interview-action";
import { CategoryHeaderForCard } from "./categories/categoryHeader";

type CategoriesListProps = {
  category: Category;
};


export default function CategoriesList({
  category,
}: CategoriesListProps) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.article
        initial={{
          opacity: 0,
          y: 10,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        whileHover={{
          y: -3,
        }}
        viewport={{
          once: true,
          amount: 0.25,
        }}
        transition={{
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="h-full"
      >
        <Card className="group relative h-full overflow-hidden rounded-3xl border border-border/70 bg-card shadow-[0_10px_35px_rgba(15,23,42,0.06)] transition-[border-color,box-shadow] duration-300 hover:border-sky-300 hover:shadow-[0_18px_48px_rgba(15,23,42,0.10)] dark:hover:border-sky-700">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-1 bg-sky-500"
          />

          <CardContent className="relative p-5 sm:p-6">
            <CategoryHeaderForCard
              name={category.name}
              description={category.description}
              isActive={category.isActive}
            />

            <CategoryStatistics
              questions={category._count.questions}
              interviews={category._count.interviews}
            />

            <InterviewAction
              categoryId={category.id}
              categoryName={category.name}
              isActive={category.isActive}
            />
          </CardContent>
        </Card>
      </motion.article>
    </MotionConfig>
  );
}