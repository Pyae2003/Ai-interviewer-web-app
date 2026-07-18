"use client";

import Link from "next/link";
import { motion, MotionConfig, type Variants } from "framer-motion";
import {
  BookOpen,
  CheckCircle2,
  LayoutDashboard,
  RotateCcw,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

import type { InterviewResultData } from "../type/type";
import HistoryQuestionList from "../../history/components/history-questions-list";

type Props = {
  result: InterviewResultData;
};

const headlineContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.075,
    },
  },
};

const headlineWordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 6,
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

const heroVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 8,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function AnimatedHeadline() {
  const words = [
    {
      text: "Interview",
      gradient: false,
    },
    {
      text: "Completed",
      gradient: true,
    },
  ];

  return (
    <motion.h1
      initial="hidden"
      animate="visible"
      variants={headlineContainerVariants}
      aria-label="Interview Completed"
      className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl md:text-5xl dark:text-white"
    >
      {words.map((word) => (
        <motion.span
          key={word.text}
          aria-hidden="true"
          variants={headlineWordVariants}
          className={
            word.gradient
              ? "inline-block bg-linear-to-r from-sky-500 to-yellow-500 bg-clip-text text-transparent"
              : "mr-[0.22em] inline-block"
          }
        >
          {word.text}
        </motion.span>
      ))}
    </motion.h1>
  );
}

function clampScore(score: number) {
  return Math.min(100, Math.max(0, Math.round(score)));
}

