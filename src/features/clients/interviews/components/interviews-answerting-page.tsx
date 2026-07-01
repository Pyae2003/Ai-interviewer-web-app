import { getInterviewQuestions } from "../query/fetch-mix-questioins";
import InterViewsClientAnswering from "./interviews-answering";

type interviewAnsweringPageProp = {
  interviewId: string;
};

const InterviewAnsweringPage = async ({
  interviewId,
}: interviewAnsweringPageProp) => {
  const interview = await getInterviewQuestions(interviewId);
  const { interview_Id, category, questions, totalQuestions } = interview.data;

  return (
    <div>
      <InterViewsClientAnswering
        interview_Id={interview_Id}
        category={category}
        questions={questions}
        totalQuestions={totalQuestions}
      />
    </div>
  );
};

export default InterviewAnsweringPage;
