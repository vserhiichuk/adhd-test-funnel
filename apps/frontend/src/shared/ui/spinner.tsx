import { cn } from "@/shared/lib/cn";

// Decorative: the busy control announces itself with aria-busy.
export function Spinner({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      aria-hidden
      className={cn("size-5 animate-spin", className)}
    >
      <circle cx="12" cy="12" r="9" strokeOpacity={0.25} />
      <path d="M21 12a9 9 0 0 0-9-9" strokeLinecap="round" />
    </svg>
  );
}
