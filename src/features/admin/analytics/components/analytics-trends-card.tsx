"use client";

import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import PeriodSelect from "./period-select";
import { AnalyticsPeriod, AnalyticsSeries } from "../type/analytics-types";



type AnalyticsTrendCardProps = {
  title: string;
  metricLabel: string;
  icon: LucideIcon;
  series: AnalyticsSeries;
  lineColor: string;
  iconClassName: string;
};

type AnalyticsTooltipProps = {
  active?: boolean;
  label?: string | number;
  payload?: Array<{
    value?: number | string;
  }>;
  metricLabel: string;
};

const periodDescriptions: Record<AnalyticsPeriod, string> = {
  day: "Last 7 days",
  month: "Last 12 months",
  year: "Last 5 years",
};

function AnalyticsTooltip({
  active,
  label,
  payload,
  metricLabel,
}: AnalyticsTooltipProps) {
  if (!active || !payload?.length) {
    return null;
  }

  const value = Number(payload[0]?.value ?? 0);

  return (
    <div className="rounded-lg border bg-background px-3 py-2 shadow-md">
      <p className="text-xs text-muted-foreground">{label}</p>

      <p className="mt-1 text-sm font-semibold text-foreground">
        {value.toLocaleString()} {metricLabel}
      </p>
    </div>
  );
}

export default function AnalyticsTrendCard({
  title,
  metricLabel,
  icon: Icon,
  series,
  lineColor,
  iconClassName,
}: AnalyticsTrendCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const [period, setPeriod] =
    useState<AnalyticsPeriod>("day");

  const chartData = series[period] ?? [];

  const selectedTotal = chartData.reduce(
    (total, item) => total + item.value,
    0,
  );

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className={`rounded-xl p-2.5 ${iconClassName}`}>
            <Icon className="h-5 w-5" />
          </div>

          <div>
            <CardTitle className="text-lg">{title}</CardTitle>

            <p className="mt-1 text-sm text-muted-foreground">
              {periodDescriptions[period]}
            </p>
          </div>
        </div>

        <PeriodSelect value={period} onChange={setPeriod} />
      </CardHeader>

      <CardContent>
        <div className="mb-5 flex items-end justify-between border-b pb-4">
          <div>
            <p className="text-sm text-muted-foreground">
              Selected period
            </p>

            <p className="mt-1 text-2xl font-bold text-foreground">
              {selectedTotal.toLocaleString()}
            </p>
          </div>

          <p className="text-xs text-muted-foreground">
            Total {metricLabel}
          </p>
        </div>

        {chartData.length === 0 ? (
          <div className="flex h-72 items-center justify-center text-sm text-muted-foreground">
            No analytics data available.
          </div>
        ) : (
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 10,
                  left: -15,
                  bottom: 0,
                }}
              >
                <CartesianGrid
                  vertical={false}
                  stroke="var(--border)"
                  strokeDasharray="4 4"
                />

                <XAxis
                  dataKey="label"
                  axisLine={false}
                  tickLine={false}
                  tickMargin={10}
                  minTickGap={20}
                  tick={{
                    fill: "var(--muted-foreground)",
                    fontSize: 12,
                  }}
                />

                <YAxis
                  allowDecimals={false}
                  axisLine={false}
                  tickLine={false}
                  width={50}
                  tick={{
                    fill: "var(--muted-foreground)",
                    fontSize: 12,
                  }}
                />

                <Tooltip
                  cursor={{
                    stroke: "var(--border)",
                    strokeDasharray: "4 4",
                  }}
                  content={
                    <AnalyticsTooltip metricLabel={metricLabel} />
                  }
                />

                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={lineColor}
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{
                    r: 5,
                    fill: lineColor,
                    stroke: "var(--background)",
                    strokeWidth: 3,
                  }}
                  isAnimationActive={!shouldReduceMotion}
                  animationDuration={500}
                  animationEasing="ease-out"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}