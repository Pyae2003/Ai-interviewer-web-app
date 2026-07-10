"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAction } from "next-safe-action/hooks";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, RotateCcw } from "lucide-react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { categoriesdashboardPath, dashboardPath } from "@/constants/route";
import { createCategoryGroup } from "../actions/create-category-groups";
import {
  CreateCategoryGroupInput,
  createCategoryGroupSchema,
} from "../schema/create-category-groups.schema";
import { CategoryGroupType } from "@/generated/prisma/enums";

export function CreateCategoryGroupForm() {
  const router = useRouter();

  const { execute, status } = useAction(createCategoryGroup, {
    onSuccess: ({ data }) => {
      toast.success(data?.message ?? "Category group created successfully");
      router.push(categoriesdashboardPath);
      router.refresh();
    },
    onError: ({ error }) => {
      toast.error(
        error.serverError?.message ?? "Failed to create category group",
      );
    },
  });

  const form = useForm<CreateCategoryGroupInput>({
    resolver: zodResolver(createCategoryGroupSchema),
    defaultValues: {
      name: "",
      slug: "",
      type: CategoryGroupType.LANGUAGE,
      isActive: true,
    },
    mode: "onChange",
  });

  const watchedName = useWatch({
    control: form.control,
    name: "name",
  });

  useEffect(() => {
    if (!watchedName) return;

    form.setValue(
      "slug",
      watchedName
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, ""),
      {
        shouldValidate: true,
        shouldDirty: true,
      },
    );
  }, [watchedName, form]);

  const isLoading = status === "executing";

  const onSubmit = (data: CreateCategoryGroupInput) => {
    if (isLoading) return;

    execute(data);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-sky-100 via-white to-yellow-100 px-4 py-10">
        <div className="w-full max-w-md">
          {/* Brand */}
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold">AI Interviewer</h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Create Category Groups
            </p>
          </div>

          <Card className="shadow-xl border">
            <CardHeader className="text-center border-b bg-linear-to-r from-sky-100 to-yellow-100">
              <CardTitle className="text-2xl">Welcome</CardTitle>

              <CardDescription>Create to Category Groups</CardDescription>
            </CardHeader>

            <CardContent className="p-6">
              <form
                id="categories-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
                noValidate
              >
                <FieldGroup className="space-y-5">
                  <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Enter Category Group Name </FieldLabel>

                        <Input
                          {...field}
                          type="text"
                          placeholder="Postion ..... "
                        />

                        {fieldState.error && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name="type"
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
                            <SelectItem value="LANGUAGE">Language</SelectItem>
                            <SelectItem value="POSITION">Position</SelectItem>
                            <SelectItem value="FRAMEWORK">Framework</SelectItem>
                            <SelectItem value="DATABASE">Database</SelectItem>
                            <SelectItem value="DEVOPS">DevOps</SelectItem>
                            <SelectItem value="CLOUD">Cloud</SelectItem>
                            <SelectItem value="MOBILE">Mobile</SelectItem>
                            <SelectItem value="AI">AI</SelectItem>
                            <SelectItem value="OTHER">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </Field>
                    )}
                  />

                  {/* Is Active */}
                  <Controller
                    name="isActive"
                    control={form.control}
                    render={({ field }) => (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />

                        <label className="text-sm cursor-pointer">
                          Is Active
                        </label>
                      </div>
                    )}
                  />
                </FieldGroup>

                <div className="flex flex-col gap-3">
                  <Button
                    type="submit"
                    disabled={
                      isLoading ||
                      !form.formState.isDirty ||
                      !form.formState.isValid
                    }
                    className="w-full h-11 rounded-xl bg-linear-to-r from-sky-500 to-yellow-400 text-black font-semibold shadow-md hover:shadow-xl transition"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Create Category"
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    disabled={isLoading || !form.formState.isDirty}
                    onClick={() => form.reset()}
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                </div>
              </form>
            </CardContent>

            <CardFooter className="flex flex-col gap-2 border-t bg-sky-50">
              <p className="text-sm text-muted-foreground"></p>

              <Link
                href={dashboardPath}
                className="text-sm font-medium text-sky-600 hover:text-sky-700"
              >
                Back to Dashboard{" "}
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>

      <Toaster richColors position="top-center" />
    </>
  );
}
