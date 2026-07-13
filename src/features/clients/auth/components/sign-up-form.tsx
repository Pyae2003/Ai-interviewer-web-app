"use client";

import { useAction } from "next-safe-action/hooks";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Eye, EyeOff, Loader2, Plus, RotateCcw } from "lucide-react";
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

import { signUpSchema } from "../schema/signup-schema";
import { signUpUser } from "../actions/sign-up";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { dashboardPath, loginPath } from "@/constants/route";
import { useRouter } from "next/navigation";

export function SignUpForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    execute,
    result,
    status,
    isPending,
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

  async function onSubmit(data: z.infer<typeof signUpSchema>) {
    if (isLoading) return;
    execute(data);
  }

  useEffect(() => {
    console.log("This is result data", result);
    if (!result) return;

    if (hasSucceeded) {
      toast.success(result.data.message || "Account created successfully", {
        position: "top-center",
      });

      form.reset();

      setTimeout(() => {
        router.push(dashboardPath);
        router.refresh();
      }, 800);
    } else if (hasErrored) {
      toast.error("Signup failed", { position: "top-center" });
    }
  }, [hasSucceeded, hasErrored, result,form,router]);

  return (
      <div className="min-h-screen flex items-center justify-center bg--to-br from-sky-100 via-white to-yellow-100 px-4 py-10">
      {/* OUTER FRAME */}
      <div className="w-full max-w-2xl">
        {/* TOP BRAND BOX */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-black">
            AI Interviewer
          </h1>
          <p className="text-sm sm:text-base text-black/60 mt-1">
            Create your account and start your AI interview journey
          </p>
        </div>

        {/* FORM CARD */}
        <Card className="w-full rounded-2xl border border-black/10 shadow-xl bg-white">
          {/* HEADER BOX */}
          <CardHeader className="space-y-2 text-center border-b border-black/10 bg--to-r from-sky-100 to-yellow-100 rounded-t-2xl">
            <CardTitle className="text-xl sm:text-2xl font-bold text-black">
              Create Account
            </CardTitle>
            <CardDescription className="text-black/60">
              Fill in your details below
            </CardDescription>
          </CardHeader>

          {/* BODY */}
          <CardContent className="p-5 sm:p-8">
            <form
              id="signup-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FieldGroup className="space-y-5">
                {/* NAME */}
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Full Name</FieldLabel>
                      <Input
                        {...field}
                        placeholder="Enter your full name"
                        className="h-11 border-black/20 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 rounded-xl"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* EMAIL */}
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Email Address</FieldLabel>
                      <Input
                        {...field}
                        placeholder="example@gmail.com"
                        className="h-11 border-black/20 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 rounded-xl"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* PASSWORD */}
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
                          placeholder="Enter password"
                          className="h-11 pr-10 border-black/20 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 rounded-xl"
                        />

                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-black/60 hover:text-sky-600"
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

                {/* CONFIRM PASSWORD */}
                <Controller
                  name="confirmPassword"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Confirm Password</FieldLabel>

                      <div className="relative">
                        <Input
                          {...field}
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm password"
                          className="h-11 pr-10 border-black/20 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 rounded-xl"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-black/60 hover:text-yellow-600"
                        >
                          {showConfirmPassword ? (
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
              </FieldGroup>

              {/* SUBMIT BUTTON BOX */}
              <div className="pt-2 space-y-2">
                <Button
                  type="button"
                  variant="outline"
                  disabled={isPending}
                  onClick={() => form.reset()}
                  className="h-12 w-full rounded-xl border-yellow-300 bg-white text-black transition-all duration-200 hover:bg-yellow-100 hover:text-black sm:w-35"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
                <Button
                  type="submit"
                  form="signup-form"
                  className="w-full h-11 rounded-xl bg--to-r from-sky-500 to-yellow-400 text-black font-semibold shadow-md hover:shadow-xl transition"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                    </>
                  )}
                  Create Account
                </Button>
              </div>
            </form>
          </CardContent>

          {/* FOOTER BOX */}
          <CardFooter className="flex flex-col text-center gap-2 border-t border-black/10 bg-sky-50 rounded-b-2xl py-4">
            <p className="text-sm text-black/60">Already have an account?</p>

            <a
              href={loginPath}
              className="text-sm font-medium text-sky-600 hover:text-sky-800"
            >
              Login instead
            </a>
          </CardFooter>
        </Card>
      </div>
      <Toaster richColors position="top-center" />
    </div>
  );
}
