"use client";
import {  MotionConfig } from "framer-motion";
import { Sparkles } from "lucide-react";


export function DashboardHeadline() {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {" "}
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/75 px-3 py-1.5 text-sm font-medium text-zinc-600 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
        {" "}
        <Sparkles className="h-4 w-4 text-sky-500" aria-hidden="true" />{" "}
        AI-powered interview practice{" "}
      </div>{" "}
      <MotionConfig reducedMotion="user">
        {" "}
       
      </MotionConfig>{" "}
      <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-zinc-500 sm:text-lg dark:text-zinc-400">
        {" "}
        Select a category group and begin a focused interview practice session
        designed to improve your skills and confidence.{" "}
      </p>{" "}
    </div>
  );
}
