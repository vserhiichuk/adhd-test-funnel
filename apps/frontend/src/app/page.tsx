import { getQuiz } from "@/features/quiz/api/get-quiz";
import { LandingHero } from "@/features/quiz/components/landing-hero";
import { SiteHeader } from "@/shared/ui/site-header";

export default async function HomePage() {
  const quiz = await getQuiz();

  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 items-start justify-center px-4 pt-2 pb-16 sm:items-center">
        <LandingHero quiz={quiz} />
      </main>
    </>
  );
}
