import { apiClient } from "@/shared/api/api-client";
import type { Credentials, User } from "../types";

export function signUp(credentials: Credentials): Promise<User> {
  return apiClient.post<User>("/auth/sign-up", credentials);
}
