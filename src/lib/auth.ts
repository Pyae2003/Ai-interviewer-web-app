import { prisma } from "@/config";
import { admin, lastLoginMethod } from "better-auth/plugins";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { sendResetPasswordEmail } from "./send-email";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL!,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      await sendResetPasswordEmail({
        to: user.email,
        name: user.name,
        resetPasswordLink: url,
      });
    },
    onPasswordReset: async ({ user }) => {
      console.log(`Password for user ${user.email} has been reset.`);
    },
  },

  trustedOrigins: [process.env.BETTER_AUTH_URL!],
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },

  advanced: {
    ipAddress: {
      ipAddressHeaders: ["cf-connecting-ip", "x-forwarded-for"],
    },
  },

  rateLimit: {
    enabled: true,
    window: 60,
    max: 5,
  },
  plugins: [
    nextCookies(),
    admin(),
    lastLoginMethod({
      storeInDatabase: true,
    }),
  ],
});
