import { redirect } from "next/navigation";

import { signUpPath } from "@/constants/route";
import { VerifyOTPForm } from "@/features/clients/auth/components/verify-otp-form";

type VerifyEmailPageProps = {
  searchParams: Promise<{
    email?: string | string[];
  }>;
};

export default async function VerifyEmailPage({
  searchParams,
}: VerifyEmailPageProps) {
  const params = await searchParams;

  const email = Array.isArray(params.email)
    ? params.email[0]
    : params.email;

  if (!email) {
    redirect(signUpPath);
  }

  return <VerifyOTPForm email={email} />;
}