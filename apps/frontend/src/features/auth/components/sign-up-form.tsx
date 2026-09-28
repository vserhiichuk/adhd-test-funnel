"use client";

import { useId } from "react";
import { routes } from "@/shared/config/routes";
import { Button } from "@/shared/ui/button";
import { FormMessage } from "@/shared/ui/form-message";
import { TextInput } from "@/shared/ui/text-input";
import { TextButton, TextLink } from "@/shared/ui/text-link";
import { SIGN_UP_DESCRIPTIONS } from "../constants";
import { useSignUpForm } from "../hooks/use-sign-up-form";
import { AuthPanel } from "./auth-panel";

export function SignUpForm() {
  const messageId = useId();
  const { form, step, message, isPending, handleSubmit, editEmail } = useSignUpForm();
  const { errors } = form.formState;
  const isPasswordStep = step === "password";

  return (
    <AuthPanel
      title={
        <>
          Discover your <span className="text-accent">ADHD</span> Profile
        </>
      }
      description={SIGN_UP_DESCRIPTIONS[step]}
      footer={
        <>
          Already have an account? <TextLink href={routes.signIn}>Sign in</TextLink>
        </>
      }
    >
      <form noValidate onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex flex-col gap-3">
          <TextInput
            type="email"
            label="Email"
            autoComplete="email"
            readOnly={isPasswordStep}
            invalid={Boolean(errors.email)}
            aria-describedby={messageId}
            trailing={
              isPasswordStep && (
                <TextButton onClick={editEmail} aria-label="Change email" className="text-sm">
                  Change
                </TextButton>
              )
            }
            {...form.register("email")}
          />
          {isPasswordStep && (
            <TextInput
              type="password"
              label="Create Password"
              autoComplete="new-password"
              autoFocus
              invalid={Boolean(errors.password)}
              aria-describedby={messageId}
              {...form.register("password")}
            />
          )}
        </div>
        <FormMessage id={messageId} message={message} />
        <Button type="submit" isLoading={isPending} className="w-full">
          Get My Results
        </Button>
      </form>
    </AuthPanel>
  );
}
