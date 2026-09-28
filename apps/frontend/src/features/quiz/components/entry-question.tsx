"use client";

import { Button } from "@/shared/ui/button";
import { useStartQuiz } from "../hooks/use-start-quiz";
import type { QuizQuestion } from "../types";

type EntryQuestionProps = {
  quizId: string;
  question: QuizQuestion;
};

export function EntryQuestion({ quizId, question }: EntryQuestionProps) {
  const { startWith, selectedKey, isStarting } = useStartQuiz(quizId, question);

  return (
    <div role="group" aria-label={question.text} className="grid grid-cols-2 gap-3">
      {question.options.map((option) => (
        <Button
          key={option.key}
          isLoading={isStarting && option.key === selectedKey}
          disabled={isStarting}
          onClick={() => startWith(option.key)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}
