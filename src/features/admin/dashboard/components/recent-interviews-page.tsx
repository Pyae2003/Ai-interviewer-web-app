import { RecentInterview } from "../actions/recent-interviews";

type RecentInterviewsPage = {
  interview: RecentInterview;
};

const RecentInterviewsPage = ({ interview }: RecentInterviewsPage) => {
  return (
    <div>
      <div
        key={interview.id}
        className="flex interviews-center justify-between rounded-xl border bg-white p-4 transition-all hover:border-sky-200 hover:shadow-sm"
      >
        {/* Left */}
        <div className="min-w-0 flex-1">
          <div className="flex interviews-center gap-2">
            <p className="truncate font-semibold">{interview.userName}</p>

            <span
              className={`rounded-full px-2 py-1 text-xs font-medium ${
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
        <div className="text-right">
          <p className="text-xl font-bold text-sky-600">
            {interview.score ?? 0} %
          </p>

          <p className="text-xs text-muted-foreground">
            {new Date(interview.createdAt).toLocaleDateString("en-GB",{day: "2-digit",month: "long",year : "numeric"})}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecentInterviewsPage;
