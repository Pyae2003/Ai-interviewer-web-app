"use client";

import {
  motion,
  MotionConfig,
  type Variants,
} from "framer-motion";
import { History } from "lucide-react";

const titleWords = ["Interview", "History"] as const;

const titleVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.07,
    },
  },
};

const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 8,
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

export function InterviewHistoryHeader() {
  return (
    <MotionConfig reducedMotion="user">
      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.48,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="group flex flex-col gap-4 rounded-3xl border border-border/70 bg-card p-5 shadow-[0_12px_36px_rgba(15,23,42,0.06)] sm:flex-row sm:items-center sm:p-6"
      >
        {/* Icon */}
        <motion.div
          whileHover={{
            scale: 1.05,
            rotate: -3,
          }}
          transition={{
            type: "spring",
            stiffness: 350,
            damping: 18,
          }}
          className="relative flex size-14 shrink-0 items-center justify-center rounded-2xl border border-sky-200 bg-sky-50 text-sky-600 shadow-sm dark:border-sky-900/70 dark:bg-sky-950/40 dark:text-sky-400"
        >
          <History className="size-6" aria-hidden="true" />

          {/* Activity indicator */}
          <span className="absolute -right-1 -top-1 flex size-3.5 items-center justify-center rounded-full bg-card ring-2 ring-card">
            <motion.span
              animate={{
                scale: [0.8, 1, 0.8],
                opacity: [0.55, 1, 0.55],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="size-2 rounded-full bg-emerald-500"
              aria-hidden="true"
            />
          </span>
        </motion.div>

        {/* Content */}
        <div className="min-w-0 border-l-2 border-sky-500 pl-4">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={titleVariants}
            aria-label="Interview History"
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            {titleWords.map((word, index) => (
              <motion.span
                key={word}
                aria-hidden="true"
                variants={wordVariants}
                className={
                  index === titleWords.length - 1
                    ? "inline-block text-sky-600 dark:text-sky-400"
                    : "mr-[0.22em] inline-block"
                }
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.45,
              delay: 0.28,
            }}
            className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base"
          >
            Review completed AI interviews, explore detailed feedback, and
            track your performance over time.
          </motion.p>
        </div>
      </motion.header>
    </MotionConfig>
  );
}