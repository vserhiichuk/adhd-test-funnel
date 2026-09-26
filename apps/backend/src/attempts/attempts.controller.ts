import { Body, Controller, Post } from '@nestjs/common';
import { AttemptsService } from './attempts.service.js';
import { SubmitAttemptDto } from './dto/submit-attempt.dto.js';

@Controller('attempts')
export class AttemptsController {
  constructor(private readonly attemptsService: AttemptsService) {}

  @Post()
  submit(@Body() dto: SubmitAttemptDto): Promise<{ id: string }> {
    return this.attemptsService.submit(dto);
  }
}
