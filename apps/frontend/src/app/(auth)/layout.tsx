import type { ReactNode } from "react";
import { SiteHeader } from "@/shared/ui/site-header";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 justify-center px-4 pt-10 pb-16 sm:pt-20">{children}</main>
    </>
  );
}
