import { Module } from '@nestjs/common';
import { QuizModule } from '../quiz/quiz.module.js';
import { AttemptsController } from './attempts.controller.js';
import { AttemptsService } from './attempts.service.js';

@Module({
  imports: [QuizModule],
  controllers: [AttemptsController],
  providers: [AttemptsService],
})
export class AttemptsModule {}
