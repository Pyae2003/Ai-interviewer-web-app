import { prisma } from "@/config";
import { createHmac } from "node:crypto";
import { admin, emailOTP, lastLoginMethod } from "better-auth/plugins";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { sendResetPasswordEmail } from "./send-email";
import { sendVerificationEmail } from "./send-verfication-email";
const otpSecret = process.env.OTP_HASH_SECRET;

if (!otpSecret) {
  throw new Error("OTP_HASH_SECRET is not configured.");
}

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL!,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
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
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["github", "google"],
    },
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
    emailOTP({
      otpLength: 6,

      expiresIn: 60 * 5,

      overrideDefaultEmailVerification: true,

      sendVerificationOnSignUp: true,
      storeOTP: {
        hash: async (otp) => {
          return createHmac("sha256", otpSecret).update(otp).digest("hex");
        },
      },
      async sendVerificationOTP({ email, otp, type }) {
        console.log("🔥🔥 OTP CALLBACK CALLED", {
          email,
          otp,
          type,
        });
        try {
          await sendVerificationEmail({
            email,
            otp,
            type,
          });
        } catch (error) {
          console.error("[SEND_VERIFICATION_OTP_EMAIL_ERROR]", {
            email,
            type,
            error,
          });
          throw error;
        }
      },
    }),
  ],
});
