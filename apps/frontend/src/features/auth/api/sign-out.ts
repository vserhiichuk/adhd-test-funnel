import { apiClient } from "@/shared/api/api-client";

export function signOut(): Promise<void> {
  return apiClient.post("/auth/sign-out");
}
