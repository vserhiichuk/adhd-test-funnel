import { apiClient } from "@/shared/api/api-client";
import type { Answers, SubmittedAttempt } from "../types";

const BASE_URL = "/attempts";

export const attemptsService = {
  submit: (quizVersionId: string, answers: Answers) =>
    apiClient.post<SubmittedAttempt>(BASE_URL, {
      quizVersionId,
      answers: Object.entries(answers).map(([questionKey, optionKey]) => ({ questionKey, optionKey })),
    }),
};
