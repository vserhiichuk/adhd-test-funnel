import { apiClient } from "@/shared/api/api-client";

export function checkEmail(email: string): Promise<{ registered: boolean }> {
  return apiClient.post<{ registered: boolean }>("/auth/check-email", { email });
}
