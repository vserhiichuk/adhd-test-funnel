"use client";

import { useId } from "react";
import { routes } from "@/shared/config/routes";
import { Button } from "@/shared/ui/button";
import { FormMessage } from "@/shared/ui/form-message";
import { TextInput } from "@/shared/ui/text-input";
import { TextLink } from "@/shared/ui/text-link";
import { signIn } from "../api/sign-in";
import { useAuthForm } from "../hooks/use-auth-form";
import { signInSchema } from "../schemas";
import { AuthPanel } from "./auth-panel";

type SignInFormProps = {
  /** Set when sign-up found an existing account for this email. */
  defaultEmail?: string;
};

export function SignInForm({ defaultEmail }: SignInFormProps) {
  const messageId = useId();
  const { form, submit, message, isPending } = useAuthForm(signInSchema, signIn, { defaultEmail });
  const { errors } = form.formState;

  return (
    <AuthPanel
      title="Welcome back"
      description={
        defaultEmail
          ? "This email already has an account. Sign in to see your report."
          : "Sign in to see your ADHD report"
      }
      footer={
        <>
          New here? <TextLink href={routes.home}>Take the test</TextLink>
        </>
      }
    >
      <form noValidate onSubmit={submit} className="flex flex-col">
        <div className="flex flex-col gap-3">
          <TextInput
            type="email"
            label="Email"
            autoComplete="email"
            invalid={Boolean(errors.email)}
            aria-describedby={messageId}
            {...form.register("email")}
          />
          <TextInput
            type="password"
            label="Password"
            autoComplete="current-password"
            autoFocus={Boolean(defaultEmail)}
            invalid={Boolean(errors.password)}
            aria-describedby={messageId}
            {...form.register("password")}
          />
        </div>
        <FormMessage id={messageId} message={message} />
        <Button type="submit" isLoading={isPending} className="w-full">
          Sign In
        </Button>
      </form>
    </AuthPanel>
  );
}
