"use client";

import { motion, MotionConfig } from "framer-motion";
import { Trophy } from "lucide-react";

import { Progress } from "@/components/ui/progress";

type InterviewScoreProps = Readonly<{
  score: number;
}>;

export function InterviewScore({ score }: InterviewScoreProps) {
  return (
    <div className="rounded-2xl border border-border/70 bg-muted/20 p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-amber-200 bg-amber-50 text-amber-600 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-400">
            <Trophy className="size-4.5" aria-hidden="true" />
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Interview score
            </p>

            <p className="mt-0.5 text-2xl font-bold tracking-tight text-foreground">
              {score}
              <span className="ml-0.5 text-sm font-semibold text-muted-foreground">
                /100
              </span>
            </p>
          </div>
        </div>

        <span className="text-xs font-semibold text-sky-600 dark:text-sky-400">
          {score}%
        </span>
      </div>

      <MotionConfig reducedMotion="user">
        <motion.div
          initial={{ opacity: 0, scaleX: 0.9 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 origin-left"
        >
          <Progress
            value={score}
            aria-label={`Interview score ${score} out of 100`}
            className="h-2 bg-sky-100 [&>div]:bg-sky-500 [&>div]:transition-[transform] [&>div]:duration-700 [&>div]:ease-out dark:bg-sky-950/70"
          />
        </motion.div>
      </MotionConfig>
    </div>
  );
}