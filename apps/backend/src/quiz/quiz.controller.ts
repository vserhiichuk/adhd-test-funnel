import { Controller, Get, Param } from '@nestjs/common';
import { type QuizResponse, toQuizResponse } from './dto/quiz.response.js';
import { QuizService } from './quiz.service.js';

@Controller('quizzes')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get(':slug')
  async getCurrent(@Param('slug') slug: string): Promise<QuizResponse> {
    return toQuizResponse(await this.quizService.getCurrent(slug));
  }
}
