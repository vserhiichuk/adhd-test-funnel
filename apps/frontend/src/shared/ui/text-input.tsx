import type { ComponentProps } from "react";
import { cn } from "@/shared/lib/cn";

type TextInputProps = ComponentProps<"input"> & {
  name: string;
  label: string;
  error?: string;
};

export function TextInput({ name, label, error, id = name, className, ...props }: TextInputProps) {
  const errorId = `${id}-error`;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        name={name}
        placeholder={label}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          "h-14 rounded-lg border border-line bg-white px-4 text-ink placeholder:text-muted",
          "focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none",
          error && "border-danger",
          className,
        )}
        {...props}
      />
      {error && (
        <p id={errorId} className="text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
