import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/shared/lib/cn";

const TEXT_LINK_CLASS_NAME =
  "font-medium text-accent underline-offset-4 hover:underline focus-visible:underline";

export function TextLink({ className, ...props }: ComponentProps<typeof Link>) {
  return <Link className={cn(TEXT_LINK_CLASS_NAME, className)} {...props} />;
}

/** An action that looks like a link, e.g. "Change" next to a locked field. */
export function TextButton({ className, type = "button", ...props }: ComponentProps<"button">) {
  return <button type={type} className={cn(TEXT_LINK_CLASS_NAME, className)} {...props} />;
}
