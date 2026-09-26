import type {
  QuizAnswer,
  QuizAttempt,
  QuizVersion,
} from '../generated/prisma/client.js';
import type { PublishedQuiz } from '../quiz/definition/quiz-definition.types.js';
import type {
  Answer,
  QuizResult,
} from '../quiz/evaluation/evaluation.types.js';
import { toPublishedQuiz } from '../quiz/published-quiz.mapper.js';

export type CompletedAttempt = {
  id: string;
  completedAt: Date;
  quiz: PublishedQuiz;
  result: QuizResult;
  answers: Answer[];
};

type AnswerValue = { optionKey: string };

type AttemptRow = QuizAttempt & {
  quizVersion: QuizVersion;
  answers: QuizAnswer[];
};

export function toAnswerRow({ questionKey, optionKey }: Answer) {
  const value: AnswerValue = { optionKey };
  return { questionKey, value };
}

export function toCompletedAttempt(row: AttemptRow): CompletedAttempt {
  return {
    id: row.id,
    completedAt: row.completedAt,
    quiz: toPublishedQuiz(row.quizVersion),
    result: row.result as QuizResult,
    answers: row.answers.map(({ questionKey, value }) => ({
      questionKey,
      optionKey: (value as AnswerValue).optionKey,
    })),
  };
}
