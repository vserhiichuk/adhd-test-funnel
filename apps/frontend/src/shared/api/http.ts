import { ApiError } from "./api-error";
import type { ApiErrorBody } from "./types";

export async function request<T>(url: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  if (init.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(url, { ...init, headers });
  const body: unknown = await response.json().catch(() => undefined);

  if (!response.ok) {
    throw new ApiError(response.status, toMessages(body as ApiErrorBody | undefined, response));
  }
  return body as T;
}

function toMessages(body: ApiErrorBody | undefined, response: Response): string[] {
  const message = body?.message ?? response.statusText;
  return Array.isArray(message) ? message : [message];
}
