export type Accent = 'purple' | 'indigo' | 'cyan';

export type ProjectCategory = 'Full Stack' | 'AI' | 'Backend' | 'Frontend';

export interface Skill {
  name: string;
  icon: string; // lucide icon name or asset path
}

export interface SkillGroup {
  id: string;
  label: string;
  accent: Accent;
  skills: Skill[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tech: string[];
  categories: ProjectCategory[];
  github?: string;
  demo?: string;
  featured?: boolean;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  current?: boolean;
  tech: string[];
  achievements: string[];
}

export interface CareerEntry {
  id: string;
  company: string;
  role: string;
  current?: boolean;
  points: string[];
  accent: Accent;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date?: string;
  url?: string;
  image?: string;
}

export interface SocialLink {
  id: string;
  label: string;
  href: string;
  icon: string; // lucide icon name
}

export interface TechNode {
  name: string;
  icon: string; // lucide icon name or asset path
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: string; // lucide icon name
}

export interface Counter {
  label: string;
  value: number;
  suffix?: string;
}
