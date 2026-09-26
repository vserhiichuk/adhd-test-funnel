export class ApiError extends Error {
  constructor(
    readonly status: number,
    readonly messages: string[],
  ) {
    super(messages.join("\n"));
    this.name = "ApiError";
  }
}
