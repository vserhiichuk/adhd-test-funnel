import type { ComponentType } from "react";

export type QuestionKind = "profile" | "assessment";

export type AnswerOption = {
  key: string;
  label: string;
};

export type QuizQuestion = {
  type: "single_choice";
  key: string;
  kind: QuestionKind;
  text: string;
  options: AnswerOption[];
};

export type Quiz = {
  id: string;
  version: number;
  questions: QuizQuestion[];
};

export type Answers = Record<string, string>;

/** The profile question asked on the landing, and the questions shown as quiz steps. */
export type QuizParts = {
  entryQuestion: QuizQuestion;
  stepQuestions: QuizQuestion[];
};

export type SubmittedAttempt = {
  id: string;
};

export type TraitChip = {
  value: string;
  label: string;
  /** Tailwind classes that place the chip around the head. */
  position: string;
  Icon?: ComponentType<{ className?: string }>;
};
