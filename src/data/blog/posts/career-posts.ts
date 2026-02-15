import type { BlogPost } from '../types';

export const careerPosts: BlogPost[] = [
  {
    id: 'career-senior-developer',
    slug: 'path-to-senior-developer',
    title: 'The Path to Senior Developer: Skills Beyond Coding',
    excerpt: 'Technical skills get you hired, but soft skills get you promoted. Learn what it takes to advance to senior developer.',
    coverImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800',
    author: { name: 'Robert Kim', avatar: 'https://i.pravatar.cc/150?u=robert', role: 'VP of Engineering' },
    publishedAt: '2024-03-18',
    category: 'career',
    tags: ['career', 'growth', 'leadership', 'soft-skills'],
    readingTime: 8,
    tableOfContents: [
      { id: 'beyond-code', title: 'Beyond Writing Code', level: 1 },
      { id: 'communication', title: 'Communication Skills', level: 1 },
      { id: 'mentorship', title: 'Mentorship', level: 1 },
      { id: 'technical-leadership', title: 'Technical Leadership', level: 1 },
    ],
    content: [
      { type: 'text', content: '# Beyond Writing Code\n\nSenior developers do more than write code. They multiply the effectiveness of their entire team.' },
      { type: 'list', content: '', listItems: ['Write code that others can understand and maintain', 'Make technical decisions that balance short-term and long-term needs', 'Unblock teammates and share knowledge', 'Communicate effectively with non-technical stakeholders', 'Mentor junior developers', 'Identify and mitigate technical risks early'] },
      { type: 'text', content: '# Communication Skills\n\nThe ability to explain complex technical concepts to different audiences is crucial.' },
      { type: 'callout', content: 'A senior developer explains a database migration to executives differently than to the DBA team.', calloutType: 'tip' },
      { type: 'text', content: '## Writing Skills\n\nGood documentation, clear PR descriptions, and thoughtful RFCs set senior developers apart:' },
      { type: 'code', content: '', codeBlock: { language: 'markdown', filename: 'good-pr-description.md', code: `## What
Implements user avatar upload with image resizing

## Why
Users requested profile customization (see #1234)
Current solution uses external service ($500/mo)

## How
- Added multer for file uploads
- Integrated sharp for image processing
- Stores in S3 with CloudFront CDN

## Testing
- [x] Unit tests for image processing
- [x] Integration tests for upload flow
- [x] Manual testing on staging

## Rollback Plan
Feature flagged - disable \`AVATAR_UPLOAD\` env var

## Screenshots
[Before/After images]` }},
      { type: 'text', content: '# Mentorship\n\nHelping others grow is one of the most impactful things a senior developer can do.' },
      { type: 'list', content: '', listItems: ['Code reviews as teaching opportunities, not gatekeeping', 'Pair programming on complex problems', 'Creating documentation and internal talks', 'Being approachable and patient', 'Celebrating others\' wins'] },
      { type: 'text', content: '# Technical Leadership\n\nLeading without authority requires influence, not control.' },
      { type: 'diagram', content: 'flowchart LR\n    A[Identify Problem] --> B[Research Solutions]\n    B --> C[Write RFC/Proposal]\n    C --> D[Gather Feedback]\n    D --> E[Build Consensus]\n    E --> F[Implement]', diagramType: 'flowchart' },
      { type: 'callout', content: 'The best technical decisions are made collaboratively. Your job is to facilitate the discussion, not dictate the answer.', calloutType: 'info' },
    ],
    relatedPosts: ['architecture-scalable-frontend', 'testing-strategy-guide'],
  },
];
