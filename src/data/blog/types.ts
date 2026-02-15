/**
 * Blog Types
 * All types related to blog posts and content
 */

export type BlogCategory = 
  | 'javascript'
  | 'typescript'
  | 'react'
  | 'nodejs'
  | 'css'
  | 'devops'
  | 'architecture'
  | 'performance'
  | 'testing'
  | 'security'
  | 'ai-ml'
  | 'career';

export type BlogTag = string;

export interface CodeBlock {
  language: string;
  code: string;
  filename?: string;
  highlightLines?: number[];
}

export interface BlogSection {
  type: 'text' | 'code' | 'image' | 'diagram' | 'callout' | 'list';
  content: string;
  codeBlock?: CodeBlock;
  imageUrl?: string;
  imageAlt?: string;
  calloutType?: 'info' | 'warning' | 'tip' | 'danger';
  listItems?: string[];
  diagramType?: 'flowchart' | 'sequence' | 'class' | 'er';
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: BlogSection[];
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  publishedAt: string;
  updatedAt?: string;
  category: BlogCategory;
  tags: BlogTag[];
  coverImage: string;
  readingTime: number;
  featured?: boolean;
  series?: {
    name: string;
    part: number;
    total: number;
  };
  tableOfContents: {
    id: string;
    title: string;
    level: number;
  }[];
  relatedPosts?: string[];
}

export interface BlogFilter {
  category?: BlogCategory;
  tag?: BlogTag;
  search?: string;
}

export const categoryLabels: Record<BlogCategory, string> = {
  'javascript': 'JavaScript',
  'typescript': 'TypeScript',
  'react': 'React',
  'nodejs': 'Node.js',
  'css': 'CSS',
  'devops': 'DevOps',
  'architecture': 'Architecture',
  'performance': 'Performance',
  'testing': 'Testing',
  'security': 'Security',
  'ai-ml': 'AI & ML',
  'career': 'Career',
};

export const categoryColors: Record<BlogCategory, string> = {
  'javascript': 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400',
  'typescript': 'bg-blue-500/20 text-blue-600 dark:text-blue-400',
  'react': 'bg-cyan-500/20 text-cyan-600 dark:text-cyan-400',
  'nodejs': 'bg-green-500/20 text-green-600 dark:text-green-400',
  'css': 'bg-pink-500/20 text-pink-600 dark:text-pink-400',
  'devops': 'bg-orange-500/20 text-orange-600 dark:text-orange-400',
  'architecture': 'bg-purple-500/20 text-purple-600 dark:text-purple-400',
  'performance': 'bg-red-500/20 text-red-600 dark:text-red-400',
  'testing': 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400',
  'security': 'bg-rose-500/20 text-rose-600 dark:text-rose-400',
  'ai-ml': 'bg-violet-500/20 text-violet-600 dark:text-violet-400',
  'career': 'bg-amber-500/20 text-amber-600 dark:text-amber-400',
};
