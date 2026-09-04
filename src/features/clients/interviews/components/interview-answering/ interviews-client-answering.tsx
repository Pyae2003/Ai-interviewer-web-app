"use client";

import { useMemo, useState } from "react";
import { MotionConfig } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { interviewProcessingPath } from "@/constants/route";
import { InterviewsClientAnsweringProps } from "../../type/interview-answering.types";
import { EmptyInterviewState } from "./empty-interview-state";
import { saveInterviewAnswer } from "../../actions/save-Interview-Answer";
import { finishInterview } from "../../actions/handle-finish";
import { InterviewHeader } from "./interview-header";
import { InterviewProgressCard } from "./interview-progress-card";
import { InterviewQuestionCard } from "./interview-question-card";
import { InterviewAnswerEditor } from "./interview-answer-editor";
import { InterviewNavigation } from "./interview-navigation";


export default function InterviewsClientAnswering({
  interview_Id,
  category,
  questions,
  totalQuestions,
}: InterviewsClientAnsweringProps) {
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

  if (questions.length === 0) {
    return <EmptyInterviewState />;
  }

  const safeCurrentIndex = Math.min(
    currentIndex,
    questions.length - 1,
  );

  const currentQuestion = questions[safeCurrentIndex]!;

  // The rendered question array is the source of truth when counts disagree.
  const actualTotalQuestions =
    totalQuestions > 0 && totalQuestions === questions.length
      ? totalQuestions
      : questions.length;

  const progress = Math.min(
    100,
    Math.max(
      0,
      ((safeCurrentIndex + 1) / actualTotalQuestions) * 100,
    ),
  );

  const currentAnswer = answers[currentQuestion.id] ?? "";

  const remainingQuestions = Math.max(
    0,
    actualTotalQuestions - (safeCurrentIndex + 1),
  );

  const isFirstQuestion = safeCurrentIndex === 0;
  const isLastQuestion = safeCurrentIndex === questions.length - 1;

  function handleAnswerChange(answer: string) {
    setAnswers((previousAnswers) => ({
      ...previousAnswers,
      [currentQuestion.id]: answer,
    }));
  }

  function handlePrevious() {
    if (isFirstQuestion || isSubmitting) {
      return;
    }

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

    if (isSubmitting) {
      return;
    }

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
          Math.min(questions.length - 1, previousIndex + 1),
        );
        return;
      }

      await finishInterview(interview_Id);

      toast.success("Interview completed successfully.");
      router.push(interviewProcessingPath(interview_Id));
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
      <main className="min-h-screen bg-muted/20">
        <div className="mx-auto w-full max-w-5xl space-y-6 px-4 py-8 sm:px-6 sm:py-10">
          <InterviewHeader categoryName={category.name} />

          <InterviewProgressCard
            currentQuestion={safeCurrentIndex + 1}
            totalQuestions={actualTotalQuestions}
            answeredCount={answeredCount}
            remainingQuestions={remainingQuestions}
            progress={progress}
          />

          <InterviewQuestionCard question={currentQuestion} />

          <InterviewAnswerEditor
            answer={currentAnswer}
            disabled={isSubmitting}
            onAnswerChange={handleAnswerChange}
          />

          <InterviewNavigation
            isFirstQuestion={isFirstQuestion}
            isLastQuestion={isLastQuestion}
            isSubmitting={isSubmitting}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />
        </div>
      </main>
    </MotionConfig>
  );
}