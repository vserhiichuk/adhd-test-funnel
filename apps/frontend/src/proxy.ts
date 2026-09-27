import { type NextRequest, NextResponse } from "next/server";
import { routes } from "@/shared/config/routes";

// Set by the backend on sign-up / sign-in.
const SESSION_COOKIE = "session";

// Optimistic check only: the backend still verifies the session when the report is loaded.
export function proxy(request: NextRequest) {
  if (!request.cookies.has(SESSION_COOKIE)) {
    return NextResponse.redirect(new URL(routes.signIn, request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/report"],
};
