import { outcomeSection } from './outcome-section.js';

export const strengthsSection = outcomeSection(({ strengths }) => ({
  type: 'list',
  id: 'strengths',
  title: 'Your Cognitive and Behavioral Strengths',
  marker: 'check',
  ...strengths,
}));
