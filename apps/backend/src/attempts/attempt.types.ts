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

export type CompletedAttempt = {
  id: string;
  completedAt: Date;
  quiz: PublishedQuiz;
  result: QuizResult;
  answers: Answer[];
};

export type SubmittedAttempt = { id: string };

/** Shape of `quiz_answers.value` for single-choice questions. */
export type AnswerValue = { optionKey: string };

export type AttemptRow = QuizAttempt & {
  quizVersion: QuizVersion;
  answers: QuizAnswer[];
};
