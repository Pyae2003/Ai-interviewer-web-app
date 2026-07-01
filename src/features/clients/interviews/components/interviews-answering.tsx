"use client";

import { useMemo, useState } from "react";

import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  Mic,
  CheckCircle2,
} from "lucide-react";

import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

import { saveInterviewAnswer } from "../actions/save-Interview-Answer";

import { Category, Question } from "../type/type";
import { finishInterview } from "../actions/handle-finish";
import { useRouter } from "next/navigation";
import { interviewProcessingPath } from "@/constants/route";

type InterViewsClientAnsweringProp = {
  interview_Id: string;
  category: Category;
  totalQuestions: number;
  questions: Question[];
};

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

  const currentQuestion = questions[currentIndex];

  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  const currentAnswer = answers[currentQuestion.id] ?? "";

  const remainingQuestions = totalQuestions - (currentIndex + 1);

  const isFirstQuestion = currentIndex === 0;

  const isLastQuestion = currentIndex === totalQuestions - 1;

  const answeredCount = useMemo(() => {
    return Object.values(answers).filter((answer) => answer.trim().length > 0)
      .length;
  }, [answers]);

  if (!questions.length) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold">No Questions Found</h2>

            <p className="mt-2 text-muted-foreground">
              Interview questions are unavailable.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const difficultyStyle = {
    EASY: "bg-green-100 text-green-700",
    MEDIUM: "bg-yellow-100 text-yellow-700",
    HARD: "bg-red-100 text-red-700",
  };

  const handlePrevious = () => {
    if (isFirstQuestion) return;

    setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = async () => {
    if (!currentAnswer.trim()) {
      toast.error("Please answer this question first");
      return;
    }

    try {
      setIsSubmitting(true);

      const result = await saveInterviewAnswer({
        interviewId: interview_Id,
        interviewQuestionId: currentQuestion.id,
        answer: currentAnswer.trim(),
      });
      if (
        result?.serverError ||
        result?.validationErrors ||
        !result?.data?.success
      ) {
        throw new Error("Failed to save answer in database");
      }

      if (!isLastQuestion) {
        setCurrentIndex((prev) => prev + 1);

        toast.success("Answer saved successfully");

        return;
      }

      toast.success("Interview completed successfully");
      await finishInterview(interview_Id);
      router.push(interviewProcessingPath(interview_Id));
    } catch (error) {
      console.error(error);

      toast.error("Failed to save answer");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      {/* Header */}
      <Card className="mb-6 border-0 bg-linear-to-r from-sky-100 via-white to-yellow-100 shadow-sm">
        <CardContent className="flex items-center gap-4 p-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-500 text-white">
            <Mic className="h-7 w-7" />
          </div>

          <div>
            <h1 className="text-2xl font-bold">AI Interview</h1>

            <p className="text-muted-foreground">{category.name}</p>
          </div>
        </CardContent>
      </Card>

      {/* Progress */}
      <Card className="sticky top-4 z-20 mb-6 shadow-sm">
        <CardContent className="space-y-4 p-5">
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
            <span>
              Question {currentIndex + 1} of {totalQuestions}
            </span>

            <span>{Math.round(progress)}%</span>
          </div>

          <Progress value={progress} />

          <div className="flex flex-wrap items-center justify-between text-xs text-muted-foreground">
            <span>Answered: {answeredCount}</span>

            <span>Remaining: {remainingQuestions}</span>
          </div>
        </CardContent>
      </Card>

      {/* Question */}
      <Card className="mb-6 border-0 shadow-lg transition-all duration-300">
        <CardContent className="space-y-5 p-6">
          <Badge className={difficultyStyle[currentQuestion.difficulty]}>
            {currentQuestion.difficulty}
          </Badge>

          <h2 className="text-xl font-semibold leading-relaxed md:text-2xl">
            {currentQuestion.questionText}
          </h2>
        </CardContent>
      </Card>

      {/* Answer */}
      <Card className="mb-6 shadow-sm">
        <CardContent className="p-6">
          <Textarea
            rows={10}
            aria-label="Interview Answer"
            placeholder="Write your answer here..."
            value={currentAnswer}
            onChange={(e) =>
              setAnswers((prev) => ({
                ...prev,
                [currentQuestion.id]: e.target.value,
              }))
            }
            className="resize-none"
          />

          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>Provide a detailed answer.</span>

            <span>{currentAnswer.length} characters</span>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={isFirstQuestion || isSubmitting}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>

        <Button
          onClick={handleNext}
          disabled={isSubmitting}
          className="min-w-45"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : isLastQuestion ? (
            <>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Finish Interview
            </>
          ) : (
            <>
              Submit & Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
