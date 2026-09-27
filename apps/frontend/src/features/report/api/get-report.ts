import "server-only";
import { redirect } from "next/navigation";
import { ApiError } from "@/shared/api/api-error";
import { serverApi } from "@/shared/api/server-api";
import { routes } from "@/shared/config/routes";
import type { Report } from "../types";

/** The signed-in user's latest report, or `null` if they haven't completed the quiz yet. */
export async function getReport(): Promise<Report | null> {
  try {
    return await serverApi.get<Report>("/reports/me");
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      redirect(routes.signIn);
    }
    if (error instanceof ApiError && error.status === 404) {
      return null;
    }
    throw error;
  }
}
