import { Bot } from "lucide-react";

export function CategoryHeader() {
  return (
    <div className="space-y-4 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-sky-100">
        <Bot className="h-10 w-10 text-sky-600" />
      </div>

      <div>
        <h1 className="text-4xl font-bold tracking-tight">
          AI Interviewer
        </h1>

        <p className="mt-2 text-muted-foreground">
          Practice real technical interviews powered by AI
        </p>
      </div>
    </div>
  );
}