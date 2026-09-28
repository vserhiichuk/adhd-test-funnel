import { TrendDownIcon, TrendUpIcon } from "@/shared/ui/icons";
import type { TraitChip } from "./types";

export const QUIZ_SLUG = "adhd";

export const ANSWERS_STORAGE_PREFIX = "quiz-answers:";

// On phones the chips sit above and below the head; from `sm` they follow the design.
export const TRAIT_CHIPS: TraitChip[] = [
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
