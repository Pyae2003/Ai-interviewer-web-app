"use client";

import { motion, MotionConfig, type Variants } from "framer-motion";
import {
  Brain,
  CheckCircle2,
  HelpCircle,
  MessageSquare,
  XCircle,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { HistoryQuestionListProps } from "../../types/history-question-list.types";
import { normalizeQuestionScore } from "../../query/history-question.utils";
import { QuestionResultHeader } from "./ question-result-header";
import { ResponseContentSection } from "./response-content-section";
import { InsightPanel } from "./insight-panel";
import { IdealAnswerSection } from "./ ideal-answer-section";


const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 8,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function HistoryQuestionList({
  item,
  index,
}: HistoryQuestionListProps) {
  const normalizedScore = normalizeQuestionScore(item.score);

  return (
    <MotionConfig reducedMotion="user">
      <motion.article
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        variants={cardVariants}
      >
        <Card className="relative overflow-hidden rounded-3xl border border-border/70 bg-card shadow-[0_14px_44px_rgba(15,23,42,0.07)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-[0_20px_58px_rgba(15,23,42,0.10)] dark:hover:border-sky-800">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-1 bg-sky-500"
          />

          <QuestionResultHeader
            item={item}
            index={index}
            score={normalizedScore}
          />

          <CardContent className="space-y-6 p-5 sm:p-7">
            <ResponseContentSection
              id={`question-${item.id}`}
              icon={HelpCircle}
              title="Question"
              content={item.questionText}
              fallback="Question text is unavailable."
              tone="sky"
            />

            <ResponseContentSection
              id={`answer-${item.id}`}
              icon={Brain}
              title="Your Answer"
              content={item.answer}
              fallback="No answer was submitted."
              tone="violet"
            />

            {item.feedback && (
              <InsightPanel
                icon={MessageSquare}
                title="AI Feedback"
                content={item.feedback}
                fallback="No feedback is available."
                tone="indigo"
              />
            )}

            <div className="grid gap-5 lg:grid-cols-2">
              <InsightPanel
                icon={CheckCircle2}
                title="Strengths"
                content={item.strengths}
                fallback="No strengths were identified."
                tone="emerald"
              />

              <InsightPanel
                icon={XCircle}
                title="Areas to Improve"
                content={item.weaknesses}
                fallback="No specific weaknesses were identified."
                tone="rose"
              />
            </div>

            <IdealAnswerSection answer={item.idealAnswer} />
          </CardContent>
        </Card>
      </motion.article>
    </MotionConfig>
  );
}
