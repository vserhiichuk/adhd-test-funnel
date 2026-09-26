import type { ComponentProps } from "react";
import { cn } from "@/shared/lib/cn";

export function ReportContainer({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-[1112px] px-4 sm:px-6", className)} {...props} />;
}

export function SectionTitle({ className, ...props }: ComponentProps<"h2">) {
  return (
    <h2
      className={cn("font-display text-2xl leading-snug font-semibold sm:text-3xl", className)}
      {...props}
    />
  );
}
