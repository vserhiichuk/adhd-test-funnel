import { apiClient } from "@/shared/api/api-client";
import { ApiError } from "@/shared/api/api-error";
import type { User } from "../types";

export async function getCurrentUser(): Promise<User | null> {
  try {
    return await apiClient.get<User>("/auth/me");
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      return null;
    }
    throw error;
  }
}
