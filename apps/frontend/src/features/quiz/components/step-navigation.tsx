import { IconButton } from "@/shared/ui/icon-button";
import { ArrowLeftIcon, ArrowRightIcon } from "@/shared/ui/icons";
import { Spinner } from "@/shared/ui/spinner";

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
      <IconButton aria-label="Previous question" onClick={onBack}>
        <ArrowLeftIcon className="size-5" />
      </IconButton>
      <span className="text-muted" aria-live="polite">
        {current}/{total}
      </span>
      <IconButton
        aria-label={isLast ? "Submit answers" : "Next question"}
        aria-busy={isSubmitting || undefined}
        disabled={!canGoNext || isSubmitting}
        onClick={onNext}
      >
        {isSubmitting ? <Spinner /> : <ArrowRightIcon className="size-5" />}
      </IconButton>
    </nav>
  );
}
