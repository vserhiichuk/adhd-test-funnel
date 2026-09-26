import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/shared/lib/cn";

export function TextLink({ className, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(
        "font-medium text-accent underline-offset-4 hover:underline focus-visible:underline",
        className,
      )}
      {...props}
    />
  );
}
