import { Injectable, NotFoundException } from '@nestjs/common';
import { AttemptsService } from '../attempts/attempts.service.js';
import { ADHD_QUIZ_SLUG } from '../quiz/quiz.constants.js';
import { buildReport } from './build-report.js';
import type { Report } from './report.types.js';

@Injectable()
export class ReportsService {
  constructor(private readonly attemptsService: AttemptsService) {}

  async getLatest(userId: string): Promise<Report> {
    const [current, ...previous] = await this.attemptsService.findByUser(
      userId,
      ADHD_QUIZ_SLUG,
    );
    if (!current) {
      throw new NotFoundException('No completed quiz yet');
    }
    return buildReport({ current, previous });
  }
}
