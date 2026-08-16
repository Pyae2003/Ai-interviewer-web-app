"use client";

import { Mic, Users } from "lucide-react";
import { AnalyticsSeries } from "../type/analytics-types";
import AnalyticsSummaryCard from "./anylytics-summary-card";
import AnalyticsTrendCard from "./analytics-trends-card";


type AnalyticsDashboardProps = {
  totalUsers: number;
  totalInterviews: number;
  usersSeries: AnalyticsSeries;
  interviewsSeries: AnalyticsSeries;
};

const AnalyticsDashboard = ({
  totalUsers,
  totalInterviews,
  usersSeries,
  interviewsSeries,
}: AnalyticsDashboardProps) => {
  return (
    <main className="space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Analytics
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Monitor user growth and interview activity
        </p>
      </div>

      <section
        aria-label="Analytics summary"
        className="grid gap-4 md:grid-cols-2"
      >
        <AnalyticsSummaryCard
          title="Total Users"
          value={totalUsers}
          description="Registered platform users"
          icon={Users}
          iconClassName="bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300"
        />

        <AnalyticsSummaryCard
          title="Total Interviews"
          value={totalInterviews}
          description="All interview attempts"
          icon={Mic}
          iconClassName="bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300"
        />
      </section>

      <section
        aria-label="Analytics charts"
        className="grid gap-6 xl:grid-cols-2"
      >
        <AnalyticsTrendCard
          title="User Growth"
          metricLabel="users"
          icon={Users}
          series={usersSeries}
          lineColor="#0284c7"
          iconClassName="bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300"
        />

        <AnalyticsTrendCard
          title="Interview Activity"
          metricLabel="interviews"
          icon={Mic}
          series={interviewsSeries}
          lineColor="#7c3aed"
          iconClassName="bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300"
        />
      </section>
    </main>
  );
};

export default AnalyticsDashboard;