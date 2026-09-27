import type { FaqItem } from '../report.types.js';

export type ListContent = {
  intro?: string;
  items: string[];
  note?: string;
};

export type OutcomeContent = {
  label: string;
  understanding: string;
  strengths: ListContent;
  emotionalRegulation: string | ListContent;
  faq: FaqItem[];
};

const HIGH_TRAITS: OutcomeContent = {
  label: 'High ADHD Traits',
  understanding:
    'Your score suggests that you exhibit high ADHD traits, meaning that attention difficulties, impulsivity, hyperactivity, and executive dysfunction significantly impact daily life. While these challenges can be frustrating, they are not insurmountable. Many individuals with high ADHD traits develop effective coping mechanisms that allow them to manage difficulties while harnessing their unique strengths.',
  strengths: {
    intro: 'Despite these challenges, you possess real strengths:',
    items: [
      'Strong creative problem-solving abilities, adaptability, and enthusiasm',
      'Ability to think outside the box, offering innovative solutions others would not consider',
      'Highly energetic and passionate, bringing enthusiasm into projects and conversations',
      'Resilience — pushing forward despite setbacks',
      'Ability to hyperfocus on areas of interest can serve as a valuable asset when properly channeled',
    ],
  },
  emotionalRegulation: {
    intro:
      'Your high ADHD traits may significantly influence your emotional experiences and reactions. You may:',
    items: [
      'Experience intense emotional highs and lows, sometimes reacting impulsively',
      'Struggle with frustration and impatience, making it difficult to regulate emotions in stressful situations',
      'Feel overwhelmed by minor setbacks or unexpected changes',
      'Find it challenging to control impulsive behaviors such as interrupting conversations or making snap decisions',
    ],
    note: 'While emotional regulation may be difficult, learning self-awareness techniques and coping strategies can help create more emotional stability.',
  },
  faq: [
    {
      question: 'Does a high ADHD score mean I have ADHD?',
      answer:
        'This score suggests significant ADHD traits, but an official diagnosis requires professional evaluation.',
    },
    {
      question: 'Can ADHD traits be strengths?',
      answer:
        'Yes. Creativity, high energy and the ability to hyperfocus can become real advantages when your environment and routines support them.',
    },
    {
      question: 'What strategies can help manage high ADHD traits?',
      answer:
        'Breaking tasks into small steps, using reminders and visual planners, keeping consistent routines and working with a coach or therapist can all help.',
    },
    {
      question: 'Does this score mean I struggle with emotional regulation?',
      answer:
        'Not necessarily. High ADHD traits often come with stronger emotional reactions, but everyone is different, and self-awareness and coping strategies make a big difference.',
    },
    {
      question: 'How can I stay organized with high ADHD traits?',
      answer:
        'Keep essentials in fixed places, rely on calendars and alarms instead of memory, and review your plan at the start of each day.',
    },
    {
      question: 'Can my ADHD trait levels change over time?',
      answer:
        'Traits are fairly stable, but how strongly they affect you can change with stress, sleep, environment and support. Retaking the test later shows how your results evolve.',
    },
  ],
};

const LOW_TRAITS: OutcomeContent = {
  label: 'Low ADHD Traits',
  understanding:
    'Your score suggests minimal ADHD traits. You show a strong ability to focus, self-regulate, and manage daily responsibilities. While occasional challenges may arise, they are unlikely to significantly impact your daily functioning.',
  strengths: {
    items: [
      'Strong ability to sustain attention and complete tasks',
      'Consistent and reliable in personal and professional responsibilities',
      'Good impulse control and measured decision-making',
      'Effective time management and organizational skills',
    ],
  },
  emotionalRegulation:
    'Your low ADHD traits suggest strong emotional regulation in most situations. You are generally able to manage stress, frustration, and unexpected changes without significant difficulty. Maintaining healthy routines and mindfulness practices can help preserve this stability.',
  faq: [
    {
      question: "Does a low ADHD score mean I definitely don't have ADHD?",
      answer:
        'A low score suggests minimal ADHD traits, but if you have concerns, a professional evaluation can provide a definitive answer.',
    },
    {
      question: 'Can I still benefit from brain training with low ADHD traits?',
      answer:
        'Yes. Brain training and healthy habits help anyone keep attention, memory and problem-solving sharp, regardless of ADHD traits.',
    },
    {
      question: 'What can I do to maintain my strong cognitive performance?',
      answer:
        'Get enough sleep, stay physically active, take regular breaks from screens and keep challenging yourself with new skills.',
    },
    {
      question: 'Can my ADHD trait levels change over time?',
      answer:
        'Traits are fairly stable, but stress, sleep and life changes can affect focus. Retaking the test later shows how your results evolve.',
    },
    {
      question: 'Is a low score something to be proud of?',
      answer:
        'A low score reflects how you currently manage attention and impulses, not your worth. Every profile comes with its own strengths and room to grow.',
    },
  ],
};

const CONTENT_BY_OUTCOME = new Map<string, OutcomeContent>([
  ['high', HIGH_TRAITS],
  ['low', LOW_TRAITS],
]);

export function getOutcomeContent(outcome: string): OutcomeContent | null {
  return CONTENT_BY_OUTCOME.get(outcome) ?? null;
}
