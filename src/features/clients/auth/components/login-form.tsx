"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAction } from "next-safe-action/hooks";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Loader2, LogIn, RotateCcw } from "lucide-react";

import { toast } from "sonner";

import { LoginInput, loginSchema } from "../schema/login-schema";
import { loginUser } from "../actions/login";

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
import { dashboardPath, signUpPath } from "@/constants/route";

export function LoginForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const { execute, result, status, hasSucceeded, hasErrored } =
    useAction(loginUser);

  const form = useForm<z.input<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const isLoading = status === "executing";

  const onSubmit = (data: LoginInput) => {
    if (isLoading) return;

    execute(data);
  };

  useEffect(() => {
    if (!result) return;

    if (hasSucceeded) {
      toast.success(result?.data?.message ?? "Login successful", {
        position: "top-center",
      });

      setTimeout(() => {
        router.push(dashboardPath);
        router.refresh();
      }, 800);
    }

    if (hasErrored) {
      toast.error(
        result.serverError?.message ?? "Unable to login. Please try again.",
        {
          position: "top-center",
        },
      );
    }
  }, [result, hasSucceeded, hasErrored, router]);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-white to-yellow-100 px-4 py-10">
        <div className="w-full max-w-md">
          {/* Brand */}
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold">AI Interviewer</h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to continue your interview preparation journey.
            </p>
          </div>

          <Card className="shadow-xl border">
            <CardHeader className="text-center border-b bg-gradient-to-r from-sky-100 to-yellow-100">
              <CardTitle className="text-2xl">Welcome Back</CardTitle>

              <CardDescription>Login to your account</CardDescription>
            </CardHeader>

            <CardContent className="p-6">
              <form
                id="login-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
                noValidate
              >
                <FieldGroup className="space-y-5">
                  {/* Email */}
                  <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Email Address</FieldLabel>

                        <Input
                          {...field}
                          type="email"
                          autoComplete="email"
                          placeholder="john@example.com"
                        />

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  {/* Password */}
                  <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Password</FieldLabel>

                        <div className="relative">
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                            placeholder="Enter password"
                            className="pr-10"
                          />

                          <button
                            type="button"
                            aria-label={
                              showPassword ? "Hide password" : "Show password"
                            }
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                          >
                            {showPassword ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
                        </div>

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  {/* Remember Me */}
                  <Controller
                    name="rememberMe"
                    control={form.control}
                    render={({ field }) => (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />

                        <label className="text-sm cursor-pointer">
                          Remember me
                        </label>
                      </div>
                    )}
                  />
                </FieldGroup>

                <div className="flex flex-col gap-3">
                  <Button
                    type="submit"
                    disabled={isLoading || !form.formState.isValid}
                    className="w-full h-11 rounded-xl bg-gradient-to-r from-sky-500 to-yellow-400 text-black font-semibold shadow-md hover:shadow-xl transition"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing In...
                      </>
                    ) : (
                      <>
                        <LogIn className="mr-2 h-4 w-4" />
                        Sign In
                      </>
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    disabled={isLoading}
                    onClick={() => form.reset()}
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                </div>
              </form>
            </CardContent>

            <CardFooter className="flex flex-col gap-2 border-t bg-sky-50">
              <p className="text-sm text-muted-foreground">
                Don`t have an account?
              </p>

              <Link
                href={signUpPath}
                className="text-sm font-medium text-sky-600 hover:text-sky-700"
              >
                Create Account
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>

      <Toaster richColors position="top-center" />
    </>
  );
}
