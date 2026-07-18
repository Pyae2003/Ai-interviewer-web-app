import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { getSession } from "@/lib/get-Session";
import { loginPath } from "@/constants/route";

import { EditUserInfo } from "./edit-user-info-form";

export const metadata: Metadata = {
  title: "Edit Profile | AI Interviewer",
  description:
    "Update your AI Interviewer account information and profile photo.",
};

export default async function EditProfilePage() {
  const session = await getSession();

  if (!session?.user?.id) {
    redirect(loginPath);
  }

  const user = session.user;

  return (
    <EditUserInfo
      id={user.id}
      name={user.name?.trim() || "User"}
      image={user.image ?? null}
    />
  );
}