"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import {
  Loader2,
  LogIn,
  RotateCcw,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { dashboardPath } from "@/constants/route";


import { cardVariants } from "./login-animations";
import { LoginFields } from "./login-fields";
import { LoginFooter } from "./login-footer";
import { loginUser } from "../../actions/login";
import { LoginInput, loginSchema } from "../../schema/login-schema";
import { LoginBrand } from "./login-brand";

export function LoginCard() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    execute,
    result,
    status,
    hasSucceeded,
    hasErrored,
  } = useAction(loginUser);

  const form = useForm<LoginInput>({
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

  function onSubmit(values: LoginInput) {
    if (isLoading) {
      return;
    }

    execute(values);
  }

  function handleReset() {
    form.reset();
    form.clearErrors();
    setShowPassword(false);
  }

  useEffect(() => {
    if (!result) {
      return;
    }

    if (hasSucceeded) {
      toast.success(result.data?.message ?? "Login successful");

      router.replace(dashboardPath);
      router.refresh();

      return;
    }

    if (hasErrored) {
      toast.error(
        result.serverError?.message ??
          "Unable to log in. Please try again.",
      );
    }
  }, [
    hasErrored,
    hasSucceeded,
    result,
    router,
  ]);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={cardVariants}
    >
      <Card className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-lg shadow-zinc-200/50 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-none">
        <CardHeader className="border-b border-zinc-200 bg-sky-50/70 px-6 py-6 text-center dark:border-zinc-800 dark:bg-sky-950/30">
          <LoginBrand/>
        </CardHeader>

        <CardContent className="p-6 sm:p-8">
          <form
            id="login-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
            noValidate
          >
            <LoginFields
              control={form.control}
              showPassword={showPassword}
              onPasswordVisibilityChange={() =>
                setShowPassword((current) => !current)
              }
            />

            <div className="grid gap-3 pt-1 sm:grid-cols-[1fr_120px]">
              <Button
                type="submit"
                disabled={
                  isLoading || !form.formState.isValid
                }
                className="h-12 rounded-xl bg-sky-600 font-semibold text-white shadow-sm hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-sky-600 dark:hover:bg-sky-500"
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
                onClick={handleReset}
                className="h-12 rounded-xl border-zinc-200 bg-white font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-800"
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

        <CardFooter className="border-t border-zinc-200 bg-zinc-50 px-6 py-6 dark:border-zinc-800 dark:bg-zinc-950/60">
          <LoginFooter />
        </CardFooter>
      </Card>
    </motion.div>
  );
}