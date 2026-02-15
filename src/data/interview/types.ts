export type InterviewDifficulty = 'easy' | 'medium' | 'hard';
export type InterviewCategory = 'react-hooks' | 'dom-manipulation' | 'state-management' | 'css-layout' | 'async-patterns' | 'component-design' | 'performance';

export interface InterviewChallenge {
  id: string;
  title: string;
  description: string;
  category: InterviewCategory;
  difficulty: InterviewDifficulty;
  timeLimit: number; // minutes
  initialCode: string;
  initialCss?: string;
  requirements: string[];
  hints: string[];
  tags: string[];
}

export const categoryLabels: Record<InterviewCategory, string> = {
  'react-hooks': 'React Hooks',
  'dom-manipulation': 'DOM Manipulation',
  'state-management': 'State Management',
  'css-layout': 'CSS & Layout',
  'async-patterns': 'Async Patterns',
  'component-design': 'Component Design',
  'performance': 'Performance',
};

export const difficultyConfig: Record<InterviewDifficulty, { label: string; color: string; minutes: number }> = {
  easy: { label: 'Easy', color: 'hsl(142 76% 36%)', minutes: 15 },
  medium: { label: 'Medium', color: 'hsl(38 92% 50%)', minutes: 30 },
  hard: { label: 'Hard', color: 'hsl(0 72% 51%)', minutes: 45 },
};
