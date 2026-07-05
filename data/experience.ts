import type { Experience } from '@/types';

export const experience: Experience[] = [
  {
    id: 'flavorcloud',
    company: 'FlavorCloud',
    role: 'Software Engineer II',
    duration: '2023 - Present',
    current: true,
    tech: ['Node.js', 'TypeScript', 'Redis', 'Bull Queue', 'Microservices', 'AWS', 'Docker', 'MongoDB', 'REST APIs'],
    achievements: [
      'Architected event-driven microservices processing thousands of shipment requests daily with < 200ms p99 latency.',
      'Reduced carrier API integration time by 60% through a unified adapter pattern with typed contracts.',
      'Implemented AI-powered workflow automations cutting manual operations overhead by 40%.',
      'Introduced Redis-based caching layer that improved API response times by 3x.',
      'Led backend architecture reviews and code quality initiatives across the engineering team.',
    ],
  },
  {
    id: 'patientbond',
    company: 'PatientBond',
    role: 'Software Engineer',
    duration: '2021 - 2023',
    tech: ['Angular', 'Node.js', 'TypeScript', 'Twilio', 'IBM Watson', 'MySQL', 'REST APIs'],
    achievements: [
      'Delivered patient communication features via Twilio SMS/voice reaching 100 k+ patients monthly.',
      'Integrated IBM Watson Chatbot reducing call-center volume by 25% through self-service patient flows.',
      'Rebuilt legacy Angular modules with a modern component architecture improving load time by 35%.',
      'Developed a configurable outreach rules engine enabling no-code campaign management by ops teams.',
    ],
  }
];
