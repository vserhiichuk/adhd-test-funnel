import { splitQuiz } from "../lib/quiz-steps";
import type { Quiz } from "../types";
import { EntryQuestion } from "./entry-question";
import { TraitVisual } from "./trait-visual";

export function LandingHero({ quiz }: { quiz: Quiz }) {
  const { entryQuestion } = splitQuiz(quiz);

  return (
    <section className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-sm sm:p-10">
      <TraitVisual />
      <h1 className="mt-6 text-center font-display text-4xl leading-tight font-bold sm:text-5xl">
        Discover Your <span className="block text-accent">ADHD Trait Profile</span>
      </h1>
      <p className="mx-auto mt-4 max-w-md text-center text-lg text-muted">
        Find out how ADHD traits influence your focus, energy, and daily life
      </p>
      <div className="mt-8">
        <EntryQuestion quizId={quiz.id} question={entryQuestion} />
      </div>
    </section>
  );
}
