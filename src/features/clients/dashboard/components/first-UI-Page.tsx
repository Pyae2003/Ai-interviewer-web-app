"use client";

import Link from "next/link";

import {
  ArrowRight,
  LayoutDashboard,
  Sparkles,
  Trophy,
  Brain,
  Mic,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function WelcomeProfilePage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-sky-50 via-white to-yellow-50">
      <div className="mx-auto max-w-7xl px-4 py-10">
        {/* Top Action */}
        <div className="mb-8">
          <Button
            asChild
            variant="outline"
            className="rounded-xl border-sky-200 bg-white hover:bg-sky-50"
          >
            <Link href="/dashboard">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Go To Dashboard
            </Link>
          </Button>
        </div>

        {/* Hero Section */}
        <Card className="overflow-hidden border-0 bg-white shadow-xl">
          <CardContent className="relative p-0">
            {/* Background Decoration */}
            <div className="absolute inset-0 bg-linear-to-r from-sky-100/60 via-white to-yellow-100/60" />

            <div className="relative px-8 py-14 md:px-12 md:py-16">
              <div className="max-w-3xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-sky-100 px-4 py-2 text-sm font-medium text-sky-700">
                  <Sparkles className="h-4 w-4" />
                  Welcome to AI Interviewer
                </div>

                <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-zinc-900 md:text-6xl">
                  Master Your
                  <span className="bg-linear-to-r from-sky-500 to-yellow-500 bg-clip-text text-transparent">
                    {" "}
                    Interview Skills
                  </span>
                </h1>

                <p className="max-w-2xl text-lg leading-relaxed text-zinc-600">
                  Practice real-world interview questions, receive AI-powered
                  feedback, track your progress, and build confidence before
                  your next job interview.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="rounded-xl bg-linear-to-r from-sky-500 to-yellow-400 text-black hover:opacity-90"
                  >
                    <Link href="/dashboard">
                      Start Interview
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="rounded-xl"
                  >
                    <Link href="/history">
                      View History
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feature Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <Card className="border-sky-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <CardContent className="p-6">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100">
                <Mic className="h-7 w-7 text-sky-600" />
              </div>

              <h3 className="mb-2 text-lg font-bold">
                Real Interview Practice
              </h3>

              <p className="text-sm text-muted-foreground">
                Practice category-based interview questions designed to simulate
                real technical interviews.
              </p>
            </CardContent>
          </Card>

          <Card className="border-yellow-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <CardContent className="p-6">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-100">
                <Brain className="h-7 w-7 text-yellow-600" />
              </div>

              <h3 className="mb-2 text-lg font-bold">
                AI Feedback
              </h3>

              <p className="text-sm text-muted-foreground">
                Receive detailed AI analysis, strengths, weaknesses, and
                recommendations after every interview.
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <CardContent className="p-6">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100">
                <Trophy className="h-7 w-7 text-green-600" />
              </div>

              <h3 className="mb-2 text-lg font-bold">
                Track Progress
              </h3>

              <p className="text-sm text-muted-foreground">
                Monitor interview scores, improvement trends, and performance
                across different categories.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Welcome Message */}
        <Card className="mt-10 border-0 bg-linear-to-r from-sky-100 via-white to-yellow-100 shadow-lg">
          <CardContent className="p-8 text-center">
            <h2 className="mb-3 text-2xl font-bold text-zinc-900">
              Welcome to AI Interviewer
            </h2>

            <p className="mx-auto max-w-3xl text-muted-foreground">
              Your personal interview preparation platform. Practice smarter,
              identify knowledge gaps, improve communication skills, and boost
              your confidence before facing real interviews.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}