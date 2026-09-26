import { Injectable, UnauthorizedException } from '@nestjs/common';
import { hash, verify } from 'argon2';
import { AttemptsService } from '../attempts/attempts.service.js';
import type { User } from '../generated/prisma/client.js';
import { UsersService } from '../users/users.service.js';
import type { SignInDto } from './dto/sign-in.dto.js';
import type { SignUpDto } from './dto/sign-up.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly attemptsService: AttemptsService,
  ) {}

  async signUp(
    { email, password }: SignUpDto,
    guestAttemptId: string | null,
  ): Promise<User> {
    const user = await this.usersService.create(email, await hash(password));
    await this.claimGuestAttempt(guestAttemptId, user.id);
    return user;
  }

  async signIn(
    { email, password }: SignInDto,
    guestAttemptId: string | null,
  ): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    if (!user || !(await verify(user.passwordHash, password))) {
      throw new UnauthorizedException('Invalid email or password');
    }
    await this.claimGuestAttempt(guestAttemptId, user.id);
    return user;
  }

  async getUser(userId: string): Promise<User> {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  private async claimGuestAttempt(
    attemptId: string | null,
    userId: string,
  ): Promise<void> {
    if (attemptId) {
      await this.attemptsService.claimGuestAttempt(attemptId, userId);
    }
  }
}
