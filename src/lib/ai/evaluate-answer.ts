import { handleOpenAIError } from "@/middleware";
import { gemini } from "./gemini";
import { buildEvaluationPrompt } from "./evaluate-prompt";
import { EvaluationResult, EvaluationSchema } from "./evalutate-schema";
import { withRetry } from "./retry";

type Input = {
  question: string;
  answer: string;
  category: string;
  difficulty: string;
};

export async function evaluateOneAnswer(
  input: Input,
): Promise<EvaluationResult> {
  try {
    const prompt = buildEvaluationPrompt(input);

    const rawResponse = await withRetry(async () => {
      const response = await gemini.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `
                      You are a strict senior software engineering interviewer.

                      Return ONLY valid JSON.

                      ${prompt}
                `,
              },
            ],
          },
        ],
      });
      console.log("this is ai response " ,response);
      return response.text ?? "";
    });

    console.log("this is reponse.text response",rawResponse)

    if (!rawResponse) {
      throw new Error("Empty Gemini response");
    }

    // Remove ```json ``` wrappers if Gemini returns them
    const cleaned = rawResponse
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsed: unknown;

    try {
      parsed = JSON.parse(cleaned);
    } catch {
      throw new Error("Gemini returned invalid JSON");
    }

    return EvaluationSchema.parse(parsed);
  } catch (error) {
    handleOpenAIError(error);

    return {
      score: 0,
      feedback: "AI evaluation failed.",
      idealAnswer: "",
      strengths: "",
      weaknesses: "Evaluation failed",
      missingPoints: "Unable to evaluate answer",
    };
  }
}
