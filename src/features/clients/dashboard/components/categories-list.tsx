"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, FileQuestion, Loader2, Mic } from "lucide-react";
import { Category } from "@/features/admin/category/type/category-type";
import { Button } from "@/components/ui/button";
import { startInterview } from "../../interviews/actions/start-interview";
import { useTransition } from "react";

type CategoriesProp = {
  category: Category;
};

const CategoriesList = ({ category }: CategoriesProp) => {
  const [isPending, startTransition] = useTransition();

  const handleStart = async () => {
    startTransition(async () => {
      await startInterview(category.id);
    });
  };
  return (
    <Card className="group relative overflow-hidden rounded-3xl border border-sky-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-300 hover:shadow-2xl">
      <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-sky-400 via-sky-300 to-yellow-300" />

      <CardContent className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-sky-400 to-yellow-300 shadow-md transition-transform duration-300 group-hover:scale-105">
              <Briefcase className="h-5 w-5 text-black" />
            </div>

            <div className="min-w-0">
              <h3 className="truncate text-lg font-bold text-zinc-900">
                {category.name}
              </h3>

              <p className="mt-1 line-clamp-2 text-sm text-zinc-500">
                {category.description || "No description available"}
              </p>
            </div>
          </div>

          <Badge
            className={
              category.isActive
                ? "border-green-200 bg-green-100 text-green-700"
                : "border-red-200 bg-red-100 text-red-700"
            }
          >
            <span className="mr-1 h-2 w-2 rounded-full bg-current" />
            {category.isActive ? "Active" : "Inactive"}
          </Badge>
        </div>

        {/* Stats */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-sky-50 p-4 transition-colors duration-300 hover:bg-sky-100">
            <FileQuestion className="mb-2 h-5 w-5 text-sky-600" />

            <p className="text-2xl font-bold text-zinc-900">
              {category._count.questions}
            </p>

            <p className="text-xs text-zinc-500">Questions</p>
          </div>

          <div className="rounded-2xl bg-yellow-50 p-4 transition-colors duration-300 hover:bg-yellow-100">
            <Mic className="mb-2 h-5 w-5 text-yellow-600" />

            <p className="text-2xl font-bold text-zinc-900">
              {category._count.interviews}
            </p>

            <p className="text-xs text-zinc-500">Interviews</p>
          </div>
        </div>
        <div className="mt-5 rounded-2xl bg-linear-to-r from-sky-500 to-yellow-400 p-4 text-black">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold">Ready to Practice?</h4>

              <p className="text-sm opacity-80">
                Start an AI-powered interview now.
              </p>
            </div>

            <Button
              size="sm"
              type="button"
              disabled={isPending}
              onClick={handleStart}
              className="bg-white text-black hover:bg-zinc-100 hover:shadow-xl hover:opacity-95"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Starting...
                </>
              ) : (
                <>
                  <Mic className="mr-2 h-4 w-4" />
                  Start Interview
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoriesList;
