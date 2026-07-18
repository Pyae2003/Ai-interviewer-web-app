"use client";

import {
  motion,
  MotionConfig,
  type Variants,
} from "framer-motion";
import {
  Calendar,
  CheckCircle2,
  FileQuestion,
  Trophy,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import HistoryQuestionList from "./history-questions-list";

export type QuestionResult = {
  id: string;
  orderIndex: number;
  questionText: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  answer: string;
  score: number;
  isCorrect: boolean;
  feedback: string | null;
  idealAnswer: string | null;
  strengths: string;
  weaknesses: string;
};

type Props = {
  categoryName: string;
  score: number;
  totalQuestions: number;
  completedAt: Date;
  questions: QuestionResult[];
};

const titleContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.065,
    },
  },
};

const titleWordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 6,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.46,
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
      <motion.h1
        initial="hidden"
        animate="visible"
        variants={titleContainerVariants}
        aria-label={title}
        className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl dark:text-white"
      >
        {words.map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
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
      </motion.h1>
    </MotionConfig>
  );
}

export default function InterviewHistoryDetail({
  categoryName,
  score,
  totalQuestions,
  completedAt,
  questions,
}: Props) {
  const maximumScore = totalQuestions * 10;

  const percentage =
    maximumScore > 0
      ? Math.min(
          100,
          Math.max(0, Math.round((score / maximumScore) * 100)),
        )
      : 0;

  const completedDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(new Date(completedAt));

  const correctAnswers = questions.filter(
    (question) => question.isCorrect,
  ).length;

  return (
    <main className="relative min-h-screen overflow-hidden bg-transparent">
      {/* Soft static background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-sky-200/25 blur-3xl dark:bg-sky-800/10"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-24 h-96 w-96 rounded-full bg-yellow-200/25 blur-3xl dark:bg-yellow-700/10"
      />

      <div className="relative mx-auto max-w-5xl space-y-8 px-4 py-10 sm:px-6 sm:py-14">
        {/* Summary card */}
        <Card className="overflow-hidden rounded-3xl border border-black/5 bg-white/80 shadow-[0_24px_80px_rgba(15,23,42,0.10)] backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/80">
          <CardContent className="relative p-0">
            <div className="absolute inset-0 bg-linear-to-br from-sky-50/80 via-white/40 to-yellow-50/80 dark:from-sky-950/50 dark:via-transparent dark:to-yellow-950/40" />

            <div className="relative p-6 sm:p-8">
              <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
                {/* Title and date */}
                <div className="min-w-0">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-zinc-400">
                    <FileQuestion
                      className="h-3.5 w-3.5 text-sky-500"
                      aria-hidden="true"
                    />
                    Interview result
                  </div>

                  <AnimatedCategoryTitle title={categoryName} />

                  <div className="mt-4 flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-sky-600 shadow-sm dark:bg-zinc-800 dark:text-sky-400">
                      <Calendar
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
                    </span>

                    <span>Completed on {completedDate}</span>
                  </div>
                </div>

                {/* Overall score */}
                <div className="flex shrink-0 items-center gap-4 rounded-2xl border border-yellow-200/70 bg-white/75 px-5 py-4 shadow-sm backdrop-blur dark:border-yellow-900/50 dark:bg-zinc-900/75">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-100 text-yellow-600 dark:bg-yellow-950 dark:text-yellow-400">
                    <Trophy
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  </div>

                  <div>
                    <div className="flex items-end gap-1">
                      <span className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
                        {score}
                      </span>

                      <span className="mb-1 text-sm text-zinc-400">
                        / {maximumScore}
                      </span>
                    </div>

                    <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      Overall score
                    </p>
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="mt-8 rounded-2xl border border-black/5 bg-white/60 p-4 dark:border-white/10 dark:bg-white/3">
                <div className="mb-3 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                      Interview performance
                    </p>

                    <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                      Based on your total interview score
                    </p>
                  </div>

                  <span className="text-lg font-bold text-zinc-950 dark:text-white">
                    {percentage}%
                  </span>
                </div>

                <div
                  role="progressbar"
                  aria-label="Interview performance"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={percentage}
                  className="h-2.5 overflow-hidden rounded-full bg-zinc-200/80 dark:bg-zinc-800"
                >
                  <div
                    className="h-full rounded-full bg-linear-to-r from-sky-500 to-yellow-400 transition-[width] duration-700 ease-out"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                </div>
              </div>

              {/* Statistics */}
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-2xl border border-sky-100 bg-sky-50/70 p-4 dark:border-sky-900/50 dark:bg-sky-950/30">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-sky-600 shadow-sm dark:bg-zinc-900 dark:text-sky-400">
                    <FileQuestion
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </div>

                  <div>
                    <p className="text-xl font-bold text-zinc-950 dark:text-white">
                      {totalQuestions}
                    </p>

                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Total questions
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm dark:bg-zinc-900 dark:text-emerald-400">
                    <CheckCircle2
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </div>

                  <div>
                    <p className="text-xl font-bold text-zinc-950 dark:text-white">
                      {correctAnswers}
                    </p>

                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Correct answers
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Question results */}
        <section aria-labelledby="question-results-heading">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <h2
                id="question-results-heading"
                className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white"
              >
                Question breakdown
              </h2>

              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                Review your answers, feedback, strengths, and areas
                for improvement.
              </p>
            </div>

            <span className="hidden rounded-full border border-black/5 bg-white/70 px-3 py-1.5 text-xs font-medium text-zinc-500 shadow-sm sm:block dark:border-white/10 dark:bg-white/5 dark:text-zinc-400">
              {questions.length}{" "}
              {questions.length === 1 ? "question" : "questions"}
            </span>
          </div>

          <div className="space-y-5">
            {questions.map((item, index) => (
              <HistoryQuestionList
                key={item.id}
                item={item}
                index={index}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
