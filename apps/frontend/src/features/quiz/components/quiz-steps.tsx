import { FormMessage } from "@/shared/ui/form-message";
import { useQuizSteps } from "../hooks/use-quiz-steps";
import type { QuizQuestion } from "../types";
import { OptionList } from "./option-list";
import { ProgressBar } from "./progress-bar";
import { StepNavigation } from "./step-navigation";

type QuizStepsProps = {
  quizId: string;
  questions: QuizQuestion[];
  initialIndex: number;
};

export function QuizSteps({ quizId, questions, initialIndex }: QuizStepsProps) {
  const { question, step, selectedKey, canGoNext, select, goBack, goNext, isSubmitting, error } =
    useQuizSteps(quizId, questions, initialIndex);

  return (
    <div className="flex flex-1 flex-col gap-10">
      <ProgressBar value={step / questions.length} />
      <OptionList
        question={question}
        questionTexts={questions.map(({ text }) => text)}
        selectedKey={selectedKey}
        onSelect={select}
      />
      <div className="mt-auto flex flex-col gap-3 pt-2">
        <FormMessage className="text-center text-base" message={error} />
        <StepNavigation
          current={step}
          total={questions.length}
          canGoNext={canGoNext}
          isSubmitting={isSubmitting}
          onBack={goBack}
          onNext={goNext}
        />
      </div>
    </div>
  );
}
