"use client";

import {
  Users,
  Briefcase,
  FileQuestion,
  Mic,
  Bell,
  Search,
} from "lucide-react";

import { motion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { RecentInterview } from "../actions/recent-interviews";
import RecentInterviewsPage from "./recent-interviews-page";
import { TopCategory } from "../actions/get-top-categories";

type AdminDashboardProp = {
  result: {
    users: number;

    admins: number;

    interviews: number;

    questions: number;

    categories: number;
  };
  recentInterviews: RecentInterview[];
  topCategories: TopCategory[];
};

export default function AdminDashboard({
  result,
  recentInterviews,
  topCategories,
}: AdminDashboardProp) {
  const stats = [
    {
      title: "Total Users",
      value: result.users,
      icon: Users,
    },
    {
      title: "Interviews",
      value: result.interviews,
      icon: Mic,
    },
    {
      title: "Questions",
      value: result.questions,
      icon: FileQuestion,
    },
    {
      title: "Categories",
      value: result.categories,
      icon: Briefcase,
    },
  ];
  return (
    <div>
      {/* CONTENT */}
      <main className="flex-1">
        {/* HEADER */}
        <header className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>

              <p className="text-sm text-muted-foreground">
                Welcome back, Admin
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                <Input placeholder="Search..." className="w-72 pl-9" />
              </div>

              <button className="rounded-xl border p-2 hover:bg-zinc-100">
                <Bell className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        {/* BODY */}
        <div className="space-y-6 p-6">
          {/* STATS */}
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;

              return (
                <motion.div
                  key={stat.title}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.1,
                  }}
                >
                  <Card className="overflow-hidden border-0 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            {stat.title}
                          </p>

                          <h3 className="mt-2 text-3xl font-bold">
                            {stat.value}
                          </h3>
                        </div>

                        <div className="rounded-2xl bg-linear-to-br from-sky-400 to-yellow-300 p-3">
                          <Icon className="h-6 w-6 text-black" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* TABLE + CATEGORY */}
          <div className="grid gap-6 xl:grid-cols-3">
            <Card className="xl:col-span-2">
              <CardContent className="p-6">
                <h3 className="mb-4 text-lg font-semibold">
                  Recent Interviews
                </h3>

                <div className="space-y-3">
                  {recentInterviews.length === 0 ? (
                    <div className="flex interviews-center justify-between rounded-xl border bg-white p-4 transition-all hover:border-sky-200 hover:shadow-sm">
                      {" "}
                      No Interviews yet!{" "}
                    </div>
                  ) : (
                    recentInterviews.map((item) => (
                      <RecentInterviewsPage interview={item} key={item.id} />
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="mb-5 text-lg font-semibold">Top Categories</h3>

                <div className="space-y-4">
                  {topCategories.length === 0 ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          Not Top Categories yet!
                        </span>
                      </div>
                    </div>
                  ) : (
                    topCategories.map((item) => (
                      <div key={item.categoryId} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            {item.categoryName}
                          </span>

                          <span className="text-sm text-muted-foreground">
                            {item.percentage}%
                          </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-zinc-200">
                          <div
                            className="h-full rounded-full bg-linear-to-r from-sky-400 to-yellow-300 transition-all duration-700"
                            style={{
                              width: `${item.percentage}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
