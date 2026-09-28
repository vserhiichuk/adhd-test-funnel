import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { routes } from "@/shared/config/routes";
import { firstUnansweredIndex, splitQuiz } from "../lib/quiz-questions";
import type { Quiz } from "../types";
import { useQuizAnswers } from "./use-quiz-answers";

/** Steps of the quiz started on the landing; `null` while answers load or if it wasn't started (then back to the landing). */
export function useStartedQuiz(quiz: Quiz) {
  const router = useRouter();
  const { answers, isReady } = useQuizAnswers(quiz.id);
  const { entryQuestion, stepQuestions } = splitQuiz(quiz);
  const hasStarted = entryQuestion.key in answers;

  useEffect(() => {
    if (isReady && !hasStarted) {
      router.replace(routes.home);
    }
  }, [isReady, hasStarted, router]);

  if (!isReady || !hasStarted) {
    return null;
  }
  return { questions: stepQuestions, initialIndex: firstUnansweredIndex(stepQuestions, answers) };
}
