import { ApiError } from "@/shared/api/api-error";
import type { Credentials } from "../types";
import { signInUrl } from "./sign-in-url";

// An existing account signs in instead: signing in claims the guest attempt just as sign-up does.
export function redirectExistingAccount(error: unknown, { email }: Credentials): string | undefined {
  return error instanceof ApiError && error.status === 409 ? signInUrl(email) : undefined;
}
