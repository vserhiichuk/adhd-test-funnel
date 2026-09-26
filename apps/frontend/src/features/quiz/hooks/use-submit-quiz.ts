import { useRouter } from "next/navigation";
import { useState } from "react";
import { getCurrentUser } from "@/features/auth/api/get-current-user";
import { getErrorMessage } from "@/shared/api/api-error";
import { routes } from "@/shared/config/routes";
import { submitAttempt } from "../api/submit-attempt";
import type { Answers } from "../types";

export function useSubmitQuiz(quizId: string) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(answers: Answers) {
    setIsSubmitting(true);
    setError(null);
    try {
      await submitAttempt(quizId, answers);
      const user = await getCurrentUser();
      router.push(user ? routes.report : routes.signUp);
    } catch (caught) {
      setError(getErrorMessage(caught));
      setIsSubmitting(false);
    }
  }

  return { submit, isSubmitting, error };
}
