import { request } from "./http";

const BASE_PATH = "/api";

export const apiClient = {
  get: <T>(path: string) => request<T>(`${BASE_PATH}${path}`),

  post: <T = void>(path: string, body?: unknown) =>
    request<T>(`${BASE_PATH}${path}`, {
      method: "POST",
      body: body === undefined ? undefined : JSON.stringify(body),
    }),
};
