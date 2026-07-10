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
    baseURL: "https://api.freemodel.dev/v1",
    timeout: 30_000,
    maxRetries: 2,
  });
}

export const openai = global.openai ?? createClient();

if (process.env.NODE_ENV !== "production") {
  global.openai = openai;
}