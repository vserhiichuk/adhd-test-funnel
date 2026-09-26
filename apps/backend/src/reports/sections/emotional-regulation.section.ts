import { outcomeSection } from './outcome-section.js';

export const emotionalRegulationSection = outcomeSection(
  ({ emotionalRegulation }) => {
    const section = {
      id: 'emotional_regulation',
      title: 'Your Emotional Regulation and Impulse Control',
    };
    return typeof emotionalRegulation === 'string'
      ? {
          type: 'text',
          ...section,
          variant: 'plain',
          body: emotionalRegulation,
        }
      : { type: 'list', ...section, marker: 'bullet', ...emotionalRegulation };
  },
);
