"use client";

import Link from "next/link";
import { motion, MotionConfig, type Variants } from "framer-motion";
import { ChevronRight, ListTree } from "lucide-react";

import { categoryGroupPath } from "@/constants/route";

type Props = {
  title: string;
  href: string;
};

const titleContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.04,
      staggerChildren: 0.045,
    },
  },
};

const titleWordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 4,
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

function AnimatedTitle({ title }: { title: string }) {
  const words = title.trim().split(/\s+/);

  return (
    <MotionConfig reducedMotion="user">
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.7,
        }}
        variants={titleContainerVariants}
        aria-label={title}
        className="line-clamp-2 text-base font-semibold tracking-tight text-zinc-900 sm:text-lg dark:text-zinc-100"
      >
        {words.map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            aria-hidden="true"
            variants={titleWordVariants}
            className={
              index === words.length - 1
                ? "inline-block"
                : "mr-[0.25em] inline-block"
            }
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </MotionConfig>
  );
}

export function CategoryCard({ title, href }: Props) {
  return (
    <Link
      href={categoryGroupPath(href)}
      aria-label={`Open ${title} category`}
      className="group relative flex min-h-24 items-center justify-between gap-4 overflow-hidden rounded-2xl border border-black/5 bg-white/80 p-5 shadow-[0_8px_30px_rgba(15,23,42,0.05)] backdrop-blur-md transition-[transform,border-color,box-shadow,background-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-sky-300/70 hover:bg-white hover:shadow-[0_16px_45px_rgba(15,23,42,0.10)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 dark:border-white/10 dark:bg-zinc-900/75 dark:hover:border-sky-500/40 dark:hover:bg-zinc-900 dark:focus-visible:ring-offset-zinc-950"
    >
      {/* Subtle background accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-linear-to-b from-sky-400 to-yellow-300 opacity-70 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="relative flex min-w-0 items-center gap-4">
        {/* Icon */}
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-sky-200/70 bg-sky-50 text-sky-600 shadow-sm transition-colors duration-300 group-hover:border-sky-300 group-hover:bg-sky-100 dark:border-sky-900/70 dark:bg-sky-950/60 dark:text-sky-400 dark:group-hover:bg-sky-950">
          <ListTree className="h-5 w-5" aria-hidden="true" />
        </div>

        <div className="min-w-0">
          <AnimatedTitle title={title} />

          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            View interview categories
          </p>
        </div>
      </div>

      {/* Arrow */}
      <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-black/5 bg-zinc-50 text-zinc-400 transition-[transform,background-color,color,border-color] duration-300 ease-out group-hover:translate-x-0.5 group-hover:border-sky-200 group-hover:bg-sky-50 group-hover:text-sky-600 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-500 dark:group-hover:border-sky-900 dark:group-hover:bg-sky-950 dark:group-hover:text-sky-400">
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </div>
    </Link>
  );
}
