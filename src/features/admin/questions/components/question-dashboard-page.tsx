import { getAllQuestions } from "../query/get-questions"
import QuestionDashboard from "./question-dashboard"


const QuestionDashboardPage = async() => {

    const questions = await getAllQuestions();
    
  return (
    <div>
        <QuestionDashboard  questions={questions.data} />
    </div>
  )
}

export default QuestionDashboardPage