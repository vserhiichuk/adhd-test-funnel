import { groupSections } from "../lib/group-sections";
import type { ReportSection } from "../types";
import { ContentSectionBlock } from "./content-section-block";
import { ReportContainer } from "./report-container";
import { ScoreHero } from "./score-hero";

export function ReportSections({ sections }: { sections: ReportSection[] }) {
  const { heroes, content } = groupSections(sections);

  return (
    <>
      {heroes.map((section) => (
        <ScoreHero key={section.id} section={section} />
      ))}
      <ReportContainer className="flex flex-col gap-12 py-12 sm:gap-14 sm:py-16">
        {content.map((section) => (
          <ContentSectionBlock key={section.id} section={section} />
        ))}
      </ReportContainer>
    </>
  );
}
