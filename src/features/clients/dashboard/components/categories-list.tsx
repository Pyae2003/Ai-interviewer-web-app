"use client";

import { useTransition } from "react";
import {
  motion,
  MotionConfig,
  type Variants,
} from "framer-motion";
import {
  Briefcase,
  FileQuestion,
  Loader2,
  Mic,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Category } from "@/features/admin/category/type/category-type";
import { startInterview } from "../../interviews/actions/start-interview";

type CategoriesProp = {
  category: Category;
};

const titleContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.04,
      staggerChildren: 0.055,
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
      duration: 0.42,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function AnimatedCategoryTitle({
  title,
}: {
  title: string;
}) {
  const words = title.trim().split(/\s+/);

  return (
    <MotionConfig reducedMotion="user">
      <motion.h3
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.7,
        }}
        variants={titleContainerVariants}
        aria-label={title}
        className="line-clamp-2 text-lg font-bold tracking-tight text-zinc-950 dark:text-white"
      >
        {words.map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            aria-hidden="true"
            variants={titleWordVariants}
            className={
              index === words.length - 1
                ? "inline-block"
                : "mr-[0.24em] inline-block"
            }
          >
            {word}
          </motion.span>
        ))}
      </motion.h3>
    </MotionConfig>
  );
}


const CategoriesList = ({
  category,
}: CategoriesProp) => {
  const [isPending, startTransition] = useTransition();

  function handleStart() {
    if (isPending) return;

    startTransition(() => {
      void startInterview(category.id);
    });
  }

  return (
    <Card className="group relative overflow-hidden rounded-3xl border border-black/5 bg-white/85 shadow-[0_10px_35px_rgba(15,23,42,0.06)] backdrop-blur-md transition-[transform,border-color,box-shadow,background-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-sky-300/70 hover:bg-white hover:shadow-[0_20px_55px_rgba(15,23,42,0.11)] dark:border-white/10 dark:bg-zinc-900/80 dark:hover:border-sky-500/40 dark:hover:bg-zinc-900">
      {/* Top accent */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-sky-400 via-sky-300 to-yellow-300"
      />

      {/* Subtle corner glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-sky-100/60 blur-3xl dark:bg-sky-900/15"
      />

      <CardContent className="relative p-5 sm:p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-3.5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-sky-400 to-yellow-300 text-zinc-950 shadow-sm ring-1 ring-black/5 transition-transform duration-300 ease-out group-hover:scale-[1.03] dark:ring-white/10">
              <Briefcase
                className="h-5 w-5"
                aria-hidden="true"
              />
            </div>

            <div className="min-w-0 pt-0.5">
              <AnimatedCategoryTitle
                title={category.name}
              />

              <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                {category.description ||
                  "No description available"}
              </p>
            </div>
          </div>

          <Badge
            variant="outline"
            className={
              category.isActive
                ? "shrink-0 rounded-full border-emerald-200 bg-emerald-50 px-2.5 py-1 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/60 dark:text-emerald-400"
                : "shrink-0 rounded-full border-red-200 bg-red-50 px-2.5 py-1 text-red-700 dark:border-red-900/70 dark:bg-red-950/60 dark:text-red-400"
            }
          >
            <span
              aria-hidden="true"
              className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current"
            />

            {category.isActive ? "Active" : "Inactive"}
          </Badge>
        </div>

        {/* Statistics */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-sky-100/80 bg-sky-50/80 p-4 transition-colors duration-200 hover:bg-sky-100/80 dark:border-sky-900/50 dark:bg-sky-950/40 dark:hover:bg-sky-950/60">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white text-sky-600 shadow-sm dark:bg-zinc-900 dark:text-sky-400">
              <FileQuestion
                className="h-4 w-4"
                aria-hidden="true"
              />
            </div>

            <p className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">
              {category._count.questions}
            </p>

            <p className="mt-0.5 text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Questions
            </p>
          </div>

          <div className="rounded-2xl border border-yellow-100/80 bg-yellow-50/80 p-4 transition-colors duration-200 hover:bg-yellow-100/80 dark:border-yellow-900/50 dark:bg-yellow-950/40 dark:hover:bg-yellow-950/60">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white text-yellow-600 shadow-sm dark:bg-zinc-900 dark:text-yellow-400">
              <Mic
                className="h-4 w-4"
                aria-hidden="true"
              />
            </div>

            <p className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">
              {category._count.interviews}
            </p>

            <p className="mt-0.5 text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Interviews
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-5 rounded-2xl border border-black/5 bg-linear-to-r from-sky-500 to-yellow-400 p-4 text-zinc-950 shadow-sm dark:border-white/10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h4 className="font-bold tracking-tight">
                Ready to practice?
              </h4>

              <p className="mt-1 text-sm text-zinc-800/75">
                Start an AI-powered interview session.
              </p>
            </div>

            <Button
              size="sm"
              type="button"
              disabled={isPending}
              onClick={handleStart}
              aria-label={`Start ${category.name} interview`}
              className="h-10 shrink-0 rounded-xl bg-white px-4 font-semibold text-zinc-950 shadow-sm transition-[background-color,box-shadow] duration-200 hover:bg-zinc-50 hover:shadow-md disabled:opacity-70"
            >
              {isPending ? (
                <>
                  <Loader2
                    className="mr-2 h-4 w-4 animate-spin"
                    aria-hidden="true"
                  />
                  Starting...
                </>
              ) : (
                <>
                  <Mic
                    className="mr-2 h-4 w-4"
                    aria-hidden="true"
                  />
                  Start Interview
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoriesList;
