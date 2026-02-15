/**
 * Central Types File
 * All shared types and interfaces for the application
 */

import type { LucideIcon } from 'lucide-react';

// ==========================================
// NAVIGATION TYPES
// ==========================================

export interface NavItem {
  name: string;
  path: string;
  description?: string;
}

// ==========================================
// SOCIAL LINKS TYPES
// ==========================================

export interface SocialLink {
  icon: LucideIcon;
  href: string;
  label: string;
  username?: string;
}

// ==========================================
// SKILLS TYPES
// ==========================================

export interface Skill {
  name: string;
  level: number;
  category?: SkillCategory;
}

export type SkillCategory = 
  | 'frontend'
  | 'backend'
  | 'tools'
  | 'database'
  | 'testing'
  | 'devops'
  | 'design';

export interface TechnologyTag {
  name: string;
  category?: SkillCategory;
}

// ==========================================
// TESTIMONIALS TYPES
// ==========================================

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company?: string;
  avatar?: string;
  content: string;
  rating?: number;
  image?: string;
}

// ==========================================
// PROCESS STEPS TYPES
// ==========================================

export interface ProcessStep {
  id: number;
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

// ==========================================
// PROJECT TYPES
// ==========================================

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image?: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  category: ProjectCategory;
}

export type ProjectCategory = 
  | 'web'
  | 'mobile'
  | 'fullstack'
  | 'open-source'
  | 'design';

// ==========================================
// CODING CHALLENGES TYPES
// ==========================================

export type LanguageMode = 'javascript' | 'typescript' | 'react';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  language: LanguageMode;
  difficulty: ChallengeDifficulty;
  category: ChallengeCategory;
  initialCode: string;
  initialCss?: string;
  solution?: string;
  hints?: string[];
  tags?: string[];
}

export type ChallengeDifficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export type ChallengeCategory = 
  | 'fundamentals'
  | 'dom-manipulation'
  | 'state-management'
  | 'forms'
  | 'api'
  | 'animation'
  | 'components'
  | 'hooks'
  | 'algorithms';

// ==========================================
// BENTO GRID TYPES
// ==========================================

export interface BentoItem {
  id: string;
  title: string;
  description?: string;
  colSpan?: number;
  rowSpan?: number;
  icon?: LucideIcon;
  gradient?: string;
  link?: string;
}

// ==========================================
// COMMAND PALETTE TYPES
// ==========================================

export interface CommandItem {
  id: string;
  label: string;
  shortcut?: string;
  icon?: LucideIcon;
  action: () => void;
  category?: string;
}

// ==========================================
// TERMINAL TYPES
// ==========================================

export interface TerminalCommand {
  command: string;
  description: string;
  action: (args?: string[]) => string | string[];
}

// ==========================================
// GITHUB STATS TYPES
// ==========================================

export interface GitHubContribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface GitHubStats {
  totalContributions: number;
  currentStreak: number;
  longestStreak: number;
  repositories: number;
  followers: number;
  stars: number;
}

// ==========================================
// CONTACT FORM TYPES
// ==========================================

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// ==========================================
// PERSONAL INFO TYPES
// ==========================================

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  email: string;
  location: string;
  availability: string;
  resumeUrl?: string;
}

// ==========================================
// FAQ TYPES
// ==========================================

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category?: string;
}

// ==========================================
// ANIMATION CONFIG TYPES
// ==========================================

export interface FloatingElementConfig {
  content: string;
  className: string;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  delay: number;
  duration: number;
}