export default function InterviewResult({ result }: Props) {
  const score = clampScore(result.score);
  const completionRate = clampScore(result.completionRate);
  const easyScore = clampScore(result.easyScore);
  const mediumScore = clampScore(result.mediumScore);
  const hardScore = clampScore(result.hardScore);

  const grade =
    score >= 90
      ? "A+"
      : score >= 80
        ? "A"
        : score >= 70
          ? "B"
          : score >= 60
            ? "C"
            : "D";

  const passed = score >= 70;

  const overviewItems = [
    {
      label: "Score",
      value: `${score}%`,
      description: "Overall performance",
      icon: Target,
      containerClass:
        "border-sky-100 bg-sky-50/70 dark:border-sky-900/50 dark:bg-sky-950/30",
      iconClass: "bg-white text-sky-600 dark:bg-zinc-900 dark:text-sky-400",
    },
    {
      label: "Questions",
      value: result.totalQuestions,
      description: "Total questions",
      icon: BookOpen,
      containerClass:
        "border-yellow-100 bg-yellow-50/70 dark:border-yellow-900/50 dark:bg-yellow-950/30",
      iconClass:
        "bg-white text-yellow-600 dark:bg-zinc-900 dark:text-yellow-400",
    },
    {
      label: "Answered",
      value: result.answeredQuestions,
      description: "Submitted answers",
      icon: CheckCircle2,
      containerClass:
        "border-emerald-100 bg-emerald-50/70 dark:border-emerald-900/50 dark:bg-emerald-950/30",
      iconClass:
        "bg-white text-emerald-600 dark:bg-zinc-900 dark:text-emerald-400",
    },
    {
      label: "Completion",
      value: `${completionRate}%`,
      description: "Interview completed",
      icon: Sparkles,
      containerClass:
        "border-violet-100 bg-violet-50/70 dark:border-violet-900/50 dark:bg-violet-950/30",
      iconClass:
        "bg-white text-violet-600 dark:bg-zinc-900 dark:text-violet-400",
    },
  ];

  const difficultyItems = [
    {
      label: "Easy",
      value: easyScore,
      progressClass: "[&>div]:bg-emerald-500",
      badgeClass:
        "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400",
    },
    {
      label: "Medium",
      value: mediumScore,
      progressClass: "[&>div]:bg-amber-500",
      badgeClass:
        "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400",
    },
    {
      label: "Hard",
      value: hardScore,
      progressClass: "[&>div]:bg-red-500",
      badgeClass: "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400",
    },
  ];

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative min-h-screen overflow-hidden bg-transparent">
        {/* Static background accents */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-sky-200/25 blur-3xl dark:bg-sky-800/10"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 top-24 h-96 w-96 rounded-full bg-yellow-200/25 blur-3xl dark:bg-yellow-700/10"
        />

        <div className="relative mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          {/* Hero */}
          <motion.section
            initial="hidden"
            animate="visible"
            variants={heroVariants}
          >
            <Card className="relative overflow-hidden rounded-3xl border border-black/5 bg-white/85 shadow-[0_24px_80px_rgba(15,23,42,0.11)] backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/80">
              <div
                aria-hidden="true"
                className={`absolute inset-x-0 top-0 h-1 ${
                  passed
                    ? "bg-linear-to-r from-emerald-500 via-sky-400 to-yellow-400"
                    : "bg-linear-to-r from-red-500 via-orange-400 to-yellow-400"
                }`}
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sky-100/60 blur-3xl dark:bg-sky-900/10"
              />

              <CardContent className="relative px-6 py-10 sm:px-10 sm:py-12">
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`mb-6 flex h-24 w-24 items-center justify-center rounded-3xl border shadow-sm sm:h-28 sm:w-28 ${
                      passed
                        ? "border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-900/60 dark:bg-emerald-950/50 dark:text-emerald-400"
                        : "border-red-200 bg-red-50 text-red-600 dark:border-red-900/60 dark:bg-red-950/50 dark:text-red-400"
                    }`}
                  >
                    <Trophy
                      className="h-11 w-11 sm:h-14 sm:w-14"
                      aria-hidden="true"
                    />
                  </div>

                  <AnimatedHeadline />

                  <p className="mt-3 text-sm text-zinc-500 sm:text-base dark:text-zinc-400">
                    {result.categoryName}
                  </p>

                  <div className="mt-8">
                    <div className="bg-linear-to-r from-sky-500 to-yellow-400 bg-clip-text text-6xl font-black tracking-tight text-transparent sm:text-7xl md:text-8xl">
                      {score}%
                    </div>

                    <p className="mt-2 text-xl font-bold text-zinc-950 sm:text-2xl dark:text-white">
                      Grade {grade}
                    </p>

                    <span
                      className={`mt-4 inline-flex rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider ${
                        passed
                          ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/50 dark:text-emerald-400"
                          : "border-red-200 bg-red-50 text-red-700 dark:border-red-900/60 dark:bg-red-950/50 dark:text-red-400"
                      }`}
                    >
                      {passed ? "Passed" : "Needs Improvement"}
                    </span>
                  </div>

                  <div className="mt-8 w-full max-w-xl rounded-2xl border border-black/5 bg-white/60 p-4 dark:border-white/10 dark:bg-white/[0.03]">
                    <div className="mb-3 flex items-center justify-between text-sm">
                      <span className="font-medium text-zinc-600 dark:text-zinc-300">
                        Overall performance
                      </span>

                      <span className="font-bold text-zinc-950 dark:text-white">
                        {score}/100
                      </span>
                    </div>

                    <Progress
                      value={score}
                      aria-label={`Overall interview score ${score}%`}
                      className="h-2.5 bg-zinc-200/80 dark:bg-zinc-800 [&>div]:bg-linear-to-r [&>div]:from-sky-500 [&>div]:to-yellow-400"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.section>

          {/* Overview */}
          <section aria-labelledby="overview-heading">
            <div className="mb-5">
              <h2
                id="overview-heading"
                className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white"
              >
                Performance overview
              </h2>

              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                A summary of your completed interview session.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {overviewItems.map((item) => {
                const Icon = item.icon;

                return (
                  <Card
                    key={item.label}
                    className={`rounded-2xl border shadow-sm transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md ${item.containerClass}`}
                  >
                    <CardContent className="p-4 sm:p-5">
                      <div
                        className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl shadow-sm ${item.iconClass}`}
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>

                      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                        {item.label}
                      </p>

                      <p className="mt-2 text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl dark:text-white">
                        {item.value}
                      </p>

                      <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Difficulty breakdown */}
          <Card className="rounded-3xl border border-black/5 bg-white/85 shadow-[0_16px_50px_rgba(15,23,42,0.07)] backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/80">
            <CardContent className="p-5 sm:p-7">
              <div className="mb-7">
                <h2 className="text-xl font-bold tracking-tight text-zinc-950 sm:text-2xl dark:text-white">
                  Difficulty breakdown
                </h2>

                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  Compare your performance across each difficulty level.
                </p>
              </div>

              <div className="space-y-6">
                {difficultyItems.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-black/5 bg-zinc-50/60 p-4 dark:border-white/10 dark:bg-white/[0.03]"
                  >
                    <div className="mb-3 flex items-center justify-between gap-4">
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-semibold ${item.badgeClass}`}
                      >
                        {item.label}
                      </span>

                      <span className="text-sm font-bold text-zinc-950 dark:text-white">
                        {item.value}%
                      </span>
                    </div>

                    <Progress
                      value={item.value}
                      aria-label={`${item.label} difficulty score ${item.value}%`}
                      className={`h-2.5 bg-zinc-200/80 dark:bg-zinc-800 ${item.progressClass}`}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Question review */}
          <section aria-labelledby="question-review-heading">
            <div className="mb-5">
              <h2
                id="question-review-heading"
                className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white"
              >
                Question review
              </h2>

              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                Review your answers, feedback, strengths, and areas for
                improvement.
              </p>
            </div>

            <div className="space-y-5">
              {result.answers.map((item, index) => (
                <HistoryQuestionList key={item.id} item={item} index={index} />
              ))}
            </div>
          </section>

          {/* Actions */}
          <Card className="rounded-3xl border border-black/5 bg-white/80 p-4 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/75">
            <div className="grid gap-3 md:grid-cols-3">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-xl bg-linear-to-r from-sky-500 to-yellow-400 font-semibold text-zinc-950 shadow-sm transition-opacity hover:opacity-90"
              >
                <Link href="/dashboard">
                  <LayoutDashboard
                    className="mr-2 h-4 w-4"
                    aria-hidden="true"
                  />
                  Dashboard
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 rounded-xl border-black/10 bg-white font-semibold dark:border-white/10 dark:bg-zinc-950"
              >
                <Link href="/history">View History</Link>
              </Button>

              <Button
                asChild
                variant="secondary"
                size="lg"
                className="h-12 rounded-xl font-semibold"
              >
                <Link href="/interview/start">
                  <RotateCcw className="mr-2 h-4 w-4" aria-hidden="true" />
                  Retake Interview
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </MotionConfig>
  );
}
