import { GoogleGenAI } from "@google/genai";

declare global {
  var gemini: GoogleGenAI | undefined;
}

function createGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not defined");
  }

  return new GoogleGenAI({
    apiKey,
  });
}

export const gemini =
  global.gemini ?? createGeminiClient();

if (process.env.NODE_ENV !== "production") {
  global.gemini = gemini;
}
