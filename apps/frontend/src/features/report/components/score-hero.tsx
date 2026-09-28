import { routes } from "@/shared/config/routes";
import { TextLink } from "@/shared/ui/text-link";
import type { ScoreSection } from "../types";
import { ReportContainer } from "./report-container";
import { ScoreGauge } from "./score-gauge";

export function ScoreHero({ section }: { section: ScoreSection }) {
  return (
    <section className="bg-surface">
      <ReportContainer className="flex flex-col items-center gap-6 py-10 text-center sm:flex-row sm:justify-between sm:py-8 sm:text-left">
        <div>
          <h1 className="font-display text-4xl font-bold sm:text-5xl">{section.title}</h1>
          <p className="mt-2 font-display text-xl font-semibold text-muted sm:text-2xl">
            {section.label}
          </p>
          <TextLink href={routes.home} className="mt-5 inline-block text-sm">
            Retake the test
          </TextLink>
        </div>
        <ScoreGauge score={section.score} maxScore={section.maxScore} />
      </ReportContainer>
    </section>
  );
}
