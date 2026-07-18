"use client";

import {
  motion,
  MotionConfig,
  type Variants,
} from "framer-motion";
import {
  Activity,
  CalendarDays,
  TrendingUp,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import type { ActivityItem } from "../query/get-recent-interviews";

type Props = {
  items: ActivityItem[];
};

const titleContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.05,
      staggerChildren: 0.07,
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
      duration: 0.44,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function AnimatedTitle() {
  const words = ["Recent", "Activity"];

  return (
    <MotionConfig reducedMotion="user">
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.8,
        }}
        variants={titleContainerVariants}
        aria-label="Recent Activity"
        className="text-xl font-bold tracking-tight text-zinc-950 sm:text-2xl dark:text-white"
      >
        {words.map((word, index) => (
          <motion.span
            key={word}
            aria-hidden="true"
            variants={titleWordVariants}
            className={
              index === words.length - 1
                ? "inline-block bg-linear-to-r from-sky-500 to-yellow-500 bg-clip-text text-transparent"
                : "mr-[0.22em] inline-block"
            }
          >
            {word}
          </motion.span>
        ))}
      </motion.h2>
    </MotionConfig>
  );
}

export default function RecentActivity({
  items,
}: Props) {
  const dateFormatter = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <Card className="relative overflow-hidden rounded-3xl border border-black/5 bg-white/85 p-5 shadow-[0_16px_50px_rgba(15,23,42,0.07)] backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/80 sm:p-6">
      {/* Static background accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-sky-100/60 blur-3xl dark:bg-sky-900/10"
      />

      <div className="relative">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-sky-200/70 bg-sky-50 text-sky-600 shadow-sm dark:border-sky-900/60 dark:bg-sky-950/50 dark:text-sky-400">
              <Activity
                className="h-5 w-5"
                aria-hidden="true"
              />
            </div>

            <div>
              <AnimatedTitle />

              <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
                Your latest interview results
              </p>
            </div>
          </div>

          {items.length > 0 && (
            <span className="hidden rounded-full border border-black/5 bg-white/70 px-3 py-1.5 text-xs font-medium text-zinc-500 shadow-sm sm:inline-flex dark:border-white/10 dark:bg-white/5 dark:text-zinc-400">
              {items.length}{" "}
              {items.length === 1 ? "result" : "results"}
            </span>
          )}
        </div>

        {items.length === 0 ? (
          /* Empty state */
          <div className="flex min-h-52 flex-col items-center justify-center rounded-2xl border border-dashed border-black/10 bg-zinc-50/60 px-5 py-10 text-center dark:border-white/10 dark:bg-zinc-950/40">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-sky-100 to-yellow-100 text-sky-600 dark:from-sky-950 dark:to-yellow-950 dark:text-sky-400">
              <TrendingUp
                className="h-5 w-5"
                aria-hidden="true"
              />
            </div>

            <h3 className="mt-4 font-semibold text-zinc-950 dark:text-white">
              No recent activity
            </h3>

            <p className="mt-1 max-w-xs text-sm leading-6 text-zinc-500 dark:text-zinc-400">
              Complete an interview and your latest results will appear here.
            </p>
          </div>
        ) : (
          /* Activity list */
          <div className="divide-y divide-black/5 dark:divide-white/10">
            {items.map((item) => {
              const score = Math.min(
                100,
                Math.max(0, item.score),
              );

              return (
                <div
                  key={item.id}
                  className="group flex items-center justify-between gap-4 rounded-2xl px-3 py-4 transition-colors duration-200 hover:bg-sky-50/70 dark:hover:bg-white/[0.03]"
                >
                  <div className="flex min-w-0 items-center gap-3.5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-black/5 bg-white text-sky-600 shadow-sm transition-colors duration-200 group-hover:border-sky-200 group-hover:bg-sky-50 dark:border-white/10 dark:bg-zinc-800 dark:text-sky-400 dark:group-hover:border-sky-900 dark:group-hover:bg-sky-950/50">
                      <CalendarDays
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold text-zinc-900 sm:text-base dark:text-zinc-100">
                        {item.category}
                      </h3>

                      <time
                        dateTime={new Date(
                          item.createdAt,
                        ).toISOString()}
                        className="mt-1 block text-xs text-zinc-500 dark:text-zinc-400"
                      >
                        {dateFormatter.format(
                          new Date(item.createdAt),
                        )}
                      </time>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <div className="inline-flex items-baseline rounded-xl border border-sky-100 bg-sky-50 px-3 py-2 dark:border-sky-900/60 dark:bg-sky-950/40">
                      <span className="text-lg font-bold tracking-tight text-zinc-950 dark:text-white">
                        {score}
                      </span>

                      <span className="ml-0.5 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                        %
                      </span>
                    </div>

                    <div className="mt-2 h-1.5 w-16 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                      <div
                        className="h-full rounded-full bg-linear-to-r from-sky-500 to-yellow-400"
                        style={{
                          width: `${score}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Card>
  );
}