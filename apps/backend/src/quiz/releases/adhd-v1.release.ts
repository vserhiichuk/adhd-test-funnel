import type {
  AnswerOption,
  QuizRelease,
  SingleChoiceQuestion,
} from '../definition/quiz-definition.types.js';
import { ADHD_QUIZ_SLUG } from '../quiz.constants.js';

const AGREEMENT_SCALE = [
  { key: 'strongly_agree', label: 'Strongly agree', points: 4 },
  { key: 'agree', label: 'Agree', points: 3 },
  { key: 'neutral', label: 'Neutral', points: 2 },
  { key: 'disagree', label: 'Disagree', points: 1 },
  { key: 'strongly_disagree', label: 'Strongly disagree', points: 0 },
];

const AGREEMENT_OPTIONS: AnswerOption[] = AGREEMENT_SCALE.map(
  ({ key, label }) => ({ key, label }),
);

const AGREEMENT_POINTS = Object.fromEntries(
  AGREEMENT_SCALE.map(({ key, points }) => [key, points]),
);

const statement = (key: string, text: string): SingleChoiceQuestion => ({
  type: 'single_choice',
  key,
  kind: 'assessment',
  text,
  options: AGREEMENT_OPTIONS,
});

const STATEMENTS: SingleChoiceQuestion[] = [
  statement(
    'losing_track_of_time',
    'I easily lose track of time when doing something I enjoy',
  ),
  statement(
    'misplacing_things',
    'I often misplace things like my phone, keys, or wallet',
  ),
  statement(
    'unfinished_tasks',
    'I frequently start tasks but struggle to finish them',
  ),
  statement(
    'focus_in_conversations',
    'I find it hard to stay focused during conversations or meetings',
  ),
  statement(
    'forgetting_daily_tasks',
    'I often forget about daily tasks like appointments or returning calls',
  ),
];

export const ADHD_QUIZ_V1: QuizRelease = {
  quizSlug: ADHD_QUIZ_SLUG,
  version: 1,
  definition: {
    questions: [
      {
        type: 'single_choice',
        key: 'gender',
        kind: 'profile',
        text: 'What is your gender?',
        options: [
          { key: 'male', label: 'Male' },
          { key: 'female', label: 'Female' },
        ],
      },
      ...STATEMENTS,
    ],
    scoring: {
      strategy: 'normalized_sum',
      points: Object.fromEntries(
        STATEMENTS.map(({ key }) => [key, AGREEMENT_POINTS]),
      ),
      // 50 is "neutral on everything"; High requires leaning towards agreement.
      outcomes: [
        { outcome: 'high', minScore: 60 },
        { outcome: 'low', minScore: 0 },
      ],
    },
  },
};
