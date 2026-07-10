"use server"

import Link from "next/link";

import { History, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import InterViewList from "./interview-list";

import { getInterviewsHistory } from "../query/get-interviews-history";

export async function InterviewHistory() {
  const interviews = await getInterviewsHistory();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      {/* Header */}

      <div className="mb-10 flex items-center gap-4">
        <div className="rounded-2xl bg-sky-100 p-4">
          <History className="h-8 w-8 text-sky-600" />
        </div>

        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            Interview History
          </h1>

          <p className="mt-2 text-muted-foreground">
            Review your completed AI interviews and track your progress.
          </p>
        </div>
      </div>


      {interviews.data.length === 0 ? (
    
          <Card className="overflow-hidden border-0 shadow-xl">
            <CardContent className="flex flex-col items-center px-8 py-20 text-center">
              <div className="mb-8 rounded-full bg-linear-to-br from-sky-100 to-yellow-100 p-8 shadow-inner">
                <Sparkles className="h-16 w-16 text-sky-600" />
              </div>

              <h2 className="text-3xl font-bold">No Interview History Yet</h2>

              <p className="mt-4 max-w-lg leading-7 text-muted-foreground">
                You have not completed any interviews yet. Start your first AI
                interview and receive detailed feedback, scores, and
                personalized recommendations to improve your skills.
              </p>

              <Button
                asChild
                size="lg"
                className="mt-10 rounded-xl bg-linear-to-r from-sky-500 to-yellow-400 px-8 text-black shadow-lg transition hover:scale-105"
              >
                <Link href="/dashboard">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
      ) : (
        <div className="space-y-10">
          {interviews.data.map((interview) => (
            <InterViewList key={interview.categoryId} result={interview} />
          ))}
        </div>
      )}
    </div>
  );
}
