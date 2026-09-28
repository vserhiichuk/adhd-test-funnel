import type { ListSection } from "../types";
import { ListMarker } from "./list-marker";
import { SectionTitle } from "./section-title";

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
