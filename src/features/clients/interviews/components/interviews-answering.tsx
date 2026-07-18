"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  motion,
  MotionConfig,
  type Variants,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileQuestion,
  Loader2,
  Mic,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

import { interviewProcessingPath } from "@/constants/route";

import { saveInterviewAnswer } from "../actions/save-Interview-Answer";
import { finishInterview } from "../actions/handle-finish";
import type { Category, Question } from "../type/type";

type InterViewsClientAnsweringProp = {
  interview_Id: string;
  category: Category;
  totalQuestions: number;
  questions: Question[];
};

const headlineContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.06,
      staggerChildren: 0.07,
    },
  },
};

const headlineWordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 6,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.46,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function AnimatedHeadline() {
  const words = [
    {
      text: "AI",
      gradient: false,
    },
    {
      text: "Interview",
      gradient: true,
    },
  ];

  return (
    <motion.h1
      initial="hidden"
      animate="visible"
      variants={headlineContainerVariants}
      aria-label="AI Interview"
      className="text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl dark:text-white"
    >
      {words.map((word) => (
        <motion.span
          key={word.text}
          aria-hidden="true"
          variants={headlineWordVariants}
          className={
            word.gradient
              ? "inline-block bg-linear-to-r from-sky-500 to-yellow-500 bg-clip-text text-transparent"
              : "mr-[0.22em] inline-block"
          }
        >
          {word.text}
        </motion.span>
      ))}
    </motion.h1>
  );
}

