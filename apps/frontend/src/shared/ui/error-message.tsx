import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

type ErrorMessageProps = {
  children: ReactNode;
  className?: string;
};

export function ErrorMessage({ children, className }: ErrorMessageProps) {
  return (
    <p role="alert" className={cn("text-sm text-danger", className)}>
      {children}
    </p>
  );
}
