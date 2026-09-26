import { apiClient } from "@/shared/api/api-client";
import type { Answers } from "../types";

export function submitAttempt(quizVersionId: string, answers: Answers) {
  return apiClient.post<{ id: string }>("/attempts", {
    quizVersionId,
    answers: Object.entries(answers).map(([questionKey, optionKey]) => ({ questionKey, optionKey })),
  });
}
