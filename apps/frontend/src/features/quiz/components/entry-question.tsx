"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { routes } from "@/shared/config/routes";
import { Button } from "@/shared/ui/button";
import { useQuizAnswers } from "../state/use-quiz-answers";
import type { QuizQuestion } from "../types";

type EntryQuestionProps = {
  quizId: string;
  question: QuizQuestion;
};

export function EntryQuestion({ quizId, question }: EntryQuestionProps) {
  const router = useRouter();
  const { start } = useQuizAnswers(quizId);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  // The quiz page loads the quiz from the API, so the chosen option stays busy until it opens.
  const [isNavigating, startNavigation] = useTransition();

  function handleSelect(optionKey: string) {
    start(question.key, optionKey);
    setSelectedKey(optionKey);
    startNavigation(() => router.push(routes.quiz));
  }

  return (
    <div role="group" aria-label={question.text} className="grid grid-cols-2 gap-3">
      {question.options.map((option) => (
        <Button
          key={option.key}
          isLoading={isNavigating && option.key === selectedKey}
          disabled={isNavigating}
          onClick={() => handleSelect(option.key)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}
