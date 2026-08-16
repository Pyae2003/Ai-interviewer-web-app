import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";

import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AI Interviewer",
    template: "%s | AI Interviewer",
  },
  description: "AI-powered smart interview platform by Group 3.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-zinc-50 text-zinc-950 antialiased selection:bg-sky-100 selection:text-sky-900 dark:bg-zinc-950 dark:text-zinc-50 dark:selection:bg-sky-950 dark:selection:text-sky-100">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}

          <Toaster
            position="top-center"
            theme="system"
            closeButton
            visibleToasts={4}
            toastOptions={{
              classNames: {
                toast:
                  "!rounded-xl !border-zinc-200 !bg-white !text-zinc-900 !shadow-lg dark:!border-zinc-800 dark:!bg-zinc-900 dark:!text-zinc-100",

                title:
                  "!font-medium !text-zinc-900 dark:!text-zinc-100",

                description:
                  "!text-zinc-500 dark:!text-zinc-400",

                actionButton:
                  "!rounded-lg !bg-sky-600 !text-white hover:!bg-sky-700",

                cancelButton:
                  "!rounded-lg !bg-zinc-100 !text-zinc-700 dark:!bg-zinc-800 dark:!text-zinc-300",

                closeButton:
                  "!border-zinc-200 !bg-white !text-zinc-500 hover:!text-sky-600 dark:!border-zinc-700 dark:!bg-zinc-900 dark:!text-zinc-400",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}