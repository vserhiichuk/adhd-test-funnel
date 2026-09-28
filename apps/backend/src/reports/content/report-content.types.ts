import type { FaqItem } from '../report.types.js';

export type ListContent = {
  intro?: string;
  items: string[];
  note?: string;
};

export type OutcomeContent = {
  label: string;
  understanding: string;
  strengths: ListContent;
  emotionalRegulation: string | ListContent;
  faq: FaqItem[];
};

export type ProgressSummaries = {
  higher: string;
  lower: string;
  same: string;
};
