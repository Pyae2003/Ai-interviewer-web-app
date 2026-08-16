"use client";

import { useState } from "react";
import {
  Controller,
  type Control,
} from "react-hook-form";
import { z } from "zod";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { PasswordField } from "./password-field";
import { signUpSchema } from "../../schema/signup-schema";

export type SignUpFormValues = z.infer<typeof signUpSchema>;

type SignUpFieldsProps = {
  control: Control<SignUpFormValues>;
};

const inputClassName =
  "h-12 rounded-xl border-zinc-200 bg-white px-4 shadow-none transition-colors focus-visible:border-sky-400 focus-visible:ring-sky-200 dark:border-zinc-800 dark:bg-zinc-950 dark:focus-visible:border-sky-700 dark:focus-visible:ring-sky-900";

export function SignUpFields({
  control,
}: SignUpFieldsProps) {
  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  return (
    <FieldGroup className="space-y-5">
      {/* FULL NAME */}
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel className="text-zinc-700 dark:text-zinc-200">
              Full Name
            </FieldLabel>

            <Input
              {...field}
              autoComplete="name"
              placeholder="Enter your full name"
              className={inputClassName}
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
        control={control}
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
              placeholder="example@gmail.com"
              className={inputClassName}
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
        control={control}
        render={({ field, fieldState }) => (
          <PasswordField
            label="Password"
            placeholder="Enter your password"
            visible={showPassword}
            onVisibilityChange={() =>
              setShowPassword((current) => !current)
            }
            inputProps={{
              ...field,
              autoComplete: "new-password",
            }}
            error={fieldState.error}
          />
        )}
      />

      {/* CONFIRM PASSWORD */}
      <Controller
        name="confirmPassword"
        control={control}
        render={({ field, fieldState }) => (
          <PasswordField
            label="Confirm Password"
            placeholder="Confirm your password"
            visible={showConfirmPassword}
            onVisibilityChange={() =>
              setShowConfirmPassword((current) => !current)
            }
            inputProps={{
              ...field,
              autoComplete: "new-password",
            }}
            error={fieldState.error}
          />
        )}
      />
    </FieldGroup>
  );
}