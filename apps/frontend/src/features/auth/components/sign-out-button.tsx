"use client";

import { UserIcon } from "@/shared/ui/icons";
import { Spinner } from "@/shared/ui/spinner";
import { useSignOut } from "../hooks/use-sign-out";

export function SignOutButton() {
  const { signOut, isSigningOut } = useSignOut();

  return (
    <button
      type="button"
      onClick={signOut}
      disabled={isSigningOut}
      aria-busy={isSigningOut || undefined}
      className="inline-flex items-center gap-1.5 text-sm text-ink transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-accent aria-busy:cursor-wait"
    >
      {isSigningOut ? <Spinner className="size-4" /> : <UserIcon className="size-4" />}
      Sign out
    </button>
  );
}
