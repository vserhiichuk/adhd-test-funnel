import { routes } from "@/shared/config/routes";
import { ButtonLink } from "@/shared/ui/button";
import { ReportContainer } from "./report-layout";

export function EmptyReport() {
  return (
    <ReportContainer className="flex flex-col items-center gap-4 py-24 text-center">
      <h1 className="font-display text-3xl font-bold sm:text-4xl">Your report is waiting</h1>
      <p className="text-lg text-muted">Take the ADHD test to get your personal report.</p>
      <ButtonLink href={routes.home} className="mt-4">
        Take the test
      </ButtonLink>
    </ReportContainer>
  );
}
