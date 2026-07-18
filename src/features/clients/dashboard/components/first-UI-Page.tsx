"use client";

import Link from "next/link";
import { motion, MotionConfig } from "framer-motion";
import {
  ArrowRight,
  LayoutDashboard,
  Sparkles,
  Trophy,
  Brain,
  Mic,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface AnimatedHeadlineProps {
  className?: string;
}

const headlineWords = [
  { text: "Master", gradient: false },
  { text: "Your", gradient: false },
  { text: "Interview", gradient: true },
  { text: "Skills", gradient: true },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.075,
    },
  },
};

const wordVariants = {
  hidden: {
    opacity: 0,
    y: 7,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

function AnimatedHeadline({
  className = "",
}: AnimatedHeadlineProps) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.h1
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        aria-label="Master Your Interview Skills"
        className={className}
      >
        {headlineWords.map((word) => (
          <motion.span
            key={word.text}
            aria-hidden="true"
            variants={wordVariants}
            className={
              word.gradient
                ? "mr-[0.22em] inline-block bg-linear-to-r from-sky-500 to-yellow-500 bg-clip-text text-transparent"
                : "mr-[0.22em] inline-block"
            }
          >
            {word.text}
          </motion.span>
        ))}
      </motion.h1>
    </MotionConfig>
  );
}

export default function WelcomeProfilePage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-sky-50 via-white to-yellow-50 dark:from-sky-950 dark:via-zinc-950 dark:to-yellow-950">
      <div className="mx-auto max-w-7xl px-4 py-10">
        {/* Top Action */}
        <div className="mb-8">
          <Button
            asChild
            variant="outline"
            className="rounded-xl border-sky-200 bg-white hover:bg-sky-50 dark:border-white/10 dark:bg-zinc-900 dark:hover:bg-zinc-800"
          >
            <Link href="/dashboard">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Go To Dashboard
            </Link>
          </Button>
        </div>

        {/* Hero Section */}
        <Card className="overflow-hidden border-0 bg-white shadow-xl dark:bg-zinc-900">
          <CardContent className="relative p-0">
            <div className="absolute inset-0 bg-linear-to-r from-sky-100/60 via-white to-yellow-100/60 dark:from-sky-950/60 dark:via-zinc-900 dark:to-yellow-950/60" />

            <div className="relative px-8 py-14 md:px-12 md:py-16">
              <div className="max-w-3xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-sky-100 px-4 py-2 text-sm font-medium text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                  <Sparkles className="h-4 w-4" />
                  Welcome to AI Interviewer
                </div>

                <AnimatedHeadline className="mb-4 text-4xl font-extrabold tracking-tight text-zinc-900 md:text-6xl dark:text-white" />

                <p className="max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
                  Practice real-world interview questions, receive AI-powered
                  feedback, track your progress, and build confidence before
                  your next job interview.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="rounded-xl bg-linear-to-r from-sky-500 to-yellow-400 text-black hover:opacity-90"
                  >
                    <Link href="/dashboard">
                      Start Interview
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="rounded-xl dark:border-white/10 dark:bg-zinc-900"
                  >
                    <Link href="/history">View History</Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feature Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <Card className="border-sky-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-zinc-900">
            <CardContent className="p-6">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100 dark:bg-sky-950">
                <Mic className="h-7 w-7 text-sky-600 dark:text-sky-400" />
              </div>

              <h3 className="mb-2 text-lg font-bold">
                Real Interview Practice
              </h3>

              <p className="text-sm text-muted-foreground">
                Practice category-based interview questions designed to
                simulate real technical interviews.
              </p>
            </CardContent>
          </Card>

          <Card className="border-yellow-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-zinc-900">
            <CardContent className="p-6">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-100 dark:bg-yellow-950">
                <Brain className="h-7 w-7 text-yellow-600 dark:text-yellow-400" />
              </div>

              <h3 className="mb-2 text-lg font-bold">
                AI Feedback
              </h3>

              <p className="text-sm text-muted-foreground">
                Receive detailed AI analysis, strengths, weaknesses, and
                recommendations after every interview.
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-zinc-900">
            <CardContent className="p-6">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 dark:bg-green-950">
                <Trophy className="h-7 w-7 text-green-600 dark:text-green-400" />
              </div>

              <h3 className="mb-2 text-lg font-bold">
                Track Progress
              </h3>

              <p className="text-sm text-muted-foreground">
                Monitor interview scores, improvement trends, and performance
                across different categories.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Welcome Message */}
        <Card className="mt-10 border-0 bg-linear-to-r from-sky-100 via-white to-yellow-100 shadow-lg dark:from-sky-950 dark:via-zinc-900 dark:to-yellow-950">
          <CardContent className="p-8 text-center">
            <h2 className="mb-3 text-2xl font-bold text-zinc-900 dark:text-white">
              Welcome to AI Interviewer
            </h2>

            <p className="mx-auto max-w-3xl text-muted-foreground">
              Your personal interview preparation platform. Practice smarter,
              identify knowledge gaps, improve communication skills, and boost
              your confidence before facing real interviews.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

