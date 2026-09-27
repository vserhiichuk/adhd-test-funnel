import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import type { PublishedQuiz } from './definition/quiz-definition.types.js';
import { toPublishedQuiz } from './published-quiz.mapper.js';

@Injectable()
export class QuizService {
  constructor(private readonly prisma: PrismaService) {}

  async getCurrent(quizSlug: string): Promise<PublishedQuiz> {
    const version = await this.prisma.quizVersion.findFirst({
      where: { quizSlug },
      orderBy: { version: 'desc' },
    });
    if (!version) {
      throw new NotFoundException(`Quiz "${quizSlug}" not found`);
    }
    return toPublishedQuiz(version);
  }

  async getVersion(id: string): Promise<PublishedQuiz> {
    const version = await this.prisma.quizVersion.findUnique({
      where: { id },
    });
    if (!version) {
      throw new NotFoundException(`Quiz version "${id}" not found`);
    }
    return toPublishedQuiz(version);
  }
}
