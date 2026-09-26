import { routes } from "@/shared/config/routes";

export function signInUrl(email: string): string {
  return `${routes.signIn}?${new URLSearchParams({ email })}`;
}
