import { getInterviewHistoryDetail } from "../query/get-interviews-details";
import InterviewHistoryDetail from "./history-detail";

type HistroyDetailPageProp = {
  interviewId: string;
};
const HistroyDetailPage = async ({ interviewId }: HistroyDetailPageProp) => {
  const interview = await getInterviewHistoryDetail(interviewId);
  return (
    <div>
      <InterviewHistoryDetail
        categoryName={interview.data.categoryName}
        score={interview.data.score}
        totalQuestions={interview.data.totalQuestions}
        completedAt={interview.data.createdAt}
        questions={interview.data.questions}
      />
    </div>
  );
};

export default HistroyDetailPage;
