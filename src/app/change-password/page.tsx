import { Suspense } from "react";

import { Loader2 } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChangePasswordForm } from "@/features/clients/auth/components/change-password-form";


function ChangePasswordLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-100 via-white to-yellow-100 px-4 py-10">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sky-100">
            <Loader2 className="h-8 w-8 animate-spin text-sky-600" />
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              Loading Reset Password
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Please wait while we verify your password reset request...
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="h-10 animate-pulse rounded-md bg-muted" />
          <div className="h-10 animate-pulse rounded-md bg-muted" />
          <div className="h-10 animate-pulse rounded-md bg-muted" />
        </CardContent>
      </Card>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<ChangePasswordLoading />}>
      <ChangePasswordForm />
    </Suspense>
  );
}