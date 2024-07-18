import createMiddleware from "next-intl/middleware";
import { authMiddleware } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware({
  locales: ["ar", "en"],
  defaultLocale: "ar",
});

export default authMiddleware({
  publicRoutes: ["/", "/api/uploadthing"],

  async beforeAuth(req: NextRequest) {
    if (req.nextUrl.pathname.startsWith("/api/")) {
      return NextResponse.next();
    }
  },

  async afterAuth(auth, req: NextRequest) {
    if (req.nextUrl.pathname.startsWith("/api/")) {
      return NextResponse.next();
    }
    const url = req.nextUrl;

    if (url.pathname === "/sign-in" || url.pathname === "/sign-up") {
      return NextResponse.rewrite(new URL(`/sign-in`, req.url));
    }
    
    return intlMiddleware(req);
  },
});

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)",
    "/",
    "/(api|trpc)(.*)",
    "/(ar|en)/:path*",
  ],
};
