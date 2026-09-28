import { signIn } from "../api/sign-in";
import { signInSchema } from "../schemas";
import { useAuthForm } from "./use-auth-form";

export function useSignInForm(defaultEmail?: string) {
  return useAuthForm(signInSchema, signIn, { defaultEmail });
}
