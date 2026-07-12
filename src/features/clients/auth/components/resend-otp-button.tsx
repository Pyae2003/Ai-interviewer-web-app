"use client";

import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  disabled: boolean;
  loading: boolean;
  onClick: () => void;
};

export function ResendOTPButton({
  disabled,
  loading,
  onClick,
}: Props) {
  return (
    <Button
      variant="ghost"
      disabled={disabled || loading}
      onClick={onClick}
      type="button"
    >
      <RotateCcw className="mr-2 h-4 w-4" />

      Resend Code
    </Button>
  );
}