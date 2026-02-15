import type { BlogPost } from '../types';

export const cssPosts: BlogPost[] = [
  {
    id: 'css-modern-layouts',
    slug: 'modern-css-layouts-guide',
    title: 'Modern CSS Layouts: Grid, Flexbox, and Container Queries',
    excerpt: 'Master modern CSS layout techniques with practical examples for building responsive, flexible designs.',
    coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    author: { name: 'Anna Martinez', avatar: 'https://i.pravatar.cc/150?u=anna', role: 'UI/UX Developer' },
    publishedAt: '2024-02-28',
    category: 'css',
    tags: ['css-grid', 'flexbox', 'responsive', 'layouts'],
    readingTime: 13,
    tableOfContents: [
      { id: 'grid-basics', title: 'CSS Grid Fundamentals', level: 1 },
      { id: 'flexbox', title: 'Flexbox Patterns', level: 1 },
      { id: 'container-queries', title: 'Container Queries', level: 1 },
      { id: 'combining', title: 'Combining Techniques', level: 1 },
    ],
    content: [
      { type: 'text', content: '# CSS Grid Fundamentals\n\nCSS Grid is the most powerful layout system in CSS, perfect for two-dimensional layouts.' },
      { type: 'code', content: '', codeBlock: { language: 'css', filename: 'grid-layouts.css', code: `/* Auto-fit responsive grid */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

/* Named grid areas */
.dashboard {
  display: grid;
  grid-template-columns: 250px 1fr 300px;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  min-height: 100vh;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }

/* Subgrid for alignment */
.card {
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 3;
}`, highlightLines: [4, 13, 14, 15, 16, 28] }},
      { type: 'text', content: '# Container Queries\n\nContainer queries allow components to adapt based on their container\'s size, not the viewport.' },
      { type: 'code', content: '', codeBlock: { language: 'css', filename: 'container-queries.css', code: `/* Define a container */
.card-wrapper {
  container-type: inline-size;
  container-name: card;
}

/* Style based on container width */
@container card (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 1rem;
  }
  
  .card-image {
    aspect-ratio: 1;
  }
}

@container card (min-width: 600px) {
  .card {
    grid-template-columns: 300px 1fr;
  }
  
  .card-title {
    font-size: 1.5rem;
  }
}` }},
      { type: 'callout', content: 'Container queries are supported in all modern browsers as of 2023. They\'re the future of responsive component design.', calloutType: 'tip' },
      { type: 'image', content: '', imageUrl: 'https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=800', imageAlt: 'CSS layout visualization' },
    ],
    relatedPosts: ['css-animations', 'react-performance'],
  },
  {
    id: 'css-animations',
    slug: 'css-animations-performance-guide',
    title: 'High-Performance CSS Animations and Transitions',
    excerpt: 'Create smooth, performant animations using CSS with techniques for 60fps animations and accessibility.',
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800',
    author: { name: 'Anna Martinez', avatar: 'https://i.pravatar.cc/150?u=anna', role: 'UI/UX Developer' },
    publishedAt: '2024-03-20',
    category: 'css',
    tags: ['animations', 'performance', 'transitions', 'ux'],
    readingTime: 9,
    tableOfContents: [
      { id: 'performant-props', title: 'Performant Properties', level: 1 },
      { id: 'keyframes', title: 'Keyframe Animations', level: 1 },
      { id: 'accessibility', title: 'Accessibility Considerations', level: 1 },
    ],
    content: [
      { type: 'text', content: '# Performant Properties\n\nNot all CSS properties are created equal for animations. Stick to transform and opacity for 60fps animations.' },
      { type: 'list', content: '', listItems: ['✅ transform: GPU-accelerated, no layout/paint', '✅ opacity: GPU-accelerated, no layout/paint', '⚠️ filter: GPU-accelerated but can be expensive', '❌ width/height: triggers layout', '❌ top/left/right/bottom: triggers layout', '❌ margin/padding: triggers layout'] },
      { type: 'code', content: '', codeBlock: { language: 'css', filename: 'performant-animations.css', code: `/* ❌ Bad - triggers layout */
.card-bad:hover {
  width: 320px;
  left: 10px;
}

/* ✅ Good - uses transform */
.card-good {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  will-change: transform;
}

.card-good:hover {
  transform: scale(1.05) translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

/* Staggered entrance animations */
.card {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.5s ease forwards;
}

.card:nth-child(1) { animation-delay: 0.1s; }
.card:nth-child(2) { animation-delay: 0.2s; }
.card:nth-child(3) { animation-delay: 0.3s; }

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`, highlightLines: [9, 10, 13, 14] }},
      { type: 'text', content: '# Accessibility Considerations\n\nRespect user preferences for reduced motion.' },
      { type: 'code', content: '', codeBlock: { language: 'css', filename: 'a11y-animations.css', code: `/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Alternative: provide subtle alternatives */
@media (prefers-reduced-motion: reduce) {
  .card {
    /* Instead of sliding, use instant appearance with opacity */
    animation: none;
    opacity: 1;
    transform: none;
    transition: opacity 0.2s ease;
  }
}` }},
      { type: 'callout', content: 'Always provide prefers-reduced-motion alternatives. Some users experience motion sickness from animations.', calloutType: 'warning' },
    ],
    relatedPosts: ['css-modern-layouts', 'react-performance'],
  },
];
