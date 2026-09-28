import { cn } from "@/shared/lib/cn";
import type { TextSection } from "../types";
import { SectionTitle } from "./section-title";

export function TextBlock({ section }: { section: TextSection }) {
  return (
    <section className={cn(section.variant === "callout" && "border-l-4 border-accent/40 pl-5 sm:pl-6")}>
      <SectionTitle>{section.title}</SectionTitle>
      <p className="mt-3 leading-relaxed text-muted">{section.body}</p>
    </section>
  );
}
