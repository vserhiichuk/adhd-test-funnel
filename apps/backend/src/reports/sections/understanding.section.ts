import { outcomeSection } from './outcome-section.js';

export const understandingSection = outcomeSection(({ understanding }) => ({
  type: 'text',
  id: 'understanding',
  title: 'Understanding Your Score',
  variant: 'callout',
  body: understanding,
}));
