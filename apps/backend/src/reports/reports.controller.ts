import { Controller, Get, UseGuards } from '@nestjs/common';
import { CurrentUserId } from '../session/current-user-id.decorator.js';
import { SessionGuard } from '../session/session.guard.js';
import type { Report } from './report.types.js';
import { ReportsService } from './reports.service.js';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('me')
  @UseGuards(SessionGuard)
  getMine(@CurrentUserId() userId: string): Promise<Report> {
    return this.reportsService.getLatest(userId);
  }
}
