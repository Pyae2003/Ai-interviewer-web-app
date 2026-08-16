"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

import { AnimatedResultTitle } from "./animated-result-title";
import { InterviewResultSummary } from "../../type/interview-result.types";

type ResultHeroProps = {
  categoryName: string;
  summary: InterviewResultSummary;
};

export function ResultHero({
  categoryName,
  summary,
}: ResultHeroProps) {
  const safeCategoryName = categoryName.trim() || "Interview Category";
  const { score, grade, passed } = summary;

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      aria-labelledby="result-title"
    >
      <Card
        className={cn(
          "relative overflow-hidden rounded-3xl border bg-card shadow-[0_22px_65px_rgba(15,23,42,0.10)]",
          passed
            ? "border-emerald-200/80 dark:border-emerald-900/60"
            : "border-amber-200/80 dark:border-amber-900/60",
        )}
      >
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-x-0 top-0 h-1",
            passed ? "bg-emerald-500" : "bg-amber-500",
          )}
        />

        <CardContent className="px-6 py-10 sm:px-10 sm:py-12">
          <div className="flex flex-col items-center text-center">
            <motion.div
              whileHover={{ scale: 1.06, rotate: -3 }}
              whileTap={{ scale: 0.96 }}
              transition={{
                type: "spring",
                stiffness: 350,
                damping: 20,
              }}
              className={cn(
                "mb-6 flex size-24 items-center justify-center rounded-3xl border shadow-sm sm:size-28",
                passed
                  ? "border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-900/70 dark:bg-emerald-950/50 dark:text-emerald-400"
                  : "border-amber-200 bg-amber-50 text-amber-600 dark:border-amber-900/70 dark:bg-amber-950/50 dark:text-amber-400",
              )}
            >
              <Trophy className="size-11 sm:size-14" aria-hidden="true" />
            </motion.div>

            <div id="result-title">
              <AnimatedResultTitle />
            </div>

            <p
              title={safeCategoryName}
              className="mt-3 max-w-xl truncate text-sm font-medium text-muted-foreground sm:text-base"
            >
              {safeCategoryName}
            </p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.25,
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-8"
            >
              <p
                className={cn(
                  "text-6xl font-black tracking-tight sm:text-7xl md:text-8xl",
                  passed
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-amber-600 dark:text-amber-400",
                )}
              >
                {score}%
              </p>

              <p className="mt-2 text-xl font-bold text-foreground sm:text-2xl">
                Grade {grade}
              </p>

              <span
                className={cn(
                  "mt-4 inline-flex rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider",
                  passed
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/50 dark:text-emerald-400"
                    : "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/50 dark:text-amber-400",
                )}
              >
                {passed ? "Passed" : "Needs Improvement"}
              </span>
            </motion.div>

            <div className="mt-8 w-full max-w-xl rounded-2xl border border-border/70 bg-background/80 p-4">
              <div className="mb-3 flex items-center justify-between gap-4 text-sm">
                <span className="font-medium text-muted-foreground">
                  Overall performance
                </span>

                <span className="font-bold text-foreground">
                  {score}/100
                </span>
              </div>

              <Progress
                value={score}
                aria-label={`Overall interview score ${score}%`}
                className={cn(
                  "h-2.5 bg-muted [&>div]:transition-transform [&>div]:duration-700 [&>div]:ease-out",
                  passed
                    ? "[&>div]:bg-emerald-500"
                    : "[&>div]:bg-amber-500",
                )}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  );
}
