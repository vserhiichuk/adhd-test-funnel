"use client";

import { useStartedQuiz } from "../hooks/use-started-quiz";
import type { Quiz } from "../types";
import { QuizSteps } from "./quiz-steps";

export function QuizFlow({ quiz }: { quiz: Quiz }) {
  const startedQuiz = useStartedQuiz(quiz);

  if (!startedQuiz) {
    return null;
  }
  return (
    <QuizSteps
      quizId={quiz.id}
      questions={startedQuiz.questions}
      initialIndex={startedQuiz.initialIndex}
    />
  );
}
