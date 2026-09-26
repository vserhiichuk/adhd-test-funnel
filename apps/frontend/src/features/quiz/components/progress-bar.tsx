export function ProgressBar({ value }: { value: number }) {
  const percent = Math.round(value * 100);

  return (
    <div
      role="progressbar"
      aria-label="Quiz progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      className="h-1 w-full overflow-hidden rounded-full bg-surface"
    >
      {/* Grows in from zero on mount, then transitions between steps. */}
      <div
        className="h-full rounded-full bg-accent transition-[width] duration-300 motion-safe:animate-progress-in motion-reduce:transition-none"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
