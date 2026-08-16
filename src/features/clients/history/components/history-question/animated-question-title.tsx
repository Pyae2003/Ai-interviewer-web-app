"use client";

import { motion, type Variants } from "framer-motion";

const titleContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.04,
      staggerChildren: 0.07,
    },
  },
};

const titleWordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 5,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

type AnimatedQuestionTitleProps = {
  index: number;
};

export function AnimatedQuestionTitle({
  index,
}: AnimatedQuestionTitleProps) {
  const questionNumber = Math.max(1, Math.floor(index) + 1);
  const words = ["Question", String(questionNumber)];

  return (
    <motion.h2
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
      variants={titleContainerVariants}
      aria-label={`Question ${questionNumber}`}
      className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
    >
      {words.map((word, wordIndex) => (
        <motion.span
          key={`${word}-${wordIndex}`}
          aria-hidden="true"
          variants={titleWordVariants}
          className={
            wordIndex === words.length - 1
              ? "inline-block text-sky-600 dark:text-sky-400"
              : "mr-[0.22em] inline-block"
          }
        >
          {word}
        </motion.span>
      ))}
    </motion.h2>
  );
}
