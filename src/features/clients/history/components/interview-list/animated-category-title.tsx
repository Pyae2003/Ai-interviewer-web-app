"use client";

import { motion, MotionConfig, type Variants } from "framer-motion";

type AnimatedCategoryTitleProps = Readonly<{
  title: string;
}>;

const titleVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.04,
      staggerChildren: 0.05,
    },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.36,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function AnimatedCategoryTitle({
  title,
}: AnimatedCategoryTitleProps) {
  const words = title.split(/\s+/);

  return (
    <MotionConfig reducedMotion="user">
      <motion.h2
        initial="hidden"
        animate="visible"
        variants={titleVariants}
        aria-label={title}
        className="text-xl font-bold tracking-tight text-foreground sm:text-2xl"
      >
        {words.map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            aria-hidden="true"
            variants={wordVariants}
            className={
              index === words.length - 1
                ? "inline-block text-sky-600 dark:text-sky-400"
                : "mr-[0.25em] inline-block"
            }
          >
            {word}
          </motion.span>
        ))}
      </motion.h2>
    </MotionConfig>
  );
}