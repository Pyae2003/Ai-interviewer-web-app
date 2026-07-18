
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

import InterViewList from "./interview-list";
import { InterviewHistoryHeader } from "./interview-history-header";

import { getInterviewsHistory } from "../query/get-interviews-history";

export async function InterviewHistory() {
  const interviews = await getInterviewsHistory();
  const hasInterviews = interviews.data.length > 0;

  return (
    <main className="relative min-h-screen overflow-hidden bg-transparent">
      {/* Subtle static background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-sky-200/25 blur-3xl dark:bg-sky-800/10"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-yellow-200/25 blur-3xl dark:bg-yellow-700/10"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        {/* Header */}
        <InterviewHistoryHeader />

        {hasInterviews ? (
          <section
            aria-label="Interview history results"
            className="mt-10 space-y-12"
          >
            {interviews.data.map((interview) => (
              <InterViewList
                key={interview.categoryId}
                result={interview}
              />
            ))}
          </section>
        ) : (
          <Card className="mt-10 overflow-hidden rounded-3xl border border-black/5 bg-white/80 shadow-[0_24px_80px_rgba(15,23,42,0.09)] backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/80">
            <CardContent className="relative flex flex-col items-center px-6 py-16 text-center sm:px-10 sm:py-20">
              {/* Static corner glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-sky-100/70 blur-3xl dark:bg-sky-900/15"
              />

              <div className="relative">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-sky-200/60 bg-linear-to-br from-sky-100 to-yellow-100 text-sky-600 shadow-sm dark:border-white/10 dark:from-sky-950 dark:to-yellow-950 dark:text-sky-400">
                  <Sparkles
                    className="h-9 w-9"
                    aria-hidden="true"
                  />
                </div>

                <h2 className="mt-7 text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl dark:text-white">
                  No interview history yet
                </h2>

                <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-zinc-500 sm:text-base dark:text-zinc-400">
                  Complete your first AI-powered interview to receive
                  personalized feedback, performance scores, strengths,
                  weaknesses, and recommendations for improvement.
                </p>

                <Button
                  asChild
                  size="lg"
                  className="mt-8 h-12 rounded-xl bg-linear-to-r from-sky-500 to-yellow-400 px-7 font-semibold text-zinc-950 shadow-sm transition-opacity hover:opacity-90"
                >
                  <Link href="/dashboard">
                    Start an Interview

                    <ArrowRight
                      className="ml-2 h-4 w-4"
                      aria-hidden="true"
                    />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}

