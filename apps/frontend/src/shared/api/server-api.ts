import "server-only";
import { cookies } from "next/headers";
import { request } from "./http";

export const serverApi = {
  // Reading cookies makes the caller render per request and lets the backend see the session.
  get: async <T>(path: string) => {
    const cookieStore = await cookies();
    return request<T>(`${process.env.API_URL}${path}`, {
      headers: { cookie: cookieStore.toString() },
      cache: "no-store",
    });
  },
};
