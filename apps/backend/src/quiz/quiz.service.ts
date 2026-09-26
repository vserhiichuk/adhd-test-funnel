import { Injectable, NotFoundException } from '@nestjs/common';
import type { QuizVersion } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import type {
  PublishedQuiz,
  QuizDefinition,
} from './definition/quiz-definition.types.js';

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

// Definitions are validated before publishing, so the stored JSON is trusted.
function toPublishedQuiz(version: QuizVersion): PublishedQuiz {
  return {
    id: version.id,
    quizSlug: version.quizSlug,
    version: version.version,
    definition: version.definition as QuizDefinition,
  };
}
