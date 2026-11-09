export interface ProjectCaseStudy {
  subtitle: string;
  objective: string;
  architectureDiagram?: string;
  problem: string;
  approach: string;
  architecture: string;
  challenges: string;
  outcome: string;
  flows: Array<{
    title: string;
    steps: Array<{
      stepNumber: number;
      name: string;
      description: string;
    }>;
  }>;
  implementedFeatures: string[];
}

export interface ProjectItem {
  id: string;
  slug: string;
  name: string;
  title: string;
  categories: string[];
  liveUrl?: string;
  githubUrl?: string;
  statusNote?: string;
  stack: string[];
  description: string;
  highlights: string[];
  caseStudy?: ProjectCaseStudy;
  featured?: boolean;
  accentHue: number; // for procedural visual identity
}

export interface FocusArea {
  id: number;
  label: string;
  shortLabel: string;
  description: string;
  keyProjects: string[];
}

export interface SkillCategory {
  name: string;
  skills: Array<{
    name: string;
    isBasic?: boolean;
    areaIds: number[];
  }>;
}

export interface TimelineItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  isFeatured?: boolean;
  areaIds: number[];
  bullets?: string[];
  tag?: string;
}

export interface EducationItem {
  degree: string;
  period: string;
  institution: string;
  score: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  organization: string;
  category: 'programming' | 'ai_ds_cyber' | 'professional';
  code?: string;
  verificationUrl?: string;
}

export interface PublicationItem {
  title: string;
  venue: string;
  year: number;
  authors: string[];
  summary: string;
  highlights: string[];
  paperLink?: string;
}
