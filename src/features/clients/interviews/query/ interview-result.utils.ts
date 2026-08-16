import { InterviewGrade, InterviewResultSummary } from "../type/interview-result.types";
import type { InterviewResultData } from "../type/type";

export function clampScore(score: number) {
  if (!Number.isFinite(score)) {
    return 0;
  }

  return Math.min(100, Math.max(0, Math.round(score)));
}

export function normalizeCount(count: number) {
  if (!Number.isFinite(count)) {
    return 0;
  }

  return Math.max(0, Math.floor(count));
}

function getGrade(score: number): InterviewGrade {
  if (score >= 90) return "A+";
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";

  return "D";
}

export function createResultSummary(
  result: InterviewResultData,
): InterviewResultSummary {
  const score = clampScore(result.score);

  return {
    score,
    completionRate: clampScore(result.completionRate),
    easyScore: clampScore(result.easyScore),
    mediumScore: clampScore(result.mediumScore),
    hardScore: clampScore(result.hardScore),
    grade: getGrade(score),
    passed: score >= 70,
  };
}
