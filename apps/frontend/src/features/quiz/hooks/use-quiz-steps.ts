import { useRouter } from "next/navigation";
import { useState } from "react";
import { routes } from "@/shared/config/routes";
import type { QuizQuestion } from "../types";
import { useQuizAnswers } from "./use-quiz-answers";
import { useSubmitQuiz } from "./use-submit-quiz";

/** Moves through the quiz steps; going back from the first one returns to the landing, the last one submits. */
export function useQuizSteps(quizId: string, questions: QuizQuestion[], initialIndex: number) {
  const router = useRouter();
  const { answers, answer } = useQuizAnswers(quizId);
  const { submit, isSubmitting, error } = useSubmitQuiz(quizId);
  const [index, setIndex] = useState(initialIndex);

  const question = questions[index];
  const isLast = index === questions.length - 1;

  function goBack() {
    if (index === 0) {
      router.push(routes.home);
    } else {
      setIndex(index - 1);
    }
  }

  function goNext() {
    if (isLast) {
      void submit(answers);
    } else {
      setIndex(index + 1);
    }
  }

  return {
    question,
    step: index + 1,
    selectedKey: answers[question.key],
    canGoNext: question.key in answers,
    select: (optionKey: string) => answer(question.key, optionKey),
    goBack,
    goNext,
    isSubmitting,
    error,
  };
}
