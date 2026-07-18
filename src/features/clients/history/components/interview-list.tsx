"use client";

import Link from "next/link";
import {
  motion,
  MotionConfig,
  type Variants,
} from "framer-motion";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  FileQuestion,
  Trophy,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { histroyDetailPath } from "@/constants/route";

type InterViewListProp = {
  result: {
    categoryId: string;
    categoryName: string;
    interviews: {
      id: string;
      score: number | null;
      status: string;
      createdAt: Date;
      totalQuestions: number;
      answeredQuestions: number;
    }[];
  };
};

const titleContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.05,
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

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 8,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function AnimatedCategoryTitle({
  title,
}: {
  title: string;
}) {
  const words = title.trim().split(/\s+/);

  return (
    <MotionConfig reducedMotion="user">
      <motion.h2
        initial="hidden"
        animate="visible"
        variants={titleContainerVariants}
        aria-label={title}
        className="text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl dark:text-white"
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
      </motion.h2>
    </MotionConfig>
  );
}

export default function InterViewList({
  result,
}: InterViewListProp) {
  const interviewCount = result.interviews.length;

  const dateFormatter = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <MotionConfig reducedMotion="user">
      <section className="space-y-7">
        {/* Category heading */}
        <div className="flex items-start gap-4">
          <div
            aria-hidden="true"
            className="mt-1 h-12 w-1.5 shrink-0 rounded-full bg-linear-to-b from-sky-500 to-yellow-400"
          />

          <div>
            <AnimatedCategoryTitle
              title={result.categoryName}
            />

            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {interviewCount}{" "}
              {interviewCount === 1
                ? "interview result"
                : "interview results"}
            </p>
          </div>
        </div>

        {/* Interview cards */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {result.interviews.map((interview, index) => {
            const score = Math.min(
              100,
              Math.max(0, interview.score ?? 0),
            );

            const isCompleted =
              interview.status === "COMPLETED";

            return (
              <motion.div
                key={interview.id}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                variants={cardVariants}
                transition={{
                  delay: Math.min(index * 0.05, 0.25),
                }}
                className="h-full"
              >
                <Card className="group relative h-full overflow-hidden rounded-3xl border border-black/5 bg-white/85 shadow-[0_10px_35px_rgba(15,23,42,0.06)] backdrop-blur-md transition-[transform,border-color,box-shadow,background-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-sky-300/70 hover:bg-white hover:shadow-[0_20px_55px_rgba(15,23,42,0.11)] dark:border-white/10 dark:bg-zinc-900/80 dark:hover:border-sky-500/40 dark:hover:bg-zinc-900">
                  {/* Top accent */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-sky-500 via-cyan-400 to-yellow-400"
                  />

                  {/* Subtle static glow */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-sky-100/60 blur-3xl dark:bg-sky-900/15"
                  />

                  <CardContent className="relative flex h-full flex-col p-5 pt-6 sm:p-6 sm:pt-7">
                    {/* Status and date */}
                    <div className="flex items-start justify-between gap-3">
                      <Badge
                        variant="outline"
                        className={
                          isCompleted
                            ? "shrink-0 rounded-full border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/60 dark:text-emerald-400"
                            : "shrink-0 rounded-full border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/60 dark:text-amber-400"
                        }
                      >
                        <span
                          aria-hidden="true"
                          className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current"
                        />

                        {isCompleted
                          ? "Completed"
                          : interview.status}
                      </Badge>

                      <div className="flex items-center gap-1.5 text-right text-xs text-zinc-500 dark:text-zinc-400">
                        <Calendar
                          className="h-3.5 w-3.5 shrink-0"
                          aria-hidden="true"
                        />

                        <time
                          dateTime={new Date(
                            interview.createdAt,
                          ).toISOString()}
                        >
                          {dateFormatter.format(
                            new Date(interview.createdAt),
                          )}
                        </time>
                      </div>
                    </div>

                    {/* Score */}
                    <div className="mt-7 flex items-center gap-4">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-yellow-200/70 bg-linear-to-br from-yellow-50 to-sky-50 text-yellow-600 shadow-sm dark:border-yellow-900/50 dark:from-yellow-950/60 dark:to-sky-950/50 dark:text-yellow-400">
                        <Trophy
                          className="h-7 w-7"
                          aria-hidden="true"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                          Overall score
                        </p>

                        <div className="mt-1 flex items-end gap-1">
                          <span className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
                            {score}
                          </span>

                          <span className="mb-1 text-sm font-medium text-zinc-400">
                            %
                          </span>
                        </div>

                        <div
                          role="progressbar"
                          aria-label={`Interview score ${score}%`}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-valuenow={score}
                          className="mt-3 h-2 overflow-hidden rounded-full bg-zinc-200/80 dark:bg-zinc-800"
                        >
                          <div
                            className="h-full rounded-full bg-linear-to-r from-sky-500 to-yellow-400 transition-[width] duration-700 ease-out"
                            style={{
                              width: `${score}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Statistics */}
                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <div className="rounded-2xl border border-sky-100/80 bg-sky-50/70 p-3.5 dark:border-sky-900/50 dark:bg-sky-950/30">
                        <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white text-sky-600 shadow-sm dark:bg-zinc-900 dark:text-sky-400">
                          <FileQuestion
                            className="h-4 w-4"
                            aria-hidden="true"
                          />
                        </div>

                        <p className="text-lg font-bold text-zinc-950 dark:text-white">
                          {interview.totalQuestions}
                        </p>

                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          Questions
                        </p>
                      </div>

                      <div className="rounded-2xl border border-emerald-100/80 bg-emerald-50/70 p-3.5 dark:border-emerald-900/50 dark:bg-emerald-950/30">
                        <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white text-emerald-600 shadow-sm dark:bg-zinc-900 dark:text-emerald-400">
                          <CheckCircle2
                            className="h-4 w-4"
                            aria-hidden="true"
                          />
                        </div>

                        <p className="text-lg font-bold text-zinc-950 dark:text-white">
                          {interview.answeredQuestions}
                        </p>

                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          Answered
                        </p>
                      </div>
                    </div>

                    {/* Action */}
                    <Button
                      asChild
                      className="group/button mt-6 h-11 w-full rounded-xl bg-linear-to-r from-sky-500 to-yellow-400 font-semibold text-zinc-950 shadow-sm transition-opacity hover:opacity-90"
                    >
                      <Link
                        href={histroyDetailPath(
                          interview.id,
                        )}
                        aria-label={`View ${result.categoryName} interview details`}
                      >
                        View Interview

                        <ArrowRight
                          className="ml-2 h-4 w-4 transition-transform duration-200 group-hover/button:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>
    </MotionConfig>
  );
}

