import type { CareerEntry } from '@/types';

export const career: CareerEntry[] = [
  {
    id: 'flavorcloud',
    company: 'FlavorCloud',
    role: 'Software Engineer II',
    current: true,
    accent: 'purple',
    points: [
      'Architected and maintained scalable microservices for global shipping and logistics platform.',
      'Designed and built RESTful APIs and third-party integrations with carriers and customs providers.',
      'Led backend architecture decisions for high-throughput data pipelines and event-driven workflows.',
      'Built AI-powered automation workflows to streamline operations and reduce manual processing.',
      'Improved system reliability and performance through caching strategies and infrastructure optimizations.',
    ],
  },
  {
    id: 'patientbond',
    company: 'PatientBond',
    role: 'Software Engineer',
    accent: 'indigo',
    points: [
      'Developed and maintained healthcare patient engagement platforms serving thousands of patients.',
      'Integrated Twilio for automated SMS and voice communication workflows.',
      'Built and deployed IBM Watson Chatbot integrations for patient self-service experiences.',
      'Delivered full-stack features using Angular and Node.js across multiple product lines.',
    ],
  },
  {
    id: 'upfront-healthcare',
    company: 'Upfront Healthcare',
    role: 'Software Engineer',
    accent: 'cyan',
    points: [
      'Built full-stack web applications supporting patient outreach and engagement workflows.',
      'Designed and developed RESTful APIs consumed by web and mobile clients.',
      'Contributed to healthcare systems integrations including EHR data pipelines.',
      'Collaborated cross-functionally to deliver new product features on tight release cycles.',
    ],
  },
];
