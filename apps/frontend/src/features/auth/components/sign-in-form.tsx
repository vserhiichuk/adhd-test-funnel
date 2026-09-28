"use client";

import { useId } from "react";
import { routes } from "@/shared/config/routes";
import { Button } from "@/shared/ui/button";
import { FormMessage } from "@/shared/ui/form-message";
import { TextInput } from "@/shared/ui/text-input";
import { TextLink } from "@/shared/ui/text-link";
import { SIGN_IN_DESCRIPTIONS } from "../constants";
import { useSignInForm } from "../hooks/use-sign-in-form";
import { AuthPanel } from "./auth-panel";

type SignInFormProps = {
  /** Set when sign-up found an existing account for this email. */
  defaultEmail?: string;
};

export function SignInForm({ defaultEmail }: SignInFormProps) {
  const messageId = useId();
  const { form, submit, message, isPending } = useSignInForm(defaultEmail);
  const { errors } = form.formState;

  return (
    <AuthPanel
      title="Sign in"
      description={defaultEmail ? SIGN_IN_DESCRIPTIONS.existingAccount : SIGN_IN_DESCRIPTIONS.default}
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
          Sign in
        </Button>
      </form>
    </AuthPanel>
  );
}
