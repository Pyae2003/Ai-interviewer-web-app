import { History } from "lucide-react";
import InterViewList from "./interview-list";
import { getInterviewsHistory } from "../query/get-interviews-history";

export async function InterviewHistory() {
  const interviews = await getInterviewsHistory();
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3">
          <History className="h-8 w-8 text-sky-500" />

          <div>
            <h1 className="text-3xl font-bold">Interview History</h1>

            <p className="text-muted-foreground">
              Review all your completed interviews.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-10">
        {interviews.data.map((interview) => (
          <InterViewList key={interview.categoryId} result={interview} />
        ))}
      </div>
    </div>
  );
}
