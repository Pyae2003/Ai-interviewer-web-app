"use client";

import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

const toneStyles = {
  sky: {
    container:
      "border-sky-200/80 bg-sky-50/70 dark:border-sky-900/60 dark:bg-sky-950/35",
    icon:
      "border-sky-200 bg-white text-sky-600 dark:border-sky-900 dark:bg-zinc-900 dark:text-sky-400",
  },
  emerald: {
    container:
      "border-emerald-200/80 bg-emerald-50/70 dark:border-emerald-900/60 dark:bg-emerald-950/35",
    icon:
      "border-emerald-200 bg-white text-emerald-600 dark:border-emerald-900 dark:bg-zinc-900 dark:text-emerald-400",
  },
} as const;

type HistoryStatTone = keyof typeof toneStyles;

type HistoryStatCardProps = {
  icon: LucideIcon;
  value: number;
  label: string;
  tone: HistoryStatTone;
};

export function HistoryStatCard({
  icon: Icon,
  value,
  label,
  tone,
}: HistoryStatCardProps) {
  const styles = toneStyles[tone];

  return (
    <motion.article
      whileHover={{ y: -2 }}
      transition={{
        type: "spring",
        stiffness: 350,
        damping: 24,
      }}
      className={cn(
        "flex items-center gap-3 rounded-2xl border p-4 shadow-sm",
        styles.container,
      )}
    >
      <div
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-xl border shadow-sm",
          styles.icon,
        )}
      >
        <Icon className="size-5" aria-hidden="true" />
      </div>

      <div>
        <p className="text-xl font-bold text-foreground">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </motion.article>
  );
}
