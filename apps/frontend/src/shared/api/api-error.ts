const FALLBACK_MESSAGE = "Something went wrong. Please try again.";

export class ApiError extends Error {
  constructor(
    readonly status: number,
    readonly messages: string[],
  ) {
    super(messages.join("\n"));
    this.name = "ApiError";
  }
}

export function getErrorMessage(error: unknown): string {
  return error instanceof ApiError ? error.messages.join(" ") : FALLBACK_MESSAGE;
}
