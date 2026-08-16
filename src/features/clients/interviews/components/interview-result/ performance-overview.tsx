"use client";

import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  CheckCircle2,
  Gauge,
  Target,
} from "lucide-react";
import { motion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { InterviewResultData } from "../../type/type";
import { InterviewResultSummary } from "../../type/interview-result.types";
import { normalizeCount } from "../../query/ interview-result.utils";


const toneStyles = {
  sky: {
    card: "border-sky-200/80 bg-sky-50/70 dark:border-sky-900/60 dark:bg-sky-950/35",
    icon: "border-sky-200 bg-white text-sky-600 dark:border-sky-900 dark:bg-zinc-900 dark:text-sky-400",
  },
  violet: {
    card: "border-violet-200/80 bg-violet-50/70 dark:border-violet-900/60 dark:bg-violet-950/35",
    icon: "border-violet-200 bg-white text-violet-600 dark:border-violet-900 dark:bg-zinc-900 dark:text-violet-400",
  },
  emerald: {
    card: "border-emerald-200/80 bg-emerald-50/70 dark:border-emerald-900/60 dark:bg-emerald-950/35",
    icon: "border-emerald-200 bg-white text-emerald-600 dark:border-emerald-900 dark:bg-zinc-900 dark:text-emerald-400",
  },
  indigo: {
    card: "border-indigo-200/80 bg-indigo-50/70 dark:border-indigo-900/60 dark:bg-indigo-950/35",
    icon: "border-indigo-200 bg-white text-indigo-600 dark:border-indigo-900 dark:bg-zinc-900 dark:text-indigo-400",
  },
} as const;

type OverviewTone = keyof typeof toneStyles;

type OverviewItem = {
  label: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  tone: OverviewTone;
};

type OverviewStatCardProps = OverviewItem & {
  index: number;
};

function OverviewStatCard({
  label,
  value,
  description,
  icon: Icon,
  tone,
  index,
}: OverviewStatCardProps) {
  const styles = toneStyles[tone];

  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        duration: 0.35,
        delay: index * 0.04,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Card
        className={cn(
          "h-full rounded-2xl border shadow-sm transition-shadow duration-300 hover:shadow-md",
          styles.card,
        )}
      >
        <CardContent className="p-4 sm:p-5">
          <div
            className={cn(
              "mb-4 flex size-10 items-center justify-center rounded-xl border shadow-sm",
              styles.icon,
            )}
          >
            <Icon className="size-5" aria-hidden="true" />
          </div>

          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {label}
          </p>

          <p className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {value}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            {description}
          </p>
        </CardContent>
      </Card>
    </motion.article>
  );
}

type PerformanceOverviewProps = {
  result: InterviewResultData;
  summary: InterviewResultSummary;
};

export function PerformanceOverview({
  result,
  summary,
}: PerformanceOverviewProps) {
  const items: OverviewItem[] = [
    {
      label: "Score",
      value: `${summary.score}%`,
      description: "Overall performance",
      icon: Target,
      tone: "sky",
    },
    {
      label: "Questions",
      value: normalizeCount(result.totalQuestions),
      description: "Total questions",
      icon: BookOpen,
      tone: "violet",
    },
    {
      label: "Answered",
      value: normalizeCount(result.answeredQuestions),
      description: "Submitted answers",
      icon: CheckCircle2,
      tone: "emerald",
    },
    {
      label: "Completion",
      value: `${summary.completionRate}%`,
      description: "Interview completed",
      icon: Gauge,
      tone: "indigo",
    },
  ];

  return (
    <section aria-labelledby="overview-heading">
      <div className="mb-5">
        <h2
          id="overview-heading"
          className="text-2xl font-bold tracking-tight text-foreground"
        >
          Performance overview
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          A summary of your completed interview session.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((item, index) => (
          <OverviewStatCard
            key={item.label}
            {...item}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
