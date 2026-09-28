import { formatDate, formatSignedNumber } from "@/shared/lib/format";
import { ArrowRightIcon } from "@/shared/ui/icons";
import type { ProgressSection } from "../types";
import { ScoreValue } from "./score-value";
import { SectionTitle } from "./section-title";

export function ProgressCard({ section }: { section: ProgressSection }) {
  const change = section.currentScore - section.previousScore;

  return (
    <section className="rounded-2xl border border-line p-6 sm:p-8">
      <SectionTitle>{section.title}</SectionTitle>
      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
        <ScoreValue
          value={section.previousScore}
          caption={`Previous · ${formatDate(section.previousCompletedAt)}`}
          className="text-muted"
        />
        <ArrowRightIcon className="size-5 text-muted" />
        <ScoreValue value={section.currentScore} caption="Now" />
        <span className="rounded-full bg-selected px-3 py-1 text-sm font-semibold text-accent">
          {formatSignedNumber(change)}
        </span>
      </div>
      <p className="mt-4 text-muted">{section.summary}</p>
    </section>
  );
}
