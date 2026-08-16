"use client";

import { motion } from "framer-motion";

import {
  headlineContainerVariants,
  headlineWordVariants,
} from "./login-animations";

const headlineWords = [
  {
    text: "AI",
    accent: true,
  },
  {
    text: "Interviewer",
    accent: false,
  },
];

export function AnimatedLoginHeadline() {
  return (
    <motion.h1
      variants={headlineContainerVariants}
      aria-label="AI Interviewer"
      className="text-3xl font-semibold tracking-[-0.03em] text-zinc-950 sm:text-4xl dark:text-zinc-100"
    >
      {headlineWords.map((word, index) => (
        <motion.span
          key={word.text}
          aria-hidden="true"
          variants={headlineWordVariants}
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
  );
}