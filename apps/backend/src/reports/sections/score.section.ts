import { MAX_SCORE } from '../../quiz/quiz.constants.js';
import { outcomeSection } from './outcome-section.js';

export const scoreSection = outcomeSection(({ label }, { current }) => ({
  type: 'score',
  id: 'score',
  title: 'Your ADHD score',
  label,
  score: current.result.score,
  maxScore: MAX_SCORE,
}));
