"use client";

import { motion, MotionConfig, type Variants } from "framer-motion";

import {type ReactNode } from "react";

import { cn } from "@/lib/utils";

export type HeaderUser = {
  id: string;
  email: string;
  name: string;
  image?: string;
};

export interface ClientHeaderProp {
  path: string;
  partName?: string;
  action?: ReactNode;
  user?: HeaderUser;
}


type AnimatedHeadlineProps = {
  text: string;
  className?: string;
};
const headlineContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.07,
    },
  },
};

const headlineWordVariants: Variants = {
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

export function isActiveRoute(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AnimatedHeadline({
  text,
  className,
}: AnimatedHeadlineProps) {
  const words = text.trim().split(/\s+/);

  return (
    <MotionConfig reducedMotion="user">
      <motion.p
        initial="hidden"
        animate="visible"
        variants={headlineContainerVariants}
        aria-label={text}
        className={className}
      >
        {words.map((word, index) => {
          const isLastWord = index === words.length - 1;

          return (
            <motion.span
              key={`${word}-${index}`}
              aria-hidden="true"
              variants={headlineWordVariants}
              className={cn(
                "inline-block",
                isLastWord
                  ? "text-sky-600 dark:text-sky-400"
                  : "mr-[0.25em]",
              )}
            >
              {word}
            </motion.span>
          );
        })}
      </motion.p>
    </MotionConfig>
  );
}
