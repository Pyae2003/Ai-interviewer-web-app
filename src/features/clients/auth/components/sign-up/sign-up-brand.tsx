"use client";

import {
  motion,
  MotionConfig,
  type Variants,
} from "framer-motion";
import { Bot } from "lucide-react";

import { AnimatedSignupHeadline } from "./animated-signup-headline";

const brandContainerVariants: Variants = {
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
      delay: 0.12,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const contentVariants: Variants = {
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

export function SignUpBrand() {
  return (
    <MotionConfig reducedMotion="user">
      <motion.header
        initial="hidden"
        animate="visible"
        variants={brandContainerVariants}
        className="mb-7 text-center"
      >
        <motion.div
          variants={badgeVariants}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-sm font-medium text-sky-700 shadow-sm dark:border-sky-900 dark:bg-sky-950 dark:text-sky-300"
        >
          <motion.span
            variants={robotVariants}
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500 text-white dark:bg-sky-600"
          >
            <Bot className="h-4 w-4" aria-hidden="true" />
          </motion.span>

          <span>Smart Interview Preparation</span>
        </motion.div>

        <motion.div variants={contentVariants}>
          <AnimatedSignupHeadline />
        </motion.div>

        <motion.p
          variants={contentVariants}
          className="mx-auto mt-3 max-w-md text-sm leading-6 text-zinc-500 sm:text-base dark:text-zinc-400"
        >
          Create your account and start improving your interview skills with
          intelligent AI feedback.
        </motion.p>
      </motion.header>
    </MotionConfig>
  );
}