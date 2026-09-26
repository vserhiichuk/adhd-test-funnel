import type { ReactNode } from "react";

type AuthPanelProps = {
  title: ReactNode;
  description: string;
  footer: ReactNode;
  children: ReactNode;
};

export function AuthPanel({ title, description, footer, children }: AuthPanelProps) {
  return (
    <section className="flex w-full flex-col items-center text-center">
      <h1 className="font-display text-4xl leading-tight font-bold sm:text-5xl">{title}</h1>
      <p className="mt-4 text-lg text-muted">{description}</p>
      <div className="mt-8 w-full max-w-[464px] text-left">{children}</div>
      <p className="mt-6 text-sm text-muted">{footer}</p>
    </section>
  );
}
