/** Error body of the NestJS API: one message, or a list of validation problems. */
export type ApiErrorBody = {
  message?: string | string[];
};
