import { getQuestionWithId } from "../query/get-question";
import { UpdateQuestionForm } from "./update-questions-form";

type UpdateQuestionProp = {
  id: string;
};
const UpdateQuestionPage = async ({ id }: UpdateQuestionProp) => {
  const question = await getQuestionWithId(id);
  if (!question) {
    return (
      <div className="rounded-lg border bg-gray-50 p-6 text-center text-gray-500">
        Invalid Question!
      </div>
    );
  }
  return <div>
    <UpdateQuestionForm question={question.data}  />
  </div>;
};

export default UpdateQuestionPage;
