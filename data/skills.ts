import type { SkillGroup } from '@/types';

export const skills: SkillGroup[] = [
  {
    id: 'backend',
    label: 'Backend',
    accent: 'purple',
    skills: [
      { name: 'Node.js', icon: 'Server' },
      { name: 'Express', icon: 'Zap' },
      { name: 'TypeScript', icon: 'FileCode' },
      { name: 'REST APIs', icon: 'Globe' },
      { name: 'Redis', icon: 'Database' },
      { name: 'Bull Queue', icon: 'ListTodo' },
      { name: 'Microservices', icon: 'Boxes' },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    accent: 'indigo',
    skills: [
      { name: 'Angular', icon: 'Triangle' },
      { name: 'React', icon: 'Atom' },
      { name: 'Next.js', icon: 'ArrowRight' },
      { name: 'Tailwind', icon: 'Palette' },
    ],
  },
  {
    id: 'database',
    label: 'Database',
    accent: 'cyan',
    skills: [
      { name: 'MongoDB', icon: 'Database' },
      { name: 'MySQL', icon: 'Table' },
      { name: 'Sequelize', icon: 'Layers' },
    ],
  },
  {
    id: 'cloud-devops',
    label: 'Cloud & DevOps',
    accent: 'purple',
    skills: [
      { name: 'Docker', icon: 'Container' },
      { name: 'AWS', icon: 'Cloud' },
      { name: 'PM2', icon: 'Activity' },
      { name: 'Nginx', icon: 'Shield' },
    ],
  },
  {
    id: 'ai',
    label: 'AI',
    accent: 'indigo',
    skills: [
      { name: 'OpenAI', icon: 'BrainCircuit' },
      { name: 'Claude', icon: 'Sparkles' },
      { name: 'Gemini', icon: 'Star' },
      { name: 'MCP', icon: 'Plug' },
      { name: 'LangChain', icon: 'Link' },
      { name: 'Agentic AI', icon: 'Bot' },
      { name: 'AI Workflows', icon: 'Workflow' },
    ],
  },
];
