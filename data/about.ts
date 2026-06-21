import type { Counter } from '@/types';

export const aboutData = {
  summary:
    'Software Engineer II with 5+ years of experience building scalable applications, APIs, microservices and AI-powered workflows.',
  techChips: [
    'Node.js',
    'TypeScript',
    'Angular',
    'React',
    'Next.js',
    'MongoDB',
    'MySQL',
    'Redis',
    'Docker',
    'AWS',
    'AI Systems',
  ],
  counters: [
    { label: 'Years Experience', value: 5, suffix: '+' },
    { label: 'Projects Delivered', value: 20, suffix: '+' },
    { label: 'APIs Built', value: 50, suffix: '+' },
    { label: 'Companies', value: 3 },
  ] satisfies Counter[],
};