export default function InterViewsClientAnswering({
  interview_Id,
  category,
  questions,
  totalQuestions,
}: InterViewsClientAnsweringProp) {
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const answeredCount = useMemo(
    () =>
      Object.values(answers).filter(
        (answer) => answer.trim().length > 0,
      ).length,
    [answers],
  );

  /*
   * Check the array before accessing currentQuestion.id.
   * This prevents a runtime error when no questions exist.
   */
  if (questions.length === 0) {
    return (
      <main className="flex min-h-[65vh] items-center justify-center px-4 py-12">
        <Card className="w-full max-w-lg overflow-hidden rounded-3xl border border-black/5 bg-white/85 shadow-[0_20px_60px_rgba(15,23,42,0.09)] backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/80">
          <CardContent className="flex flex-col items-center px-6 py-14 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-sky-100 to-yellow-100 text-sky-600 dark:from-sky-950 dark:to-yellow-950 dark:text-sky-400">
              <FileQuestion
                className="h-7 w-7"
                aria-hidden="true"
              />
            </div>

            <h2 className="mt-5 text-xl font-semibold tracking-tight text-zinc-950 dark:text-white">
              No questions found
            </h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-500 dark:text-zinc-400">
              Interview questions are currently unavailable for this
              category.
            </p>
          </CardContent>
        </Card>
      </main>
    );
  }

  const currentQuestion = questions[currentIndex];

  const actualTotalQuestions =
    totalQuestions > 0 ? totalQuestions : questions.length;

  const progress = Math.min(
    100,
    Math.max(
      0,
      ((currentIndex + 1) / actualTotalQuestions) * 100,
    ),
  );

  const currentAnswer =
    answers[currentQuestion.id] ?? "";

  const remainingQuestions = Math.max(
    0,
    actualTotalQuestions - (currentIndex + 1),
  );

  const isFirstQuestion = currentIndex === 0;

  const isLastQuestion =
    currentIndex === questions.length - 1;

  const difficultyStyles: Record<
    Question["difficulty"],
    string
  > = {
    EASY:
      "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/50 dark:text-emerald-400",
    MEDIUM:
      "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/60 dark:bg-amber-950/50 dark:text-amber-400",
    HARD:
      "border-red-200 bg-red-50 text-red-700 dark:border-red-900/60 dark:bg-red-950/50 dark:text-red-400",
  };

  function handlePrevious() {
    if (isFirstQuestion || isSubmitting) return;

    setCurrentIndex((previousIndex) =>
      Math.max(0, previousIndex - 1),
    );
  }

  async function handleNext() {
    const trimmedAnswer = currentAnswer.trim();

    if (!trimmedAnswer) {
      toast.error("Please answer this question first.");
      return;
    }

    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      const result = await saveInterviewAnswer({
        interviewId: interview_Id,
        interviewQuestionId: currentQuestion.id,
        answer: trimmedAnswer,
      });

      if (
        result?.serverError ||
        result?.validationErrors ||
        !result?.data?.success
      ) {
        throw new Error("Unable to save your answer.");
      }

      if (!isLastQuestion) {
        setCurrentIndex((previousIndex) =>
          Math.min(
            questions.length - 1,
            previousIndex + 1,
          ),
        );

        toast.success("Answer saved.");
        return;
      }

      await finishInterview(interview_Id);

      toast.success("Interview completed successfully.");

      router.push(
        interviewProcessingPath(interview_Id),
      );
    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative min-h-screen overflow-hidden bg-transparent">
        {/* Static background accents */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-sky-200/25 blur-3xl dark:bg-sky-800/10"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 top-32 h-96 w-96 rounded-full bg-yellow-200/25 blur-3xl dark:bg-yellow-700/10"
        />

        <div className="relative mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
          {/* Header */}
          <Card className="mb-6 overflow-hidden rounded-3xl border border-black/5 bg-white/80 shadow-[0_18px_55px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/80">
            <CardContent className="relative p-0">
              <div className="absolute inset-0 bg-linear-to-r from-sky-50/80 via-white/50 to-yellow-50/80 dark:from-sky-950/50 dark:via-transparent dark:to-yellow-950/40" />

              <div className="relative flex items-center gap-4 p-5 sm:p-6">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-sky-400 to-yellow-300 text-zinc-950 shadow-sm ring-1 ring-black/5 dark:ring-white/10">
                  <Mic
                    className="h-6 w-6"
                    aria-hidden="true"
                  />
                </div>

                <div className="min-w-0">
                  <AnimatedHeadline />

                  <p className="mt-1 truncate text-sm text-zinc-500 sm:text-base dark:text-zinc-400">
                    {category.name}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sticky progress */}
          <Card className="sticky top-4 z-20 mb-6 rounded-2xl border border-black/5 bg-white/85 shadow-[0_12px_40px_rgba(15,23,42,0.07)] backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/85">
            <CardContent className="space-y-4 p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    Question {currentIndex + 1} of{" "}
                    {actualTotalQuestions}
                  </p>

                  <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                    Complete each answer before continuing
                  </p>
                </div>

                <span className="rounded-full border border-sky-100 bg-sky-50 px-3 py-1.5 text-sm font-semibold text-sky-700 dark:border-sky-900/60 dark:bg-sky-950/40 dark:text-sky-400">
                  {Math.round(progress)}%
                </span>
              </div>

              <Progress
                value={progress}
                aria-label={`Interview progress ${Math.round(
                  progress,
                )}%`}
                className="h-2.5 bg-zinc-200/80 dark:bg-zinc-800 [&>div]:bg-linear-to-r [&>div]:from-sky-500 [&>div]:to-yellow-400"
              />

              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                <span>Answered: {answeredCount}</span>
                <span>Remaining: {remainingQuestions}</span>
              </div>
            </CardContent>
          </Card>

          {/* Question */}
          <Card className="mb-6 overflow-hidden rounded-3xl border border-black/5 bg-white/85 shadow-[0_16px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/80">
            <div
              aria-hidden="true"
              className="h-1 bg-linear-to-r from-sky-500 via-cyan-400 to-yellow-400"
            />

            <CardContent className="p-5 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Badge
                  variant="outline"
                  className={`rounded-full px-3 py-1 ${difficultyStyles[currentQuestion.difficulty]}`}
                >
                  {currentQuestion.difficulty}
                </Badge>

                <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                  Interview question
                </span>
              </div>

              <h2 className="mt-5 text-xl font-semibold leading-8 tracking-tight text-zinc-950 sm:text-2xl sm:leading-9 dark:text-white">
                {currentQuestion.questionText}
              </h2>
            </CardContent>
          </Card>

          {/* Answer */}
          <Card className="mb-6 rounded-3xl border border-black/5 bg-white/85 shadow-[0_12px_40px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/80">
            <CardContent className="p-5 sm:p-7">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600 dark:bg-sky-950/50 dark:text-sky-400">
                  <Sparkles
                    className="h-4 w-4"
                    aria-hidden="true"
                  />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    Your Answer
                  </h3>

                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Explain your answer clearly and include examples.
                  </p>
                </div>
              </div>

              <Textarea
                rows={10}
                aria-label="Interview answer"
                placeholder="Write your detailed answer here..."
                value={currentAnswer}
                disabled={isSubmitting}
                onChange={(event) =>
                  setAnswers((previousAnswers) => ({
                    ...previousAnswers,
                    [currentQuestion.id]:
                      event.target.value,
                  }))
                }
                className="min-h-64 resize-none rounded-2xl border-black/10 bg-white p-4 text-sm leading-7 shadow-none transition-colors placeholder:text-zinc-400 focus-visible:border-sky-400 focus-visible:ring-sky-200/70 dark:border-white/10 dark:bg-zinc-950/60 dark:focus-visible:ring-sky-900 sm:text-base"
              />

              <div className="mt-3 flex flex-wrap justify-between gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                <span>
                  Provide a detailed and relevant response.
                </span>

                <span aria-live="polite">
                  {currentAnswer.length} characters
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={
                isFirstQuestion || isSubmitting
              }
              className="h-11 rounded-xl border-black/10 bg-white px-5 font-medium text-zinc-700 shadow-sm transition-colors hover:bg-zinc-50 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
            >
              <ArrowLeft
                className="mr-2 h-4 w-4"
                aria-hidden="true"
              />
              Previous
            </Button>

            <Button
              type="button"
              onClick={handleNext}
              disabled={isSubmitting}
              className="group h-11 min-w-48 rounded-xl bg-linear-to-r from-sky-500 to-yellow-400 px-6 font-semibold text-zinc-950 shadow-sm transition-opacity hover:opacity-90"
            >
              {isSubmitting ? (
                <>
                  <Loader2
                    className="mr-2 h-4 w-4 animate-spin"
                    aria-hidden="true"
                  />
                  {isLastQuestion
                    ? "Finishing..."
                    : "Saving..."}
                </>
              ) : isLastQuestion ? (
                <>
                  <CheckCircle2
                    className="mr-2 h-4 w-4"
                    aria-hidden="true"
                  />
                  Finish Interview
                </>
              ) : (
                <>
                  Submit & Next
                  <ArrowRight
                    className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </>
              )}
            </Button>
          </div>
        </div>
      </main>
    </MotionConfig>
  );
}

