const interviewDateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export function normalizeScore(score: number | null) {
  if (score === null || !Number.isFinite(score)) {
    return 0;
  }

  return Math.round(Math.min(100, Math.max(0, score)));
}

export function normalizeCount(count: number) {
  return Number.isFinite(count) ? Math.max(0, Math.round(count)) : 0;
}

export function formatInterviewDate(value: Date) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return {
      label: "Unknown date",
      dateTime: undefined,
    };
  }

  return {
    label: interviewDateFormatter.format(date),
    dateTime: date.toISOString(),
  };
}

export function isCompletedStatus(status: string) {
  return status.trim().toUpperCase() === "COMPLETED";
}

export function formatInterviewStatus(status: string) {
  const normalizedStatus = status.trim();

  if (!normalizedStatus) {
    return "Unknown";
  }

  return normalizedStatus
    .toLowerCase()
    .replaceAll("_", " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}