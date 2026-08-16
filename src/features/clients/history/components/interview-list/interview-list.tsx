"use client";

import { InterviewListProps } from "../../types/interview-list.types";
import { EmptyInterviewList } from "./empty-interview-list";
import { InterviewListHeader } from "./interview-list-header";
import { InterviewResultCard } from "./interview-result-card";


export function InterviewList({ result }: InterviewListProps) {
  const categoryName = result.categoryName.trim() || "Interview Category";
  const interviews = result.interviews ?? [];

  return (
    <section
      aria-label={`${categoryName} interview history`}
      className="space-y-6"
    >
      <InterviewListHeader
        categoryName={categoryName}
        interviewCount={interviews.length}
      />

      {interviews.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {interviews.map((interview, index) => (
            <InterviewResultCard
              key={interview.id}
              interview={interview}
              categoryName={categoryName}
              index={index}
            />
          ))}
        </div>
      ) : (
        <EmptyInterviewList />
      )}
    </section>
  );
}

export default InterviewList;