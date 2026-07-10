"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";

import {
  ArrowLeft,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  LockKeyhole,
  RotateCcw,
} from "lucide-react";

import { toast } from "sonner";

import { changePassword } from "../actions/change-password";
import {
  ChangePasswordInput,
  changePasswordSchema,
} from "../schema/change-password.schema";

import { loginPath } from "@/constants/route";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ChangePasswordForm() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const token = searchParams.get("token") ?? "";

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);

  const { execute, status, result, hasSucceeded, hasErrored } =
    useAction(changePassword);

  const form = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),

    defaultValues: {
      token,
      newPassword: "",
      confirmPassword: "",
    },

    mode: "onChange",
  });

  useEffect(() => {
    form.setValue("token", token);
  }, [token, form]);

  const isLoading = status === "executing";

  const onSubmit = (data: ChangePasswordInput) => {
    if (isLoading) return;

    execute(data);
  };

  useEffect(() => {
    if (!result) return;

    if (hasSucceeded) {
      toast.success(result.data?.message);

      form.reset();

      setTimeout(() => {
        router.replace(loginPath);
      }, 1500);
    }

    if (hasErrored) {
      toast.error(result.serverError?.message ?? "Unable to reset password.");
    }
  }, [result, hasSucceeded, hasErrored, form, router]);
  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Invalid Reset Link</CardTitle>

            <CardDescription>
              This password reset link is invalid or expired.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Button asChild className="w-full">
              <Link href={loginPath}>Back to Login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-sky-100 via-white to-yellow-100 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-r from-sky-500 to-yellow-400 shadow-lg">
            <LockKeyhole className="h-8 w-8 text-white" />
          </div>

          <h1 className="text-3xl font-bold">AI Interviewer</h1>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>

            <CardDescription>
              Choose a strong password for your account.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FieldGroup>
                <Controller
                  name="newPassword"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>New Password</FieldLabel>

                      <div className="relative">
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                        />

                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1"
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </Button>
                      </div>

                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="confirmPassword"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Confirm Password</FieldLabel>

                      <div className="relative">
                        <Input
                          {...field}
                          type={showConfirm ? "text" : "password"}
                          placeholder="••••••••"
                        />

                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1"
                          onClick={() => setShowConfirm((prev) => !prev)}
                        >
                          {showConfirm ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </Button>
                      </div>

                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>

              <div className="space-y-3">
                <Button
                  type="submit"

                  className="w-full"

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
                    <>
                      <Lock className="mr-2 h-4 w-4" />
                      Change Password
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"

                  type="button"

                  className="w-full"

                  disabled={isLoading}

                  onClick={() =>
                    form.reset({
                      token,
                      newPassword: "",
                      confirmPassword: "",
                    })
                  }
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              </div>
            </form>

            <div className="mt-8 border-t pt-6">
              <Link
                href={loginPath}

                className="flex items-center justify-center gap-2 text-sm text-sky-600 hover:underline"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
