"use client";

import { motion } from "framer-motion";

import { Progress } from "@/components/ui/progress";

type HistoryPerformanceProgressProps = {
  percentage: number;
};

export function HistoryPerformanceProgress({
  percentage,
}: HistoryPerformanceProgressProps) {
  return (
    <div className="rounded-2xl border border-border/70 bg-background/80 p-4">
      <div className="mb-3 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-foreground">
            Interview performance
          </p>

          <p className="mt-0.5 text-xs text-muted-foreground">
            Based on your total interview score
          </p>
        </div>

        <motion.span
          key={percentage}
          initial={{ opacity: 0, scale: 0.9, y: 2 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-sm font-bold text-sky-700 dark:border-sky-900/70 dark:bg-sky-950/50 dark:text-sky-400"
        >
          {percentage}%
        </motion.span>
      </div>

      <Progress
        value={percentage}
        aria-label={`Interview performance ${percentage}%`}
        className="h-2.5 bg-muted [&>div]:bg-sky-500 [&>div]:transition-transform [&>div]:duration-700 [&>div]:ease-out"
      />
    </div>
  );
}
