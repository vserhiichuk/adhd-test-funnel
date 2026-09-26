import { Module } from '@nestjs/common';
import { QuizController } from './quiz.controller.js';
import { QuizService } from './quiz.service.js';
import { QuizReleasePublisher } from './releases/quiz-release-publisher.service.js';

@Module({
  controllers: [QuizController],
  providers: [QuizService, QuizReleasePublisher],
  exports: [QuizService],
})
export class QuizModule {}
