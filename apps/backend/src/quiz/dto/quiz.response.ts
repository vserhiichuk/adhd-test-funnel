import type {
  PublishedQuiz,
  QuizQuestion,
} from '../definition/quiz-definition.types.js';

export type QuizResponse = {
  id: string;
  version: number;
  questions: QuizQuestion[];
};

export function toQuizResponse({
  id,
  version,
  definition,
}: PublishedQuiz): QuizResponse {
  return { id, version, questions: definition.questions };
}
