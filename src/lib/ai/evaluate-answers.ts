import pLimit from "p-limit";
import { evaluateOneAnswer } from "./evaluate-answer";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

type AnswerItem = {
  question: string;
  answer: string;
  category: string;
  difficulty: string;
};

const limit = pLimit(3);

export async function evaluateAllAnswers(answers: AnswerItem[]) {
  if (answers.length > 50) {
    throw new Error("Batch too large. Max allowed is 50.");
  }

  console.time("evaluateAllAnswers");

  const results = await Promise.allSettled(
    answers.map(async(item) =>{
      await delay(13000)
      return limit(() => evaluateOneAnswer(item))}
    )
  );

  const formatted = results.map((result) =>
    result.status === "fulfilled"
      ? result.value
      : {
          score: 0,
          feedback: "Evaluation failed",
          idealAnswer: "",
          strengths: "",
          weaknesses: "System error (OpenAI failed or timeout)",
          missingPoints: "Not evaluated",
        }
  );

  console.timeEnd("evaluateAllAnswers");

  return formatted;
}