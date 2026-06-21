// TODO: replace placeholder projects with real ones
import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'ai-workflow-engine',
    title: 'AI Workflow Engine',
    description:
      'An agentic AI orchestration platform that chains LLM calls, tool use, and human-in-the-loop steps into repeatable automated workflows.',
    image: '/projects/ai-workflow-engine.svg',
    tech: ['Node.js', 'TypeScript', 'OpenAI', 'LangChain', 'Redis', 'Bull Queue', 'Docker'],
    categories: ['AI', 'Backend'],
    github: 'https://github.com/sudhir-here/ai-workflow-engine', // TODO real URL
    demo: 'https://ai-workflow-engine.demo', // TODO real URL
    featured: true,
  },
  {
    id: 'shipping-microservices',
    title: 'Global Shipping Microservices',
    description:
      'Event-driven microservices platform for international shipping logistics, integrating with multiple carriers and customs providers via a unified adapter layer.',
    image: '/projects/shipping-microservices.svg',
    tech: ['Node.js', 'TypeScript', 'Microservices', 'Redis', 'MongoDB', 'AWS', 'Docker'],
    categories: ['Backend', 'Full Stack'],
    github: 'https://github.com/sudhir-here/shipping-microservices', // TODO real URL
    demo: undefined,
    featured: true,
  },
  {
    id: 'patient-engagement-platform',
    title: 'Patient Engagement Platform',
    description:
      'Healthcare patient outreach platform featuring SMS/voice automation via Twilio, IBM Watson chatbot integration, and configurable campaign rules engine.',
    image: '/projects/patient-engagement-platform.svg',
    tech: ['Angular', 'Node.js', 'TypeScript', 'Twilio', 'IBM Watson', 'MySQL'],
    categories: ['Full Stack'],
    github: 'https://github.com/sudhir-here/patient-engagement', // TODO real URL
    demo: undefined,
  },
  {
    id: 'ehr-api-gateway',
    title: 'EHR API Gateway',
    description:
      'Secure API gateway that normalizes data from multiple Electronic Health Record (EHR) systems into a unified REST interface consumed by patient-facing apps.',
    image: '/projects/ehr-api-gateway.svg',
    tech: ['Node.js', 'TypeScript', 'REST APIs', 'MySQL', 'AWS', 'Nginx'],
    categories: ['Backend'],
    github: 'https://github.com/sudhir-here/ehr-api-gateway', // TODO real URL
    demo: undefined,
  },
  {
    id: 'react-dashboard',
    title: 'Analytics Dashboard',
    description:
      'Interactive analytics dashboard built with React and Next.js, featuring real-time data visualizations, role-based access control, and dark-mode-first design.',
    image: '/projects/react-dashboard.svg',
    tech: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'MongoDB'],
    categories: ['Frontend', 'Full Stack'],
    github: 'https://github.com/sudhir-here/analytics-dashboard', // TODO real URL
    demo: 'https://analytics-dashboard.demo', // TODO real URL
  },
  {
    id: 'mcp-ai-assistant',
    title: 'MCP AI Assistant',
    description:
      'A context-aware AI assistant leveraging the Model Context Protocol (MCP) to dynamically fetch developer tools, docs, and project data during conversations.',
    image: '/projects/mcp-ai-assistant.svg',
    tech: ['TypeScript', 'Claude', 'MCP', 'Node.js', 'Next.js'],
    categories: ['AI', 'Full Stack'],
    github: 'https://github.com/sudhir-here/mcp-ai-assistant', // TODO real URL
    demo: 'https://mcp-ai-assistant.demo', // TODO real URL
  },
];
