"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAction } from "next-safe-action/hooks";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, MotionConfig, type Variants } from "framer-motion";
import {
  CheckCircle2,
  ImageIcon,
  Loader2,
  Mail,
  RotateCcw,
  Sparkles,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";
import * as z from "zod";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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

import { dashboardPath, profilePath } from "@/constants/route";
import { editUserInfo } from "../actions/edit-user-info";
import { editProfileSchema } from "../schema/edit-profile.schema";
import ImageUpload from "./image-upload";

type EditProfileInput = z.infer<typeof editProfileSchema>;

type Props = {
  id: string;
  name: string;
  image?: string | null;
  email?: string;
};

const headlineContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.06,
      staggerChildren: 0.065,
    },
  },
};

const headlineWordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 5,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.44,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function AnimatedHeadline() {
  const words = [
    {
      text: "Edit",
      highlighted: false,
    },
    {
      text: "your",
      highlighted: false,
    },
    {
      text: "profile",
      highlighted: true,
    },
  ];

  return (
    <motion.h1
      initial="hidden"
      animate="visible"
      variants={headlineContainerVariants}
      aria-label="Edit your profile"
      className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl dark:text-white"
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word.text}-${index}`}
          aria-hidden="true"
          variants={headlineWordVariants}
          className={
            word.highlighted
              ? "inline-block bg-linear-to-r from-sky-500 to-yellow-500 bg-clip-text text-transparent"
              : "mr-[0.22em] inline-block"
          }
        >
          {word.text}
        </motion.span>
      ))}
    </motion.h1>
  );
}

export function EditUserInfo({ id, name, image, email }: Props) {
  const router = useRouter();

  const { execute, result, status, hasErrored, hasSucceeded } =
    useAction(editUserInfo);

  const form = useForm<EditProfileInput>({
    resolver: zodResolver(editProfileSchema),
    mode: "onChange",
    reValidateMode: "onChange",

    defaultValues: {
      id,
      name,
      image: image ?? null,
    } as EditProfileInput,
  });
  const { isDirty, isValid } = form.formState;
  const isLoading = status === "executing";

  const watchedName = form.watch("name")?.trim() || name || "User";

  const watchedImage = form.watch("image")?.trim() || null;

  const initials = watchedName
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();

  function onSubmit(data: EditProfileInput) {
    if (isLoading) return;

    execute(data);
  }

  function handleReset() {
    form.reset({
      id,
      name,
      image: image ?? null,
    } as EditProfileInput);
  }

  useEffect(() => {
    if (!result) return;

    if (hasSucceeded && result.data?.success) {
      toast.success(result.data.message ?? "Profile updated successfully.", {
        position: "top-center",
      });

      const redirectTimer = window.setTimeout(() => {
        router.push(profilePath);
        router.refresh();
      }, 600);

      return () => {
        window.clearTimeout(redirectTimer);
      };
    }

    if (hasErrored || result.serverError) {
      toast.error(
        result.serverError?.message ?? "Unable to update your profile.",
        {
          position: "top-center",
        },
      );
    }
  }, [hasErrored, hasSucceeded, result, router]);

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-sky-50 via-white to-yellow-50 px-4 py-10 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900 sm:px-6">
        {/* Static background accents */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-sky-200/30 blur-3xl dark:bg-sky-800/10"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-yellow-200/30 blur-3xl dark:bg-yellow-700/10"
        />

        <div className="relative w-full max-w-3xl">
          {/* Page headline */}
          <div className="mb-7 text-center">
            <Badge
              variant="outline"
              className="mb-4 rounded-full border-black/5 bg-white/75 px-3 py-1.5 text-zinc-600 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-zinc-300"
            >
              <Sparkles
                className="mr-1.5 h-4 w-4 text-sky-500"
                aria-hidden="true"
              />
              Account settings
            </Badge>

            <AnimatedHeadline />

            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-zinc-500 sm:text-base dark:text-zinc-400">
              Update your name and profile photo to keep your account
              information current.
            </p>
          </div>

          <Card className="overflow-hidden rounded-3xl border border-black/5 bg-white/90 shadow-[0_24px_80px_rgba(15,23,42,0.11)] backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/90">
            {/* Cover */}
            <div className="relative h-36 overflow-hidden bg-linear-to-r from-sky-500 via-cyan-400 to-yellow-400 sm:h-44">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-b from-white/5 to-black/10"
              />

              <div
                aria-hidden="true"
                className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-white/25 blur-3xl"
              />
            </div>

            <CardHeader className="relative border-b border-black/5 px-5 pb-6 pt-0 dark:border-white/10 sm:px-8">
              <div className="-mt-14 flex flex-col gap-5 sm:flex-row sm:items-end">
                <Avatar className="h-28 w-28 border-4 border-white shadow-[0_14px_40px_rgba(15,23,42,0.18)] dark:border-zinc-900">
                  {watchedImage && (
                    <AvatarImage
                      src={watchedImage}
                      alt={`${watchedName}'s profile`}
                      className="object-cover"
                    />
                  )}

                  <AvatarFallback className="bg-linear-to-br from-sky-100 to-yellow-100 text-3xl font-bold text-sky-700 dark:from-sky-950 dark:to-yellow-950 dark:text-sky-400">
                    {initials}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0 pb-1">
                  <CardTitle className="truncate text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">
                    {watchedName}
                  </CardTitle>

                  <CardDescription className="mt-1">
                    Preview your updated profile information.
                  </CardDescription>

                  {email && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                      <Mail
                        className="h-4 w-4 text-sky-500"
                        aria-hidden="true"
                      />
                      <span className="truncate">{email}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-5 sm:p-8">
              <form
                id="edit-profile-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-7"
                noValidate
              >
                <FieldGroup className="space-y-6">
                  {/* Hidden ID */}
                  <input type="hidden" {...form.register("id")} />

                  {/* Full name */}
                  <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className="text-zinc-700 dark:text-zinc-200">
                          Full name
                        </FieldLabel>

                        <div className="relative">
                          <UserRound
                            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
                            aria-hidden="true"
                          />

                          <Input
                            {...field}
                            type="text"
                            autoComplete="name"
                            disabled={isLoading}
                            placeholder="Enter your full name"
                            className="h-12 rounded-xl border-black/10 bg-white pl-10 shadow-none transition-colors focus-visible:border-sky-400 focus-visible:ring-sky-200/70 dark:border-white/10 dark:bg-zinc-950 dark:focus-visible:ring-sky-900"
                          />
                        </div>

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  {/* Image URL */}
                  <Controller
                    name="image"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className="text-zinc-700 dark:text-zinc-200">
                          Profile image URL
                        </FieldLabel>

                        <div className="relative">
                          <ImageIcon
                            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
                            aria-hidden="true"
                          />

                          <ImageUpload
                            value={field.value || ""}
                            onChange={field.onChange}
                          />
                        </div>

                        <p className="text-xs leading-5 text-zinc-500 dark:text-zinc-400">
                          Leave this field empty to use your initials as the
                          profile picture.
                        </p>

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>

                {/* Actions */}
                <div className="flex flex-col-reverse gap-3 border-t border-black/5 pt-6 sm:flex-row sm:items-center sm:justify-between dark:border-white/10">
                  <Button
                    type="button"
                    variant="ghost"
                    disabled={isLoading || !form.formState.isDirty}
                    onClick={handleReset}
                    className="h-11 rounded-xl text-zinc-600 dark:text-zinc-300"
                  >
                    <RotateCcw className="mr-2 h-4 w-4" aria-hidden="true" />
                    Reset changes
                  </Button>

                  <div className="flex flex-col-reverse gap-3 sm:flex-row">
                    <Button
                      asChild
                      type="button"
                      variant="outline"
                      className="h-11 rounded-xl border-black/10 bg-white px-5 dark:border-white/10 dark:bg-zinc-950"
                    >
                      <Link href={dashboardPath}>Cancel</Link>
                    </Button>

                    <Button
                      type="submit"
                      disabled={
                        isLoading ||
                        !isValid ||
                        !isDirty
                      }
                      className="h-11 min-w-40 rounded-xl bg-linear-to-r from-sky-500 to-yellow-400 px-6 font-semibold text-zinc-950 shadow-sm transition-opacity hover:opacity-90"
                    >
                      {isLoading ? (
                        <>
                          <Loader2
                            className="mr-2 h-4 w-4 animate-spin"
                            aria-hidden="true"
                          />
                          Saving...
                        </>
                      ) : (
                        <>
                          <CheckCircle2
                            className="mr-2 h-4 w-4"
                            aria-hidden="true"
                          />
                          Save changes
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </MotionConfig>
  );
}
