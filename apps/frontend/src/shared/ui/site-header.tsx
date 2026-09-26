import type { ReactNode } from "react";
import { Container } from "./container";
import { Logo } from "./logo";

type SiteHeaderProps = {
  className?: string;
  actions?: ReactNode;
};

export function SiteHeader({ className, actions }: SiteHeaderProps) {
  return (
    <header className={className}>
      <Container className="flex h-20 items-center justify-between">
        <Logo />
        {actions}
      </Container>
    </header>
  );
}
