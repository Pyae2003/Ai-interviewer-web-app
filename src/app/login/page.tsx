import HeaderWrapper from "@/components/headerWrapper";
import { dashboardPath } from "@/constants/route";
import LoginPage from "@/features/clients/auth/components/login-page";
import { getSession } from "@/lib/get-Session";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  let session = null;

  try {
    session = await getSession();
  } catch (error) {
    console.error("Session error:", error);
  }

  if (session) {
    redirect(dashboardPath);
  }
  return (
    <div>
      <HeaderWrapper />
      <LoginPage />
    </div>
  );
};

export default page;
