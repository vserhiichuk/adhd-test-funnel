import type {
  Answer,
  QuizResult,
} from '../quiz/evaluation/evaluation.types.js';
import { toPublishedQuiz } from '../quiz/published-quiz.mapper.js';
import type {
  AnswerValue,
  AttemptRow,
  CompletedAttempt,
} from './attempt.types.js';

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
