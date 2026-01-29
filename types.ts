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

export enum Tab {
  DASHBOARD = 'DASHBOARD',
  HOW_IT_WORKS = 'HOW_IT_WORKS',
  SERVICES = 'SERVICES',
  FAQ = 'FAQ'
}