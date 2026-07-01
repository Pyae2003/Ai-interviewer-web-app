import Link from "next/link";

import { Calendar, Trophy, ArrowRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { histroyDetailPath } from "@/constants/route";

type InterViewListProp = {
  result: {
    categoryId: string;
    categoryName: string;
    interviews: {
      id: string;
      score: number | null;
      status: string;
      createdAt: Date;

      totalQuestions: number;
      answeredQuestions: number;
    }[];
  };
};
const InterViewList = ({ result }: InterViewListProp) => {
  return (
    <div>
      <section>
        {/* Category Header */}
        <div className="mb-4 flex items-center gap-3">
          <div className="h-10 w-1 rounded-full bg-linear-to-b from-sky-400 to-yellow-300" />

          <div>
            <h2 className="text-2xl font-bold">{result.categoryName}</h2>

            <p className="text-sm text-muted-foreground">
              {result.interviews.length} Interview(s)
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {result.interviews.map((interview) => (
            <Card
              key={interview.id}
              className="group border-0 bg-linear-to-br from-sky-100/40 via-white to-yellow-100/40 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <CardContent className="space-y-4 p-5">
                <div className="flex items-center justify-between">
                  <Badge>Completed</Badge>

                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />

                    {new Date(interview.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />

                    <span className="text-3xl font-bold">
                      {interview.score}%
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {interview.totalQuestions} Questions Answered
                  </p>
                </div>

                <Button
                  asChild
                  className="w-full bg-linear-to-r from-sky-500 to-yellow-400 text-black hover:opacity-90"
                >
                  <Link href={histroyDetailPath(interview.id)}>
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default InterViewList;
