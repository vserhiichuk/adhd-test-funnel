"use client";

import { type FormEvent, useState } from "react";
import { ApiError, getErrorMessage } from "@/shared/api/api-error";
import { routes } from "@/shared/config/routes";
import { Button } from "@/shared/ui/button";
import { ErrorMessage } from "@/shared/ui/error-message";
import { TextInput } from "@/shared/ui/text-input";
import { TextLink } from "@/shared/ui/text-link";
import { checkEmail } from "../api/check-email";
import { signUp } from "../api/sign-up";
import { useAuthForm } from "../hooks/use-auth-form";
import { signInUrl } from "../lib/sign-in-url";
import { signUpSchema } from "../schemas";
import { AuthPanel } from "./auth-panel";

type Step = "email" | "password";

const DESCRIPTIONS: Record<Step, string> = {
  email: "Enter your email to access your full report",
  password: "Enter your password to access your full report",
};

// An existing account signs in instead: signing in claims the guest attempt just as sign-up does.
const redirectExistingAccount = (error: unknown, { email }: { email: string }) =>
  error instanceof ApiError && error.status === 409 ? signInUrl(email) : undefined;

export function SignUpForm() {
  const [step, setStep] = useState<Step>("email");
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const { form, submit, redirectTo, isPending } = useAuthForm(signUpSchema, signUp, {
    redirectOnError: redirectExistingAccount,
  });
  const { errors } = form.formState;

  async function continueWithEmail() {
    form.clearErrors("root");
    if (!(await form.trigger("email"))) {
      return;
    }
    const email = form.getValues("email");
    setIsCheckingEmail(true);
    try {
      const { registered } = await checkEmail(email);
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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (step === "password") {
      return submit(event);
    }
    event.preventDefault();
    return continueWithEmail();
  }

  return (
    <AuthPanel
      title={
        <>
          Discover your <span className="text-accent">ADHD</span> Profile
        </>
      }
      description={DESCRIPTIONS[step]}
      footer={
        <>
          Already have an account? <TextLink href={routes.signIn}>Sign in</TextLink>
        </>
      }
    >
      <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-3">
        <TextInput
          type="email"
          label="Email"
          autoComplete="email"
          error={errors.email?.message}
          {...form.register("email")}
        />
        {step === "password" && (
          <TextInput
            type="password"
            label="Create Password"
            autoComplete="new-password"
            autoFocus
            error={errors.password?.message}
            {...form.register("password")}
          />
        )}
        {errors.root && <ErrorMessage>{errors.root.message}</ErrorMessage>}
        <Button type="submit" isLoading={isPending || isCheckingEmail} className="mt-2 w-full">
          Get My Results
        </Button>
      </form>
    </AuthPanel>
  );
}
