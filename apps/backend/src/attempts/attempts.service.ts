import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { scoreAnswers } from '../quiz/evaluation/score-answers.js';
import { validateAnswers } from '../quiz/evaluation/validate-answers.js';
import { QuizService } from '../quiz/quiz.service.js';
import type { SubmitAttemptDto } from './dto/submit-attempt.dto.js';

@Injectable()
export class AttemptsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly quizService: QuizService,
  ) {}

  async submit(
    { quizVersionId, answers }: SubmitAttemptDto,
    userId: string | null,
  ): Promise<{ id: string }> {
    const { definition } = await this.quizService.getVersion(quizVersionId);

    const problems = validateAnswers(definition.questions, answers);
    if (problems.length > 0) {
      throw new BadRequestException(problems);
    }

    return this.prisma.quizAttempt.create({
      data: {
        userId,
        quizVersionId,
        result: scoreAnswers(definition.scoring, answers),
        answers: {
          createMany: {
            data: answers.map(({ questionKey, optionKey }) => ({
              questionKey,
              value: { optionKey },
            })),
          },
        },
      },
      select: { id: true },
    });
  }

  async claimGuestAttempt(attemptId: string, userId: string): Promise<void> {
    await this.prisma.quizAttempt.updateMany({
      where: { id: attemptId, userId: null },
      data: { userId },
    });
  }
}
