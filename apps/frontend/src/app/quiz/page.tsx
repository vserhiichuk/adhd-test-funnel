import type { Metadata } from "next";
import { QuizFlow } from "@/features/quiz/components/quiz-flow";
import { quizzesService } from "@/features/quiz/services/quizzes.service";
import { Container } from "@/shared/ui/container";
import { SiteHeader } from "@/shared/ui/site-header";

export const metadata: Metadata = { title: "ADHD Trait Test" };

export default async function QuizPage() {
  const quiz = await quizzesService.getCurrent();

  return (
    <div className="flex flex-1 flex-col bg-white">
      <SiteHeader />
      <main className="flex flex-1 flex-col">
        <Container className="flex flex-1 flex-col pb-10">
          <QuizFlow quiz={quiz} />
        </Container>
      </main>
    </div>
  );
}
