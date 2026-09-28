import { cn } from "@/shared/lib/cn";
import type { TraitChip } from "../types";

type TraitBadgeProps = {
  chip: TraitChip;
  /** Staggers the entrance and the floating of the chips. */
  index: number;
};

export function TraitBadge({ chip: { value, label, position, Icon }, index }: TraitBadgeProps) {
  return (
    <span
      style={{ animationDelay: `${0.6 + index * 0.25}s, ${index * 0.9}s` }}
      className={cn(
        "absolute rounded-xl border border-line/50 bg-page/90 px-3 py-2 text-sm font-medium text-ink/80 backdrop-blur-sm motion-safe:animate-chip sm:px-6 sm:py-2.5 sm:text-lg",
        Icon ? "flex items-center gap-1.5" : "flex flex-col leading-snug sm:py-3",
        position,
      )}
    >
      {Icon && <Icon className="size-4 text-accent sm:size-5" />}
      <span className="text-accent">{value}</span>
      <span>{label}</span>
    </span>
  );
}
