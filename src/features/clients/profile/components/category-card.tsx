import {
  ArrowUpRight,
  Award,
  Briefcase,
  TrendingUp,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type Props = {
  name: string;
  latestScore: number;
  interviews: number;
};

export default function CategoryCard({
  name,
  latestScore,
  interviews,
}: Props) {
  const getPerformance = (score: number) => {
    if (score >= 90)
      return {
        label: "Excellent",
        badge: "bg-emerald-100 text-emerald-700",
        progress: "bg-emerald-500",
      };

    if (score >= 75)
      return {
        label: "Very Good",
        badge: "bg-sky-100 text-sky-700",
        progress: "bg-sky-500",
      };

    if (score >= 60)
      return {
        label: "Good",
        badge: "bg-yellow-100 text-yellow-700",
        progress: "bg-yellow-500",
      };

    return {
      label: "Needs Practice",
      badge: "bg-red-100 text-red-700",
      progress: "bg-red-500",
    };
  };

  const performance = getPerformance(latestScore);

  return (
    <Card className="group relative overflow-hidden rounded-3xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-xl">
      <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-sky-500 via-cyan-500 to-yellow-400" />

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-bold">{name}</h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Latest Interview Performance
          </p>
        </div>

        <div className="rounded-xl bg-sky-100 p-3 transition group-hover:scale-110">
          <TrendingUp className="h-5 w-5 text-sky-600" />
        </div>
      </div>

      {/* Score */}
      <div className="mt-6 flex items-end justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            Latest Score
          </p>

          <h2 className="text-4xl font-bold tracking-tight">
            {latestScore}
            <span className="text-2xl">%</span>
          </h2>
        </div>

        <Badge className={performance.badge}>
          {performance.label}
        </Badge>
      </div>

      <div className="mt-6">
        <Progress
          value={latestScore}
          className="h-2 rounded-full"
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t pt-5">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Briefcase className="h-4 w-4" />
          <span>{interviews} Interviews</span>
        </div>

        <div className="flex items-center gap-2 text-sm font-medium text-sky-600">
          <Award className="h-4 w-4" />
          Highest Performance

          <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
      </div>
    </Card>
  );
}