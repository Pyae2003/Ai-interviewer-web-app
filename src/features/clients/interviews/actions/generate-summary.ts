type EvaluationResult = {
  score: number;
  feedback: string;
  idealAnswer: string;
  strengths: string;
  weaknesses: string;
  missingPoints?: string;
};

type SummaryResult = {
  totalScore: number;
  averageScore: number;
  maxScore: number;
  minScore: number;

  strongCount: number;
  weakCount: number;

  summary: string;
};

export async function generateSummary(
  results: EvaluationResult[],
): Promise<SummaryResult> {
  if (!results || results.length === 0) {
    return {
      totalScore: 0,
      averageScore: 0,
      maxScore: 0,
      minScore: 0,
      strongCount: 0,
      weakCount: 0,
      summary: "No evaluation results found.",
    };
  }

  // 1. Basic stats
  const scores = results.map((result) => result.score);

  const totalScore = scores.reduce((a, b) => a + b, 0);
  const averageScore = Math.round(totalScore / results.length);
  const maxScore = Math.max(...scores);
  const minScore = Math.min(...scores);

  // 2. Performance analysis
  const strongCount = results.filter((result) => result.score >= 75).length;
  const weakCount = results.filter((result) => result.score < 60).length;

  // 3. Build summary text (simple AI-like logic)
  const performanceLevel =
    averageScore >= 80
      ? "Excellent"
      : averageScore >= 60
        ? "Good"
        : averageScore >= 40
          ? "Average"
          : "Poor";

  const mainWeaknesses = results
    .filter((result) => result.score < 60)
    .map((result) => result.weaknesses)
    .join(" | ");

  const mainStrengths = results
    .filter((result) => result.score >= 75)
    .map((result) => result.strengths)
    .join(" | ");

  const summary = `
Performance Level: ${performanceLevel}

The candidate achieved an average score of ${averageScore}/100.

Strengths:
${mainStrengths || "No strong areas detected"}

Weaknesses:
${mainWeaknesses || "No major weaknesses detected"}

Overall: ${
    averageScore >= 70
      ? "Candidate shows strong technical capability."
      : "Candidate needs improvement in key areas."
  }
`.trim();

  return {
    totalScore,
    averageScore,
    maxScore,
    minScore,
    strongCount,
    weakCount,
    summary,
  };
}
