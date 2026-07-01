export class AppError extends Error {
  constructor(
    public message: string,
    public code: string,
    public statusCode: number = 400
  ) {
    super(message);
  }
}

export function handleOpenAIError(error : any) {
  console.error("OpenAI Error:", error);

  if (error?.status === 429) {
    throw new Error("Rate limit exceeded. Try again later.");
  }

  if (error?.status >= 500) {
    throw new Error("OpenAI server error");
  }

  throw new Error("AI evaluation failed");
}