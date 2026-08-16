"use client";

import {
  Controller,
  type Control,
} from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { LoginPasswordField } from "./login-password-field";
import { LoginInput } from "../../schema/login-schema";

type LoginFieldsProps = {
  control: Control<LoginInput>;
  showPassword: boolean;
  onPasswordVisibilityChange: () => void;
};

const inputClassName =
  "h-12 rounded-xl border-zinc-200 bg-white px-4 shadow-none transition-colors focus-visible:border-sky-400 focus-visible:ring-sky-200 dark:border-zinc-800 dark:bg-zinc-950 dark:focus-visible:border-sky-700 dark:focus-visible:ring-sky-900";

export function LoginFields({
  control,
  showPassword,
  onPasswordVisibilityChange,
}: LoginFieldsProps) {
  return (
    <FieldGroup className="space-y-5">
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
              placeholder="john@example.com"
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
          <LoginPasswordField
            visible={showPassword}
            onVisibilityChange={onPasswordVisibilityChange}
            inputProps={{
              ...field,
              autoComplete: "current-password",
            }}
            error={fieldState.error}
          />
        )}
      />

      {/* REMEMBER ME */}
      <Controller
        name="rememberMe"
        control={control}
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
  );
}