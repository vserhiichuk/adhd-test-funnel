import { apiClient } from "@/shared/api/api-client";
import type { EmailCheck } from "../types";

export function checkEmail(email: string): Promise<EmailCheck> {
  return apiClient.post<EmailCheck>("/auth/check-email", { email });
}
