"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

import { Progress } from "@/components/ui/progress";

type AiScoreProgressProps = {
  score: number;
};

export function AiScoreProgress({ score }: AiScoreProgressProps) {
  return (
    <div className="rounded-2xl border border-border/70 bg-background/80 p-4">
      <div className="mb-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <motion.span
            whileHover={{ scale: 1.06, rotate: -3 }}
            transition={{
              type: "spring",
              stiffness: 350,
              damping: 22,
            }}
            className="flex size-9 items-center justify-center rounded-xl border border-amber-200 bg-amber-50 text-amber-600 dark:border-amber-900/70 dark:bg-amber-950/50 dark:text-amber-400"
          >
            <Trophy className="size-4" aria-hidden="true" />
          </motion.span>

          <div>
            <p className="text-sm font-semibold text-foreground">
              AI Score
            </p>

            <p className="text-xs text-muted-foreground">
              Evaluation of your answer
            </p>
          </div>
        </div>

        <motion.span
          key={score}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-lg font-bold text-foreground"
        >
          {score}/100
        </motion.span>
      </div>

      <Progress
        value={score}
        aria-label={`AI score ${score} out of 100`}
        className="h-2.5 bg-muted [&>div]:bg-sky-500 [&>div]:transition-transform [&>div]:duration-700 [&>div]:ease-out"
      />
    </div>
  );
}
