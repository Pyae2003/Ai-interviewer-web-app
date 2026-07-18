"use client";

import {
  motion,
  MotionConfig,
  type Variants,
} from "framer-motion";
import { Bot } from "lucide-react";

const textContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.08,
    },
  },
};

const textWordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 5,
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

const loadingDots = [0, 1, 2];

export default function AiLoader() {
  const headlineWords = ["AI", "is", "thinking"];

  return (
    <MotionConfig reducedMotion="user">
      <div
        role="status"
        aria-live="polite"
        aria-label="AI is thinking"
        className="flex flex-col items-center justify-center gap-5 text-center"
      >
        {/* Bot icon */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute inset-0 scale-125 rounded-3xl bg-sky-300/25 blur-2xl dark:bg-sky-700/15"
          />

          <motion.div
            animate={{
              scale: [1, 1.035, 1],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative flex h-20 w-20 items-center justify-center rounded-3xl border border-white/50 bg-linear-to-br from-sky-400 to-yellow-300 text-zinc-950 shadow-[0_16px_45px_rgba(15,23,42,0.14)] dark:border-white/10"
          >
            <Bot
              className="h-9 w-9"
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </motion.div>
        </div>

        {/* Loader text */}
        <div>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={textContainerVariants}
            className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
          >
            {headlineWords.map((word, index) => (
              <motion.span
                key={`${word}-${index}`}
                aria-hidden="true"
                variants={textWordVariants}
                className={
                  index === headlineWords.length - 1
                    ? "inline-block bg-linear-to-r from-sky-500 to-yellow-500 bg-clip-text text-transparent"
                    : "mr-[0.24em] inline-block"
                }
              >
                {word}
              </motion.span>
            ))}
          </motion.p>

          <div
            aria-hidden="true"
            className="mt-2 flex items-center justify-center gap-1.5"
          >
            {loadingDots.map((dot) => (
              <motion.span
                key={dot}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  y: [0, -2, 0],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: dot * 0.15,
                  ease: "easeInOut",
                }}
                className="h-1.5 w-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500"
              />
            ))}
          </div>

          <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
            Preparing your interview results
          </p>
        </div>

        <span className="sr-only">
          AI is thinking. Preparing your interview results.
        </span>
      </div>
    </MotionConfig>
  );
}

