"use client";

import { motion, MotionConfig } from "framer-motion";
import { Bot, Cpu } from "lucide-react";
import Link from "next/link";

import { AnimatedHeadline } from "./animatedHeadline";

type BrandProps = {
  onNavigate?: () => void;
  compact?: boolean;
};

function AnimatedBrandIcon() {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 20,
        }}
        className="relative flex size-12 shrink-0 items-center justify-center"
      >
        {/* Pulse ring */}
        <motion.span
          aria-hidden="true"
          animate={{
            scale: [0.9, 1.22],
            opacity: [0.4, 0],
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "easeOut",
          }}
          className="pointer-events-none absolute inset-1 rounded-xl border border-sky-400"
        />

        {/* Robot antenna */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-0 z-10 flex -translate-x-1/2 flex-col items-center"
        >
          <motion.span
            animate={{
              scale: [0.75, 1.15, 0.75],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="size-1.5 rounded-full bg-emerald-400 ring-2 ring-background"
          />

          <span className="h-1.5 w-px bg-sky-300" />
        </div>

        {/* Main robot container */}
        <div className="relative mt-1 flex size-10 items-center justify-center rounded-xl border border-sky-400 bg-sky-500 text-white shadow-[0_6px_18px_rgba(14,165,233,0.28)] transition-colors duration-200 group-hover:bg-sky-600">
          {/* Scanning line area */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl"
          >
            <motion.span
              animate={{
                y: [-8, 30, -8],
                opacity: [0, 0.75, 0],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-1 right-1 top-1 h-px bg-sky-100"
            />
          </div>

          {/* Robot */}
          <motion.div
            animate={{
              y: [0, -1.5, 0],
              rotate: [0, -2, 2, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative z-10"
          >
            <Bot className="size-5" aria-hidden="true" />
          </motion.div>

          {/* Left sensor */}
          <motion.span
            aria-hidden="true"
            animate={{
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -left-1 size-1.5 rounded-full bg-amber-400 ring-2 ring-background"
          />

          {/* Right sensor */}
          <motion.span
            aria-hidden="true"
            animate={{
              opacity: [1, 0.4, 1],
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -right-1 size-1.5 rounded-full bg-amber-400 ring-2 ring-background"
          />

          {/* Online status */}
          <span
            aria-hidden="true"
            className="absolute -bottom-1 -left-1 flex size-3 items-center justify-center rounded-full bg-background ring-2 ring-background"
          >
            <motion.span
              animate={{
                scale: [0.75, 1, 0.75],
                opacity: [0.65, 1, 0.65],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="size-2 rounded-full bg-emerald-500"
            />
          </span>
        </div>

        {/* AI processor badge */}
        <motion.span
          aria-hidden="true"
          animate={{
            y: [0, -1.5, 0],
            rotate: [0, 3, 0],
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-1 top-0 flex size-5 items-center justify-center rounded-md border border-border bg-zinc-950 text-sky-300 shadow-sm dark:bg-white dark:text-sky-600"
        >
          <Cpu className="size-3" />
        </motion.span>
      </motion.div>
    </MotionConfig>
  );
}

export function Brand({
  onNavigate,
  compact = false,
}: BrandProps) {
  return (
    <Link
      href="/"
      onClick={onNavigate}
      aria-label="AI Interviewer home"
      className="group flex min-w-0 items-center gap-3 rounded-xl px-2 py-1.5 outline-none transition-colors duration-200 hover:bg-muted/60 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <AnimatedBrandIcon />

      <div className="min-w-0 leading-tight">
        <AnimatedHeadline
          text="AI Interviewer"
          className="whitespace-nowrap text-sm font-bold tracking-tight text-foreground sm:text-base"
        />

        {!compact && (
          <div className="mt-0.5 flex items-center gap-1.5">
            <motion.span
              aria-hidden="true"
              animate={{
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="size-1.5 shrink-0 rounded-full bg-emerald-500"
            />

            <p className="truncate text-xs font-medium text-muted-foreground">
              AI system online · Ready to interview
            </p>
          </div>
        )}
      </div>
    </Link>
  );
}