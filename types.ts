export interface ThreatData {
  timestamp: string;
  attacks: number;
  blocked: number;
}

export interface SecurityModule {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: 'Defense' | 'Analysis' | 'Encryption';
}

export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  price: string;
  features: string[];
}

export enum Tab {
  DASHBOARD = 'DASHBOARD',
  HOW_IT_WORKS = 'HOW_IT_WORKS',
  SERVICES = 'SERVICES',
  COURSES = 'COURSES',
  FAQ = 'FAQ'
}