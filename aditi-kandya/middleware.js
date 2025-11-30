import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // If the owner tries to access the generic dashboard, redirect them to their own dashboard.
    if (token?.role === "owner" && pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/owner", req.url));
    }

    // If a non-owner tries to access the owner dashboard, redirect them away.
    if (token?.role !== "owner" && pathname.startsWith("/owner")) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  },
  {
    callbacks: {
      // This is required for the middleware to work.
      authorized: ({ token }) => !!token,
    },
  }
);

// This specifies which routes the middleware should run on.
export const config = { matcher: ["/dashboard/:path*", "/owner/:path*"] };