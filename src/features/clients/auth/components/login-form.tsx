"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAction } from "next-safe-action/hooks";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  motion,
  MotionConfig,
  type Variants,
} from "framer-motion";
import * as z from "zod";

import {
  Bot,
  Eye,
  EyeOff,
  Loader2,
  LogIn,
  RotateCcw,
  Sparkles,
} from "lucide-react";
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
import {
  dashboardPath,
  resetPasswordPath,
  signUpPath,
} from "@/constants/route";
import { OAuthButtons } from "@/components/Oauth-button/oauth-buttons";


const headlineContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.075,
    },
  },
};

const headlineWordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 6,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.48,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function AnimatedHeadline() {
  const words = [
    {
      text: "AI",
      gradient: false,
    },
    {
      text: "Interviewer",
      gradient: true,
    },
  ];

  return (
    <MotionConfig reducedMotion="user">
      <motion.h1
        initial="hidden"
        animate="visible"
        variants={headlineContainerVariants}
        aria-label="AI Interviewer"
        className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl dark:text-white"
      >
        {words.map((word) => (
          <motion.span
            key={word.text}
            aria-hidden="true"
            variants={headlineWordVariants}
            className={
              word.gradient
                ? "inline-block bg-linear-to-r from-sky-500 to-yellow-500 bg-clip-text text-transparent"
                : "mr-[0.22em] inline-block"
            }
          >
            {word.text}
          </motion.span>
        ))}
      </motion.h1>
    </MotionConfig>
  );
}

