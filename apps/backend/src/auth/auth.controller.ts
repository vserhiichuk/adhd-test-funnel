import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import type { User } from '../generated/prisma/client.js';
import { CurrentUserId } from '../session/current-user-id.decorator.js';
import { SessionGuard } from '../session/session.guard.js';
import { SessionService } from '../session/session.service.js';
import { AuthService } from './auth.service.js';
import { CheckEmailDto } from './dto/check-email.dto.js';
import { SignInDto } from './dto/sign-in.dto.js';
import { SignUpDto } from './dto/sign-up.dto.js';
import { type UserResponse, toUserResponse } from './dto/user.response.js';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly sessionService: SessionService,
  ) {}

  @Post('check-email')
  @HttpCode(HttpStatus.OK)
  async checkEmail(
    @Body() { email }: CheckEmailDto,
  ): Promise<{ registered: boolean }> {
    return { registered: await this.authService.isRegistered(email) };
  }

  @Post('sign-up')
  async signUp(
    @Body() dto: SignUpDto,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<UserResponse> {
    const guestAttemptId = this.sessionService.getGuestAttemptId(request);
    const user = await this.authService.signUp(dto, guestAttemptId);
    return this.startSession(response, user);
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body() dto: SignInDto,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<UserResponse> {
    const guestAttemptId = this.sessionService.getGuestAttemptId(request);
    const user = await this.authService.signIn(dto, guestAttemptId);
    return this.startSession(response, user);
  }

  @Post('sign-out')
  @HttpCode(HttpStatus.NO_CONTENT)
  signOut(@Res({ passthrough: true }) response: Response): void {
    this.sessionService.end(response);
  }

  @Get('me')
  @UseGuards(SessionGuard)
  async me(@CurrentUserId() userId: string): Promise<UserResponse> {
    return toUserResponse(await this.authService.getUser(userId));
  }

  private startSession(response: Response, user: User): UserResponse {
    this.sessionService.forgetGuestAttempt(response);
    this.sessionService.start(response, user.id);
    return toUserResponse(user);
  }
}
