import { cn } from "@/shared/lib/cn";

type FormMessageProps = {
  id?: string;
  message?: string | null;
  className?: string;
};

// Always rendered with a reserved line, so showing or clearing a message never moves the controls around it.
export function FormMessage({ id, message, className }: FormMessageProps) {
  return (
    <p id={id} role="alert" className={cn("min-h-7 py-1 text-sm text-danger", className)}>
      {message && (
        <span key={message} className="block motion-safe:animate-fade-in">
          {message}
        </span>
      )}
    </p>
  );
}