export function LoginForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const {
    execute,
    result,
    status,
    hasSucceeded,
    hasErrored,
  } = useAction(loginUser);

  const form = useForm<z.input<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const isLoading = status === "executing";

  function onSubmit(data: LoginInput) {
    if (isLoading) return;

    execute(data);
  }

  useEffect(() => {
    if (!result) return;

    if (hasSucceeded) {
      toast.success(
        result.data?.message ?? "Login successful",
        {
          position: "top-center",
        },
      );

      const redirectTimer = window.setTimeout(() => {
        router.push(dashboardPath);
        router.refresh();
      }, 800);

      return () => window.clearTimeout(redirectTimer);
    }

    if (hasErrored) {
      toast.error(
        result.serverError?.message ??
          "Unable to login. Please try again.",
        {
          position: "top-center",
        },
      );
    }
  }, [
    result,
    hasSucceeded,
    hasErrored,
    router,
  ]);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-transparent px-4 py-12">
      {/* Soft background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-sky-200/30 blur-3xl dark:bg-sky-800/15"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-yellow-200/30 blur-3xl dark:bg-yellow-700/10"
      />

      <div className="relative w-full max-w-md">
        {/* Brand */}
        <div className="mb-7 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/75 px-3 py-1.5 text-sm font-medium text-zinc-600 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
            <Sparkles
              className="h-4 w-4 text-sky-500"
              aria-hidden="true"
            />
            Smart Interview Preparation
          </div>

          <AnimatedHeadline />

          <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            Sign in and continue building confidence for your
            next interview.
          </p>
        </div>

        <Card className="overflow-hidden rounded-3xl border border-black/5 bg-white/90 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/90">
          {/* Card header */}
          <CardHeader className="border-b border-black/5 bg-linear-to-r from-sky-50/80 via-white to-yellow-50/80 px-6 py-6 text-center dark:border-white/10 dark:from-sky-950/60 dark:via-zinc-900 dark:to-yellow-950/60">
            <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-sky-400 to-yellow-300 text-zinc-950 shadow-sm">
              <Bot
                className="h-5 w-5"
                aria-hidden="true"
              />
            </div>

            <CardTitle className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">
              Welcome back
            </CardTitle>

            <CardDescription className="text-zinc-500 dark:text-zinc-400">
              Enter your details to access your account.
            </CardDescription>
          </CardHeader>

          {/* Form */}
          <CardContent className="p-6 sm:p-8">
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
                      <FieldLabel className="text-zinc-700 dark:text-zinc-200">
                        Email Address
                      </FieldLabel>

                      <Input
                        {...field}
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        placeholder="john@example.com"
                        className="h-12 rounded-xl border-black/10 bg-white px-4 shadow-none transition-colors focus-visible:border-sky-400 focus-visible:ring-sky-200/70 dark:border-white/10 dark:bg-zinc-950 dark:focus-visible:ring-sky-900"
                      />

                      {fieldState.invalid && (
                        <FieldError
                          errors={[fieldState.error]}
                        />
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
                      <div className="flex items-center justify-between gap-4">
                        <FieldLabel className="text-zinc-700 dark:text-zinc-200">
                          Password
                        </FieldLabel>

                        <Link
                          href={resetPasswordPath}
                          className="text-xs font-semibold text-sky-600 transition-colors hover:text-sky-700 hover:underline dark:text-sky-400 dark:hover:text-sky-300"
                        >
                          Forgot password?
                        </Link>
                      </div>

                      <div className="relative">
                        <Input
                          {...field}
                          type={
                            showPassword
                              ? "text"
                              : "password"
                          }
                          autoComplete="current-password"
                          placeholder="Enter your password"
                          className="h-12 rounded-xl border-black/10 bg-white px-4 pr-12 shadow-none transition-colors focus-visible:border-sky-400 focus-visible:ring-sky-200/70 dark:border-white/10 dark:bg-zinc-950 dark:focus-visible:ring-sky-900"
                        />

                        <button
                          type="button"
                          aria-label={
                            showPassword
                              ? "Hide password"
                              : "Show password"
                          }
                          aria-pressed={showPassword}
                          onClick={() =>
                            setShowPassword(
                              (current) => !current,
                            )
                          }
                          className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 dark:hover:bg-white/10 dark:hover:text-white"
                        >
                          {showPassword ? (
                            <EyeOff
                              className="h-4 w-4"
                              aria-hidden="true"
                            />
                          ) : (
                            <Eye
                              className="h-4 w-4"
                              aria-hidden="true"
                            />
                          )}
                        </button>
                      </div>

                      {fieldState.invalid && (
                        <FieldError
                          errors={[fieldState.error]}
                        />
                      )}
                    </Field>
                  )}
                />

                {/* Remember me */}
                <Controller
                  name="rememberMe"
                  control={form.control}
                  render={({ field }) => (
                    <div className="flex items-center gap-2.5">
                      <Checkbox
                        id="remember-me"
                        checked={field.value}
                        onCheckedChange={(checked) =>
                          field.onChange(checked === true)
                        }
                      />

                      <label
                        htmlFor="remember-me"
                        className="cursor-pointer text-sm text-zinc-600 dark:text-zinc-300"
                      >
                        Remember me on this device
                      </label>
                    </div>
                  )}
                />
              </FieldGroup>

              {/* Buttons */}
              <div className="grid gap-3 pt-1 sm:grid-cols-[1fr_120px]">
                <Button
                  type="submit"
                  disabled={
                    isLoading ||
                    !form.formState.isValid
                  }
                  className="h-12 rounded-xl bg-linear-to-r from-sky-500 to-yellow-400 font-semibold text-zinc-950 shadow-sm transition-opacity hover:opacity-90"
                >
                  {isLoading ? (
                    <>
                      <Loader2
                        className="mr-2 h-4 w-4 animate-spin"
                        aria-hidden="true"
                      />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <LogIn
                        className="mr-2 h-4 w-4"
                        aria-hidden="true"
                      />
                      Sign In
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  disabled={isLoading}
                  onClick={() => {
                    form.reset();
                    setShowPassword(false);
                  }}
                  className="h-12 rounded-xl border-black/10 bg-white font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-800"
                >
                  <RotateCcw
                    className="mr-2 h-4 w-4"
                    aria-hidden="true"
                  />
                  Reset
                </Button>
              </div>
            </form>
          </CardContent>

          {/* Footer */}
          <CardFooter className="flex flex-col gap-5 border-t border-black/5 bg-zinc-50/70 px-6 py-6 dark:border-white/10 dark:bg-zinc-950/50">
            <div className="relative flex w-full items-center">
              <div className="h-px flex-1 bg-black/5 dark:bg-white/10" />

              <span className="px-3 text-xs font-medium uppercase tracking-wider text-zinc-400">
                Or continue with
              </span>

              <div className="h-px flex-1 bg-black/5 dark:bg-white/10" />
            </div>

            <div className="w-full">
              <OAuthButtons />
            </div>

            <div className="w-full border-t border-black/5 pt-5 text-center dark:border-white/10">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Do not have an account?{" "}
                <Link
                  href={signUpPath}
                  className="font-semibold text-sky-600 transition-colors hover:text-sky-700 hover:underline dark:text-sky-400 dark:hover:text-sky-300"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
