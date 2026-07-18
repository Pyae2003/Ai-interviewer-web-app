"use client";

import { useId } from "react";
import {
  motion,
  MotionConfig,
  type Variants,
} from "framer-motion";

type Props = {
  progress: number;
};

const labelContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.06,
    },
  },
};

const labelWordVariants: Variants = {
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

export default function ProgressRing({
  progress,
}: Props) {
  const gradientId = useId().replace(/:/g, "");

  const size = 176;
  const strokeWidth = 10;
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;

  const safeProgress = Math.min(
    100,
    Math.max(0, Number(progress) || 0),
  );

  const strokeDashoffset =
    circumference -
    (safeProgress / 100) * circumference;

  return (
    <MotionConfig reducedMotion="user">
      <div
        role="progressbar"
        aria-label="Interview analysis progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(safeProgress)}
        className="relative flex h-44 w-44 items-center justify-center"
      >
        {/* Soft static glow */}
        <div
          aria-hidden="true"
          className="absolute inset-5 rounded-full bg-sky-200/25 blur-2xl dark:bg-sky-800/10"
        />

        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="relative h-full w-full -rotate-90"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id={gradientId}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor="#0ea5e9"
              />
              <stop
                offset="55%"
                stopColor="#22d3ee"
              />
              <stop
                offset="100%"
                stopColor="#facc15"
              />
            </linearGradient>
          </defs>

          {/* Track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            strokeWidth={strokeWidth}
            className="stroke-zinc-200/80 dark:stroke-zinc-800"
          />

          {/* Progress */}
          <motion.circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke={`url(#${gradientId})`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{
              strokeDashoffset: circumference,
            }}
            animate={{
              strokeDashoffset,
            }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <motion.p
            initial="hidden"
            animate="visible"
            variants={labelContainerVariants}
            aria-label="Analyzing"
            className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400"
          >
            <motion.span
              aria-hidden="true"
              variants={labelWordVariants}
              className="inline-block"
            >
              Analyzing
            </motion.span>
          </motion.p>

          <div className="mt-1 flex items-end justify-center">
            <motion.span
              key={Math.round(safeProgress)}
              initial={{
                opacity: 0,
                y: 3,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white"
            >
              {Math.round(safeProgress)}
            </motion.span>

            <span className="mb-0.5 ml-0.5 text-base font-semibold text-zinc-400">
              %
            </span>
          </div>

          <span className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">
            Complete
          </span>
        </div>
      </div>
    </MotionConfig>
  );
}