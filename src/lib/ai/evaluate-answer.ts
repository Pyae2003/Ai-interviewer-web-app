import { handleOpenAIError } from "@/middleware";
import { buildEvaluationPrompt } from "./evaluate-prompt";
import { EvaluationResult, EvaluationSchema } from "./evalutate-schema";
import { withRetry } from "./retry";
import { openai } from "./openai";

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
      const response = await openai.chat.completions.create({
        model: "openai/gpt-4o-mini",
        temperature: 0.2,
        response_format: {
          type: "json_object",
        },
        messages: [
          {
            role: "system",
            content: [
              {
                type: "text",
                text: `
You are a senior software engineering interviewer.

Evaluate the candidate objectively.

Return ONLY valid JSON.

Do NOT wrap the JSON inside markdown.
Do NOT include explanations.
Do NOT include additional text.
`,
              },
            ],
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: prompt,
              },
            ],
          },
        ],
      });

      return response.choices[0]?.message?.content;
    });

    if (!rawResponse?.trim()) {
      throw new Error("OpenAI returned an empty response.");
    }

    const cleaned = rawResponse
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    let parsed: unknown;

    try {
      parsed = JSON.parse(cleaned);
    } catch {
      throw new Error("OpenAI returned invalid JSON.");
    }

    const mainData = EvaluationSchema.parse(parsed);
    console.log("Ai return data :", mainData);

    return mainData;
  } catch (error) {
    handleOpenAIError(error);
    throw error;
    // return {
    //   score: 0,
    //   feedback: "Unable to evaluate the answer.",
    //   idealAnswer: "",
    //   strengths: "",
    //   weaknesses: "AI evaluation failed.",
    //   missingPoints: "System error.",
    // };
  }
}
