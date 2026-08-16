"use client";

import type { ComponentProps } from "react";
import Link from "next/link";
import type { FieldError as ReactHookFormFieldError } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { resetPasswordPath } from "@/constants/route";

type LoginPasswordFieldProps = {
  visible: boolean;
  onVisibilityChange: () => void;
  inputProps: ComponentProps<typeof Input>;
  error?: ReactHookFormFieldError;
};

export function LoginPasswordField({
  visible,
  onVisibilityChange,
  inputProps,
  error,
}: LoginPasswordFieldProps) {
  return (
    <Field data-invalid={Boolean(error)}>
      <div className="flex items-center justify-between gap-4">
        <FieldLabel className="text-zinc-700 dark:text-zinc-200">
          Password
        </FieldLabel>

        <Link
          href={resetPasswordPath}
          className="rounded text-xs font-semibold text-sky-600 transition-colors hover:text-sky-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:text-sky-300 dark:hover:text-sky-200"
        >
          Forgot password?
        </Link>
      </div>

      <div className="relative">
        <Input
          {...inputProps}
          type={visible ? "text" : "password"}
          placeholder="Enter your password"
          className="h-12 rounded-xl border-zinc-200 bg-white px-4 pr-12 shadow-none transition-colors focus-visible:border-sky-400 focus-visible:ring-sky-200 dark:border-zinc-800 dark:bg-zinc-950 dark:focus-visible:border-sky-700 dark:focus-visible:ring-sky-900"
        />

        <button
          type="button"
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          onClick={onVisibilityChange}
          className="absolute right-2.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
        >
          {visible ? (
            <EyeOff className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Eye className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      </div>

      {error && <FieldError errors={[error]} />}
    </Field>
  );
}