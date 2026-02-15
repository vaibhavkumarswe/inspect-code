/**
 * Process Steps Data
 * Work process/methodology steps
 */

import { MessageSquare, Lightbulb, Code2, Rocket, CheckCircle, Settings } from 'lucide-react';
import type { ProcessStep } from './types';

// ==========================================
// PROCESS STEPS
// ==========================================

export const processSteps: ProcessStep[] = [
  {
    id: 1,
    icon: MessageSquare,
    title: 'Discovery',
    description: 'Understanding your vision, goals, and requirements through collaborative discussions.',
    color: 'from-primary to-primary/50'
  },
  {
    id: 2,
    icon: Lightbulb,
    title: 'Strategy',
    description: 'Crafting the perfect technical approach and architecture for your project.',
    color: 'from-accent to-accent/50'
  },
  {
    id: 3,
    icon: Code2,
    title: 'Development',
    description: 'Building with clean, scalable code and continuous communication.',
    color: 'from-pink-500 to-pink-500/50'
  },
  {
    id: 4,
    icon: Rocket,
    title: 'Launch',
    description: 'Deploying your polished product and providing ongoing support.',
    color: 'from-orange-500 to-orange-500/50'
  }
];

// ==========================================
// EXTENDED PROCESS (for detailed view)
// ==========================================

export const extendedProcessSteps: ProcessStep[] = [
  ...processSteps,
  {
    id: 5,
    icon: CheckCircle,
    title: 'Testing & QA',
    description: 'Rigorous testing to ensure quality, performance, and accessibility.',
    color: 'from-green-500 to-green-500/50'
  },
  {
    id: 6,
    icon: Settings,
    title: 'Maintenance',
    description: 'Ongoing support, updates, and optimization for long-term success.',
    color: 'from-blue-500 to-blue-500/50'
  }
];

// ==========================================
// HELPER FUNCTIONS
// ==========================================

export const getProcessStepById = (id: number): ProcessStep | undefined => {
  return processSteps.find(step => step.id === id);
};

export const getTotalSteps = (): number => {
  return processSteps.length;
};
