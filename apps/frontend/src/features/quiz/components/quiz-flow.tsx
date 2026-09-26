"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { routes } from "@/shared/config/routes";
import { useSubmitQuiz } from "../hooks/use-submit-quiz";
import { firstUnansweredIndex, splitQuiz } from "../lib/quiz-steps";
import { useQuizAnswers } from "../state/use-quiz-answers";
import type { Quiz, QuizQuestion } from "../types";
import { OptionList } from "./option-list";
import { ProgressBar } from "./progress-bar";
import { StepNavigation } from "./step-navigation";

export function QuizFlow({ quiz }: { quiz: Quiz }) {
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

  return (
    <QuizSteps
      quiz={quiz}
      questions={stepQuestions}
      initialIndex={firstUnansweredIndex(stepQuestions, answers)}
    />
  );
}

type QuizStepsProps = {
  quiz: Quiz;
  questions: QuizQuestion[];
  initialIndex: number;
};

function QuizSteps({ quiz, questions, initialIndex }: QuizStepsProps) {
  const router = useRouter();
  const { answers, answer } = useQuizAnswers(quiz.id);
  const { submit, isSubmitting, error } = useSubmitQuiz(quiz.id);
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

  return (
    <div className="flex flex-1 flex-col gap-10">
      <ProgressBar value={(index + 1) / questions.length} />
      <OptionList
        question={question}
        selectedKey={answers[question.key]}
        onSelect={(optionKey) => answer(question.key, optionKey)}
      />
      {error && (
        <p role="alert" className="text-center text-danger">
          {error}
        </p>
      )}
      <StepNavigation
        current={index + 1}
        total={questions.length}
        canGoNext={question.key in answers}
        isSubmitting={isSubmitting}
        onBack={goBack}
        onNext={goNext}
      />
    </div>
  );
}
