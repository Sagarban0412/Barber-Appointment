import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export function proxy(request) {
  const token = request.cookies.get("loginToken")?.value;
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    try {
      jwt.verify(token, process.env.JWT_SECRET);

      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  //protected Profile routes

  if (pathname.startsWith("/profile")) {
    const customerToken = request.cookies.get("customerToken")?.value

    if (!customerToken) {
      return NextResponse.redirect(new URL("/confirmUser", request.url))
    }
    try {
      jwt.verify(customerToken, process.env.JWT_SECRET)
      return NextResponse.next()
    } catch {
      return NextResponse.redirect(new URL("/confirmUser", request.url));
    }
  }
}

export const config = {
  matcher: ["/admin/dashboard/:path*", "/profile"],
};
