"use client";

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
      delayChildren: 0.04,
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

export default function ProgressBar({
  progress,
}: Props) {
  const safeProgress = Math.min(
    100,
    Math.max(0, Number(progress) || 0),
  );

  const roundedProgress = Math.round(safeProgress);

  return (
    <MotionConfig reducedMotion="user">
      <div
        role="progressbar"
        aria-label="Analysis progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={roundedProgress}
        className="w-full"
      >
        {/* Label */}
        <div className="mb-2.5 flex items-center justify-between gap-4">
          <motion.p
            initial="hidden"
            animate="visible"
            variants={labelContainerVariants}
            aria-label="Analysis progress"
            className="text-sm font-medium text-zinc-600 dark:text-zinc-300"
          >
            {["Analysis", "progress"].map(
              (word, index) => (
                <motion.span
                  key={word}
                  aria-hidden="true"
                  variants={labelWordVariants}
                  className={
                    index === 1
                      ? "inline-block bg-linear-to-r from-sky-500 to-yellow-500 bg-clip-text text-transparent"
                      : "mr-[0.24em] inline-block"
                  }
                >
                  {word}
                </motion.span>
              ),
            )}
          </motion.p>

          <span className="text-sm font-semibold tabular-nums text-zinc-900 dark:text-zinc-100">
            {roundedProgress}%
          </span>
        </div>

        {/* Progress track */}
        <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-zinc-200/80 ring-1 ring-black/[0.03] dark:bg-zinc-800 dark:ring-white/[0.04]">
          <motion.div
            initial={{
              scaleX: 0,
            }}
            animate={{
              scaleX: safeProgress / 100,
            }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute inset-0 origin-left rounded-full bg-linear-to-r from-sky-500 via-cyan-400 to-yellow-400"
          />
        </div>
      </div>
    </MotionConfig>
  );
}