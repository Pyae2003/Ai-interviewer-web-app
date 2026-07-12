import { ShieldCheck } from "lucide-react";

export function VerifyHeader() {
  return (
    <div className="mb-8 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sky-500 text-white shadow-lg">
        <ShieldCheck className="h-8 w-8" />
      </div>

      <h1 className="mt-5 text-3xl font-bold">
        Verify Your Email
      </h1>

      <p className="mt-2 text-sm text-muted-foreground">
        Enter the 6-digit verification code we sent to your email.
      </p>
    </div>
  );
}