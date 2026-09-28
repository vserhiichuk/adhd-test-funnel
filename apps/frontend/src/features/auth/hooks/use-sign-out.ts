import { useRouter } from "next/navigation";
import { useState } from "react";
import { routes } from "@/shared/config/routes";
import { authService } from "../services/auth.service";

export function useSignOut() {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function handleSignOut() {
    setIsSigningOut(true);
    try {
      await authService.signOut();
      router.replace(routes.signIn);
    } catch {
      setIsSigningOut(false);
    }
  }

  return { signOut: handleSignOut, isSigningOut };
}
