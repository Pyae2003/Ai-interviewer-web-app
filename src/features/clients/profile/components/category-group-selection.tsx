"use client";

import { motion, MotionConfig, type Variants } from "framer-motion";
import { FolderOpen, Trophy, Layers3, BarChart3 } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

import CategoryCard from "./category-card";

type Props = {
  groups: {
    id: string;
    name: string;
    slug: string;
    categories: {
      id: string;
      name: string;
      latestScore: number;
      interviews: number;
    }[];
  }[];
};

const titleContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.04,
      staggerChildren: 0.055,
    },
  },
};

const titleWordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 5,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.42,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function AnimatedGroupTitle({ title }: { title: string }) {
  const words = title.trim().split(/\s+/);

  return (
    <motion.h2
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.8,
      }}
      variants={titleContainerVariants}
      aria-label={title}
      className="line-clamp-2 text-lg font-bold tracking-tight text-zinc-950 sm:text-xl dark:text-white"
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          aria-hidden="true"
          variants={titleWordVariants}
          className={
            index === words.length - 1
              ? "inline-block bg-linear-to-r from-sky-500 to-yellow-500 bg-clip-text text-transparent"
              : "mr-[0.24em] inline-block"
          }
        >
          {word}
        </motion.span>
      ))}
    </motion.h2>
  );
}

export default function CategoryGroupSection({ groups }: Props) {
  return (
    <MotionConfig reducedMotion="user">
      <Accordion type="multiple" className="space-y-5">
        {groups.map((group) => {
          const categoryCount = group.categories.length;

          const highestScore =
            categoryCount > 0
              ? Math.min(
                  100,
                  Math.max(
                    0,
                    ...group.categories.map((category) => category.latestScore),
                  ),
                )
              : 0;

          const totalInterviews = group.categories.reduce(
            (total, category) => total + category.interviews,
            0,
          );

          return (
            <AccordionItem
              key={group.id}
              value={group.id}
              className="group overflow-hidden rounded-3xl border border-black/5 bg-white/80 shadow-[0_12px_40px_rgba(15,23,42,0.06)] backdrop-blur-xl transition-[transform,border-color,box-shadow,background-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-sky-300/60 hover:bg-white hover:shadow-[0_20px_55px_rgba(15,23,42,0.10)] data-[state=open]:border-sky-200/80 data-[state=open]:shadow-[0_20px_60px_rgba(15,23,42,0.10)] dark:border-white/10 dark:bg-zinc-900/75 dark:hover:border-sky-500/30 dark:hover:bg-zinc-900 dark:data-[state=open]:border-sky-500/30"
            >
              <AccordionTrigger className="px-4 py-5 text-left hover:no-underline sm:px-6 sm:py-6 [&>svg]:h-5 [&>svg]:w-5 [&>svg]:shrink-0 [&>svg]:text-zinc-400 [&>svg]:transition-transform [&>svg]:duration-300">
                <div className="flex w-full min-w-0 flex-col gap-5 pr-3 lg:flex-row lg:items-center lg:justify-between">
                  {/* Group information */}
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-sky-200/70 bg-linear-to-br from-sky-100 to-yellow-100 text-sky-600 shadow-sm transition-transform duration-300 ease-out group-hover:scale-[1.02] dark:border-white/10 dark:from-sky-950 dark:to-yellow-950 dark:text-sky-400">
                      <FolderOpen className="h-6 w-6" aria-hidden="true" />
                    </div>

                    <div className="min-w-0">
                      <AnimatedGroupTitle title={group.name} />

                      <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                        {categoryCount}{" "}
                        {categoryCount === 1 ? "category" : "categories"}
                        <span
                          aria-hidden="true"
                          className="mx-2 text-zinc-300 dark:text-zinc-700"
                        >
                          •
                        </span>
                        {totalInterviews}{" "}
                        {totalInterviews === 1 ? "interview" : "interviews"}
                      </p>
                    </div>
                  </div>

                  {/* Summary badges */}
                  <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-end">
                    <Badge
                      variant="outline"
                      className="justify-center rounded-full border-sky-200/80 bg-sky-50 px-3 py-1.5 font-medium text-sky-700 dark:border-sky-900/60 dark:bg-sky-950/40 dark:text-sky-400"
                    >
                      <Layers3
                        className="mr-1.5 h-3.5 w-3.5"
                        aria-hidden="true"
                      />
                      {categoryCount}
                    </Badge>

                    <Badge
                      variant="outline"
                      className="justify-center rounded-full border-yellow-200/80 bg-yellow-50 px-3 py-1.5 font-medium text-yellow-700 dark:border-yellow-900/60 dark:bg-yellow-950/40 dark:text-yellow-400"
                    >
                      <Trophy
                        className="mr-1.5 h-3.5 w-3.5"
                        aria-hidden="true"
                      />
                      {highestScore}%
                    </Badge>
                  </div>
                </div>
              </AccordionTrigger>

              <AccordionContent className="border-t border-black/5 bg-zinc-50/50 dark:border-white/10 dark:bg-zinc-950/30">
                <div className="space-y-6 px-4 py-5 sm:px-6 sm:py-6">
                  {/* Performance summary */}
                  <div className="rounded-2xl border border-black/5 bg-white/75 p-4 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
                    <div className="mb-3 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600 dark:bg-yellow-950 dark:text-yellow-400">
                          <BarChart3 className="h-4 w-4" aria-hidden="true" />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                            Highest score
                          </p>

                          <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            Best result across this group
                          </p>
                        </div>
                      </div>

                      <span className="text-lg font-bold tracking-tight text-zinc-950 dark:text-white">
                        {highestScore}%
                      </span>
                    </div>

                    <Progress
                      value={highestScore}
                      aria-label={`${group.name} highest score ${highestScore}%`}
                      className="h-2.5 bg-zinc-200/80 dark:bg-zinc-800 [&>div]:bg-linear-to-r [&>div]:from-sky-500 [&>div]:to-yellow-400"
                    />
                  </div>

                  {categoryCount > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                      {group.categories.map((category) => (
                        <CategoryCard key={category.id} {...category} />
                      ))}
                    </div>
                  ) : (
                    <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-black/10 bg-white/60 px-6 py-12 text-center dark:border-white/10 dark:bg-white/[0.02]">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-sky-100 to-yellow-100 text-sky-600 dark:from-sky-950 dark:to-yellow-950 dark:text-sky-400">
                        <FolderOpen className="h-6 w-6" aria-hidden="true" />
                      </div>

                      <h3 className="mt-5 font-semibold text-zinc-950 dark:text-white">
                        No categories yet
                      </h3>

                      <p className="mt-2 max-w-md text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                        There are currently no interview categories available in
                        this group.
                      </p>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </MotionConfig>
  );
}
