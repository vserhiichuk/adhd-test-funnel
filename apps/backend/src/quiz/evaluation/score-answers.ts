import { sum } from '../../common/math.utils.js';
import type {
  NormalizedSumScoring,
  OutcomeBand,
  ScoringRules,
} from '../definition/quiz-definition.types.js';
import { MAX_SCORE } from '../quiz.constants.js';
import type { Answer, QuizResult } from './evaluation.types.js';

export function scoreAnswers(
  scoring: ScoringRules,
  answers: Answer[],
): QuizResult {
  switch (scoring.strategy) {
    case 'normalized_sum':
      return scoreNormalizedSum(scoring, answers);
  }
}

function scoreNormalizedSum(
  { points, outcomes }: NormalizedSumScoring,
  answers: Answer[],
): QuizResult {
  const selected = Object.fromEntries(
    answers.map(({ questionKey, optionKey }) => [questionKey, optionKey]),
  );
  const earned = sum(
    Object.entries(points).map(
      ([questionKey, optionPoints]) => optionPoints[selected[questionKey]],
    ),
  );
  const maximum = sum(
    Object.values(points).map((optionPoints) =>
      Math.max(...Object.values(optionPoints)),
    ),
  );
  const score = Math.round((earned / maximum) * MAX_SCORE);

  return { outcome: pickOutcome(outcomes, score), score };
}

function pickOutcome(outcomes: OutcomeBand[], score: number): string {
  const band = outcomes
    .toSorted((a, b) => b.minScore - a.minScore)
    .find(({ minScore }) => score >= minScore);

  if (!band) {
    throw new Error(`No outcome covers score ${score}`);
  }
  return band.outcome;
}
