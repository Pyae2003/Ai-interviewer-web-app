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
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";

import { categoriesdashboardPath, dashboardPath } from "@/constants/route";

import { Prisma } from "@/generated/prisma/client";
import { updateQuestion } from "../actions/update-question";
import {
  UpdateQuestionInput,
  updateQuestionSchema,
} from "../schema/edit-questions-schema";

type QuestionProps = Prisma.QuestionGetPayload<{
  select: {
    id: true;
    question: true;
    difficulty: true;
    category: {
      select: {
        id: true;
        name: true;
      };
    };
  };
}>;

type UpdateQuestionFormProps = {
  question: QuestionProps;
};

const DIFFICULTY_OPTIONS = ["EASY", "MEDIUM", "HARD"] as const;

export function UpdateQuestionForm({ question }: UpdateQuestionFormProps) {
  const router = useRouter();

  const { execute, result, status, hasSucceeded, hasErrored } =
    useAction(updateQuestion);

  const isLoading = status === "executing";

  const form = useForm<UpdateQuestionInput>({
    resolver: zodResolver(updateQuestionSchema),
    defaultValues: {
      id: question.id,
      categoryName: question.category.name,
      question: question.question,
      difficulty: question.difficulty,
    },
    mode: "onChange",
  });

  const onSubmit = (data: UpdateQuestionInput) => {
    if (isLoading) return;
    execute({ ...data, id: question.id });
  };

  // success / error handling
  useEffect(() => {
    if (hasSucceeded) {
      toast.success(result.data?.message ?? "Question updated successfully");

      router.replace(categoriesdashboardPath);
    }

    if (hasErrored) {
      toast.error(result.serverError?.message ?? "Failed to update question");
    }
  }, [hasSucceeded, hasErrored, result, form, router]);

  const handleReset = () => {
    form.reset({
      categoryName: question.category.name,
      question: question.question,
      difficulty: question.difficulty,
    });
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-sky-100 via-white to-yellow-100 px-4 py-10">
        <div className="w-full max-w-md">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold">AI Interviewer</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Update Interview Questions
            </p>
          </div>

          <Card className="shadow-xl border">
            <CardHeader className="text-center border-b bg-linear-to-r from-sky-100 to-yellow-100">
              <CardTitle className="text-2xl">Create Question</CardTitle>
              <CardDescription>
                Updated all required fields carefully
              </CardDescription>
            </CardHeader>

            <CardContent className="p-6">
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FieldGroup className="space-y-5">
                  {/* CATEGORY */}
                  <Field>
                    <FieldLabel>Category</FieldLabel>
                    <Input value={question.category.name} disabled />
                  </Field>

                  {/* QUESTION */}
                  <Controller
                    name="question"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Question</FieldLabel>

                        <Input {...field} placeholder="e.g. What is React?" />

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
                                onCheckedChange={() => field.onChange(level)}
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
                    disabled={isLoading || !form.formState.isDirty}
                    className="w-full h-11 rounded-xl bg-linear-to-r from-sky-500 to-yellow-400 text-black font-semibold"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Update Question"
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
