import type { Experience } from '@/types';

export const experience: Experience[] = [
  {
    id: 'flavorcloud',
    company: 'FlavorCloud',
    role: 'Software Engineer II',
    duration: '2022 – Present', // TODO confirm dates
    current: true,
    tech: ['Node.js', 'TypeScript', 'Redis', 'Bull Queue', 'Microservices', 'AWS', 'Docker', 'MongoDB', 'REST APIs'],
    achievements: [
      'Architected event-driven microservices processing thousands of shipment requests daily with < 200ms p99 latency.',
      'Reduced carrier API integration time by 60% through a unified adapter pattern with typed contracts.',
      'Implemented AI-powered workflow automations cutting manual operations overhead by 40%.',
      'Introduced Redis-based caching layer that improved API response times by 3×.',
      'Led backend architecture reviews and code quality initiatives across the engineering team.',
    ],
  },
  {
    id: 'patientbond',
    company: 'PatientBond',
    role: 'Software Engineer',
    duration: '2020 – 2022', // TODO confirm dates
    tech: ['Angular', 'Node.js', 'TypeScript', 'Twilio', 'IBM Watson', 'MySQL', 'REST APIs'],
    achievements: [
      'Delivered patient communication features via Twilio SMS/voice reaching 100 k+ patients monthly.',
      'Integrated IBM Watson Chatbot reducing call-center volume by 25% through self-service patient flows.',
      'Rebuilt legacy Angular modules with a modern component architecture improving load time by 35%.',
      'Developed a configurable outreach rules engine enabling no-code campaign management by ops teams.',
    ],
  },
  {
    id: 'upfront-healthcare',
    company: 'Upfront Healthcare',
    role: 'Software Engineer',
    duration: '2019 – 2020', // TODO confirm dates
    tech: ['Node.js', 'React', 'MySQL', 'REST APIs', 'AWS'],
    achievements: [
      'Contributed full-stack features across patient-facing web applications and admin dashboards.',
      'Designed RESTful API endpoints integrating with EHR systems for real-time patient data sync.',
      'Improved automated test coverage from 30% to 70% on critical API routes.',
      'Worked closely with product and design teams to ship new features within two-week sprint cycles.',
    ],
  },
];
