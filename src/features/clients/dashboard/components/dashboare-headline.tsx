"use client";

import {
  motion,
  MotionConfig,
  type Variants,
} from "framer-motion";
import { Bot } from "lucide-react";

const headlineWords = [
  {
    text: "Practice",
    accent: false,
  },
  {
    text: "Smarter",
    accent: false,
  },
  {
    text: "With",
    accent: false,
  },
  {
    text: "AI",
    accent: true,
  },
];

const containerVariants: Variants = {
  hidden: {},

  visible: {
    transition: {
      delayChildren: 0.05,
      staggerChildren: 0.1,
    },
  },
};

const badgeVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 6,
    scale: 0.97,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const robotVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    rotate: -5,
  },

  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,

    transition: {
      duration: 0.4,
      delay: 0.1,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const headlineVariants: Variants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 7,
    filter: "blur(2px)",
  },

  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",

    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const descriptionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 8,
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

export function DashboardHeadline() {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="mx-auto max-w-2xl text-center"
      >
        {/* AI BADGE */}
        <motion.div
          variants={badgeVariants}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-sm font-medium text-sky-700 shadow-sm dark:border-sky-900 dark:bg-sky-950 dark:text-sky-300"
        >
          <motion.span
            variants={robotVariants}
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500 text-white dark:bg-sky-600"
          >
            <Bot className="h-4 w-4" aria-hidden="true" />
          </motion.span>

          <span>AI-powered interview practice</span>
        </motion.div>

        {/* ANIMATED HEADLINE */}
        <motion.h1
          variants={headlineVariants}
          aria-label="Practice Smarter With AI"
          className="text-balance text-4xl font-semibold leading-tight tracking-[-0.04em] text-zinc-950 sm:text-5xl dark:text-zinc-100"
        >
          {headlineWords.map((word, index) => (
            <motion.span
              key={word.text}
              aria-hidden="true"
              variants={wordVariants}
              className={`inline-block ${
                index !== headlineWords.length - 1
                  ? "mr-[0.22em]"
                  : ""
              } ${
                word.accent
                  ? "text-sky-500 dark:text-sky-300"
                  : ""
              }`}
            >
              {word.text}
            </motion.span>
          ))}
        </motion.h1>

        {/* DESCRIPTION */}
        <motion.p
          variants={descriptionVariants}
          className="mx-auto mt-4 max-w-xl text-base leading-7 text-zinc-500 sm:text-lg dark:text-zinc-400"
        >
          Select a category group and begin a focused interview practice
          session designed to improve your skills and confidence.
        </motion.p>
      </motion.div>
    </MotionConfig>
  );
}