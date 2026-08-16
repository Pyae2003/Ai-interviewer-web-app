import Link from "next/link";

import { OAuthButtons } from "@/components/Oauth-button/oauth-buttons";
import { signUpPath } from "@/constants/route";

export function LoginFooter() {
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex w-full items-center">
        <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />

        <span className="px-3 text-xs font-medium uppercase tracking-wider text-zinc-400">
          Or continue with
        </span>

        <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
      </div>

      <div className="w-full">
        <OAuthButtons />
      </div>

      <div className="w-full border-t border-zinc-200 pt-5 text-center dark:border-zinc-800">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Do not have an account?{" "}
          <Link
            href={signUpPath}
            className="rounded font-semibold text-sky-600 transition-colors hover:text-sky-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:text-sky-300 dark:hover:text-sky-200"
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}