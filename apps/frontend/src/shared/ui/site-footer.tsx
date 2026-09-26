import { Container } from "./container";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="mt-auto rounded-t-2xl bg-footer text-white">
      <Container className="flex flex-col gap-4 py-10">
        <Logo tone="light" />
        <p className="text-xs text-white/70">All rights reserved {new Date().getFullYear()}</p>
      </Container>
    </footer>
  );
}
