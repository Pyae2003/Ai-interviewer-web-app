import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const insightStyles = {
  indigo: {
    container:
      "border-indigo-200/80 bg-indigo-50/55 dark:border-indigo-900/60 dark:bg-indigo-950/25",
    heading: "text-indigo-700 dark:text-indigo-400",
  },
  emerald: {
    container:
      "border-emerald-200/80 bg-emerald-50/55 dark:border-emerald-900/60 dark:bg-emerald-950/25",
    heading: "text-emerald-700 dark:text-emerald-400",
  },
  rose: {
    container:
      "border-rose-200/80 bg-rose-50/55 dark:border-rose-900/60 dark:bg-rose-950/25",
    heading: "text-rose-700 dark:text-rose-400",
  },
} as const;

type InsightTone = keyof typeof insightStyles;

type InsightPanelProps = {
  icon: LucideIcon;
  title: string;
  content: string;
  fallback: string;
  tone: InsightTone;
};

export function InsightPanel({
  icon: Icon,
  title,
  content,
  fallback,
  tone,
}: InsightPanelProps) {
  const styles = insightStyles[tone];

  return (
    <section
      className={cn(
        "rounded-2xl border p-5 transition-transform duration-200 hover:-translate-y-0.5",
        styles.container,
      )}
    >
      <div
        className={cn(
          "mb-3 flex items-center gap-2 font-semibold",
          styles.heading,
        )}
      >
        <Icon className="size-5" aria-hidden="true" />
        {title}
      </div>

      <p className="whitespace-pre-wrap text-sm leading-7 text-foreground/85 sm:text-base">
        {content.trim() || fallback}
      </p>
    </section>
  );
}
