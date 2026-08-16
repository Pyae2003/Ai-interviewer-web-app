"use client";

import Link from "next/link";
import { motion, MotionConfig } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  FileQuestion,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { histroyDetailPath } from "@/constants/route";
import { InterviewListItem } from "../../types/interview-list.types";
import { formatInterviewDate, normalizeCount, normalizeScore } from "../../query/ interview-list.utils";
import { InterviewStatusBadge } from "./interview-status-badge";
import { InterviewScore } from "./interview-score";
import { InterviewStat } from "./interview-stat";


type InterviewResultCardProps = Readonly<{
  interview: InterviewListItem;
  categoryName: string;
  index: number;
}>;

export function InterviewResultCard({
  interview,
  categoryName,
  index,
}: InterviewResultCardProps) {
  const score = normalizeScore(interview.score);
  const totalQuestions = normalizeCount(interview.totalQuestions);
  const answeredQuestions = Math.min(
    totalQuestions,
    normalizeCount(interview.answeredQuestions),
  );
  const interviewDate = formatInterviewDate(interview.createdAt);

  return (
    <MotionConfig reducedMotion="user">
      <motion.article
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 0.42,
          delay: Math.min(index * 0.055, 0.22),
          ease: [0.22, 1, 0.36, 1],
        }}
        whileHover={{ y: -3 }}
        className="h-full"
      >
        <Card className="group relative h-full overflow-hidden rounded-2xl border border-border/70 bg-card shadow-[0_10px_32px_rgba(15,23,42,0.06)] transition-[border-color,box-shadow] duration-300 hover:border-sky-300 hover:shadow-[0_18px_42px_rgba(15,23,42,0.10)] dark:hover:border-sky-700">
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-sky-500" />

          <CardContent className="flex h-full flex-col p-5 pt-6">
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground">
                <CalendarDays
                  className="size-4 shrink-0 text-sky-500"
                  aria-hidden="true"
                />

                <time
                  dateTime={interviewDate.dateTime}
                  className="truncate font-medium"
                >
                  {interviewDate.label}
                </time>
              </div>

              <InterviewStatusBadge status={interview.status} />
            </div>

            <div className="mt-5">
              <InterviewScore score={score} />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <InterviewStat
                icon={FileQuestion}
                label="Questions"
                value={totalQuestions}
                tone="violet"
              />

              <InterviewStat
                icon={CheckCircle2}
                label="Answered"
                value={answeredQuestions}
                tone="emerald"
              />
            </div>

            <Button
              asChild
              className="mt-5 h-11 w-full rounded-xl bg-sky-600 font-semibold text-white shadow-sm transition-[background-color,box-shadow] duration-200 hover:bg-sky-700 hover:shadow-md dark:bg-sky-500 dark:hover:bg-sky-600"
            >
              <Link
                href={histroyDetailPath(interview.id)}
                aria-label={`View ${categoryName} interview from ${interviewDate.label}`}
              >
                View interview

                <ArrowRight
                  className="ml-2 size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </motion.article>
    </MotionConfig>
  );
}