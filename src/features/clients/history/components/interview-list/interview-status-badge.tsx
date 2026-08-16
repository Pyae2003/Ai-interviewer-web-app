"use client";

import { motion, MotionConfig } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatInterviewStatus, isCompletedStatus } from "../../query/ interview-list.utils";



type InterviewStatusBadgeProps = Readonly<{
  status: string;
}>;

export function InterviewStatusBadge({
  status,
}: InterviewStatusBadgeProps) {
  const isCompleted = isCompletedStatus(status);

  return (
    <MotionConfig reducedMotion="user">
      <Badge
        variant="outline"
        className={cn(
          "shrink-0 rounded-full px-2.5 py-1 font-semibold",
          isCompleted
            ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-400"
            : "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-400",
        )}
      >
        <motion.span
          aria-hidden="true"
          animate={isCompleted ? { opacity: [0.55, 1, 0.55] } : undefined}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="mr-1.5 size-1.5 rounded-full bg-current"
        />

        {formatInterviewStatus(status)}
      </Badge>
    </MotionConfig>
  );
}