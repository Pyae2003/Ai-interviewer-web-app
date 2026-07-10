"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAction } from "next-safe-action/hooks";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Loader2,
    Mail,
    RotateCcw,
    ArrowLeft,
} from "lucide-react";

import { toast } from "sonner";

import {
    RequestResetPasswordInput,
    requestResetPasswordSchema,
} from "../schema/request-password-reset.schema";

import { requestPasswordReset } from "../actions/request-password-reset";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldError,
} from "@/components/ui/field";

import { loginPath } from "@/constants/route";

export function RequestPasswordResetForm() {
    const router = useRouter();

    const { execute, status, result, hasSucceeded, hasErrored } =
        useAction(requestPasswordReset);

    const form = useForm<RequestResetPasswordInput>({
        resolver: zodResolver(requestResetPasswordSchema),
        defaultValues: {
            email: "",
        },
        mode: "onChange",
    });

    const isLoading = status === "executing";

    const onSubmit = (data: RequestResetPasswordInput) => {
        if (isLoading) return;

        execute(data);
    };

    useEffect(() => {
        if (!result) return;

        if (hasSucceeded) {
            toast.success(result.data?.message);
        }

        if (hasErrored) {
            toast.error(
                result.serverError?.message ?? "Unable to process your request.",
            );
        }
    }, [result, hasSucceeded, hasErrored]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-sky-100 via-white to-yellow-100 px-4 py-10">
            <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-r from-sky-500 to-yellow-400 shadow-lg">
                        <Mail className="h-8 w-8 text-white" />
                    </div>

                    <h1 className="text-3xl font-bold">AI Interviewer</h1>

                    <p className="mt-2 text-sm text-muted-foreground">
                        Forgot your password? Enter your email address below.
                    </p>
                </div>

                <Card className="shadow-xl">
                    <CardHeader>
                        <CardTitle>Reset Password</CardTitle>

                        <CardDescription>
                            We&apos;ll send you a secure password reset link.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FieldGroup>
                                <Controller
                                    name="email"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel>Email Address</FieldLabel>

                                            <Input
                                                {...field}
                                                type="email"
                                                placeholder="john@example.com"
                                                autoComplete="email"
                                            />

                                            {fieldState.error && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                            </FieldGroup>

                            <div className="space-y-3">
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={
                                        isLoading ||
                                        !form.formState.isValid ||
                                        !form.formState.isDirty
                                    }
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Mail className="mr-2 h-4 w-4" />
                                            Send Reset Link
                                        </>
                                    )}
                                </Button>

                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full"
                                    disabled={isLoading || !form.formState.isDirty}
                                    onClick={() => form.reset()}
                                >
                                    <RotateCcw className="mr-2 h-4 w-4" />
                                    Reset
                                </Button>
                            </div>
                        </form>

                        <div className="mt-8 border-t pt-6">
                            <Link
                                href={loginPath}
                                className="flex items-center justify-center gap-2 text-sm text-sky-600 hover:underline"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back to Login
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
