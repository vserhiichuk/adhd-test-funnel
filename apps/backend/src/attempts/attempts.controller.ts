import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { SessionService } from '../session/session.service.js';
import { AttemptsService } from './attempts.service.js';
import { SubmitAttemptDto } from './dto/submit-attempt.dto.js';

@Controller('attempts')
export class AttemptsController {
  constructor(
    private readonly attemptsService: AttemptsService,
    private readonly sessionService: SessionService,
  ) {}

  @Post()
  async submit(
    @Body() dto: SubmitAttemptDto,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ id: string }> {
    const userId = this.sessionService.getUserId(request);
    const attempt = await this.attemptsService.submit(dto, userId);
    if (!userId) {
      this.sessionService.rememberGuestAttempt(response, attempt.id);
    }
    return attempt;
  }
}
