import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { authRoutes, publicRoutes } from "@/routes";
import { urls } from "@/lib/urls";

export default auth((req) => {
  const { nextUrl } = req;
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isLoggedIn = !!req.auth;

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(urls.members, nextUrl));
    }
    return NextResponse.next();
  }

  if (!isPublicRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL(urls.signIn, nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
