import {
  difference,
  ensure,
  findDuplicates,
} from '../../common/validation.utils.js';
import type { QuizQuestion } from '../definition/quiz-definition.types.js';
import type { Answer } from './evaluation.types.js';

export function validateAnswers(
  questions: QuizQuestion[],
  answers: Answer[],
): string[] {
  const questionKeys = questions.map(({ key }) => key);
  const answeredKeys = answers.map(({ questionKey }) => questionKey);
  const optionKeysByQuestion = new Map(
    questions.map(({ key, options }) => [key, options.map((o) => o.key)]),
  );

  return [
    ...findDuplicates(answeredKeys).map(
      (key) => `question "${key}" is answered more than once`,
    ),
    ...difference(questionKeys, answeredKeys).map(
      (key) => `question "${key}" is not answered`,
    ),
    ...difference(answeredKeys, questionKeys).map(
      (key) => `unknown question "${key}"`,
    ),
    ...answers.flatMap(({ questionKey, optionKey }) => {
      const optionKeys = optionKeysByQuestion.get(questionKey);
      return ensure(
        !optionKeys || optionKeys.includes(optionKey),
        `unknown option "${optionKey}" for question "${questionKey}"`,
      );
    }),
  ];
}
