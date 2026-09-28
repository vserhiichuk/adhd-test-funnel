import type { ComponentProps } from "react";
import { cn } from "@/shared/lib/cn";

export function IconButton({ className, type = "button", ...props }: ComponentProps<"button">) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-lg bg-surface text-ink transition-colors",
        "hover:bg-line focus-visible:outline-2 focus-visible:outline-accent",
        "disabled:cursor-not-allowed disabled:opacity-40 aria-busy:cursor-wait aria-busy:opacity-100",
        className,
      )}
      {...props}
    />
  );
}
