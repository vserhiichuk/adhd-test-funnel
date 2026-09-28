import "server-only";
import { serverApi } from "@/shared/api/server-api";
import { QUIZ_SLUG } from "../constants";
import type { Quiz } from "../types";

export function getQuiz(): Promise<Quiz> {
  return serverApi.get<Quiz>(`/quizzes/${QUIZ_SLUG}`);
}
