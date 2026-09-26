import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/shared/lib/cn";

const BUTTON_CLASS_NAME = cn(
  "inline-flex h-12 items-center justify-center rounded-lg bg-primary px-6 font-medium text-white transition-colors",
  "hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
  "disabled:cursor-not-allowed disabled:opacity-60",
);

type ButtonProps = ComponentProps<"button"> & {
  isLoading?: boolean;
};

export function Button({
  className,
  isLoading = false,
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      className={cn(BUTTON_CLASS_NAME, className)}
      {...props}
    />
  );
}

export function ButtonLink({ className, ...props }: ComponentProps<typeof Link>) {
  return <Link className={cn(BUTTON_CLASS_NAME, className)} {...props} />;
}
