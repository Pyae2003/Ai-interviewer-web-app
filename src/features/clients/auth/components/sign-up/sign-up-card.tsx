"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import {
  Bot,
  Loader2,
  Plus,
  RotateCcw,
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
  dashboardPath,
  loginPath,
} from "@/constants/route";
import { cardVariants } from "./sign-up-animations";
import {
  SignUpFields,
  type SignUpFormValues,
} from "./sign-up-fields";
import { signUpUser } from "../../actions/sign-up";
import { signUpSchema } from "../../schema/signup-schema";
import { SignUpBrand } from "./sign-up-brand";

export function SignUpCard() {
  const router = useRouter();

  const {
    execute,
    result,
    hasErrored,
    hasSucceeded,
    isExecuting,
  } = useAction(signUpUser);

  const form = useForm<SignUpFormValues>({
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

  const isLoading = isExecuting;

  function onSubmit(values: SignUpFormValues) {
    if (isLoading) {
      return;
    }

    execute(values);
  }

  function handleReset() {
    form.reset();
    form.clearErrors();
  }

  useEffect(() => {
    if (hasSucceeded) {
      toast.success(
        result.data?.message ?? "Account created successfully",
      );

      form.reset();

      router.push(dashboardPath);
      router.refresh();

      return;
    }

    if (hasErrored) {
      toast.error("Unable to create your account. Please try again.");
    }
  }, [
    form,
    hasErrored,
    hasSucceeded,
    result.data?.message,
    router,
  ]);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={cardVariants}
    >
      <Card className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-lg shadow-zinc-200/50 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-none">
        <CardHeader className="border-b border-zinc-200 bg-sky-50/70 px-6 py-6 text-center dark:border-zinc-800 dark:bg-sky-950/30 sm:px-8">
         <SignUpBrand/>
        </CardHeader>

        <CardContent className="p-6 sm:p-8">
          <form
            id="signup-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <SignUpFields control={form.control} />

            <div className="grid gap-3 pt-1 sm:grid-cols-[140px_1fr]">
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

        <CardFooter className="flex flex-col gap-2 border-t border-zinc-200 bg-zinc-50 px-6 py-5 text-center dark:border-zinc-800 dark:bg-zinc-950/60">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Already have an account?
          </p>

          <Link
            href={loginPath}
            className="rounded-md text-sm font-semibold text-sky-600 transition-colors hover:text-sky-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:text-sky-300 dark:hover:text-sky-200"
          >
            Log in instead
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}