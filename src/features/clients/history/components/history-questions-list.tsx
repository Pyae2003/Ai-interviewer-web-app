"use client";

import {
  motion,
  MotionConfig,
  type Variants,
} from "framer-motion";
import {
  Brain,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  MessageSquare,
  Trophy,
  XCircle,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import type { QuestionResult } from "./history-detail";

type Props = {
  index: number;
  item: QuestionResult;
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
      duration: 0.48,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function AnimatedQuestionTitle({
  index,
}: {
  index: number;
}) {
  const words = ["Question", String(index + 1)];

  return (
    <motion.h2
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.8,
      }}
      variants={titleContainerVariants}
      aria-label={`Question ${index + 1}`}
      className="text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl dark:text-white"
    >
      {words.map((word, wordIndex) => (
        <motion.span
          key={`${word}-${wordIndex}`}
          aria-hidden="true"
          variants={titleWordVariants}
          className={
            wordIndex === words.length - 1
              ? "inline-block bg-linear-to-r from-sky-500 to-yellow-500 bg-clip-text text-transparent"
              : "mr-[0.22em] inline-block"
          }
        >
          {word}
        </motion.span>
      ))}
    </motion.h2>
  );
}


export default function HistoryQuestionList({
  item,
  index,
}: Props) {
  const normalizedScore = Math.min(
    100,
    Math.max(0, item.score),
  );

  const difficultyClass =
    item.difficulty === "EASY"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/50 dark:text-emerald-400"
      : item.difficulty === "MEDIUM"
        ? "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/60 dark:bg-amber-950/50 dark:text-amber-400"
        : "border-red-200 bg-red-50 text-red-700 dark:border-red-900/60 dark:bg-red-950/50 dark:text-red-400";

  return (
    <MotionConfig reducedMotion="user">
      <motion.article
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.12,
        }}
        variants={cardVariants}
      >
        <Card className="relative overflow-hidden rounded-3xl border border-black/5 bg-white/85 shadow-[0_16px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:border-sky-300/60 hover:shadow-[0_22px_65px_rgba(15,23,42,0.11)] dark:border-white/10 dark:bg-zinc-900/80 dark:hover:border-sky-500/30">
          {/* Top accent */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-sky-500 via-cyan-400 to-yellow-400"
          />

          {/* Static background accent */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-sky-100/60 blur-3xl dark:bg-sky-900/10"
          />

          <CardHeader className="relative space-y-6 border-b border-black/5 px-5 pb-6 pt-7 dark:border-white/10 sm:px-7">
            {/* Heading and badges */}
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <AnimatedQuestionTitle index={index} />

                <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                  AI evaluation and performance breakdown
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="outline"
                  className={`rounded-full px-2.5 py-1 ${difficultyClass}`}
                >
                  {item.difficulty}
                </Badge>

                <Badge
                  variant="outline"
                  className={
                    item.isCorrect
                      ? "rounded-full border-emerald-200 bg-emerald-50 px-2.5 py-1 text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/50 dark:text-emerald-400"
                      : "rounded-full border-red-200 bg-red-50 px-2.5 py-1 text-red-700 dark:border-red-900/60 dark:bg-red-950/50 dark:text-red-400"
                  }
                >
                  {item.isCorrect ? (
                    <CheckCircle2
                      className="mr-1.5 h-3.5 w-3.5"
                      aria-hidden="true"
                    />
                  ) : (
                    <XCircle
                      className="mr-1.5 h-3.5 w-3.5"
                      aria-hidden="true"
                    />
                  )}

                  {item.isCorrect ? "Correct" : "Incorrect"}
                </Badge>

                <Badge
                  variant="outline"
                  className="rounded-full border-black/10 bg-white/70 px-2.5 py-1 text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300"
                >
                  {normalizedScore}/100
                </Badge>
              </div>
            </div>

            {/* Score */}
            <div className="rounded-2xl border border-black/5 bg-white/60 p-4 dark:border-white/10 dark:bg-white/[0.03]">
              <div className="mb-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600 dark:bg-yellow-950 dark:text-yellow-400">
                    <Trophy
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                  </span>

                  <div>
                    <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                      AI Score
                    </p>

                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Evaluation of your answer
                    </p>
                  </div>
                </div>

                <span className="text-lg font-bold text-zinc-950 dark:text-white">
                  {normalizedScore}/100
                </span>
              </div>

              <div
                role="progressbar"
                aria-label={`AI score ${normalizedScore} out of 100`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={normalizedScore}
                className="h-2.5 overflow-hidden rounded-full bg-zinc-200/80 dark:bg-zinc-800"
              >
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{
                    width: `${normalizedScore}%`,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.75,
                    delay: 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="h-full rounded-full bg-linear-to-r from-sky-500 to-emerald-500"
                />
              </div>
            </div>
          </CardHeader>

          <CardContent className="relative space-y-6 p-5 sm:p-7">
            {/* Question */}
            <section aria-labelledby={`question-${item.id}`}>
              <div
                id={`question-${item.id}`}
                className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-800 dark:text-zinc-200"
              >
                <HelpCircle
                  className="h-4 w-4 text-sky-500"
                  aria-hidden="true"
                />
                Question
              </div>

              <div className="rounded-2xl border border-sky-100/80 bg-sky-50/70 p-5 text-sm leading-7 text-zinc-700 dark:border-sky-900/40 dark:bg-sky-950/25 dark:text-zinc-300 sm:text-base">
                {item.questionText}
              </div>
            </section>

            {/* User answer */}
            <section aria-labelledby={`answer-${item.id}`}>
              <div
                id={`answer-${item.id}`}
                className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-800 dark:text-zinc-200"
              >
                <Brain
                  className="h-4 w-4 text-violet-500"
                  aria-hidden="true"
                />
                Your Answer
              </div>

              <div className="whitespace-pre-wrap rounded-2xl border border-black/5 bg-white/70 p-5 text-sm leading-7 text-zinc-700 shadow-sm dark:border-white/10 dark:bg-zinc-950/50 dark:text-zinc-300 sm:text-base">
                {item.answer || "No answer was submitted."}
              </div>
            </section>

            {/* AI feedback */}
            {item.feedback && (
              <section className="rounded-2xl border border-emerald-200/70 bg-emerald-50/60 p-5 dark:border-emerald-900/50 dark:bg-emerald-950/25">
                <div className="mb-3 flex items-center gap-2 font-semibold text-emerald-700 dark:text-emerald-400">
                  <MessageSquare
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                  AI Feedback
                </div>

                <p className="text-sm leading-7 text-zinc-700 dark:text-zinc-300 sm:text-base">
                  {item.feedback}
                </p>
              </section>
            )}

            {/* Strengths and weaknesses */}
            <div className="grid gap-5 lg:grid-cols-2">
              <section className="rounded-2xl border border-emerald-200/70 bg-emerald-50/50 p-5 dark:border-emerald-900/50 dark:bg-emerald-950/20">
                <div className="mb-3 flex items-center gap-2 font-semibold text-emerald-700 dark:text-emerald-400">
                  <CheckCircle2
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                  Strengths
                </div>

                <p className="text-sm leading-7 text-zinc-700 dark:text-zinc-300">
                  {item.strengths || "No strengths were identified."}
                </p>
              </section>

              <section className="rounded-2xl border border-red-200/70 bg-red-50/50 p-5 dark:border-red-900/50 dark:bg-red-950/20">
                <div className="mb-3 flex items-center gap-2 font-semibold text-red-700 dark:text-red-400">
                  <XCircle
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                  Areas to Improve
                </div>

                <p className="text-sm leading-7 text-zinc-700 dark:text-zinc-300">
                  {item.weaknesses ||
                    "No specific weaknesses were identified."}
                </p>
              </section>
            </div>

            {/* Ideal answer */}
            <section className="rounded-2xl border border-yellow-200/70 bg-linear-to-br from-yellow-50/70 to-sky-50/60 p-5 dark:border-yellow-900/50 dark:from-yellow-950/25 dark:to-sky-950/20">
              <div className="mb-4 flex items-center gap-2 font-semibold text-zinc-900 dark:text-white">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-yellow-500 shadow-sm dark:bg-zinc-900">
                  <Lightbulb
                    className="h-4 w-4"
                    aria-hidden="true"
                  />
                </span>

                Ideal Answer
              </div>

              <div className="whitespace-pre-wrap rounded-2xl border border-black/5 bg-white/75 p-5 text-sm leading-8 text-zinc-700 shadow-sm dark:border-white/10 dark:bg-zinc-950/50 dark:text-zinc-300 sm:text-base">
                {item.idealAnswer ||
                  "No ideal answer is available for this question."}
              </div>
            </section>
          </CardContent>
        </Card>
      </motion.article>
    </MotionConfig>
  );
}