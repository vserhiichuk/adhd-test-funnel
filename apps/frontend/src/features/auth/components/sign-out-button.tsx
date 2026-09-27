"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { routes } from "@/shared/config/routes";
import { UserIcon } from "@/shared/ui/icons";
import { signOut } from "../api/sign-out";

export function SignOutButton() {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function handleSignOut() {
    setIsSigningOut(true);
    try {
      await signOut();
      router.replace(routes.signIn);
    } catch {
      setIsSigningOut(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={isSigningOut}
      className="inline-flex items-center gap-1.5 text-sm text-ink transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-accent disabled:opacity-60"
    >
      <UserIcon className="size-4" />
      Sign out
    </button>
  );
}
