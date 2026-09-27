import { ArrowRightIcon } from "@/shared/ui/icons";
import type { ProgressSection } from "../types";
import { SectionTitle } from "./report-layout";

const dateFormat = new Intl.DateTimeFormat("en", { dateStyle: "medium" });

export function ProgressCard({ section }: { section: ProgressSection }) {
  const change = section.currentScore - section.previousScore;

  return (
    <section className="rounded-2xl border border-line p-6 sm:p-8">
      <SectionTitle>{section.title}</SectionTitle>
      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
        <ScoreValue
          value={section.previousScore}
          caption={`Previous · ${dateFormat.format(new Date(section.previousCompletedAt))}`}
          className="text-muted"
        />
        <ArrowRightIcon className="size-5 text-muted" />
        <ScoreValue value={section.currentScore} caption="Now" />
        <span className="rounded-full bg-selected px-3 py-1 text-sm font-semibold text-accent">
          {change > 0 ? `+${change}` : change}
        </span>
      </div>
      <p className="mt-4 text-muted">{section.summary}</p>
    </section>
  );
}

type ScoreValueProps = {
  value: number;
  caption: string;
  className?: string;
};

function ScoreValue({ value, caption, className }: ScoreValueProps) {
  return (
    <div className={className}>
      <p className="font-display text-3xl font-bold">{value}</p>
      <p className="text-sm text-muted">{caption}</p>
    </div>
  );
}
