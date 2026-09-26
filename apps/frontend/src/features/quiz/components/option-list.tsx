import { cn } from "@/shared/lib/cn";
import type { QuizQuestion } from "../types";

const QUESTION_TEXT =
  "col-start-1 row-start-1 self-center text-center font-display text-2xl leading-snug font-semibold sm:text-3xl";

type OptionListProps = {
  question: QuizQuestion;
  /** Texts of every step, so the heading reserves the height of the longest one. */
  questionTexts: string[];
  selectedKey: string | undefined;
  onSelect: (optionKey: string) => void;
};

export function OptionList({ question, questionTexts, selectedKey, onSelect }: OptionListProps) {
  return (
    <fieldset className="mx-auto w-full max-w-3xl">
      {/* All questions share one grid cell: the heading is as tall as the longest question at any
          width, so the options don't jump between steps. Only the current one is visible. */}
      <legend className="mb-8 grid w-full">
        <h1 className={QUESTION_TEXT}>{question.text}</h1>
        {questionTexts.map((text) => (
          <span key={text} aria-hidden className={cn(QUESTION_TEXT, "invisible")}>
            {text}
          </span>
        ))}
      </legend>
      <div className="flex flex-col gap-3">
        {question.options.map((option) => (
          <label key={option.key} className="cursor-pointer">
            <input
              type="radio"
              name={question.key}
              value={option.key}
              checked={selectedKey === option.key}
              onChange={() => onSelect(option.key)}
              className="peer sr-only"
            />
            <span className="block rounded-xl border border-transparent bg-surface px-5 py-5 transition-colors peer-checked:border-accent peer-checked:bg-selected peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent hover:bg-selected">
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
