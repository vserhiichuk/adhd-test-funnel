import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { getErrorMessage } from "@/shared/api/api-error";
import { routes } from "@/shared/config/routes";
import type { Credentials, User } from "../types";

type AuthRequest = (credentials: Credentials) => Promise<User>;

export function useAuthForm(schema: z.ZodType<Credentials, Credentials>, request: AuthRequest) {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const form = useForm<Credentials>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const submit = form.handleSubmit(async (credentials) => {
    try {
      await request(credentials);
      setIsRedirecting(true);
      router.replace(routes.report);
    } catch (error) {
      form.setError("root", { message: getErrorMessage(error) });
    }
  });

  return { form, submit, isPending: form.formState.isSubmitting || isRedirecting };
}
