import { z } from "zod";

// Mirrors the backend rules so mistakes show up before a request; the backend stays authoritative.
const email = z.email("Enter a valid email address");

export const signUpSchema = z.object({
  email,
  password: z.string().min(8, "Use at least 8 characters").max(128, "Use at most 128 characters"),
});

export const signInSchema = z.object({
  email,
  password: z.string().min(1, "Enter your password"),
});
