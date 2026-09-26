import { CheckIcon } from "@/shared/ui/icons";
import type { ListSection } from "../types";
import { SectionTitle } from "./report-layout";

export function ListBlock({ section }: { section: ListSection }) {
  return (
    <section>
      <SectionTitle>{section.title}</SectionTitle>
      {section.intro && <p className="mt-2 text-muted">{section.intro}</p>}
      <ul className="mt-5 flex flex-col gap-3">
        {section.items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-ink/80">
            <ListMarker marker={section.marker} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {section.note && <p className="mt-5 font-semibold">{section.note}</p>}
    </section>
  );
}

function ListMarker({ marker }: { marker: ListSection["marker"] }) {
  if (marker === "check") {
    return (
      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <CheckIcon className="size-3.5" />
      </span>
    );
  }
  return <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-muted/50" />;
}
