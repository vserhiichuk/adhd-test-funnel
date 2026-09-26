"use client";

import { useEffect } from "react";
import { Button } from "@/shared/ui/button";
import { SiteHeader } from "@/shared/ui/site-header";

type ErrorPageProps = {
  error: Error & { digest?: string };
  retry: () => void;
};

export default function ErrorPage({ error, retry }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="font-display text-3xl font-bold">Something went wrong</h1>
        <p className="text-muted">We couldn&apos;t load this page. Please try again.</p>
        <Button onClick={retry}>Try again</Button>
      </main>
    </>
  );
}
