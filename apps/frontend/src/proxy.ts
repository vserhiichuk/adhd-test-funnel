import { type NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/features/auth/constants";
import { routes } from "@/shared/config/routes";

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
