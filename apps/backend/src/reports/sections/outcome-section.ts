import {
  getOutcomeContent,
  type OutcomeContent,
} from '../content/adhd-report.content.js';
import type { ReportContext, SectionBuilder } from '../report-context.js';
import type { ReportSection } from '../report.types.js';

export function outcomeSection(
  build: (content: OutcomeContent, context: ReportContext) => ReportSection,
): SectionBuilder {
  return (context) => {
    const content = getOutcomeContent(context.current.result.outcome);
    return content ? build(content, context) : null;
  };
}
