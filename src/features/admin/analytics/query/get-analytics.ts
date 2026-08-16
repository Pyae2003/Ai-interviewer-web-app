"use server";

import { prisma } from "@/config";
import { getSession } from "@/lib/get-Session";
import { AppError } from "@/middleware";
import {AnalyticsPoint, AnalyticsSeries } from "../type/analytics-types";



export type GetAnalyticsResponse = {
  totalUsers: number;
  totalInterviews: number;
  usersSeries: AnalyticsSeries;
  interviewsSeries: AnalyticsSeries;
};

type CreatedAtRecord = {
  createdAt: Date;
};

const dayFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  timeZone: "UTC",
});

const monthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

function getUtcDayKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function getUtcMonthKey(date: Date) {
  return `${date.getUTCFullYear()}-${String(
    date.getUTCMonth() + 1,
  ).padStart(2, "0")}`;
}

function getUtcYearKey(date: Date) {
  return String(date.getUTCFullYear());
}

function createCountMap(
  records: CreatedAtRecord[],
  getKey: (date: Date) => string,
) {
  const counts = new Map<string, number>();

  records.forEach((record) => {
    const key = getKey(record.createdAt);

    counts.set(key, (counts.get(key) ?? 0) + 1);
  });

  return counts;
}

function buildDailySeries(
  records: CreatedAtRecord[],
  now: Date,
): AnalyticsPoint[] {
  const counts = createCountMap(records, getUtcDayKey);

  const startDate = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() - 6,
    ),
  );

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(startDate);

    date.setUTCDate(startDate.getUTCDate() + index);

    return {
      label: dayFormatter.format(date),
      value: counts.get(getUtcDayKey(date)) ?? 0,
    };
  });
}

function buildMonthlySeries(
  records: CreatedAtRecord[],
  now: Date,
): AnalyticsPoint[] {
  const counts = createCountMap(records, getUtcMonthKey);

  const startDate = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth() - 11,
      1,
    ),
  );

  return Array.from({ length: 12 }, (_, index) => {
    const date = new Date(
      Date.UTC(
        startDate.getUTCFullYear(),
        startDate.getUTCMonth() + index,
        1,
      ),
    );

    return {
      label: monthFormatter.format(date),
      value: counts.get(getUtcMonthKey(date)) ?? 0,
    };
  });
}

function buildYearlySeries(
  records: CreatedAtRecord[],
  now: Date,
): AnalyticsPoint[] {
  const counts = createCountMap(records, getUtcYearKey);
  const firstYear = now.getUTCFullYear() - 4;

  return Array.from({ length: 5 }, (_, index) => {
    const year = firstYear + index;

    return {
      label: String(year),
      value: counts.get(String(year)) ?? 0,
    };
  });
}

function buildAnalyticsSeries(
  records: CreatedAtRecord[],
  now: Date,
): AnalyticsSeries {
  return {
    day: buildDailySeries(records, now),
    month: buildMonthlySeries(records, now),
    year: buildYearlySeries(records, now),
  };
}

export const getAnalytics =
  async (): Promise<GetAnalyticsResponse> => {
    const session = await getSession();

    if (!session?.user?.id) {
      throw new AppError(
        "You must be signed in to view analytics.",
        "UNAUTHORIZED",
        401,
      );
    }

    if (session.user.role !== "admin") {
      throw new AppError(
        "You do not have permission to view analytics.",
        "FORBIDDEN",
        403,
      );
    }

    try {
      const now = new Date();

      const analyticsStartDate = new Date(
        Date.UTC(now.getUTCFullYear() - 2, 0, 1),
      );

      const [
        totalUsers,
        totalInterviews,
        userRecords,
        interviewRecords,
      ] = await Promise.all([
        prisma.user.count(),

        prisma.interview.count(),

        prisma.user.findMany({
          where: {
            createdAt: {
              gte: analyticsStartDate,
            },
          },

          select: {
            createdAt: true,
          },

          orderBy: {
            createdAt: "asc",
          },
        }),

        prisma.interview.findMany({
          where: {
            createdAt: {
              gte: analyticsStartDate,
            },
          },

          select: {
            createdAt: true,
          },

          orderBy: {
            createdAt: "asc",
          },
        }),
      ]);

      return {
        totalUsers,
        totalInterviews,
        usersSeries: buildAnalyticsSeries(userRecords, now),
        interviewsSeries: buildAnalyticsSeries(
          interviewRecords,
          now,
        ),
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      console.error("[GET_ANALYTICS_ERROR]", error);

      throw new AppError(
        "Failed to load analytics.",
        "ANALYTICS_FETCH_FAILED",
        500,
      );
    }
  };