import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { CookieOptions, Request, Response } from 'express';
import { type Env, NodeEnv } from '../config/env.validation.js';

const USER_COOKIE = 'session';
const GUEST_ATTEMPT_COOKIE = 'guest_attempt';
const GUEST_ATTEMPT_TTL_DAYS = 7;
const SECONDS_PER_DAY = 24 * 60 * 60;

type UserToken = { sub: string };
type GuestAttemptToken = { attemptId: string };

@Injectable()
export class SessionService {
  private readonly cookieOptions: CookieOptions;
  private readonly userTtlDays: number;

  constructor(
    private readonly jwtService: JwtService,
    config: ConfigService<Env, true>,
  ) {
    this.cookieOptions = {
      httpOnly: true,
      sameSite: 'lax',
      secure: config.get('NODE_ENV', { infer: true }) === NodeEnv.Production,
      path: '/',
    };
    this.userTtlDays = config.get('SESSION_TTL_DAYS', { infer: true });
  }

  start(response: Response, userId: string): void {
    this.write<UserToken>(
      response,
      USER_COOKIE,
      { sub: userId },
      this.userTtlDays,
    );
  }

  end(response: Response): void {
    response.clearCookie(USER_COOKIE, this.cookieOptions);
  }

  getUserId(request: Request): string | null {
    return this.read<UserToken>(request, USER_COOKIE)?.sub ?? null;
  }

  rememberGuestAttempt(response: Response, attemptId: string): void {
    this.write<GuestAttemptToken>(
      response,
      GUEST_ATTEMPT_COOKIE,
      { attemptId },
      GUEST_ATTEMPT_TTL_DAYS,
    );
  }

  forgetGuestAttempt(response: Response): void {
    response.clearCookie(GUEST_ATTEMPT_COOKIE, this.cookieOptions);
  }

  getGuestAttemptId(request: Request): string | null {
    return (
      this.read<GuestAttemptToken>(request, GUEST_ATTEMPT_COOKIE)?.attemptId ??
      null
    );
  }

  private write<T extends object>(
    response: Response,
    cookie: string,
    payload: T,
    ttlDays: number,
  ): void {
    const ttlSeconds = ttlDays * SECONDS_PER_DAY;
    const token = this.jwtService.sign(payload, { expiresIn: ttlSeconds });
    response.cookie(cookie, token, {
      ...this.cookieOptions,
      maxAge: ttlSeconds * 1000,
    });
  }

  private read<T extends object>(
    request: Request,
    cookie: string,
  ): Partial<T> | null {
    const token: unknown = request.cookies?.[cookie];
    if (typeof token !== 'string') {
      return null;
    }
    try {
      return this.jwtService.verify<T>(token);
    } catch {
      return null;
    }
  }
}
