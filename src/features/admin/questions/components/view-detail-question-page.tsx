import { getQuestionById } from "../query/get-question"
import ViewDetailQuestion from "./view-detail-question"

type ViewDetailQuestionPageProp ={
    id : string
}
const ViewDetailQuestionPage = async({id} : ViewDetailQuestionPageProp) => {
    const question = await getQuestionById(id);
  return (
    <div>
        <ViewDetailQuestion question={question.data} />
    </div>
  )
}

export default ViewDetailQuestionPage