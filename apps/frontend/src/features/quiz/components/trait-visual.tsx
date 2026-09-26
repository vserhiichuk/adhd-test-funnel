import type { ComponentType } from "react";
import { cn } from "@/shared/lib/cn";
import { TrendDownIcon, TrendUpIcon } from "@/shared/ui/icons";
import { ParticleHead } from "./particle-head";

type TraitChip = {
  value: string;
  label: string;
  position: string;
  Icon?: ComponentType<{ className?: string }>;
};

// On phones the chips sit above and below the head; from `sm` they follow the design.
const TRAIT_CHIPS: TraitChip[] = [
  {
    value: "High",
    label: "Productivity",
    position: "left-0 top-0 sm:left-[4.4%] sm:top-[22%]",
  },
  {
    value: "+10%",
    label: "Impulsivity",
    position: "right-0 top-0 sm:right-[3.7%] sm:top-[11.7%]",
    Icon: TrendUpIcon,
  },
  {
    value: "-6%",
    label: "Focus",
    position: "left-0 bottom-0 sm:left-[8.4%] sm:top-[59%] sm:bottom-auto",
    Icon: TrendDownIcon,
  },
  {
    value: "Medium",
    label: "Distractions",
    position: "right-0 bottom-0 text-right sm:right-[3.7%] sm:top-[66%] sm:bottom-auto",
  },
];

export function TraitVisual() {
  return (
    <div aria-hidden className="relative h-80 w-full sm:aspect-[9/5] sm:h-auto">
      <ParticleHead className="absolute inset-0 size-full" />
      {TRAIT_CHIPS.map(({ value, label, position, Icon }, index) => (
        <span
          key={label}
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
      ))}
    </div>
  );
}
