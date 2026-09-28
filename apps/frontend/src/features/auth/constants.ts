import type { SignUpStep } from "./types";

// Set by the backend on sign-up / sign-in.
export const SESSION_COOKIE = "session";

export const SIGN_UP_DESCRIPTIONS: Record<SignUpStep, string> = {
  email: "Enter your email to access your full report",
  password: "Enter your password to access your full report",
};

export const SIGN_IN_DESCRIPTIONS = {
  default: "Welcome back! Let’s continue your learning journey",
  existingAccount: "This email already has an account. Sign in to see your report.",
};
