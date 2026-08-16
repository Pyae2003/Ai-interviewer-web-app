"use client";


import {
  FileQuestion,
  Mic,
} from "lucide-react";
import { CategoryStatCard } from "./category-stat-card";

type CategoryStatisticsProps = {
  questions: number;
  interviews: number;
};

export function CategoryStatistics({
  questions,
  interviews,
}: CategoryStatisticsProps) {
  return (
    <div className="mt-6 grid grid-cols-2 gap-3">
      <CategoryStatCard
        icon={FileQuestion}
        label="Questions"
        value={questions}
        color="sky"
      />

      <CategoryStatCard
        icon={Mic}
        label="Interviews"
        value={interviews}
        color="violet"
      />
    </div>
  );
}