"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon, Loader2, RotateCcw, Send } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
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
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";

import { dashboardPath } from "@/constants/route";

import { createPost } from "../actions/create-post";
import { createPostSchema, type CreatePostInput } from "../schema";
import ImageUpload from "./image-upload";

type CreatePostFormProps = Readonly<{
  interviewId?: string;
}>;

export function CreatePostForm({ interviewId }: CreatePostFormProps) {
  const router = useRouter();

  const { execute, result, status, hasSucceeded, hasErrored } =
    useAction(createPost);

  const form = useForm<CreatePostInput>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      interviewId,
      caption: "",
      images: [],
    },
    mode: "onChange",
  });

  const isLoading = status === "executing";

  const resetForm = () => {
    form.reset({
      interviewId,
      caption: "",
      images: [],
    });
  };

  const onSubmit = (data: CreatePostInput) => {
    if (isLoading) return;

    execute({
      ...data,
      interviewId,
    });
  };

  useEffect(() => {
    if (hasSucceeded) {
      toast.success(result.data?.message ?? "Post created successfully!");

      resetForm();

      router.push("/blog");
      router.refresh();
    }

    if (hasErrored) {
      toast.error(
        result.serverError?.message ??
          "Failed to create post. Please try again.",
      );
    }
  }, [hasSucceeded, hasErrored, result, router, interviewId, form, resetForm]);

  const handleReset = () => {
    if (isLoading) return;

    resetForm();
  };

  return (
    <>
      <main className="relative min-h-svh overflow-hidden bg-linear-to-b from-sky-50 via-blue-50/40 to-background px-4 py-10 dark:from-slate-950 dark:via-sky-950/30 dark:to-slate-950 sm:px-6 sm:py-14">
        {/* Background decorations */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-sky-300/25 blur-3xl dark:bg-sky-500/10"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 bottom-0 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl dark:bg-blue-500/10"
        />

        <div className="relative mx-auto w-full max-w-2xl">
          {/* Page heading */}
          <header className="mb-8 text-center">
            <div className="mb-4 flex justify-center">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-sky-100 text-sky-600 shadow-sm ring-1 ring-sky-200 dark:bg-sky-950 dark:text-sky-400 dark:ring-sky-800">
                <Send className="size-7" aria-hidden="true" />
              </div>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              Share Your Achievement
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-400">
              Share your AI interview result with the community and celebrate
              your progress.
            </p>
          </header>

          <Card className="overflow-hidden border border-sky-100/80 bg-white/90 py-0 shadow-xl shadow-sky-100/60 backdrop-blur-xl dark:border-sky-900/60 dark:bg-slate-900/90 dark:shadow-black/30">
            {/* Top accent */}
            <div className="h-1.5 bg-linear-to-r from-sky-400 via-sky-500 to-blue-600" />

            <CardHeader className="border-b border-sky-100 bg-sky-50/60 px-6 py-6 dark:border-sky-900/60 dark:bg-sky-950/20 md:px-8">
              <CardTitle className="text-xl text-slate-950 dark:text-white">
                Create Community Post
              </CardTitle>

              <CardDescription className="text-slate-600 dark:text-slate-400">
                Add a meaningful caption and up to four images.
              </CardDescription>
            </CardHeader>

            <CardContent className="px-6 py-7 md:px-8 md:py-8">
              <form
                id="create-post-form"
                onSubmit={form.handleSubmit(onSubmit)}
                noValidate
                aria-busy={isLoading}
                className="space-y-7"
              >
                <FieldGroup>
                  {/* Caption */}
                  <Controller
                    name="caption"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel
                          htmlFor="caption"
                          className="text-slate-800 dark:text-slate-200"
                        >
                          Caption
                        </FieldLabel>

                        <Textarea
                          {...field}
                          id="caption"
                          placeholder="I just completed my AI interview and scored 92%! 🎉"
                          disabled={isLoading}
                          maxLength={2000}
                          rows={6}
                          aria-invalid={fieldState.invalid}
                          aria-describedby={
                            fieldState.error ? "caption-error" : "caption-count"
                          }
                          className="resize-none border-sky-200 bg-white text-slate-950 placeholder:text-slate-400 focus-visible:border-sky-500 focus-visible:ring-sky-500/20 dark:border-sky-900 dark:bg-slate-950/60 dark:text-white dark:placeholder:text-slate-500 dark:focus-visible:border-sky-500"
                        />

                        <div className="flex min-h-5 items-start justify-between gap-4">
                          <div>
                            {fieldState.error && (
                              <FieldError
                                id="caption-error"
                                errors={[fieldState.error]}
                              />
                            )}
                          </div>

                          <span
                            id="caption-count"
                            aria-live="polite"
                            className="shrink-0 text-xs text-slate-500 dark:text-slate-400"
                          >
                            {field.value?.length ?? 0}/2000
                          </span>
                        </div>
                      </Field>
                    )}
                  />

                  {/* Images */}
                  <Controller
                    name="images"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <div className="flex items-center justify-between gap-4">
                          <FieldLabel className="text-slate-800 dark:text-slate-200">
                            Images
                          </FieldLabel>

                          <span className="text-xs text-slate-500 dark:text-slate-400">
                            Maximum 4 images
                          </span>
                        </div>

                        <div className="rounded-xl border border-sky-200 bg-sky-50/60 p-4 transition-colors dark:border-sky-900/70 dark:bg-sky-950/20">
                          <div className="mb-4 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                            <ImageIcon
                              className="size-4 text-sky-600 dark:text-sky-400"
                              aria-hidden="true"
                            />

                            <span>Add screenshots or achievement images</span>
                          </div>

                          <ImageUpload
                            value={field.value ?? []}
                            onChange={(images) => {
                              if (!isLoading) {
                                field.onChange(images);
                              }
                            }}
                            max={4}
                          />
                        </div>

                        {fieldState.error && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>

                <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                  <Button
                    type="submit"
                    disabled={isLoading || !form.formState.isValid}
                    className="h-11 flex-1 rounded-xl bg-linear-to-r from-sky-500 to-blue-600 font-semibold text-white shadow-md shadow-sky-500/20 transition-all hover:from-sky-600 hover:to-blue-700 hover:shadow-lg hover:shadow-sky-500/25 disabled:cursor-not-allowed disabled:opacity-60 dark:from-sky-500 dark:to-blue-600 dark:hover:from-sky-400 dark:hover:to-blue-500"
                  >
                    {isLoading ? (
                      <>
                        <Loader2
                          className="mr-2 size-4 animate-spin"
                          aria-hidden="true"
                        />
                        Publishing...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 size-4" aria-hidden="true" />
                        Publish Post
                      </>
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    disabled={isLoading}
                    onClick={handleReset}
                    className="h-11 rounded-xl border-sky-200 bg-white text-slate-700 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700 dark:border-sky-900 dark:bg-slate-950/50 dark:text-slate-300 dark:hover:border-sky-700 dark:hover:bg-sky-950/40 dark:hover:text-sky-300"
                  >
                    <RotateCcw className="mr-2 size-4" aria-hidden="true" />
                    Reset
                  </Button>
                </div>
              </form>
            </CardContent>

            <CardFooter className="flex flex-col gap-3 border-t border-sky-100 bg-sky-50/60 px-6 py-5 dark:border-sky-900/60 dark:bg-sky-950/20">
              <p className="text-center text-xs leading-5 text-slate-500 dark:text-slate-400">
                By publishing, your post will be visible to other community
                members.
              </p>

              <Button
                variant="link"
                asChild
                className="h-auto p-0 text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
              >
                <Link href={dashboardPath}>← Back to Dashboard</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>

      <Toaster richColors position="top-center" />
    </>
  );
}
