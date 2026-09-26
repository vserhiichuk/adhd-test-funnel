import { Module } from '@nestjs/common';
import { QuizModule } from '../quiz/quiz.module.js';
import { SessionModule } from '../session/session.module.js';
import { AttemptsController } from './attempts.controller.js';
import { AttemptsService } from './attempts.service.js';

@Module({
  imports: [QuizModule, SessionModule],
  controllers: [AttemptsController],
  providers: [AttemptsService],
  exports: [AttemptsService],
})
export class AttemptsModule {}
