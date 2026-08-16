"use client";

import { MotionConfig } from "framer-motion";

import { LoginCard } from "./login-card";

export function LoginForm() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-12 dark:bg-zinc-950">
        <div className="w-full max-w-md">

          <LoginCard />
        </div>
      </main>
    </MotionConfig>
  );
}