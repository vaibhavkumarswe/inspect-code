/**
 * Coding Challenges - Main Index
 * 
 * This is the main entry point for all coding challenges.
 * Challenges are organized by language for easy maintenance.
 * 
 * To add a new challenge:
 * 1. Add it to the appropriate language file (javascript.ts, typescript.ts, react.ts)
 * 2. The challenge will automatically be included in the main export
 * 
 * Challenge Structure:
 * - id: Unique identifier (use prefix like 'js-', 'ts-', 'react-')
 * - title: Display name
 * - description: Brief description
 * - language: 'javascript' | 'typescript' | 'react'
 * - difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert'
 * - category: Challenge category
 * - initialCode: Starting code
 * - initialCss: Optional starting CSS
 * - hints: Optional array of hints
 * - tags: Optional array of tags
 */

import { javascriptChallenges } from './javascript';
import { typescriptChallenges } from './typescript';
import { reactChallenges } from './react';
import type { Challenge, LanguageMode, ChallengeDifficulty, ChallengeCategory } from '../types';

// ==========================================
// COMBINED CHALLENGES
// ==========================================

export const challenges: Challenge[] = [
  ...javascriptChallenges,
  ...typescriptChallenges,
  ...reactChallenges,
];

// ==========================================
// LANGUAGE DISPLAY INFO
// ==========================================

export const languageLabels: Record<LanguageMode, string> = {
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  react: 'React',
};

export const languageColors: Record<LanguageMode, string> = {
  javascript: '#f7df1e',
  typescript: '#3178c6',
  react: '#61dafb',
};

export const languageDescriptions: Record<LanguageMode, string> = {
  javascript: 'Core JavaScript fundamentals and DOM manipulation',
  typescript: 'Type-safe JavaScript with interfaces and generics',
  react: 'Component-based UI with hooks and state management',
};

// ==========================================
// DIFFICULTY INFO
// ==========================================

export const difficultyLabels: Record<ChallengeDifficulty, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  expert: 'Expert',
};

export const difficultyColors: Record<ChallengeDifficulty, string> = {
  beginner: '#22c55e',
  intermediate: '#f59e0b',
  advanced: '#ef4444',
  expert: '#8b5cf6',
};

// ==========================================
// CATEGORY INFO
// ==========================================

export const categoryLabels: Record<ChallengeCategory, string> = {
  fundamentals: 'Fundamentals',
  'dom-manipulation': 'DOM Manipulation',
  'state-management': 'State Management',
  forms: 'Forms & Validation',
  api: 'API Integration',
  animation: 'Animation',
  components: 'Components',
  hooks: 'React Hooks',
  algorithms: 'Algorithms',
};

// ==========================================
// HELPER FUNCTIONS
// ==========================================

export const getChallengeById = (id: string): Challenge | undefined => {
  return challenges.find(c => c.id === id);
};

export const getChallengesByLanguage = (language: LanguageMode): Challenge[] => {
  return challenges.filter(c => c.language === language);
};

export const getChallengesByDifficulty = (difficulty: ChallengeDifficulty): Challenge[] => {
  return challenges.filter(c => c.difficulty === difficulty);
};

export const getChallengesByCategory = (category: ChallengeCategory): Challenge[] => {
  return challenges.filter(c => c.category === category);
};

export const getChallengeCounts = (): Record<LanguageMode, number> => {
  return {
    javascript: getChallengesByLanguage('javascript').length,
    typescript: getChallengesByLanguage('typescript').length,
    react: getChallengesByLanguage('react').length,
  };
};

export const getTotalChallenges = (): number => {
  return challenges.length;
};

export const searchChallenges = (query: string): Challenge[] => {
  const lowerQuery = query.toLowerCase();
  return challenges.filter(c => 
    c.title.toLowerCase().includes(lowerQuery) ||
    c.description.toLowerCase().includes(lowerQuery) ||
    c.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};

// ==========================================
// RE-EXPORTS
// ==========================================

export { javascriptChallenges } from './javascript';
export { typescriptChallenges } from './typescript';
export { reactChallenges } from './react';
export type { Challenge, LanguageMode, ChallengeDifficulty, ChallengeCategory } from '../types';
