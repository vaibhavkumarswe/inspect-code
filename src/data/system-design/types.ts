/**
 * System Design Types
 */

export type SystemDesignCategory = 
  | 'fundamentals'
  | 'hld'
  | 'lld'
  | 'database'
  | 'scalability'
  | 'frontend'
  | 'backend'
  | 'distributed';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface DiagramNode {
  id: string;
  label: string;
  type?: 'default' | 'primary' | 'secondary' | 'accent' | 'warning';
  description?: string;
}

export interface DiagramEdge {
  from: string;
  to: string;
  label?: string;
  style?: 'solid' | 'dashed';
}

export interface DiagramData {
  type: 'flow' | 'architecture' | 'comparison' | 'layers';
  title?: string;
  nodes: DiagramNode[];
  edges?: DiagramEdge[];
}

export interface CodeExample {
  title: string;
  language: string;
  code: string;
  description?: string;
}

export interface SystemDesignTopic {
  id: string;
  title: string;
  description: string;
  category: SystemDesignCategory;
  difficulty: DifficultyLevel;
  tags: string[];
  icon?: string;
  content?: string;
  keyPoints?: string[];
  useCases?: string[];
  relatedTopics?: string[];
  diagram?: DiagramData;
  codeExamples?: CodeExample[];
  interviewQuestions?: string[];
  articleUrl?: string;
}

export interface CategoryInfo {
  id: SystemDesignCategory;
  name: string;
  description: string;
  icon: string;
  color: string;
}
