import { InterviewHistoryDetailProps, InterviewHistorySummary } from "../types/ interview-history.types";


const completedDateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeZone: "UTC",
});

function normalizeCount(value: number) {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.max(0, Math.floor(value));
}

function formatCompletedDate(value: Date) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Unknown date";
  }

  return completedDateFormatter.format(date);
}

export function createInterviewHistorySummary({
  score,
  totalQuestions,
  completedAt,
  questions,
}: InterviewHistoryDetailProps): InterviewHistorySummary {
  const normalizedQuestionCount = normalizeCount(totalQuestions);

  const actualTotalQuestions =
    normalizedQuestionCount > 0
      ? normalizedQuestionCount
      : questions.length;

  const maximumScore = actualTotalQuestions * 10;

  const roundedScore = Number.isFinite(score)
    ? Math.max(0, Math.round(score))
    : 0;

  const safeScore =
    maximumScore > 0
      ? Math.min(maximumScore, roundedScore)
      : 0;

  const percentage =
    maximumScore > 0
      ? Math.min(
          100,
          Math.max(0, Math.round((safeScore / maximumScore) * 100)),
        )
      : 0;

  const correctAnswers = questions.filter(
    (question) => question.isCorrect,
  ).length;

  return {
    score: safeScore,
    maximumScore,
    percentage,
    totalQuestions: actualTotalQuestions,
    correctAnswers,
    completedDate: formatCompletedDate(completedAt),
    passed: percentage >= 70,
  };
}
