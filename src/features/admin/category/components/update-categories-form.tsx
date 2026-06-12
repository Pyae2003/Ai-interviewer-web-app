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
import { CategoryInput } from "../schema/create-categories.schema";
import { updateCategory } from "../actions/update-categories";
import {
  UpdateCategoryInput,
  updateCategorySchema,
} from "../schema/update-categories.schema";
import { Category } from "@/generated/prisma/client";

type UpdateCategoryFormProps = {
  category: Category;
};

export function UpdateCategoryForm({ category }: UpdateCategoryFormProps) {
  const router = useRouter();

  const { execute, result, status, hasSucceeded, hasErrored } =
    useAction(updateCategory);

  const form = useForm<UpdateCategoryInput>({
    resolver: zodResolver(updateCategorySchema),
    mode: "onChange",
    defaultValues: {
      id: category.id,
      name: category.name,
      description: category.description ?? "",
      isActive: category.isActive,
      sortOrder: category.sortOrder,
    },
  });

  const isLoading = status === "executing";

  const onSubmit = (data: UpdateCategoryInput) => {
    execute({
      ...data,
      id: category.id,
    });
  };

  useEffect(() => {
    if (hasSucceeded) {
      toast.success(result.data?.message ?? "Category updated successfully");
      router.push(categoriesdashboardPath)
      router.refresh();
    }

    if (hasErrored) {
      toast.error(result.serverError?.message ?? "Failed to update category");
    }
  }, [hasSucceeded, hasErrored, result, router]);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-sky-100 via-white to-yellow-100 px-4 py-10">
        <div className="w-full max-w-md">
          {/* Brand */}
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold">AI Interviewer</h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Update Categories
            </p>
          </div>

          <Card className="shadow-xl border">
            <CardHeader className="text-center border-b bg-linear-to-r from-sky-100 to-yellow-100">
              <CardTitle className="text-2xl">Welcome to Update</CardTitle>

              <CardDescription>Update to Categories</CardDescription>
            </CardHeader>

            <CardContent className="p-6">
              <form
                id="categories-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
                noValidate
              >
                <FieldGroup className="space-y-5">
                  {/* Email */}
                  <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Category Name</FieldLabel>

                        <Input
                          {...field}
                          type="text"
                          placeholder="Frontend Development"
                        />

                        {fieldState.error && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="description"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Description</FieldLabel>

                        <Input
                          {...field}
                          type="text"
                          placeholder="Frontend interview questions"
                        />

                        {fieldState.error && (
                          <FieldError errors={[fieldState.error]} />
                        )}
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

                  <Controller
                    name="sortOrder"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Sort Order</FieldLabel>

                        <Input
                          type="number"
                          value={field.value}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          min={0}
                        />

                        {fieldState.error && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
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
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Update Category"
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    disabled={isLoading}
                    onClick={() =>
                      form.reset({
                        id: category.id,
                        name: category.name,
                        description: category.description ?? "",
                        isActive: category.isActive,
                        sortOrder: category.sortOrder,
                      })
                    }
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
