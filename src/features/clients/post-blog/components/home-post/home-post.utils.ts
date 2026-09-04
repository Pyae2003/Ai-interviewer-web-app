import { formatDistanceToNow } from "date-fns";

const compactNumber = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

export function getInitials(name?: string | null) {
  const initials = name
    ?.trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return initials || "ME";
}

export function formatCount(value: number) {
  return compactNumber.format(Math.max(0, value));
}

export function formatPostDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Recently";

  return formatDistanceToNow(date, { addSuffix: true });
}

export function formatPostDateTitle(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return undefined;

  return date.toLocaleString();
}

export function getActionErrorMessage(error: unknown) {
  if (typeof error === "string") return error;

  if (
    error &&
    typeof error === "object" &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }

  return "The post could not be deleted. Please try again.";
}
