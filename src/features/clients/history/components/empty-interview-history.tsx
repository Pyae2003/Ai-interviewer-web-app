"use client";

import Link from "next/link";
import {
  motion,
  MotionConfig,
} from "framer-motion";
import {
  ArrowRight,
  ClipboardList,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

export function EmptyInterviewHistory() {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        initial={{
          opacity: 0,
          y: 16,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mt-8 sm:mt-10"
      >
        <Card className="overflow-hidden rounded-3xl border border-border/70 bg-card shadow-[0_18px_50px_rgba(15,23,42,0.07)]">
          <CardContent className="flex flex-col items-center px-6 py-14 text-center sm:px-10 sm:py-20">
            {/* Icon */}
            <motion.div
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative flex size-16 items-center justify-center rounded-2xl border border-sky-200 bg-sky-50 text-sky-600 shadow-sm dark:border-sky-900/70 dark:bg-sky-950/40 dark:text-sky-400"
            >
              <ClipboardList
                className="size-7"
                aria-hidden="true"
              />

              <motion.span
                animate={{
                  scale: [0.8, 1, 0.8],
                  opacity: [0.55, 1, 0.55],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -right-1 -top-1 size-3 rounded-full border-2 border-card bg-emerald-500"
                aria-hidden="true"
              />
            </motion.div>

            {/* Content */}
            <h2 className="mt-6 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              No interview history yet
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
              Complete your first AI-powered interview to receive personalized
              feedback, performance scores, strengths, and recommendations.
            </p>

            {/* Action */}
            <Button
              asChild
              size="lg"
              className="group mt-7 h-12 rounded-xl bg-sky-600 px-6 font-semibold text-white shadow-sm transition-[background-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:bg-sky-700 hover:shadow-md dark:bg-sky-500 dark:hover:bg-sky-600"
            >
              <Link href="/dashboard">
                Start an interview

                <ArrowRight
                  className="ml-2 size-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </MotionConfig>
  );
}