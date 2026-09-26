"use client";

import { type FormEvent, useState } from "react";
import { routes } from "@/shared/config/routes";
import { Button } from "@/shared/ui/button";
import { ErrorMessage } from "@/shared/ui/error-message";
import { TextInput } from "@/shared/ui/text-input";
import { TextLink } from "@/shared/ui/text-link";
import { signUp } from "../api/sign-up";
import { useAuthForm } from "../hooks/use-auth-form";
import { signUpSchema } from "../schemas";
import { AuthPanel } from "./auth-panel";

type Step = "email" | "password";

const DESCRIPTIONS: Record<Step, string> = {
  email: "Enter your email to access your full report",
  password: "Enter your password to access your full report",
};

export function SignUpForm() {
  const [step, setStep] = useState<Step>("email");
  const { form, submit, isPending } = useAuthForm(signUpSchema, signUp);
  const { errors } = form.formState;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (step === "password") {
      return submit(event);
    }
    event.preventDefault();
    if (await form.trigger("email")) {
      setStep("password");
    }
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
        <Button type="submit" isLoading={isPending} className="mt-2 w-full">
          Get My Results
        </Button>
      </form>
    </AuthPanel>
  );
}
