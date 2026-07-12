"use client";

import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function OTPInput({
  value,
  onChange,
}: Props) {
  return (
    <InputOTP
      maxLength={6}
      value={value}
      onChange={onChange}
    >
      <InputOTPGroup className="mx-auto">
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  );
}