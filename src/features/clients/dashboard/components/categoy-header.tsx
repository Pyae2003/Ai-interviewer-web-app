"use client";

import { motion, MotionConfig, type Variants } from "framer-motion";
import { Bot } from "lucide-react";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.05,
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 8,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const iconVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.92,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function CategoryHeader() {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-4 text-center"
      >
        <motion.div
          variants={iconVariants}
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-sky-200 bg-sky-100 text-sky-600 shadow-sm dark:border-sky-900 dark:bg-sky-950 dark:text-sky-300"
        >
          <Bot className="h-10 w-10" aria-hidden="true" />
        </motion.div>

        <div>
          <motion.h1
            variants={itemVariants}
            className="text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-100"
          >
            <span className="text-sky-500 dark:text-sky-300">AI</span>{" "}
            Interviewer
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500 sm:text-base dark:text-zinc-400"
          >
            Practice real technical interviews powered by AI
          </motion.p>
        </div>
      </motion.div>
    </MotionConfig>
  );
}