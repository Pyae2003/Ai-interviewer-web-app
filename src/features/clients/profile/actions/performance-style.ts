import { ProfilePerformance } from "../types/profile-header-types";

type PerformanceStyle = {
  badge: string;
  card: string;
  icon: string;
};

export const performanceStyles = {
  Excellent: {
    badge:
      "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/50 dark:text-emerald-400",
    card:
      "border-emerald-100 bg-emerald-50/70 dark:border-emerald-900/50 dark:bg-emerald-950/30",
    icon:
      "bg-white text-emerald-600 dark:bg-zinc-900 dark:text-emerald-400",
  },

  "Very Good": {
    badge:
      "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-900/60 dark:bg-sky-950/50 dark:text-sky-400",
    card:
      "border-sky-100 bg-sky-50/70 dark:border-sky-900/50 dark:bg-sky-950/30",
    icon:
      "bg-white text-sky-600 dark:bg-zinc-900 dark:text-sky-400",
  },

  Good: {
    badge:
      "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/50 dark:text-blue-400",
    card:
      "border-blue-100 bg-blue-50/70 dark:border-blue-900/50 dark:bg-blue-950/30",
    icon:
      "bg-white text-blue-600 dark:bg-zinc-900 dark:text-blue-400",
  },

  Average: {
    badge:
      "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/60 dark:bg-amber-950/50 dark:text-amber-400",
    card:
      "border-amber-100 bg-amber-50/70 dark:border-amber-900/50 dark:bg-amber-950/30",
    icon:
      "bg-white text-amber-600 dark:bg-zinc-900 dark:text-amber-400",
  },

  "Needs Improvement": {
    badge:
      "border-red-200 bg-red-50 text-red-700 dark:border-red-900/60 dark:bg-red-950/50 dark:text-red-400",
    card:
      "border-red-100 bg-red-50/70 dark:border-red-900/50 dark:bg-red-950/30",
    icon:
      "bg-white text-red-600 dark:bg-zinc-900 dark:text-red-400",
  },
} satisfies Record<ProfilePerformance, PerformanceStyle>;