import { useSyncExternalStore } from "react";
import { answersStore, EMPTY_ANSWERS } from "../state/answers-store";

const subscribeToNothing = () => () => {};

export function useQuizAnswers(quizId: string) {
  const answers = useSyncExternalStore(
    answersStore.subscribe,
    () => answersStore.get(quizId),
    () => EMPTY_ANSWERS,
  );
  // False on the server and during hydration, when stored answers aren't readable yet.
  const isReady = useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );

  return {
    answers,
    isReady,
    start: (questionKey: string, optionKey: string) =>
      answersStore.set(quizId, { [questionKey]: optionKey }),
    answer: (questionKey: string, optionKey: string) =>
      answersStore.set(quizId, { ...answersStore.get(quizId), [questionKey]: optionKey }),
  };
}
