"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import AiLoader from "./ai-loader";
import ProgressBar from "./progress-bar";
import ProgressRing from "./processing-ring";
import { useProgress } from "./use-progress";
import { useTypingMessages } from "./use-typing-message";

import { interviewResultPath } from "@/constants/route";

type ProcessingPageProps = {
  interviewId: string;
};

export default function ProcessingPage({
  interviewId,
}: ProcessingPageProps) {
  const router = useRouter();

  const progress = useProgress();
  const message = useTypingMessages();

  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    const controller = new AbortController();

    const pollStatus = async () => {
      try {
        const res = await fetch(
          `/api/interviews/status?id=${interviewId}`,
          {
            cache: "no-store",
            signal: controller.signal,
          }
        );

        if (!res.ok) {
          return;
        }

        const data = await res.json();

        if (!mountedRef.current) return;

        switch (data.status) {
          case "COMPLETED":
            router.replace(interviewResultPath(interviewId));
            break;

          case "FAILED":
            router.replace("/failed");
            break;

          default:
            break;
        }
      } catch (error) {
        if ((error as Error).name === "AbortError") {
          return;
        }

        console.error("Polling Error:", error);
      }
    };

    pollStatus();

    const interval = setInterval(pollStatus, 2500);

    return () => {
      mountedRef.current = false;
      controller.abort();
      clearInterval(interval);
    };
  }, [interviewId, router]);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-linear-to-br from-sky-50 via-white to-yellow-50 px-4">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden opacity-40 blur-3xl">
        <div className="absolute left-10 top-10 h-72 w-72 animate-pulse rounded-full bg-sky-300" />
        <div className="absolute bottom-10 right-10 h-72 w-72 animate-pulse rounded-full bg-yellow-300" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl space-y-10 text-center">
        <AiLoader />

        <motion.h2
          key={message}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="text-lg font-medium text-gray-800"
        >
          {message}
        </motion.h2>

        <div className="flex justify-center">
          <ProgressRing progress={progress} />
        </div>

        <ProgressBar progress={progress} />

        <p className="text-sm text-muted-foreground">
          Please wait while our AI evaluates your interview. This usually takes
          a few moments.
        </p>
      </div>
    </div>
  );
}