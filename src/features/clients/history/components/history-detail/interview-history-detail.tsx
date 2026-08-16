"use client";

import { MotionConfig } from "framer-motion";
import { InterviewHistoryDetailProps } from "../../types/ interview-history.types";
import { HistorySummaryCard } from "./history-summary-card";
import { QuestionResultsSection } from "./question-results-section";
import { createInterviewHistorySummary } from "../../query/interview-history.utils";


export default function InterviewHistoryDetail(
  props: InterviewHistoryDetailProps,
) {
  const { categoryName, questions } = props;
  const summary = createInterviewHistorySummary(props);

  return (
    <MotionConfig reducedMotion="user">
      <main className="min-h-screen bg-muted/20">
        <div className="mx-auto max-w-5xl space-y-8 px-4 py-10 sm:px-6 sm:py-14">
          <HistorySummaryCard
            categoryName={categoryName}
            summary={summary}
          />

          <QuestionResultsSection questions={questions} />
        </div>
      </main>
    </MotionConfig>
  );
}
