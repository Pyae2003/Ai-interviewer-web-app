import OpenAI from "openai";

declare global {
  var openai: OpenAI | undefined;
}

function createClient() {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is missing.");
  }

  return new OpenAI({
    apiKey,
    baseURL: "https://openrouter.ai/api/v1",
    timeout: 100_000,
    maxRetries: 2,
    defaultHeaders: {
    "HTTP-Referer":
      process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
    "X-OpenRouter-Title": "Interview Evaluation App",
  },
  },
);
}

export const openai = global.openai ?? createClient();

if (process.env.NODE_ENV !== "production") {
  global.openai = openai;
}
