"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAction } from "next-safe-action/hooks";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Loader2, RotateCcw } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldContent,
  FieldDescription,
} from "@/components/ui/field";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";

import { categoriesdashboardPath, dashboardPath } from "@/constants/route";
import { createQuestion } from "../actions/create-questions";
import {
  CreateQuestionInput,
  createQuestionSchema,
} from "../schema/create-questions-schema";

import { Category } from "@/generated/prisma/client";

type Props = {
  categories: Category[];
};

const DIFFICULTY_OPTIONS = ["EASY", "MEDIUM", "HARD"] as const;

export function CreateCategoriesForm({ categories }: Props) {
  const router = useRouter();

  const { execute, result, status, hasSucceeded, hasErrored } =
    useAction(createQuestion);

  const isLoading = status === "executing";

  const form = useForm<CreateQuestionInput>({
    resolver: zodResolver(createQuestionSchema),
    defaultValues: {
      categoryName: "",
      question: "",
      difficulty: "EASY",
    },
    mode: "onChange",
  });

  const onSubmit = (data: CreateQuestionInput) => {
    if (isLoading) return;
    execute(data);
  };

   useEffect(() => {
    if (hasSucceeded) {
      toast.success(result.data?.message ?? "Question Created successfully");

      router.replace(categoriesdashboardPath);
    }

    if (hasErrored) {
      toast.error(result.serverError?.message ?? "Failed to create question");
    }
  }, [hasSucceeded, hasErrored, result, form, router]);

  const handleReset = () => {
    form.reset({
      categoryName: "",
      question: "",
      difficulty: "EASY",
    });
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-sky-100 via-white to-yellow-100 px-4 py-10">
        <div className="w-full max-w-md">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold">AI Interviewer</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Create Interview Questions
            </p>
          </div>

          <Card className="shadow-xl border">
            <CardHeader className="text-center border-b bg-linear-to-r from-sky-100 to-yellow-100">
              <CardTitle className="text-2xl">Create Question</CardTitle>
              <CardDescription>
                Fill all required fields carefully
              </CardDescription>
            </CardHeader>

            <CardContent className="p-6">
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FieldGroup className="space-y-5">

                  {/* CATEGORY */}
                  <Controller
                    name="categoryName"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldContent>
                          <FieldLabel>Category</FieldLabel>
                          <FieldDescription>
                            Select one category
                          </FieldDescription>
                          {fieldState.error && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </FieldContent>

                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>

                          <SelectContent>
                            {categories.map((c) => (
                              <SelectItem key={c.id} value={c.name}>
                                {c.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </Field>
                    )}
                  />

                  {/* QUESTION */}
                  <Controller
                    name="question"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Question</FieldLabel>

                        <Input
                          {...field}
                          placeholder="e.g. What is React?"
                        />

                        {fieldState.error && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  {/* DIFFICULTY (FIXED → RADIO STYLE CHECKBOX) */}
                  <Controller
                    name="difficulty"
                    control={form.control}
                    render={({ field }) => (
                      <Field>
                        <FieldLabel>Difficulty</FieldLabel>

                        <div className="flex gap-4">
                          {DIFFICULTY_OPTIONS.map((level) => (
                            <label
                              key={level}
                              className="flex items-center gap-2 cursor-pointer"
                            >
                              <Checkbox
                                checked={field.value === level}
                                onCheckedChange={() =>
                                  field.onChange(level)
                                }
                              />
                              <span className="text-sm">{level}</span>
                            </label>
                          ))}
                        </div>
                      </Field>
                    )}
                  />

                </FieldGroup>

                {/* ACTION BUTTONS */}
                <div className="flex flex-col gap-3">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-11 rounded-xl bg-linear-to-r from-sky-500 to-yellow-400 text-black font-semibold"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Create Question"
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleReset}
                    disabled={isLoading}
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                </div>
              </form>
            </CardContent>

            <CardFooter className="border-t bg-sky-50 flex justify-center">
              <Link
                href={dashboardPath}
                className="text-sm text-sky-600 hover:text-sky-700"
              >
                Back to Dashboard
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>

      <Toaster richColors position="top-center" />
    </>
  );
}