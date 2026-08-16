import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  FolderOpen,
  Sparkles,
  Trophy,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { ProfileHeaderProps } from "../types/profile-header-types";
import { performanceStyles } from "../actions/performance-style";

type ProfileStatsProps = Pick<
  ProfileHeaderProps,
  | "totalInterviews"
  | "totalCategories"
  | "averageScore"
  | "bestScore"
  | "performance"
>;

type StatItem = {
  label: string;
  value: string | number;
  detail: string;
  icon: LucideIcon;
  containerClassName: string;
  iconClassName: string;
  compactValue?: boolean;
};

function normalizeScore(score: number) {
  if (!Number.isFinite(score)) {
    return 0;
  }

  return Math.round(Math.min(100, Math.max(0, score)));
}

function normalizeCount(count: number) {
  if (!Number.isFinite(count)) {
    return 0;
  }

  return Math.max(0, Math.floor(count));
}

function ProfileStatCard({
  label,
  value,
  detail,
  icon: Icon,
  containerClassName,
  iconClassName,
  compactValue,
}: StatItem) {
  return (
    <article
      className={cn(
        "group rounded-2xl border p-4 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md sm:p-5",
        containerClassName,
      )}
    >
      <div
        className={cn(
          "mb-4 flex size-10 items-center justify-center rounded-xl shadow-sm transition-transform duration-300 group-hover:scale-105",
          iconClassName,
        )}
      >
        <Icon className="size-5" aria-hidden="true" />
      </div>

      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        {label}
      </p>

      <p
        className={cn(
          "mt-2 font-bold tracking-tight text-zinc-950 dark:text-white",
          compactValue
            ? "line-clamp-2 text-xl sm:text-2xl"
            : "text-2xl sm:text-3xl",
        )}
      >
        {value}
      </p>

      <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
        {detail}
      </p>
    </article>
  );
}

export function ProfileStats({
  totalInterviews,
  totalCategories,
  averageScore,
  bestScore,
  performance,
}: ProfileStatsProps) {
  const safeAverageScore = normalizeScore(averageScore);
  const safeBestScore = normalizeScore(bestScore);
  const performanceStyle = performanceStyles[performance];

  const stats: StatItem[] = [
    {
      label: "Interviews",
      value: normalizeCount(totalInterviews),
      detail: "Completed sessions",
      icon: Trophy,
      containerClassName:
        "border-sky-100 bg-sky-50/70 dark:border-sky-900/50 dark:bg-sky-950/30",
      iconClassName:
        "bg-white text-sky-600 dark:bg-zinc-900 dark:text-sky-400",
    },
    {
      label: "Average Score",
      value: `${safeAverageScore}%`,
      detail: `Best score ${safeBestScore}%`,
      icon: BarChart3,
      containerClassName:
        "border-amber-100 bg-amber-50/70 dark:border-amber-900/50 dark:bg-amber-950/30",
      iconClassName:
        "bg-white text-amber-600 dark:bg-zinc-900 dark:text-amber-400",
    },
    {
      label: "Performance",
      value: performance,
      detail: "Current performance level",
      icon: Sparkles,
      containerClassName: performanceStyle.card,
      iconClassName: performanceStyle.icon,
      compactValue: true,
    },
    {
      label: "Categories",
      value: normalizeCount(totalCategories),
      detail: "Categories practiced",
      icon: FolderOpen,
      containerClassName:
        "border-violet-100 bg-violet-50/70 dark:border-violet-900/50 dark:bg-violet-950/30",
      iconClassName:
        "bg-white text-violet-600 dark:bg-zinc-900 dark:text-violet-400",
    },
  ];

  return (
    <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <ProfileStatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}