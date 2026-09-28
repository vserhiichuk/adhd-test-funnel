import type { ContentSection } from "../types";
import { FaqAccordion } from "./faq-accordion";
import { ListBlock } from "./list-block";
import { ProgressCard } from "./progress-card";
import { TextBlock } from "./text-block";

export function ContentSectionBlock({ section }: { section: ContentSection }) {
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
