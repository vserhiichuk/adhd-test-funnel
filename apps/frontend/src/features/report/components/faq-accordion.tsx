import { ChevronDownIcon } from "@/shared/ui/icons";
import type { FaqSection } from "../types";
import { SectionTitle } from "./report-layout";

export function FaqAccordion({ section }: { section: FaqSection }) {
  return (
    <section>
      <SectionTitle className="text-center">{section.title}</SectionTitle>
      <div className="mt-8 divide-y divide-line border-b border-line">
        {section.items.map(({ question, answer }, index) => (
          <details key={question} open={index === 0} className="group py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold focus-visible:outline-2 focus-visible:outline-accent [&::-webkit-details-marker]:hidden">
              {question}
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-transform group-open:rotate-180">
                <ChevronDownIcon className="size-4" />
              </span>
            </summary>
            <p className="mt-3 pr-11 text-muted">{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
