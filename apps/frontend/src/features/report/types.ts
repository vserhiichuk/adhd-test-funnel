type SectionBase<Type extends string> = {
  type: Type;
  id: string;
  title: string;
};

export type ScoreSection = SectionBase<"score"> & {
  label: string;
  score: number;
  maxScore: number;
};

export type ProgressSection = SectionBase<"progress"> & {
  previousScore: number;
  previousCompletedAt: string;
  currentScore: number;
  summary: string;
};

export type TextSection = SectionBase<"text"> & {
  variant: "callout" | "plain";
  body: string;
};

export type ListSection = SectionBase<"list"> & {
  marker: "check" | "bullet";
  intro?: string;
  items: string[];
  note?: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqSection = SectionBase<"faq"> & {
  items: FaqItem[];
};

export type ReportSection = ScoreSection | ProgressSection | TextSection | ListSection | FaqSection;

/** Sections rendered in the content column; the score is the full-width hero. */
export type ContentSection = Exclude<ReportSection, ScoreSection>;

export type ReportSectionGroups = {
  heroes: ScoreSection[];
  content: ContentSection[];
};

export type Report = {
  attemptId: string;
  completedAt: string;
  sections: ReportSection[];
};

export type GaugeSegment = {
  color: string;
  path: string;
};
