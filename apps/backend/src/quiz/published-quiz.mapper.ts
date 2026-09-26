import type { QuizVersion } from '../generated/prisma/client.js';
import type {
  PublishedQuiz,
  QuizDefinition,
} from './definition/quiz-definition.types.js';

// Definitions are validated before publishing, so the stored JSON is trusted.
export function toPublishedQuiz(version: QuizVersion): PublishedQuiz {
  return {
    id: version.id,
    quizSlug: version.quizSlug,
    version: version.version,
    definition: version.definition as QuizDefinition,
  };
}
