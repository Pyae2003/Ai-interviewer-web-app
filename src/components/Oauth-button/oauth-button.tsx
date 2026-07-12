"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

interface OAuthButtonProps {
  provider: "google" | "github";
  label: string;
  icon: React.ReactNode;
}

export function OAuthButton({
  provider,
  label,
  icon,
}: OAuthButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    try {
      setLoading(true);

      await authClient.signIn.social({
        provider,
        callbackURL: "/dashboard",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      variant="outline"
      className="h-12 w-full"
      disabled={loading}
      onClick={handleLogin}
    >
      {loading ? (
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
      ) : (
        <span className="mr-3 h-5 w-5">{icon}</span>
      )}

      Continue with {label}
    </Button>
  );
}