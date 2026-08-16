"use client";

import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Question } from "../../type/type";


const difficultyStyles = {
  EASY:
    "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/50 dark:text-emerald-400",
  MEDIUM:
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/50 dark:text-amber-400",
  HARD:
    "border-red-200 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/50 dark:text-red-400",
} satisfies Record<Question["difficulty"], string>;

type InterviewQuestionCardProps = {
  question: Question;
};

export function InterviewQuestionCard({
  question,
}: InterviewQuestionCardProps) {
  return (
    <motion.section
      key={question.id}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.34,
        ease: [0.22, 1, 0.36, 1],
      }}
      aria-labelledby={`question-${question.id}`}
    >
      <Card className="overflow-hidden rounded-3xl border border-border/70 bg-card shadow-[0_14px_42px_rgba(15,23,42,0.07)] transition-[border-color,box-shadow] duration-300 hover:border-sky-300 hover:shadow-[0_18px_48px_rgba(15,23,42,0.10)] dark:hover:border-sky-800">
        <div aria-hidden="true" className="h-1 bg-sky-500" />

        <CardContent className="p-5 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Badge
              variant="outline"
              className={`rounded-full px-3 py-1 ${difficultyStyles[question.difficulty]}`}
            >
              {question.difficulty}
            </Badge>

            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Interview question
            </span>
          </div>

          <h2
            id={`question-${question.id}`}
            className="mt-5 text-xl font-semibold leading-8 tracking-tight text-foreground sm:text-2xl sm:leading-9"
          >
            {question.questionText}
          </h2>
        </CardContent>
      </Card>
    </motion.section>
  );
}
