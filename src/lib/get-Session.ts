"use server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const getSession = async () => {
  try {
    const h = await headers();

    console.log("cookie:", h.get("cookie"));

    const session = await auth.api.getSession({
      headers: h,
    });

    console.log("session:", session);

    return session;
  } catch (error) {
    console.error("getSession failed:", error);
    throw error;
  }
};
