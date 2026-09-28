import type { Answers, Quiz, QuizParts, QuizQuestion } from "../types";

export function splitQuiz({ questions }: Quiz): QuizParts {
  const entryQuestion = questions.find(({ kind }) => kind === "profile");
  if (!entryQuestion) {
    throw new Error("The quiz has no profile question to start with");
  }
  return {
    entryQuestion,
    stepQuestions: questions.filter((question) => question !== entryQuestion),
  };
}

export function firstUnansweredIndex(questions: QuizQuestion[], answers: Answers): number {
  const index = questions.findIndex(({ key }) => !(key in answers));
  return index === -1 ? questions.length - 1 : index;
}
