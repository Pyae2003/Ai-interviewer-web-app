"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  type Variants,
} from "framer-motion";

import AiLoader from "./ai-loader";
import ProgressBar from "./progress-bar";
import ProgressRing from "./processing-ring";
import { useProgress } from "./use-progress";
import { useTypingMessages } from "./use-typing-message";

import { interviewResultPath } from "@/constants/route";

type ProcessingPageProps = {
  interviewId: string;
};

const headlineContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.065,
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
      duration: 0.46,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function AnimatedHeadline() {
  const words = ["Preparing", "your", "interview", "results"];

  return (
    <motion.h1
      initial="hidden"
      animate="visible"
      variants={headlineContainerVariants}
      aria-label="Preparing your interview results"
      className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl md:text-5xl dark:text-white"
    >
      {words.map((word, index) => {
        const highlighted = word === "interview" || word === "results";

        return (
          <motion.span
            key={`${word}-${index}`}
            aria-hidden="true"
            variants={headlineWordVariants}
            className={
              highlighted
                ? "mr-[0.22em] inline-block bg-linear-to-r from-sky-500 to-yellow-500 bg-clip-text text-transparent last:mr-0"
                : "mr-[0.22em] inline-block last:mr-0"
            }
          >
            {word}
          </motion.span>
        );
      })}
    </motion.h1>
  );
}

export default function ProcessingPage({ interviewId }: ProcessingPageProps) {
  const router = useRouter();

  const progress = useProgress();
  const message = useTypingMessages();

  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;

    const controller = new AbortController();

    let timeoutId: ReturnType<typeof setTimeout>;
    let isRedirecting = false;

    const pollStatus = async () => {
      if (!mountedRef.current || controller.signal.aborted || isRedirecting) {
        return;
      }

      try {
        const response = await fetch(
          `/api/interviews/status?id=${encodeURIComponent(interviewId)}`,
          {
            cache: "no-store",
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error(`Status request failed: ${response.status}`);
        }

        const data = (await response.json()) as {
          status?: string;
        };

        if (!mountedRef.current) return;

        if (data.status === "COMPLETED") {
          isRedirecting = true;

          router.replace(interviewResultPath(interviewId));

          return;
        }

        if (data.status === "FAILED") {
          isRedirecting = true;

          router.replace("/failed");

          return;
        }
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        console.error("[INTERVIEW_STATUS_POLL_ERROR]", error);
      }

      if (mountedRef.current && !controller.signal.aborted && !isRedirecting) {
        timeoutId = setTimeout(pollStatus, 2500);
      }
    };

    void pollStatus();

    return () => {
      mountedRef.current = false;
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [interviewId, router]);

  const safeProgress = Math.min(100, Math.max(0, progress));

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-sky-50 via-white to-yellow-50 px-4 py-12 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900">
        {/* Static ambient background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-sky-200/35 blur-3xl dark:bg-sky-800/10" />

          <div className="absolute -bottom-36 -right-32 h-96 w-96 rounded-full bg-yellow-200/35 blur-3xl dark:bg-yellow-700/10" />

          <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/50 blur-3xl dark:bg-white/[0.02]" />
        </div>

        <section className="relative z-10 w-full max-w-3xl">
          <div className="rounded-3xl border border-black/5 bg-white/80 px-5 py-9 shadow-[0_24px_80px_rgba(15,23,42,0.10)] backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/80 sm:px-9 sm:py-12">
            <div className="flex flex-col items-center text-center">
              <AiLoader />

              <div className="mt-8">
                <AnimatedHeadline />

                <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-zinc-500 sm:text-base sm:leading-7 dark:text-zinc-400">
                  Our AI is reviewing your answers and preparing personalized
                  feedback for your interview report.
                </p>
              </div>

              {/* Changing processing message */}
              <div
                aria-live="polite"
                aria-atomic="true"
                className="mt-8 min-h-7"
              >
                <AnimatePresence mode="wait">
                  <motion.p
                    key={message}
                    initial={{
                      opacity: 0,
                      y: 4,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -4,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="text-sm font-medium text-zinc-700 sm:text-base dark:text-zinc-300"
                  >
                    {message}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Progress ring */}
              <div className="mt-8 flex justify-center">
                <ProgressRing progress={safeProgress} />
              </div>

              {/* Linear progress */}
              <div className="mt-8 w-full max-w-xl rounded-2xl border border-black/5 bg-white/65 p-4 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
                <div className="mb-3 flex items-center justify-between gap-4">
                  <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                    Analysis progress
                  </span>

                  <span className="text-sm font-bold text-zinc-950 dark:text-white">
                    {Math.round(safeProgress)}%
                  </span>
                </div>

                <ProgressBar progress={safeProgress} />
              </div>

              <div className="mt-6 flex items-center gap-2 rounded-full border border-black/5 bg-white/60 px-4 py-2 text-xs text-zinc-500 shadow-sm dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-30" />

                  <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-500" />
                </span>
                This usually takes a few moments
              </div>
            </div>
          </div>
        </section>
      </main>
    </MotionConfig>
  );
}
