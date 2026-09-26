import { SiteHeader } from "@/shared/ui/site-header";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center px-4">
        <h1 className="text-center font-display text-4xl font-bold sm:text-5xl">
          Discover Your <span className="text-accent">ADHD Trait Profile</span>
        </h1>
      </main>
    </>
  );
}
