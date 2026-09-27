import type { ComponentProps } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@/shared/ui/icons";

type StepNavigationProps = {
  current: number;
  total: number;
  canGoNext: boolean;
  isSubmitting: boolean;
  onBack: () => void;
  onNext: () => void;
};

export function StepNavigation({
  current,
  total,
  canGoNext,
  isSubmitting,
  onBack,
  onNext,
}: StepNavigationProps) {
  const isLast = current === total;

  return (
    <nav
      aria-label="Quiz navigation"
      className="mx-auto flex w-full max-w-3xl items-center justify-between"
    >
      <NavButton aria-label="Previous question" onClick={onBack}>
        <ArrowLeftIcon className="size-5" />
      </NavButton>
      <span className="text-muted" aria-live="polite">
        {current}/{total}
      </span>
      <NavButton
        aria-label={isLast ? "Submit answers" : "Next question"}
        aria-busy={isSubmitting || undefined}
        disabled={!canGoNext || isSubmitting}
        onClick={onNext}
      >
        <ArrowRightIcon className="size-5" />
      </NavButton>
    </nav>
  );
}

function NavButton(props: ComponentProps<"button">) {
  return (
    <button
      type="button"
      className="inline-flex size-10 items-center justify-center rounded-lg bg-surface text-ink transition-colors hover:bg-line focus-visible:outline-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-40"
      {...props}
    />
  );
}
