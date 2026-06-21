// TODO: fill from LinkedIn profile https://www.linkedin.com/in/sudhir-here/
import type { Certification } from '@/types';

export const certifications: Certification[] = [
  {
    id: 'aws-solutions-architect',
    title: 'AWS Certified Solutions Architect – Associate', // TODO confirm from LinkedIn
    issuer: 'Amazon Web Services',
    date: '2023', // TODO confirm date
    url: 'https://www.credly.com/badges/placeholder', // TODO real badge URL
    image: '/certifications/aws-solutions-architect.svg',
  },
  {
    id: 'nodejs-certification',
    title: 'OpenJS Node.js Application Developer', // TODO confirm from LinkedIn
    issuer: 'OpenJS Foundation',
    date: '2022', // TODO confirm date
    url: 'https://www.credly.com/badges/placeholder', // TODO real badge URL
    image: '/certifications/nodejs-certification.svg',
  },
  {
    id: 'mongodb-developer',
    title: 'MongoDB Associate Developer', // TODO confirm from LinkedIn
    issuer: 'MongoDB, Inc.',
    date: '2021', // TODO confirm date
    url: 'https://learn.mongodb.com/c/placeholder', // TODO real badge URL
    image: '/certifications/mongodb-developer.svg',
  },
];
