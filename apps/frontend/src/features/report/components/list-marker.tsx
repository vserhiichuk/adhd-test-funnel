import { CheckIcon } from "@/shared/ui/icons";
import type { ListSection } from "../types";

export function ListMarker({ marker }: { marker: ListSection["marker"] }) {
  if (marker === "check") {
    return (
      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <CheckIcon className="size-3.5" />
      </span>
    );
  }
  return <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-muted/50" />;
}
