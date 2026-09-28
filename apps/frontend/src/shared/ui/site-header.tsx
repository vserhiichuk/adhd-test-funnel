import type { ReactNode } from "react";
import { Container } from "./container";
import { Logo } from "./logo";

export function SiteHeader({ actions }: { actions?: ReactNode }) {
  return (
    <header>
      <Container className="flex h-20 items-center justify-between">
        <Logo />
        {actions}
      </Container>
    </header>
  );
}
