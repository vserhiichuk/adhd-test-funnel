import { TRAIT_CHIPS } from "../constants";
import { ParticleHead } from "./particle-head";
import { TraitBadge } from "./trait-badge";

export function TraitVisual() {
  return (
    <div aria-hidden className="relative h-80 w-full sm:aspect-[9/5] sm:h-auto">
      <ParticleHead className="absolute inset-0 size-full" />
      {TRAIT_CHIPS.map((chip, index) => (
        <TraitBadge key={chip.label} chip={chip} index={index} />
      ))}
    </div>
  );
}
