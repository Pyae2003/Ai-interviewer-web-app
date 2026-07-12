"use client";

import { GoogleIcon } from "./google-icon";
import { GithubIcon } from "./github-icon";
import { OAuthButton } from "./oauth-button";

export function OAuthButtons() {
  return (
    <div className="space-y-3">
      <OAuthButton
        provider="google"
        label="Google"
        icon={<GoogleIcon className="h-5 w-5" />}
      />

      <OAuthButton
        provider="github"
        label="GitHub"
        icon={<GithubIcon className="h-5 w-5" />}
      />
    </div>
  );
}