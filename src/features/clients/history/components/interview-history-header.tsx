"use client";
import { motion, MotionConfig, type Variants } from "framer-motion";
import { History } from "lucide-react";
const titleContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.08, staggerChildren: 0.07 } },
};
const titleWordVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.46, ease: [0.22, 1, 0.36, 1] },
  },
};
export function InterviewHistoryHeader() {
  const words = [
    { text: "Interview", gradient: false },
    { text: "History", gradient: true },
  ];
  return (
    <div className="flex items-start gap-4 sm:items-center">
      {" "}
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-sky-200/70 bg-sky-50 text-sky-600 shadow-sm dark:border-sky-900/60 dark:bg-sky-950/50 dark:text-sky-400">
        {" "}
        <History className="h-7 w-7" aria-hidden="true" />{" "}
      </div>{" "}
      <div className="min-w-0">
        {" "}
        <MotionConfig reducedMotion="user">
          {" "}
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={titleContainerVariants}
            aria-label="Interview History"
            className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl dark:text-white"
          >
            {" "}
            {words.map((word) => (
              <motion.span
                key={word.text}
                aria-hidden="true"
                variants={titleWordVariants}
                className={
                  word.gradient
                    ? "inline-block bg-linear-to-r from-sky-500 to-yellow-500 bg-clip-text text-transparent"
                    : "mr-[0.22em] inline-block"
                }
              >
                {" "}
                {word.text}{" "}
              </motion.span>
            ))}{" "}
          </motion.h1>{" "}
        </MotionConfig>{" "}
        <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500 sm:text-base dark:text-zinc-400">
          {" "}
          Review your completed AI interviews, explore detailed feedback, and
          track how your performance improves over time.{" "}
        </p>{" "}
      </div>{" "}
    </div>
  );
}
