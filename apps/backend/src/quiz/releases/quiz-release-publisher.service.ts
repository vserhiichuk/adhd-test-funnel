import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { isDeepStrictEqual } from 'node:util';
import type { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import type {
  QuizDefinition,
  QuizRelease,
} from '../definition/quiz-definition.types.js';
import { validateQuizRelease } from '../definition/validate-quiz-release.js';
import { QUIZ_RELEASES } from './quiz-releases.js';

@Injectable()
export class QuizReleasePublisher implements OnApplicationBootstrap {
  private readonly logger = new Logger(QuizReleasePublisher.name);

  constructor(private readonly prisma: PrismaService) {}

  async onApplicationBootstrap(): Promise<void> {
    QUIZ_RELEASES.forEach(assertValid);

    for (const release of QUIZ_RELEASES) {
      await this.publish(release);
    }
  }

  private async publish(release: QuizRelease): Promise<void> {
    const { quizSlug, version } = release;
    const definition = toJsonSnapshot(release.definition);
    const published = await this.prisma.quizVersion.findUnique({
      where: { quizSlug_version: { quizSlug, version } },
    });

    if (!published) {
      await this.prisma.quizVersion.create({
        data: { quizSlug, version, definition },
      });
      this.logger.log(`Published quiz ${describe(release)}`);
    } else if (!isDeepStrictEqual(published.definition, definition)) {
      throw new Error(
        `Quiz ${describe(release)} is already published with different content. ` +
          'Published versions are immutable: add a release with the next version instead.',
      );
    }
  }
}

function assertValid(release: QuizRelease): void {
  const problems = validateQuizRelease(release);
  if (problems.length > 0) {
    throw new Error(
      `Quiz ${describe(release)} is invalid:\n- ${problems.join('\n- ')}`,
    );
  }
}

function describe({ quizSlug, version }: QuizRelease): string {
  return `${quizSlug} v${version}`;
}

/** The definition as plain JSON, comparable with what Postgres returns. */
function toJsonSnapshot(definition: QuizDefinition): Prisma.InputJsonObject {
  return JSON.parse(JSON.stringify(definition)) as Prisma.InputJsonObject;
}
