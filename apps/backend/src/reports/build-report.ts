import type { ReportContext, SectionBuilder } from './report-context.types.js';
import type { Report } from './report.types.js';
import { emotionalRegulationSection } from './sections/emotional-regulation.section.js';
import { faqSection } from './sections/faq.section.js';
import { progressSection } from './sections/progress.section.js';
import { scoreSection } from './sections/score.section.js';
import { strengthsSection } from './sections/strengths.section.js';
import { understandingSection } from './sections/understanding.section.js';

const REPORT_SECTIONS: SectionBuilder[] = [
  scoreSection,
  progressSection,
  understandingSection,
  strengthsSection,
  emotionalRegulationSection,
  faqSection,
];

export function buildReport(context: ReportContext): Report {
  return {
    attemptId: context.current.id,
    completedAt: context.current.completedAt,
    sections: REPORT_SECTIONS.map((build) => build(context)).filter(
      (section) => section !== null,
    ),
  };
}
