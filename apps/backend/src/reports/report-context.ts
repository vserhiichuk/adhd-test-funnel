import type { CompletedAttempt } from '../attempts/attempt.mapper.js';
import type { ReportSection } from './report.types.js';

export type ReportContext = {
  current: CompletedAttempt;
  previous: CompletedAttempt[];
};

export type SectionBuilder = (context: ReportContext) => ReportSection | null;
