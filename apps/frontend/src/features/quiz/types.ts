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
