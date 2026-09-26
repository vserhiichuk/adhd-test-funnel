import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

type TextInputProps = ComponentProps<"input"> & {
  name: string;
  label: string;
  invalid?: boolean;
  /** Rendered inside the field on the right, e.g. an action for a read-only value. */
  trailing?: ReactNode;
};

// The error text lives in the form's FormMessage (linked via aria-describedby); the field only turns red.
export function TextInput({
  name,
  label,
  invalid = false,
  trailing,
  id = name,
  className,
  ...props
}: TextInputProps) {
  const hasTrailing = Boolean(trailing);

  return (
    <div className="relative">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        name={name}
        placeholder={label}
        aria-invalid={invalid || undefined}
        className={cn(
          "h-14 w-full rounded-lg border border-line bg-white px-4 text-ink transition-colors placeholder:text-muted",
          "focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none read-only:bg-surface",
          invalid && "border-danger focus:border-danger focus:ring-danger/20",
          hasTrailing && "pr-24",
          className,
        )}
        {...props}
      />
      {hasTrailing && <div className="absolute inset-y-0 right-4 flex items-center">{trailing}</div>}
    </div>
  );
}
