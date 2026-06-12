"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function signOutUser() {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });

    return {
      success: true,
      message: "Logout successful",
    };
  } catch (error) {
    console.error("Logout Error:", error);

    return {
      success: false,
      message: "Something went wrong",
    };
  }
}