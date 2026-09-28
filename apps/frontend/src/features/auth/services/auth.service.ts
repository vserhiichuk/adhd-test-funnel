import { apiClient } from "@/shared/api/api-client";
import { ApiError } from "@/shared/api/api-error";
import type { Credentials, EmailCheck, User } from "../types";

const BASE_URL = "/auth";

export const authService = {
  checkEmail: (email: string) => apiClient.post<EmailCheck>(`${BASE_URL}/check-email`, { email }),

  signUp: (credentials: Credentials) => apiClient.post<User>(`${BASE_URL}/sign-up`, credentials),

  signIn: (credentials: Credentials) => apiClient.post<User>(`${BASE_URL}/sign-in`, credentials),

  signOut: () => apiClient.post(`${BASE_URL}/sign-out`),

  /** The signed-in user, or `null` for a guest. */
  getCurrentUser: async (): Promise<User | null> => {
    try {
      return await apiClient.get<User>(`${BASE_URL}/me`);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        return null;
      }
      throw error;
    }
  },
};
