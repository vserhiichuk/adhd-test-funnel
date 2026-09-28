import { ANSWERS_STORAGE_PREFIX } from "../constants";
import type { Answers } from "../types";

export const EMPTY_ANSWERS: Answers = {};

const memory = new Map<string, Answers>();
const listeners = new Set<() => void>();

export const answersStore = {
  subscribe(listener: () => void): () => void {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  get(quizId: string): Answers {
    let answers = memory.get(quizId);
    if (!answers) {
      answers = loadFromStorage(quizId);
      memory.set(quizId, answers);
    }
    return answers;
  },

  set(quizId: string, answers: Answers): void {
    memory.set(quizId, answers);
    saveToStorage(quizId, answers);
    listeners.forEach((listener) => listener());
  },
};

function loadFromStorage(quizId: string): Answers {
  try {
    const stored = sessionStorage.getItem(ANSWERS_STORAGE_PREFIX + quizId);
    return stored ? (JSON.parse(stored) as Answers) : EMPTY_ANSWERS;
  } catch {
    return EMPTY_ANSWERS;
  }
}

function saveToStorage(quizId: string, answers: Answers): void {
  try {
    sessionStorage.setItem(ANSWERS_STORAGE_PREFIX + quizId, JSON.stringify(answers));
  } catch {
    // Storage can be unavailable (e.g. private mode); answers still live in memory.
  }
}
