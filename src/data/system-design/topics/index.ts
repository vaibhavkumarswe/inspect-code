/**
 * System Design Topics - Aggregated from category files
 */

import type { SystemDesignTopic, CategoryInfo, SystemDesignCategory } from '../types';
import { fundamentalsTopics } from './fundamentals';
import { hldTopics } from './hld';
import { lldTopics } from './lld';
import { databaseTopics } from './database';
import { scalabilityTopics } from './scalability';
import { frontendTopics } from './frontend-design';
import { backendTopics } from './backend-design';
import { distributedTopics } from './distributed';

export const categories: CategoryInfo[] = [
  {
    id: 'fundamentals',
    name: 'Fundamentals',
    description: 'Core concepts every engineer should know',
    icon: 'BookOpen',
    color: 'bg-primary/10 text-primary',
  },
  {
    id: 'hld',
    name: 'High Level Design',
    description: 'Architecture and system overview',
    icon: 'Layers',
    color: 'bg-foreground/10 text-foreground',
  },
  {
    id: 'lld',
    name: 'Low Level Design',
    description: 'Classes, interfaces, and detailed design',
    icon: 'Code2',
    color: 'bg-muted text-foreground',
  },
  {
    id: 'database',
    name: 'Database Design',
    description: 'Data modeling, indexing, and storage',
    icon: 'Database',
    color: 'bg-primary/10 text-primary',
  },
  {
    id: 'scalability',
    name: 'Scalability',
    description: 'Scaling systems to handle growth',
    icon: 'TrendingUp',
    color: 'bg-foreground/10 text-foreground',
  },
  {
    id: 'frontend',
    name: 'Frontend System Design',
    description: 'UI architecture and performance',
    icon: 'Monitor',
    color: 'bg-muted text-foreground',
  },
  {
    id: 'backend',
    name: 'Backend System Design',
    description: 'Server architecture and APIs',
    icon: 'Server',
    color: 'bg-primary/10 text-primary',
  },
  {
    id: 'distributed',
    name: 'Distributed Systems',
    description: 'Handling distributed computing challenges',
    icon: 'Network',
    color: 'bg-foreground/10 text-foreground',
  },
];

export const systemDesignTopics: SystemDesignTopic[] = [
  ...fundamentalsTopics,
  ...hldTopics,
  ...lldTopics,
  ...databaseTopics,
  ...scalabilityTopics,
  ...frontendTopics,
  ...backendTopics,
  ...distributedTopics,
];

export const searchTopics = (query: string): SystemDesignTopic[] => {
  const q = query.toLowerCase().trim();
  if (!q) return systemDesignTopics;
  
  return systemDesignTopics.filter(topic =>
    topic.title.toLowerCase().includes(q) ||
    topic.description.toLowerCase().includes(q) ||
    topic.tags.some(tag => tag.toLowerCase().includes(q)) ||
    topic.category.toLowerCase().includes(q)
  );
};

export const getTopicsByCategory = (category: SystemDesignCategory): SystemDesignTopic[] => {
  return systemDesignTopics.filter(topic => topic.category === category);
};

export const getTopicById = (id: string): SystemDesignTopic | undefined => {
  return systemDesignTopics.find(topic => topic.id === id);
};
