"use client";

import { motion, MotionConfig, type Variants } from "framer-motion";
import { ArrowUpRight, Award, Briefcase, TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type Props = {
  name: string;
  latestScore: number;
  interviews: number;
};

type Performance = {
  label: string;
  badgeClass: string;
  progressClass: string;
  iconClass: string;
};

const titleContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.04,
      staggerChildren: 0.055,
    },
  },
};

const titleWordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 5,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.42,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function AnimatedCategoryTitle({ name }: { name: string }) {
  const words = name.trim().split(/\s+/);

  return (
    <motion.h3
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.8,
      }}
      variants={titleContainerVariants}
      aria-label={name}
      className="line-clamp-2 text-lg font-bold tracking-tight text-zinc-950 sm:text-xl dark:text-white"
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          aria-hidden="true"
          variants={titleWordVariants}
          className={
            index === words.length - 1
              ? "inline-block bg-linear-to-r from-sky-500 to-yellow-500 bg-clip-text text-transparent"
              : "mr-[0.24em] inline-block"
          }
        >
          {word}
        </motion.span>
      ))}
    </motion.h3>
  );
}

function getPerformance(score: number): Performance {
  if (score >= 90) {
    return {
      label: "Excellent",
      badgeClass:
        "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/50 dark:text-emerald-400",
      progressClass: "[&>div]:bg-emerald-500",
      iconClass:
        "border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-900/60 dark:bg-emerald-950/50 dark:text-emerald-400",
    };
  }

  if (score >= 75) {
    return {
      label: "Very Good",
      badgeClass:
        "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-900/60 dark:bg-sky-950/50 dark:text-sky-400",
      progressClass: "[&>div]:bg-sky-500",
      iconClass:
        "border-sky-200 bg-sky-50 text-sky-600 dark:border-sky-900/60 dark:bg-sky-950/50 dark:text-sky-400",
    };
  }

  if (score >= 60) {
    return {
      label: "Good",
      badgeClass:
        "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/60 dark:bg-amber-950/50 dark:text-amber-400",
      progressClass: "[&>div]:bg-amber-500",
      iconClass:
        "border-amber-200 bg-amber-50 text-amber-600 dark:border-amber-900/60 dark:bg-amber-950/50 dark:text-amber-400",
    };
  }

  return {
    label: "Needs Practice",
    badgeClass:
      "border-red-200 bg-red-50 text-red-700 dark:border-red-900/60 dark:bg-red-950/50 dark:text-red-400",
    progressClass: "[&>div]:bg-red-500",
    iconClass:
      "border-red-200 bg-red-50 text-red-600 dark:border-red-900/60 dark:bg-red-950/50 dark:text-red-400",
  };
}

export default function CategoryCard({ name, latestScore, interviews }: Props) {
  const safeScore = Math.min(100, Math.max(0, latestScore));

  const performance = getPerformance(safeScore);

  return (
    <MotionConfig reducedMotion="user">
      <Card className="group relative overflow-hidden rounded-3xl border border-black/5 bg-white/85 p-5 shadow-[0_12px_40px_rgba(15,23,42,0.06)] backdrop-blur-xl transition-[transform,border-color,box-shadow,background-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-sky-300/60 hover:bg-white hover:shadow-[0_20px_55px_rgba(15,23,42,0.10)] dark:border-white/10 dark:bg-zinc-900/80 dark:hover:border-sky-500/30 dark:hover:bg-zinc-900 sm:p-6">
        {/* Top accent */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-sky-500 via-cyan-400 to-yellow-400"
        />

        {/* Static background decoration */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-sky-100/60 blur-3xl dark:bg-sky-900/10"
        />

        <div className="relative">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <AnimatedCategoryTitle name={name} />

              <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                Latest interview performance
              </p>
            </div>

            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border shadow-sm transition-transform duration-300 ease-out group-hover:scale-[1.03] ${performance.iconClass}`}
            >
              <TrendingUp className="h-5 w-5" aria-hidden="true" />
            </div>
          </div>

          {/* Score */}
          <div className="mt-7 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                Latest score
              </p>

              <div className="mt-1 flex items-end">
                <span className="text-4xl font-bold tracking-tight text-zinc-950 dark:text-white">
                  {safeScore}
                </span>

                <span className="mb-1 ml-0.5 text-xl font-semibold text-zinc-400">
                  %
                </span>
              </div>
            </div>

            <Badge
              variant="outline"
              className={`shrink-0 rounded-full px-3 py-1 font-medium ${performance.badgeClass}`}
            >
              {performance.label}
            </Badge>
          </div>

          {/* Progress */}
          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
              <span>Performance</span>
              <span>{safeScore}/100</span>
            </div>

            <Progress
              value={safeScore}
              aria-label={`${name} latest score ${safeScore}%`}
              className={`h-2.5 rounded-full bg-zinc-200/80 dark:bg-zinc-800 ${performance.progressClass}`}
            />
          </div>

          {/* Footer */}
          <div className="mt-6 flex flex-col gap-4 border-t border-black/5 pt-5 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-50 text-sky-600 dark:bg-sky-950/50 dark:text-sky-400">
                <Briefcase className="h-4 w-4" aria-hidden="true" />
              </span>

              <span>
                {interviews} {interviews === 1 ? "interview" : "interviews"}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm font-semibold text-sky-600 dark:text-sky-400">
              <Award className="h-4 w-4" aria-hidden="true" />

              <span>View performance</span>

              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </Card>
    </MotionConfig>
  );
}
