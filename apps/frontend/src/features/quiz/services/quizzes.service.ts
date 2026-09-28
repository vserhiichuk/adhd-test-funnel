import "server-only";
import { serverApi } from "@/shared/api/server-api";
import { QUIZ_SLUG } from "../constants";
import type { Quiz } from "../types";

const BASE_URL = "/quizzes";

export const quizzesService = {
  getCurrent: () => serverApi.get<Quiz>(`${BASE_URL}/${QUIZ_SLUG}`),
};
