import { getOutcomeContent } from '../content/adhd-report.content.js';
import type { OutcomeContent } from '../content/report-content.types.js';
import type { ReportContext, SectionBuilder } from '../report-context.types.js';
import type { ReportSection } from '../report.types.js';

export function outcomeSection(
  build: (content: OutcomeContent, context: ReportContext) => ReportSection,
): SectionBuilder {
  return (context) => {
    const content = getOutcomeContent(context.current.result.outcome);
    return content ? build(content, context) : null;
  };
}
