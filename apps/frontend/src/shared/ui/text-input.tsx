import type { ComponentProps } from "react";
import { cn } from "@/shared/lib/cn";

type TextInputProps = ComponentProps<"input"> & {
  name: string;
  label: string;
  invalid?: boolean;
};

// The error text lives in the form's FormMessage (linked via aria-describedby); the field only turns red.
export function TextInput({ name, label, invalid = false, id = name, className, ...props }: TextInputProps) {
  return (
    <>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        name={name}
        placeholder={label}
        aria-invalid={invalid || undefined}
        className={cn(
          "h-14 rounded-lg border border-line bg-white px-4 text-ink transition-colors placeholder:text-muted",
          "focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none",
          invalid && "border-danger focus:border-danger focus:ring-danger/20",
          className,
        )}
        {...props}
      />
    </>
  );
}
