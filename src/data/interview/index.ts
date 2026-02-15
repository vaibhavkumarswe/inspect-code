export * from './types';
export { interviewChallenges } from './challenges';

import { interviewChallenges } from './challenges';
import type { InterviewChallenge, InterviewCategory, InterviewDifficulty } from './types';

export const getInterviewById = (id: string): InterviewChallenge | undefined =>
  interviewChallenges.find(c => c.id === id);

export const getInterviewsByCategory = (cat: InterviewCategory): InterviewChallenge[] =>
  interviewChallenges.filter(c => c.category === cat);

export const getInterviewsByDifficulty = (diff: InterviewDifficulty): InterviewChallenge[] =>
  interviewChallenges.filter(c => c.difficulty === diff);

export const searchInterviews = (query: string): InterviewChallenge[] => {
  const q = query.toLowerCase();
  return interviewChallenges.filter(c =>
    c.title.toLowerCase().includes(q) ||
    c.description.toLowerCase().includes(q) ||
    c.tags.some(t => t.toLowerCase().includes(q))
  );
};
