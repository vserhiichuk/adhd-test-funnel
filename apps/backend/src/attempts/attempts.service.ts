import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { scoreAnswers } from '../quiz/evaluation/score-answers.js';
import { validateAnswers } from '../quiz/evaluation/validate-answers.js';
import { QuizService } from '../quiz/quiz.service.js';
import { toAnswerRow, toCompletedAttempt } from './attempt.mapper.js';
import type { CompletedAttempt, SubmittedAttempt } from './attempt.types.js';
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
  ): Promise<SubmittedAttempt> {
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
        answers: { createMany: { data: answers.map(toAnswerRow) } },
      },
      select: { id: true },
    });
  }

  async findByUser(
    userId: string,
    quizSlug: string,
  ): Promise<CompletedAttempt[]> {
    const attempts = await this.prisma.quizAttempt.findMany({
      where: { userId, quizVersion: { quizSlug } },
      orderBy: { completedAt: 'desc' },
      include: { quizVersion: true, answers: true },
    });
    return attempts.map(toCompletedAttempt);
  }

  async claimGuestAttempt(attemptId: string, userId: string): Promise<void> {
    await this.prisma.quizAttempt.updateMany({
      where: { id: attemptId, userId: null },
      data: { userId },
    });
  }
}
