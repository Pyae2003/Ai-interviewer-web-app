// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth"; // မင်းရဲ့ Better Auth instance ကို path မှန်အောင် ညွှန်းပေးပါ
import { headers } from "next/headers";

export async function middleware(request: NextRequest) {
   const session = await auth.api.getSession({
        headers: await headers()
    });

   if (session?.user && (session.user as any).banned) {
        
        if (request.nextUrl.pathname.startsWith("/api")) {
            return new NextResponse(
                JSON.stringify({ error: "Your account has been banned." }),
                { status: 403, headers: { "content-type": "application/json" } }
            );
        }

        return NextResponse.redirect(new URL("/login?error=banned", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * static ဖိုင်တွေ၊ ပုံတွေကလွဲရင် ကျန်တဲ့ Page တွေနဲ့ API တွေအားလုံးကို 
         * ဒီ Middleware ထဲ ဖြတ်ပြီးမှ ပေးဝင်မယ်လို့ သတ်မှတ်တာဖြစ်ပါတယ်။
         */
        "/((?!_next/static|_next/image|favicon.ico).*)",
    ],
};