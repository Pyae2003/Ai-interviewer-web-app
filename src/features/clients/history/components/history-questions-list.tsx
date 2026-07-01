import { MessageSquare, CheckCircle2, XCircle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { QuestionResult } from "./history-detail";


type HistoryQuestionListProp = {
  index : number,
  item: QuestionResult;
};
const HistoryQuestionList = ({item , index} : HistoryQuestionListProp) => {
  return (
    <div>
      <Card className="border shadow-sm">
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <CardTitle className="text-lg">Question {index + 1}</CardTitle>

            <div className="flex items-center gap-2">
              <Badge
                className={
                  item.difficulty === "EASY"
                    ? "bg-green-100 text-green-700"
                    : item.difficulty === "MEDIUM"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                }
              >
                {item.difficulty}
              </Badge>

              <Badge variant={item.isCorrect ? "default" : "destructive"}>
                {item.isCorrect ? "Correct" : "Incorrect"}
              </Badge>

              <Badge>{item.score}/10</Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Question */}
          <div>
            <p className="mb-2 font-medium">Question</p>

            <div className="rounded-xl bg-sky-50 p-4">{item.questionText}</div>
          </div>

          {/* Answer */}
          <div>
            <p className="mb-2 font-medium">Your Answer</p>

            <div className="rounded-xl border bg-white p-4 whitespace-pre-wrap">
              {item.answer}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>AI Score</span>
              <span>{item.score}/100</span>
            </div>

            <div className="h-2 rounded-full bg-zinc-200">
              <div
                className="h-full rounded-full bg-linear-to-r from-sky-500 to-green-500"
                style={{
                  width: `${item.score * 10}%`,
                }}
              />  
            </div>
          </div>

          {/* Feedback */}
          {item.feedback && (
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <MessageSquare className="h-5 w-5" />
                  AI Feedback
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="leading-7">{item.feedback}</p>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="text-green-700">✅ Strengths</CardTitle>
            </CardHeader>

            <CardContent>
              <ul className="space-y-2">
                <CheckCircle2 className="h-4 w-4 mt-1 text-green-600" />

                {item.strengths}
              </ul>
            </CardContent>
          </Card>
          <Card className="border-sky-200">
            <CardHeader>
              <CardTitle>⭐ Ideal Answer</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="rounded-xl bg-sky-50 p-5 leading-7 whitespace-pre-wrap">
                {item.idealAnswer}
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default HistoryQuestionList;
