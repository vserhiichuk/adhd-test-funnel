import type { QuizQuestion } from "../types";

type OptionListProps = {
  question: QuizQuestion;
  selectedKey: string | undefined;
  onSelect: (optionKey: string) => void;
};

export function OptionList({ question, selectedKey, onSelect }: OptionListProps) {
  return (
    <fieldset className="mx-auto w-full max-w-3xl">
      <legend className="mb-8 w-full">
        <h1 className="text-center font-display text-2xl leading-snug font-semibold sm:text-3xl">
          {question.text}
        </h1>
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
