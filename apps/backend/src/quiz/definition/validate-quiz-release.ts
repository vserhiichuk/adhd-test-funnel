import {
  difference,
  ensure,
  findDuplicates,
} from '../../common/validation.utils.js';
import { MAX_SCORE } from '../quiz.constants.js';
import type {
  NormalizedSumScoring,
  OutcomeBand,
  QuizQuestion,
  QuizRelease,
} from './quiz-definition.types.js';

const KEY_PATTERN = /^[a-z][a-z0-9_]*$/;

export function validateQuizRelease({
  quizSlug,
  version,
  definition,
}: QuizRelease): string[] {
  return [
    ...validateKeys([quizSlug], (key) => `quiz slug "${key}"`),
    ...ensure(
      Number.isInteger(version) && version > 0,
      `version ${version} must be a positive integer`,
    ),
    ...validateQuestions(definition.questions),
    ...validateScoring(definition.questions, definition.scoring),
  ];
}

function validateQuestions(questions: QuizQuestion[]): string[] {
  return [
    ...ensure(questions.length > 0, 'quiz must have at least one question'),
    ...validateKeys(
      questions.map(({ key }) => key),
      (key) => `question "${key}"`,
    ),
    ...questions.flatMap(({ key: questionKey, options }) => [
      ...ensure(
        options.length >= 2,
        `question "${questionKey}" must have at least two options`,
      ),
      ...validateKeys(
        options.map(({ key }) => key),
        (key) => `option "${key}" of "${questionKey}"`,
      ),
    ]),
  ];
}

function validateScoring(
  questions: QuizQuestion[],
  { points, outcomes }: NormalizedSumScoring,
): string[] {
  const questionsByKey = new Map(questions.map((q) => [q.key, q]));

  return [
    ...ensure(
      Object.keys(points).length > 0,
      'scoring must include at least one question',
    ),
    ...Object.entries(points).flatMap(([questionKey, optionPoints]) => {
      const question = questionsByKey.get(questionKey);
      return question
        ? validateQuestionPoints(question, optionPoints)
        : [`scoring references unknown question "${questionKey}"`];
    }),
    ...validateOutcomes(outcomes),
  ];
}

function validateQuestionPoints(
  { key, options }: QuizQuestion,
  optionPoints: Record<string, number>,
): string[] {
  const optionKeys = options.map((option) => option.key);
  const pointedKeys = Object.keys(optionPoints);
  const values = Object.values(optionPoints);
  const missing = difference(optionKeys, pointedKeys);
  const unknown = difference(pointedKeys, optionKeys);

  return [
    ...ensure(
      missing.length === 0,
      `"${key}" has no points for: ${missing.join(', ')}`,
    ),
    ...ensure(
      unknown.length === 0,
      `"${key}" has points for unknown options: ${unknown.join(', ')}`,
    ),
    ...ensure(
      values.every((value) => Number.isFinite(value) && value >= 0),
      `"${key}" points must be non-negative numbers`,
    ),
    ...ensure(
      values.some((value) => value > 0),
      `"${key}" must award points for at least one option`,
    ),
  ];
}

function validateOutcomes(outcomes: OutcomeBand[]): string[] {
  return [
    ...validateKeys(
      outcomes.map(({ outcome }) => outcome),
      (key) => `outcome "${key}"`,
    ),
    ...outcomes.flatMap(({ outcome, minScore }) =>
      ensure(
        minScore >= 0 && minScore <= MAX_SCORE,
        `outcome "${outcome}" minScore must be within 0–${MAX_SCORE}`,
      ),
    ),
    ...ensure(
      outcomes.some(({ minScore }) => minScore === 0),
      'an outcome with minScore 0 is required so every score maps to an outcome',
    ),
  ];
}

function validateKeys(
  keys: string[],
  describe: (key: string) => string,
): string[] {
  return [
    ...keys
      .filter((key) => !KEY_PATTERN.test(key))
      .map((key) => `${describe(key)} must be snake_case`),
    ...findDuplicates(keys).map((key) => `duplicate ${describe(key)}`),
  ];
}
