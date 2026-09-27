export type QuizDefinition = {
  questions: QuizQuestion[];
  scoring: ScoringRules;
};

export type QuestionKind = 'profile' | 'assessment';

export type AnswerOption = {
  key: string;
  label: string;
};

export type SingleChoiceQuestion = {
  type: 'single_choice';
  key: string;
  kind: QuestionKind;
  text: string;
  options: AnswerOption[];
};

export type QuizQuestion = SingleChoiceQuestion;

export type OutcomeBand = {
  outcome: string;
  minScore: number;
};

export type NormalizedSumScoring = {
  strategy: 'normalized_sum';
  points: Record<string, Record<string, number>>;
  outcomes: OutcomeBand[];
};

export type ScoringRules = NormalizedSumScoring;

export type QuizRelease = {
  quizSlug: string;
  version: number;
  definition: QuizDefinition;
};

export type PublishedQuiz = QuizRelease & { id: string };
