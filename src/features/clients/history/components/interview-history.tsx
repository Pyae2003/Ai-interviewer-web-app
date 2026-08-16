import { InterviewHistoryHeader } from "./interview-history-header";
import InterviewList from "./interview-list/interview-list";

import { getInterviewsHistory } from "../query/get-interviews-history";
import { EmptyInterviewHistory } from "./empty-interview-history";

export async function InterviewHistory() {
  const response = await getInterviewsHistory();
  const interviewGroups = response.data ?? [];
  const hasInterviews = interviewGroups.length > 0;

  return (
    <main className="min-h-screen bg-muted/10">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <InterviewHistoryHeader />

        {hasInterviews ? (
          <section
            aria-label="Interview history results"
            className="mt-8 space-y-10 sm:mt-10"
          >
            {interviewGroups.map((group) => (
              <InterviewList
                key={group.categoryId}
                result={group}
              />
            ))}
          </section>
        ) : (
          <EmptyInterviewHistory />
        )}
      </div>
    </main>
  );
}