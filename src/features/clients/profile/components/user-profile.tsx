"use client";

import {
  Award,
  BarChart3,
  Briefcase,
  Calendar,
  Mail,
  Star,
  Trophy,
  User,
  Sparkles,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const profile = {
  name: "Pyae Khant",
  email: "pyaekhant@gmail.com",
  joinedAt: "June 2026",

  interviewsCompleted: 24,
  averageScore: 84,
  highestScore: 96,
  bestCategory: "React",

  xp: 2450,
  level: "Advanced",

  categoryStats: [
    { name: "React", score: 92, level: "Expert" },
    { name: "Node.js", score: 84, level: "Advanced" },
    { name: "JavaScript", score: 80, level: "Advanced" },
    { name: "TypeScript", score: 68, level: "Intermediate" },
  ],

  recentInterviews: [
    { id: "1", category: "React Developer", score: 90 },
    { id: "2", category: "Node.js Developer", score: 84 },
    { id: "3", category: "Next.js Developer", score: 88 },
  ],

  achievements: [
    "First Interview Completed",
    "10+ Interviews Completed",
    "Average Score Above 80",
    "React Expert",
  ],
};

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 px-4 py-10">
      <div className="mx-auto max-w-6xl space-y-8">

        {/* HERO */}
        <Card className="relative overflow-hidden border shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-sky-500/10 to-emerald-500/10" />

          <CardContent className="relative p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

              {/* Avatar */}
              <div className="flex items-center gap-5">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-sky-500 shadow-lg">
                  <User className="h-10 w-10 text-white" />
                </div>

                <div>
                  <h1 className="text-2xl font-bold">{profile.name}</h1>
                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Mail className="h-4 w-4" /> {profile.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" /> Joined {profile.joinedAt}
                    </span>
                  </div>
                </div>
              </div>

              {/* XP */}
              <div className="text-left md:text-right">
                <Badge className="mb-2 bg-indigo-100 text-indigo-700">
                  {profile.level}
                </Badge>

                <div className="flex items-center gap-2 text-3xl font-bold">
                  <Sparkles className="h-5 w-5 text-yellow-500" />
                  {profile.xp}
                </div>

                <p className="text-sm text-muted-foreground">Total XP</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* STATS */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Briefcase,
              label: "Interviews",
              value: profile.interviewsCompleted,
              color: "text-sky-600",
            },
            {
              icon: BarChart3,
              label: "Avg Score",
              value: `${profile.averageScore}%`,
              color: "text-emerald-600",
            },
            {
              icon: Trophy,
              label: "Highest",
              value: profile.highestScore,
              color: "text-yellow-600",
            },
            {
              icon: Star,
              label: "Best",
              value: profile.bestCategory,
              color: "text-purple-600",
            },
          ].map((item, i) => (
            <Card key={i} className="hover:shadow-md transition">
              <CardContent className="p-5">
                <item.icon className={`mb-2 h-6 w-6 ${item.color}`} />
                <p className="text-2xl font-bold">{item.value}</p>
                <p className="text-sm text-muted-foreground">{item.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* SKILLS + RECENT */}
        <div className="grid gap-6 lg:grid-cols-2">

          {/* SKILLS */}
          <Card>
            <CardHeader>
              <CardTitle>Skill Progress</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {profile.categoryStats.map((item) => (
                <div key={item.name}>
                  <div className="mb-2 flex justify-between">
                    <span className="font-medium">{item.name}</span>
                    <Badge variant="secondary">{item.level}</Badge>
                  </div>

                  <Progress value={item.score} className="h-2" />

                  <div className="mt-1 text-right text-xs text-muted-foreground">
                    {item.score}% mastery
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* RECENT */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Interviews</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {profile.recentInterviews.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-xl border p-4 hover:bg-slate-50 transition"
                >
                  <div>
                    <p className="font-medium">{item.category}</p>
                    <p className="text-sm text-muted-foreground">
                      Score {item.score}/100
                    </p>
                  </div>

                  <Button size="sm" variant="outline">
                    View
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* ACHIEVEMENTS */}
        <Card>
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
          </CardHeader>

          <CardContent className="grid gap-4 sm:grid-cols-2">
            {profile.achievements.map((a) => (
              <div
                key={a}
                className="flex items-center gap-3 rounded-xl border bg-gradient-to-r from-yellow-50 to-white p-4"
              >
                <Award className="h-5 w-5 text-yellow-600" />
                <span className="text-sm font-medium">{a}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}