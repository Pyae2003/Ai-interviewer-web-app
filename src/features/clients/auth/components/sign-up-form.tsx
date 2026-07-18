"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, MotionConfig, type Variants } from "framer-motion";
import * as z from "zod";
import {
  Bot,
  Eye,
  EyeOff,
  Loader2,
  Plus,
  RotateCcw,
  Sparkles,
} from "lucide-react";
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
import { Input } from "@/components/ui/input";

import { dashboardPath, loginPath } from "@/constants/route";
import { signUpUser } from "../actions/sign-up";
import { signUpSchema } from "../schema/signup-schema";

const headlineContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.08,
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
    { text: "AI", gradient: false },
    { text: "Interviewer", gradient: true },
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
export function SignUpForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    execute,
    result,
    status,
    hasErrored,
    hasSucceeded,
    isExecuting,
  } = useAction(signUpUser);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const isLoading = status === "executing" || isExecuting;

  function onSubmit(data: z.infer<typeof signUpSchema>) {
    if (isLoading) return;

    execute(data);
  }

  useEffect(() => {
    if (!result) return;

    if (hasSucceeded) {
      toast.success(
        result.data?.message ?? "Account created successfully",
        {
          position: "top-center",
        },
      );

      form.reset();

      const redirectTimer = window.setTimeout(() => {
        router.push(dashboardPath);
        router.refresh();
      }, 800);

      return () => window.clearTimeout(redirectTimer);
    }

    if (hasErrored) {
      toast.error("Signup failed. Please try again.", {
        position: "top-center",
      });
    }
  }, [form, hasErrored, hasSucceeded, result, router]);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-sky-50 via-white to-yellow-50 px-4 py-12 dark:from-sky-950 dark:via-zinc-950 dark:to-yellow-950">
      {/* Soft background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-32 top-32 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl dark:bg-sky-900/25"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-32 right-32 h-72 w-72 rounded-full bg-yellow-200/40 blur-3xl dark:bg-yellow-900/20"
      />

      <div className="relative w-full max-w-2xl">
        {/* Brand */}
        <div className="mb-7 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/80 px-3 py-1.5 text-sm font-medium text-zinc-600 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
            <Sparkles
              className="h-4 w-4 text-sky-500"
              aria-hidden="true"
            />
            Smart Interview Preparation
          </div>

          <AnimatedHeadline />

          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-zinc-500 sm:text-base dark:text-zinc-400">
            Create your account and start your AI-powered interview journey.
          </p>
        </div>

        {/* Form card */}
        <Card className="overflow-hidden rounded-3xl border border-black/5 bg-white/90 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/90">
          <CardHeader className="border-b border-black/5 bg-linear-to-r from-sky-50/80 via-white to-yellow-50/80 px-6 py-6 text-center dark:border-white/10 dark:from-sky-950/60 dark:via-zinc-900 dark:to-yellow-950/60 sm:px-8">
            <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-sky-400 to-yellow-300 text-zinc-950 shadow-sm">
              <Bot className="h-5 w-5" aria-hidden="true" />
            </div>

            <CardTitle className="text-xl font-bold tracking-tight text-zinc-950 sm:text-2xl dark:text-white">
              Create your account
            </CardTitle>

            <CardDescription className="text-zinc-500 dark:text-zinc-400">
              Enter your details to begin practicing.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 sm:p-8">
            <form
              id="signup-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FieldGroup className="space-y-5">
                {/* Full name */}
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="text-zinc-700 dark:text-zinc-200">
                        Full Name
                      </FieldLabel>

                      <Input
                        {...field}
                        autoComplete="name"
                        placeholder="Enter your full name"
                        className="h-12 rounded-xl border-black/10 bg-white px-4 shadow-none transition-colors focus-visible:border-sky-400 focus-visible:ring-sky-200/70 dark:border-white/10 dark:bg-zinc-950 dark:focus-visible:ring-sky-900"
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

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
                        autoComplete="email"
                        inputMode="email"
                        placeholder="example@gmail.com"
                        className="h-12 rounded-xl border-black/10 bg-white px-4 shadow-none transition-colors focus-visible:border-sky-400 focus-visible:ring-sky-200/70 dark:border-white/10 dark:bg-zinc-950 dark:focus-visible:ring-sky-900"
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
                      <FieldLabel className="text-zinc-700 dark:text-zinc-200">
                        Password
                      </FieldLabel>

                      <div className="relative">
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          autoComplete="new-password"
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
                            setShowPassword((current) => !current)
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
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* Confirm password */}
                <Controller
                  name="confirmPassword"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="text-zinc-700 dark:text-zinc-200">
                        Confirm Password
                      </FieldLabel>

                      <div className="relative">
                        <Input
                          {...field}
                          type={
                            showConfirmPassword ? "text" : "password"
                          }
                          autoComplete="new-password"
                          placeholder="Confirm your password"
                          className="h-12 rounded-xl border-black/10 bg-white px-4 pr-12 shadow-none transition-colors focus-visible:border-sky-400 focus-visible:ring-sky-200/70 dark:border-white/10 dark:bg-zinc-950 dark:focus-visible:ring-sky-900"
                        />

                        <button
                          type="button"
                          aria-label={
                            showConfirmPassword
                              ? "Hide confirmation password"
                              : "Show confirmation password"
                          }
                          aria-pressed={showConfirmPassword}
                          onClick={() =>
                            setShowConfirmPassword(
                              (current) => !current,
                            )
                          }
                          className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 dark:hover:bg-white/10 dark:hover:text-white"
                        >
                          {showConfirmPassword ? (
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
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>

              {/* Form actions */}
              <div className="grid gap-3 pt-1 sm:grid-cols-[140px_1fr]">
                <Button
                  type="button"
                  variant="outline"
                  disabled={isLoading}
                  onClick={() => form.reset()}
                  className="h-12 rounded-xl border-black/10 bg-white font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-800"
                >
                  <RotateCcw
                    className="mr-2 h-4 w-4"
                    aria-hidden="true"
                  />
                  Reset
                </Button>

                <Button
                  type="submit"
                  form="signup-form"
                  disabled={isLoading}
                  className="h-12 rounded-xl bg-linear-to-r from-sky-500 to-yellow-400 font-semibold text-zinc-950 shadow-sm transition-opacity hover:opacity-90"
                >
                  {isLoading ? (
                    <>
                      <Loader2
                        className="mr-2 h-4 w-4 animate-spin"
                        aria-hidden="true"
                      />
                      Creating account...
                    </>
                  ) : (
                    <>
                      <Plus
                        className="mr-2 h-4 w-4"
                        aria-hidden="true"
                      />
                      Create Account
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col gap-2 border-t border-black/5 bg-zinc-50/70 px-6 py-5 text-center dark:border-white/10 dark:bg-zinc-950/50">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Already have an account?
            </p>

            <Link
              href={loginPath}
              className="text-sm font-semibold text-sky-600 transition-colors hover:text-sky-700 hover:underline dark:text-sky-400 dark:hover:text-sky-300"
            >
              Login instead
            </Link>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}

