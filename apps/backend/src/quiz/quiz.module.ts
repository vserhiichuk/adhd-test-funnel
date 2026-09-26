import { Module } from '@nestjs/common';
import { QuizReleasePublisher } from './releases/quiz-release-publisher.service.js';

@Module({
  providers: [QuizReleasePublisher],
})
export class QuizModule {}
