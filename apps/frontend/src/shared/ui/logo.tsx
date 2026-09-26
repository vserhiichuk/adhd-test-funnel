import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  tone?: "dark" | "light";
};

export function Logo({ tone = "dark" }: LogoProps) {
  const isLight = tone === "light";

  return (
    <Link
      href="/"
      aria-label="BrainsMate home"
      className="inline-flex items-center gap-2 font-display text-xl font-bold"
    >
      <Image src="/icons/brain.svg" alt="" width={38} height={34} className="h-7 w-auto" />
      <span className={isLight ? "text-white" : "text-ink"}>
        Brains<span className={isLight ? "text-sky-300" : "text-accent"}>Mate</span>
      </span>
    </Link>
  );
}
