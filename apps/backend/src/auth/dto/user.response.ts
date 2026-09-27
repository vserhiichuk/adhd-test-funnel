import type { User } from '../../generated/prisma/client.js';

export type UserResponse = {
  id: string;
  email: string;
};

export function toUserResponse({ id, email }: User): UserResponse {
  return { id, email };
}
