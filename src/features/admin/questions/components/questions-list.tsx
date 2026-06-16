import {editQuestionPath } from "@/constants/route";
import { Prisma } from "@/generated/prisma/client";
import Link from "next/link";
import { deleteQuestion } from "../actions/delete-question";
import DeleteButton from "@/components/delete-button";

type QuestionsWithCategory = Prisma.CategoryGetPayload<{
  select: {
    id: true;
    name: true;
    description: true;
    questions: {
      select: {
        id: true;
        question: true;
        difficulty: true;
        createdAt: true;
      };
    };
  };
}>;

type QuestionsListProps = {
  question: QuestionsWithCategory;
};

const QuestionsList = ({ question }: QuestionsListProps) => {
  const questions = question?.questions || [];

  return (
    <div className="mx-auto w-full max-w-5xl p-4">
      {/* Questions Section */}
      <div className="space-y-4">
        {questions.length === 0 ? (
          <div className="rounded-lg border bg-gray-50 p-6 text-center text-gray-500">
            No questions available in this category
          </div>
        ) : (
          questions.map((q, index) => (
            <div
              key={q.id}
              className="flex flex-col gap-4 rounded-lg border bg-white p-4 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
            >
              {/* Left content */}
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-gray-800 sm:text-base">
                  {index + 1}. {q.question}
                </p>

                <span className="text-xs text-gray-500">
                  {new Date(q.createdAt).toLocaleDateString("en-GB" ,{day : "2-digit" , month : "long" , year : "numeric"})}
                </span>
              </div>

              {/* Right side actions */}
              <div className="flex items-center gap-2">
                {/* Difficulty badge */}
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    q.difficulty === "EASY"
                      ? "bg-green-100 text-green-700"
                      : q.difficulty === "MEDIUM"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {q.difficulty}
                </span>

                {/* Edit Button */}
                <Link
                  href={editQuestionPath(q.id)}
                  className="rounded-md bg-blue-600 px-3 py-1 text-xs font-medium text-white transition hover:bg-blue-700"
                >
                  Edit
                </Link>

                {/* Delete Button */}
                    <DeleteButton id={q.id} onDelete={deleteQuestion} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default QuestionsList;