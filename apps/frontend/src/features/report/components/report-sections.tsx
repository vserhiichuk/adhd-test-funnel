import type { ReportSection, ScoreSection } from "../types";
import { FaqAccordion } from "./faq-accordion";
import { ListBlock } from "./list-block";
import { ProgressCard } from "./progress-card";
import { ReportContainer } from "./report-layout";
import { ScoreHero } from "./score-hero";
import { TextBlock } from "./text-block";

type ContentSection = Exclude<ReportSection, ScoreSection>;

// The score renders as a full-width hero; every other section flows in the content column.
export function ReportSections({ sections }: { sections: ReportSection[] }) {
  const heroes = sections.filter((section) => section.type === "score");
  const content = sections.filter((section) => section.type !== "score");

  return (
    <>
      {heroes.map((section) => (
        <ScoreHero key={section.id} section={section} />
      ))}
      <ReportContainer className="flex flex-col gap-12 py-12 sm:gap-14 sm:py-16">
        {content.map((section) => (
          <ContentBlock key={section.id} section={section} />
        ))}
      </ReportContainer>
    </>
  );
}

function ContentBlock({ section }: { section: ContentSection }) {
  switch (section.type) {
    case "progress":
      return <ProgressCard section={section} />;
    case "text":
      return <TextBlock section={section} />;
    case "list":
      return <ListBlock section={section} />;
    case "faq":
      return <FaqAccordion section={section} />;
    default: {
      const unsupported: never = section;
      return unsupported;
    }
  }
}
