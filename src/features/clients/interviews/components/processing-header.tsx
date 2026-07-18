"use client";

import {
  motion,
  MotionConfig,
  type Variants,
} from "framer-motion";
import { BrainCircuit } from "lucide-react";

const headlineContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.07,
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

const descriptionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 5,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.38,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function ProcessingHeader() {
  const headlineWords = [
    "AI",
    "is",
    "analyzing",
    "your",
    "interview",
  ];

  return (
    <MotionConfig reducedMotion="user">
      <header className="mx-auto flex max-w-3xl flex-col items-center text-center">
        {/* Icon */}
        <div className="relative mb-7">
          <div
            aria-hidden="true"
            className="absolute inset-0 scale-125 rounded-3xl bg-sky-300/25 blur-2xl dark:bg-sky-700/15"
          />

          <motion.div
            animate={{
              scale: [1, 1.025, 1],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-white/60 bg-linear-to-br from-sky-400 to-yellow-300 text-zinc-950 shadow-[0_18px_50px_rgba(15,23,42,0.14)] dark:border-white/10 sm:h-28 sm:w-28"
          >
            <BrainCircuit
              className="h-11 w-11 sm:h-13 sm:w-13"
              strokeWidth={1.7}
              aria-hidden="true"
            />
          </motion.div>
        </div>

        {/* Headline */}
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={headlineContainerVariants}
          aria-label="AI is analyzing your interview"
          className="max-w-3xl text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl md:text-5xl dark:text-white"
        >
          {headlineWords.map((word, index) => {
            const isHighlighted =
              word === "analyzing" || word === "interview";

            return (
              <motion.span
                key={`${word}-${index}`}
                aria-hidden="true"
                variants={headlineWordVariants}
                className={
                  isHighlighted
                    ? "mr-[0.22em] inline-block bg-linear-to-r from-sky-500 to-yellow-500 bg-clip-text text-transparent last:mr-0"
                    : "mr-[0.22em] inline-block last:mr-0"
                }
              >
                {word}
              </motion.span>
            );
          })}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial="hidden"
          animate="visible"
          variants={descriptionVariants}
          className="mt-5 max-w-2xl text-base leading-7 text-zinc-500 sm:text-lg sm:leading-8 dark:text-zinc-400"
        >
          Our AI is reviewing your answers, checking technical
          accuracy, and preparing personalized feedback for your
          interview report.
        </motion.p>

        {/* Processing indicator */}
        <div
          role="status"
          aria-live="polite"
          className="mt-6 inline-flex items-center gap-3 rounded-full border border-black/5 bg-white/70 px-4 py-2 text-sm text-zinc-600 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-40" />

            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-sky-500" />
          </span>

          Preparing your results
        </div>
      </header>
    </MotionConfig>
  );
}