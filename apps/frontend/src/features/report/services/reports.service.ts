import "server-only";
import { redirect } from "next/navigation";
import { ApiError } from "@/shared/api/api-error";
import { serverApi } from "@/shared/api/server-api";
import { routes } from "@/shared/config/routes";
import type { Report } from "../types";

const BASE_URL = "/reports";

export const reportsService = {
  /** The signed-in user's latest report, or `null` if they haven't completed the quiz yet. */
  getMine: async (): Promise<Report | null> => {
    try {
      return await serverApi.get<Report>(`${BASE_URL}/me`);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        redirect(routes.signIn);
      }
      if (error instanceof ApiError && error.status === 404) {
        return null;
      }
      throw error;
    }
  },
};
