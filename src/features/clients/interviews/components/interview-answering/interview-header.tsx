"use client";

import { motion, MotionConfig } from "framer-motion";
import { Mic } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { AnimatedInterviewTitle } from "./ animated-interview-title";

type InterviewHeaderProps = {
  categoryName: string;
};

export function InterviewHeader({
  categoryName,
}: InterviewHeaderProps) {
  const safeCategoryName =
    categoryName.trim() || "Interview Category";

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        initial={{
          opacity: 0,
          y: 8,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <Card className="group relative overflow-hidden rounded-3xl border border-sky-200/80 bg-sky-50/80 shadow-[0_14px_40px_rgba(14,165,233,0.10)] transition-[border-color,box-shadow] duration-300 hover:border-sky-300 hover:shadow-[0_18px_48px_rgba(14,165,233,0.15)] dark:border-sky-900/70 dark:bg-sky-950/25 dark:hover:border-sky-800">
          {/* Solid left accent */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-1 bg-sky-500"
          />

          <CardContent className="flex items-center justify-between gap-4 p-5 pl-6 sm:p-6 sm:pl-7">
            <div className="flex min-w-0 items-center gap-4">
              {/* Animated microphone */}
              <motion.div
                whileHover={{
                  scale: 1.06,
                  rotate: -3,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 20,
                }}
                className="relative flex size-14 shrink-0 items-center justify-center"
              >
                {/* Pulse ring */}
                <motion.span
                  aria-hidden="true"
                  animate={{
                    scale: [0.85, 1.2],
                    opacity: [0.5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                  className="pointer-events-none absolute inset-1 rounded-2xl border border-sky-400"
                />

                <div className="relative flex size-13 items-center justify-center rounded-2xl border border-sky-500 bg-sky-500 text-white shadow-[0_8px_20px_rgba(14,165,233,0.28)] transition-colors duration-200 group-hover:bg-sky-600">
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Mic className="size-6" aria-hidden="true" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Title */}
              <div className="min-w-0">
                <AnimatedInterviewTitle />

                <p
                  title={safeCategoryName}
                  className="mt-1 truncate text-sm font-medium text-sky-700 sm:text-base dark:text-sky-300"
                >
                  {safeCategoryName}
                </p>
              </div>
            </div>

            {/* Live status */}
            <div className="hidden shrink-0 items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-emerald-700 shadow-sm sm:flex dark:border-emerald-900/70 dark:bg-zinc-900/80 dark:text-emerald-400">
              <span className="relative flex size-2">
                <motion.span
                  aria-hidden="true"
                  animate={{
                    scale: [1, 1.8],
                    opacity: [0.55, 0],
                  }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                  className="absolute inset-0 rounded-full bg-emerald-400"
                />

                <span className="relative size-2 rounded-full bg-emerald-500" />
              </span>

              AI Session
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </MotionConfig>
  );
}