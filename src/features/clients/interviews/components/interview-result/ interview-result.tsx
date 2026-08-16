"use client";

import { MotionConfig } from "framer-motion";
import { InterviewResultProps } from "../../type/interview-result.types";
import { ResultHero } from "./result-hero";
import { PerformanceOverview } from "./ performance-overview";
import { DifficultyBreakdown } from "./difficulty-breakdown";
import { QuestionReview } from "./question-review";
import { ResultActions } from "./result-actions";
import { createResultSummary } from "../../query/ interview-result.utils";


export default function InterviewResult({
  result,
}: InterviewResultProps) {
  const summary = createResultSummary(result);

  return (
    <MotionConfig reducedMotion="user">
      <main className="min-h-screen bg-muted/20">
        <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <ResultHero
            categoryName={result.categoryName}
            summary={summary}
          />

          <PerformanceOverview
            result={result}
            summary={summary}
          />

          <DifficultyBreakdown summary={summary} />

          <QuestionReview answers={result.answers} />

          <ResultActions />
        </div>
      </main>
    </MotionConfig>
  );
}
