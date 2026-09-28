import { type FormEvent, useState } from "react";
import { getErrorMessage } from "@/shared/api/api-error";
import { redirectExistingAccount } from "../lib/redirect-existing-account";
import { signInUrl } from "../lib/sign-in-url";
import { signUpSchema } from "../schemas";
import { authService } from "../services/auth.service";
import type { SignUpStep } from "../types";
import { useAuthForm } from "./use-auth-form";

/** Two steps: the email is checked first, so existing accounts go to sign-in before choosing a password. */
export function useSignUpForm() {
  const [step, setStep] = useState<SignUpStep>("email");
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const { form, submit, redirectTo, message, isPending } = useAuthForm(signUpSchema, authService.signUp, {
    redirectOnError: redirectExistingAccount,
  });

  async function continueWithEmail() {
    if (!(await form.trigger("email"))) {
      return;
    }
    const email = form.getValues("email");
    setIsCheckingEmail(true);
    try {
      const { registered } = await authService.checkEmail(email);
      form.clearErrors("root");
      if (registered) {
        redirectTo(signInUrl(email));
      } else {
        setStep("password");
      }
    } catch (error) {
      form.setError("root", { message: getErrorMessage(error) });
    } finally {
      setIsCheckingEmail(false);
    }
  }

  // The email is locked on the password step, so any change goes through the existing-account check again.
  function editEmail() {
    form.resetField("password");
    form.clearErrors();
    setStep("email");
    form.setFocus("email");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (step === "password") {
      return submit(event);
    }
    event.preventDefault();
    return continueWithEmail();
  }

  return { form, step, message, isPending: isPending || isCheckingEmail, handleSubmit, editEmail };
}
