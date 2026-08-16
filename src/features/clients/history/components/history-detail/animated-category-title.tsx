"use client";

import { motion, type Variants } from "framer-motion";

const titleContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.06,
      staggerChildren: 0.065,
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

type AnimatedCategoryTitleProps = {
  title: string;
};

export function AnimatedCategoryTitle({
  title,
}: AnimatedCategoryTitleProps) {
  const safeTitle = title.trim() || "Interview Result";
  const words = safeTitle.split(/\s+/);

  return (
    <motion.h1
      initial="hidden"
      animate="visible"
      variants={titleContainerVariants}
      aria-label={safeTitle}
      className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
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
