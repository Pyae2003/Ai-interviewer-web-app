"use client";

import { MotionConfig } from "framer-motion";

import { SignUpBrand } from "./sign-up-brand";
import { SignUpCard } from "./sign-up-card";

export function SignUpForm() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-12 dark:bg-zinc-950">
        <div className="w-full max-w-2xl">
          <SignUpCard />
        </div>
      </main>
    </MotionConfig>
  );
}