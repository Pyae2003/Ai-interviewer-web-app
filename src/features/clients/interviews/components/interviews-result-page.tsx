import NotFound from "@/app/not-found";
import { getInterviewResult } from "../actions/get-interview-result";
import InterviewResult from "./interviews-result";

type InterviewsResultPageProp = {
  id: string;
};
const InterviewsResultPage = async ({ id }: InterviewsResultPageProp) => {

  const interviewsResult = await getInterviewResult(id);

  if (!interviewsResult) {
    NotFound();
  };
  
  return (
    <div>
      <InterviewResult result={interviewsResult} />
    </div>
  );
};

export default InterviewsResultPage;
