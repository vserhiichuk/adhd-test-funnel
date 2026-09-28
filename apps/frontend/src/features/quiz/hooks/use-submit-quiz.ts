import { useRouter } from "next/navigation";
import { useState } from "react";
import { authService } from "@/features/auth/services/auth.service";
import { getErrorMessage } from "@/shared/api/api-error";
import { routes } from "@/shared/config/routes";
import { attemptsService } from "../services/attempts.service";
import type { Answers } from "../types";

export function useSubmitQuiz(quizId: string) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(answers: Answers) {
    setIsSubmitting(true);
    setError(null);
    try {
      await attemptsService.submit(quizId, answers);
      const user = await authService.getCurrentUser();
      router.push(user ? routes.report : routes.signUp);
    } catch (caught) {
      setError(getErrorMessage(caught));
      setIsSubmitting(false);
    }
  }

  return { submit, isSubmitting, error };
}
