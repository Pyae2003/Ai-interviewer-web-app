"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAction } from "next-safe-action/hooks";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Loader2, ShieldCheck, Lock } from "lucide-react";

import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { loginAdmin } from "../actions/admin-login";
import {
  AdminLoginInput,
  adminLoginSchema,
} from "../schema/admin-login-schema";
import { adminDashboardPath } from "@/constants/route";

export default function AdminLoginForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const { execute, status , result , hasErrored, hasSucceeded } = useAction(loginAdmin);

  const form = useForm<z.input<typeof adminLoginSchema>>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isLoading = status === "executing";

  const onSubmit = async (values: AdminLoginInput) => {
    if (isLoading) return;

    execute(values);
  };

   useEffect(() => {
      if (!result) return;
  
      if (hasSucceeded) {
        toast.success(result?.data?.message ?? "Admin Login successful", {
          position: "top-center",
        });
  
        setTimeout(() => {
          router.push(adminDashboardPath);
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
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e293b,transparent_50%)]" />

      <Card className="relative w-full max-w-md border-zinc-800 bg-zinc-950 text-white shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/20">
            <ShieldCheck className="h-7 w-7 text-red-400" />
          </div>

          <CardTitle className="text-3xl">Admin Portal</CardTitle>

          <CardDescription>Secure administrative access</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <Controller
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Email</FieldLabel>

                  <Input
                    {...field}
                    type="email"
                    placeholder="admin@company.com"
                    className="bg-zinc-900 border-zinc-800"
                  />

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Password</FieldLabel>

                  <div className="relative">
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      className="bg-zinc-900 border-zinc-800 pr-10"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Button
              type="submit"
              disabled={isLoading || !form.formState.isValid}
              className="w-full bg-red-500 hover:bg-red-600 text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <Lock className="mr-2 h-4 w-4" />
                  Sign In
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 rounded-xl border border-amber-500/20 bg-amber-500/10 p-3">
            <p className="text-xs text-amber-300">
              Authorized personnel only. Unauthorized access attempts are logged
              and monitored.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
