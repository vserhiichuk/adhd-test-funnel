import "server-only";
import { serverApi } from "@/shared/api/server-api";
import type { Quiz } from "../types";

const QUIZ_SLUG = "adhd";

export function getQuiz(): Promise<Quiz> {
  return serverApi.get<Quiz>(`/quizzes/${QUIZ_SLUG}`);
}
