export type AnalyticsPeriod = "day" | "month" | "year";

export type AnalyticsPoint = {
  label: string;
  value: number;
};

export type AnalyticsSeries = Record<
  AnalyticsPeriod,
  AnalyticsPoint[]
>;