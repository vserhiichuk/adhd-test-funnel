import { outcomeSection } from './outcome-section.js';

export const faqSection = outcomeSection(({ faq }) => ({
  type: 'faq',
  id: 'faq',
  title: 'Frequently asked questions',
  items: faq,
}));
