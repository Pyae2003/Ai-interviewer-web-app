"use client";

import {
  motion,
  MotionConfig,
  type Variants,
} from "framer-motion";
import {
  ArrowRight,
  Sparkles,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const titleContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.06,
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
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function AnimatedTitle() {
  const words = ["AI", "Recommendation"];

  return (
    <MotionConfig reducedMotion="user">
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.8,
        }}
        variants={titleContainerVariants}
        aria-label="AI Recommendation"
        className="text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl"
      >
        {words.map((word, index) => (
          <motion.span
            key={word}
            aria-hidden="true"
            variants={titleWordVariants}
            className={
              index === words.length - 1
                ? "inline-block"
                : "mr-[0.22em] inline-block"
            }
          >
            {word}
          </motion.span>
        ))}
      </motion.h2>
    </MotionConfig>
  );
}

export default function RecommendationCard() {
  return (
    <Card className="relative overflow-hidden rounded-3xl border border-black/5 bg-linear-to-br from-sky-400 via-sky-300 to-yellow-300 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.12)] sm:p-8 dark:border-white/10">
      {/* Static decorative glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-white/25 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-20 h-52 w-52 rounded-full bg-yellow-100/30 blur-3xl"
      />

      <div className="relative">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/40 bg-white/65 text-sky-600 shadow-sm backdrop-blur-md">
          <Sparkles
            className="h-5 w-5"
            aria-hidden="true"
          />
        </div>

        <AnimatedTitle />

        <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-800/80 sm:text-base">
          Based on your recent interview performance, we recommend
          practicing the Advanced Next.js interview next to strengthen
          your technical knowledge and improve your confidence.
        </p>

        <Button
          type="button"
          className="group mt-7 h-11 rounded-xl border border-white/50 bg-white px-5 font-semibold text-zinc-950 shadow-sm transition-[background-color,box-shadow] duration-200 hover:bg-white/90 hover:shadow-md"
        >
          Start Interview

          <ArrowRight
            className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Button>
      </div>
    </Card>
  );
}

