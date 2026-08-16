"use client";

import { motion } from "framer-motion";
import { Bot } from "lucide-react";

import { AnimatedLoginHeadline } from "./animated-login-headline";
import {
  badgeVariants,
  brandContainerVariants,
  contentVariants,
  robotVariants,
} from "./login-animations";

export function LoginBrand() {
  return (
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

      <AnimatedLoginHeadline />

      <motion.p
        variants={contentVariants}
        className="mx-auto mt-3 max-w-sm text-sm leading-6 text-zinc-500 sm:text-base dark:text-zinc-400"
      >
        Sign in and continue building confidence for your next interview.
      </motion.p>
    </motion.header>
  );
}