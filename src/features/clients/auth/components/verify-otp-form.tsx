"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Controller,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import {
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
} from "@/components/ui/field";

import { loginPath } from "@/constants/route";

import {
  type VerifyOtpInput,
  verifyOtpSchema,
} from "../schema/verify-otp.schema";
import { verifyOtp } from "../actions/verify-otp";
import { resendVerificationOtp } from "../actions/resend-verification-otp";

import { VerifyHeader } from "./verify-header";
import { OTPInput } from "./otp-input";
import { Countdown } from "./countdown";
import { ResendOTPButton } from "./resend-otp-button";

type VerifyOTPFormProps = {
  email: string;
};

export function VerifyOTPForm({
  email,
}: VerifyOTPFormProps) {
  const router = useRouter();

  const [allowResend, setAllowResend] =
    useState(false);

  const form = useForm<VerifyOtpInput>({
    resolver: zodResolver(verifyOtpSchema),
    mode: "onChange",
    reValidateMode: "onChange",

    defaultValues: {
      email,
      otp: "",
    },
  });

  const {
    execute: executeVerification,
    isExecuting: isVerifying,
  } = useAction(verifyOtp, {
    onSuccess: ({ data }) => {
      toast.success(
        data.message ??
          "Your email has been verified.",
      );

      form.reset();

      router.replace(loginPath);
      router.refresh();
    },

    onError: () => {
      form.setError("otp", {
        type: "server",
        message:
          "The verification code is invalid or has expired.",
      });

      toast.error(
        "Unable to verify the code. Please try again.",
      );
    },
  });

  const {
    execute: executeResend,
    isExecuting: isResending,
  } = useAction(resendVerificationOtp, {
    onSuccess: ({ data }) => {
      form.setValue("otp", "", {
        shouldValidate: true,
      });

      setAllowResend(false);

      toast.success(
        data.message ??
          "A new verification code has been sent.",
      );
    },

    onError: () => {
      toast.error(
        "Unable to resend the verification code.",
      );
    },
  });

  function onSubmit(values: VerifyOtpInput) {
    if (isVerifying) {
      return;
    }

    executeVerification(values);
  }

  function handleResend() {
    if (
      !allowResend ||
      isResending ||
      isVerifying
    ) {
      return;
    }

    executeResend({
      email,
    });
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-12 dark:bg-zinc-950">
      <div className="w-full max-w-md">
        <VerifyHeader />

        <Card className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-lg shadow-zinc-200/50 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-none">
          <CardHeader className="border-b border-zinc-200 bg-sky-50/70 px-6 py-6 text-center dark:border-zinc-800 dark:bg-sky-950/30">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500 text-white">
              <ShieldCheck
                className="h-5 w-5"
                aria-hidden="true"
              />
            </div>

            <CardTitle className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-100">
              Verification code
            </CardTitle>

            <CardDescription className="text-zinc-500 dark:text-zinc-400">
              Enter the 6-digit code sent to{" "}
              <span className="font-medium text-zinc-700 dark:text-zinc-200">
                {email}
              </span>
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 sm:p-8">
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-7"
              noValidate
            >
              <input
                type="hidden"
                {...form.register("email")}
              />

              <Controller
                name="otp"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                  >
                    <OTPInput
                      value={field.value}
                      onChange={(value) => {
                        field.onChange(value);
                        form.clearErrors("otp");
                      }}
                    />

                    {fieldState.error && (
                      <FieldError
                        errors={[fieldState.error]}
                      />
                    )}
                  </Field>
                )}
              />

              <Button
                type="submit"
                disabled={
                  isVerifying ||
                  isResending ||
                  !form.formState.isValid
                }
                className="h-12 w-full rounded-xl bg-sky-600 font-semibold text-white shadow-sm transition-colors hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-sky-600 dark:hover:bg-sky-500"
              >
                {isVerifying ? (
                  <>
                    <Loader2
                      className="mr-2 h-4 w-4 animate-spin"
                      aria-hidden="true"
                    />
                    Verifying...
                  </>
                ) : (
                  <>
                    <ShieldCheck
                      className="mr-2 h-4 w-4"
                      aria-hidden="true"
                    />
                    Verify Email
                  </>
                )}
              </Button>

              <div className="flex min-h-10 items-center justify-center border-t border-zinc-200 pt-5 dark:border-zinc-800">
                {allowResend ? (
                  <ResendOTPButton
                    disabled={
                      isResending || isVerifying
                    }
                    loading={isResending}
                    onClick={handleResend}
                  />
                ) : (
                  <Countdown
                    initialSeconds={60}
                    onFinished={() =>
                      setAllowResend(true)
                    }
                  />
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}