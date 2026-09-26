import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { getErrorMessage } from "@/shared/api/api-error";
import { routes } from "@/shared/config/routes";
import type { Credentials, User } from "../types";

type AuthRequest = (credentials: Credentials) => Promise<User>;

type AuthFormOptions = {
  defaultEmail?: string;
  /** Where to send the user instead of showing the error, when a page answers it better than a message. */
  redirectOnError?: (error: unknown, credentials: Credentials) => string | undefined;
};

export function useAuthForm(
  schema: z.ZodType<Credentials, Credentials>,
  request: AuthRequest,
  { defaultEmail = "", redirectOnError }: AuthFormOptions = {},
) {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const form = useForm<Credentials>({
    resolver: zodResolver(schema),
    defaultValues: { email: defaultEmail, password: "" },
  });

  function redirectTo(href: string) {
    setIsRedirecting(true);
    router.replace(href);
  }

  const submit = form.handleSubmit(async (credentials) => {
    try {
      await request(credentials);
      redirectTo(routes.report);
    } catch (error) {
      const redirect = redirectOnError?.(error, credentials);
      if (redirect) {
        redirectTo(redirect);
      } else {
        form.setError("root", { message: getErrorMessage(error) });
      }
    }
  });

  const { errors, isSubmitting } = form.formState;
  // One message line for the whole form: field problems first, in field order, then the backend's.
  const message = errors.email?.message ?? errors.password?.message ?? errors.root?.message;

  return { form, submit, redirectTo, message, isPending: isSubmitting || isRedirecting };
}
