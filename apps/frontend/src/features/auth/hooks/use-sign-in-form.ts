import { signInSchema } from "../schemas";
import { authService } from "../services/auth.service";
import { useAuthForm } from "./use-auth-form";

export function useSignInForm(defaultEmail?: string) {
  return useAuthForm(signInSchema, authService.signIn, { defaultEmail });
}
