import { formatDistanceToNow } from "date-fns";

export function formatLastLogin(
  date: Date | null,
) {
  if (!date) return "Never";

  return formatDistanceToNow(date, {
    addSuffix: true,
  });
}