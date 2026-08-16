"use client";

import { motion, type Variants } from "framer-motion";

const titleContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.05,
      staggerChildren: 0.07,
    },
  },
};

const titleWordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 6,
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

export function AnimatedInterviewTitle() {
  const words = ["AI", "Interview"];

  return (
    <motion.h1
      initial="hidden"
      animate="visible"
      variants={titleContainerVariants}
      aria-label="AI Interview"
      className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
    >
      {words.map((word, index) => (
        <motion.span
          key={word}
          aria-hidden="true"
          variants={titleWordVariants}
          className={
            index === words.length - 1
              ? "inline-block text-sky-600 dark:text-sky-400"
              : "mr-[0.22em] inline-block"
          }
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}
