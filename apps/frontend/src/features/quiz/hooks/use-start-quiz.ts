import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { routes } from "@/shared/config/routes";
import type { QuizQuestion } from "../types";
import { useQuizAnswers } from "./use-quiz-answers";

/** Answers the entry question and opens the quiz; the chosen option stays busy until it loads. */
export function useStartQuiz(quizId: string, entryQuestion: QuizQuestion) {
  const router = useRouter();
  const { start } = useQuizAnswers(quizId);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [isStarting, startNavigation] = useTransition();

  function startWith(optionKey: string) {
    start(entryQuestion.key, optionKey);
    setSelectedKey(optionKey);
    startNavigation(() => router.push(routes.quiz));
  }

  return { startWith, selectedKey, isStarting };
}
