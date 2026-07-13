"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import { ShieldCheck } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
  Field,
  FieldError,
} from "@/components/ui/field";



import { VerifyHeader } from "./verify-header";
import { OTPInput } from "./otp-input";
import { Countdown } from "./countdown";
import { ResendOTPButton } from "./resend-otp-button";
import { VerifyOtpInput, verifyOtpSchema } from "../schema/verify-otp.schema";
import { verifyOtp } from "../actions/verify-otp";
import { useAction } from "next-safe-action/hooks";

export function VerifyOTPForm() {
  const [allowResend, setAllowResend] =
    useState(false);
   const {
    execute,
    result,
    status,
    isPending,
    hasErrored,
    hasSucceeded,
    isExecuting,
  } = useAction(verifyOtp);

  const form = useForm<VerifyOtpInput>({
    resolver: zodResolver(verifyOtpSchema),

    defaultValues: {
      otp: "",
    },
    mode: "onChange",
  });

  const submit = async (
    values: VerifyOtpInput,
  ) => {
    execute(values)

    toast.success("OTP Verified");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-100 via-white to-yellow-100 px-4 py-12">
      <div className="w-full max-w-md">
        <VerifyHeader />

        <Card className="rounded-3xl shadow-xl">
          <CardHeader className="text-center">
            <CardTitle>
              Verification Code
            </CardTitle>

            <CardDescription>
              Please enter the OTP below.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={form.handleSubmit(submit)}
              className="space-y-8"
            >
              <Controller
                name="otp"
                control={form.control}
                render={({
                  field,
                  fieldState,
                }) => (
                  <Field
                    data-invalid={
                      fieldState.invalid
                    }
                  >
                    <OTPInput
                      value={field.value}
                      onChange={
                        field.onChange
                      }
                    />

                    {fieldState.error && (
                      <FieldError
                        errors={[
                          fieldState.error,
                        ]}
                      />
                    )}
                  </Field>
                )}
              />

              <Button
                className="w-full"
                disabled={
                  !form.formState.isValid
                }
              >
                <ShieldCheck className="mr-2 h-4 w-4" />

                Verify OTP
              </Button>

              <div className="flex items-center justify-between border-t pt-5">
                {allowResend ? (
                  <ResendOTPButton
                    disabled={false}
                    loading={false}
                    onClick={() => {
                      toast.success(
                        "OTP Resent",
                      );

                      setAllowResend(false);
                    }}
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
    </div>
  );
}