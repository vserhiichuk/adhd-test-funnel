import { Module } from '@nestjs/common';
import { AttemptsModule } from '../attempts/attempts.module.js';
import { SessionModule } from '../session/session.module.js';
import { ReportsController } from './reports.controller.js';
import { ReportsService } from './reports.service.js';

@Module({
  imports: [AttemptsModule, SessionModule],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
