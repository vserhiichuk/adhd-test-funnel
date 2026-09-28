import { apiClient } from "@/shared/api/api-client";
import type { Answers, SubmittedAttempt } from "../types";

export function submitAttempt(quizVersionId: string, answers: Answers): Promise<SubmittedAttempt> {
  return apiClient.post<SubmittedAttempt>("/attempts", {
    quizVersionId,
    answers: Object.entries(answers).map(([questionKey, optionKey]) => ({ questionKey, optionKey })),
  });
}
