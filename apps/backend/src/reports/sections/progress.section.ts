import type { SectionBuilder } from '../report-context.js';

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
    return 'Your score is higher than last time: ADHD traits showed up more often in your latest answers.';
  }
  if (change < 0) {
    return 'Your score is lower than last time: ADHD traits showed up less often in your latest answers.';
  }
  return 'Your score is the same as last time.';
}
