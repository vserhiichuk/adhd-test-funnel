import type { Request } from 'express';

export type UserToken = { sub: string };

export type GuestAttemptToken = { attemptId: string };

export type AuthenticatedRequest = Request & { userId: string };
