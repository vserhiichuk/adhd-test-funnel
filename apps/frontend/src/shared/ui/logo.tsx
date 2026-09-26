import Link from "next/link";
import { cn } from "@/shared/lib/cn";

type LogoProps = {
  tone?: "dark" | "light";
};

export function Logo({ tone = "dark" }: LogoProps) {
  const isLight = tone === "light";

  return (
    <Link
      href="/"
      aria-label="BrainsMate home"
      className="inline-flex items-center gap-1.5 font-display text-xl font-bold"
    >
      <BrainIcon className={isLight ? "text-sky-300" : "text-accent"} />
      <span className={isLight ? "text-white" : "text-ink"}>
        Brains<span className={isLight ? "text-sky-300" : "text-accent"}>Mate</span>
      </span>
    </Link>
  );
}

function BrainIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn("size-7", className)}
    >
      <path d="M15 6a4 4 0 0 0-7.5 1A4.5 4.5 0 0 0 4.5 13a4.5 4.5 0 0 0 1 7.5A4.5 4.5 0 0 0 10 26a3.5 3.5 0 0 0 5 .5V6Z" />
      <path d="M17 6a4 4 0 0 1 7.5 1 4.5 4.5 0 0 1 3 6 4.5 4.5 0 0 1-1 7.5A4.5 4.5 0 0 1 22 26a3.5 3.5 0 0 1-5 .5V6Z" />
      <path d="M9 12.5h3.5l1.5 2M8.5 19h3l2-2M23 12.5h-3.5l-1.5 2M23.5 19h-3l-2-2" />
    </svg>
  );
}
