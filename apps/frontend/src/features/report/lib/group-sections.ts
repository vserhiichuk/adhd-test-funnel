import type { ReportSection, ReportSectionGroups } from "../types";

export function groupSections(sections: ReportSection[]): ReportSectionGroups {
  return {
    heroes: sections.filter((section) => section.type === "score"),
    content: sections.filter((section) => section.type !== "score"),
  };
}
