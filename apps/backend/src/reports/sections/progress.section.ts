import { PROGRESS_SUMMARIES } from '../content/adhd-report.content.js';
import type { SectionBuilder } from '../report-context.types.js';

export const progressSection: SectionBuilder = ({ current, previous }) => {
  // Only scores from the same quiz version are comparable.
  const last = previous.find(({ quiz }) => quiz.id === current.quiz.id);
  if (!last) {
    return null;
  }

  return {
    type: 'progress',
    id: 'progress',
    title: 'Compared to your previous result',
    previousScore: last.result.score,
    previousCompletedAt: last.completedAt,
    currentScore: current.result.score,
    summary: summarize(current.result.score - last.result.score),
  };
};

function summarize(change: number): string {
  if (change > 0) {
    return PROGRESS_SUMMARIES.higher;
  }
  if (change < 0) {
    return PROGRESS_SUMMARIES.lower;
  }
  return PROGRESS_SUMMARIES.same;
}
