import { authMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: ["/site", "/api/uploadthing"],

  async afterAuth(auth, req) {
    const url = req.nextUrl;

    if (url.pathname === "/sign-in" || url.pathname === "/sign-up") {
      return NextResponse.redirect(new URL(`/dashboard/sign-in`, req.url));
    }
    if (url.pathname === "/" || url.pathname === "/site") {
      return NextResponse.rewrite(new URL("/site", req.url));
    }
  },
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
