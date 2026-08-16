import { RecentInterview } from "../actions/recent-interviews";

type RecentInterviewsPageProps = {
  interview: RecentInterview;
};

const RecentInterviewsPage = ({
  interview,
}: RecentInterviewsPageProps) => {
  const formattedDate = new Date(interview.createdAt).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    },
  );

  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border bg-white p-4 transition-colors hover:border-sky-200">
      {/* Left */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate font-semibold text-zinc-900">
            {interview.userName}
          </p>

          <span
            className={`shrink-0 rounded-full px-2 py-1 text-xs font-medium ${
              interview.status === "COMPLETED"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {interview.status}
          </span>
        </div>

        <p className="truncate text-sm text-muted-foreground">
          {interview.userEmail}
        </p>

        <p className="mt-1 text-xs text-muted-foreground">
          {interview.categoryName}
        </p>
      </div>

      {/* Right */}
      <div className="shrink-0 text-right">
        <p className="text-xl font-bold text-sky-600">
          {interview.score ?? 0}%
        </p>

        <time
          dateTime={new Date(interview.createdAt).toISOString()}
          className="text-xs text-muted-foreground"
        >
          {formattedDate}
        </time>
      </div>
    </div>
  );
};

export default RecentInterviewsPage;