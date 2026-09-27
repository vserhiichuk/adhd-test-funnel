import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/shared/lib/cn";
import { Spinner } from "./spinner";

const BUTTON_CLASS_NAME = cn(
  "relative inline-flex h-12 items-center justify-center rounded-lg bg-primary px-6 font-medium text-white transition-colors",
  "hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
  "disabled:cursor-not-allowed disabled:opacity-60",
  // A busy button is disabled too, but it is working rather than unavailable.
  "aria-busy:cursor-wait aria-busy:opacity-100",
);

type ButtonProps = ComponentProps<"button"> & {
  isLoading?: boolean;
};

export function Button({
  className,
  isLoading = false,
  disabled,
  type = "button",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      className={cn(BUTTON_CLASS_NAME, className)}
      {...props}
    >
      {/* The hidden label keeps the button's width and accessible name while the spinner shows. */}
      <span className={cn(isLoading && "opacity-0")}>{children}</span>
      {isLoading && <Spinner className="absolute inset-0 m-auto" />}
    </button>
  );
}

export function ButtonLink({ className, ...props }: ComponentProps<typeof Link>) {
  return <Link className={cn(BUTTON_CLASS_NAME, className)} {...props} />;
}
