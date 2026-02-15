import type { BlogPost } from '../types';

export const architecturePosts: BlogPost[] = [
  {
    id: 'architecture-scalable-frontend',
    slug: 'building-scalable-frontend-architecture',
    title: 'Building Scalable Frontend Architecture: A Comprehensive Guide',
    excerpt: 'Learn how to structure large-scale React applications with modular architecture, state management, and team scalability.',
    coverImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800',
    author: { name: 'Lisa Thompson', avatar: 'https://i.pravatar.cc/150?u=lisa', role: 'Engineering Director' },
    publishedAt: '2024-01-30',
    category: 'architecture',
    tags: ['architecture', 'scalability', 'design-patterns', 'organization'],
    readingTime: 18,
    featured: true,
    tableOfContents: [
      { id: 'principles', title: 'Core Principles', level: 1 },
      { id: 'folder-structure', title: 'Folder Structure', level: 1 },
      { id: 'feature-modules', title: 'Feature Modules', level: 1 },
      { id: 'state-management', title: 'State Management at Scale', level: 1 },
      { id: 'testing-strategy', title: 'Testing Strategy', level: 1 },
    ],
    content: [
      { type: 'text', content: '# Core Principles\n\nA scalable frontend architecture should be modular, maintainable, and enable teams to work independently. Here are the core principles:' },
      { type: 'list', content: '', listItems: ['Separation of concerns: UI, business logic, data fetching', 'Feature-based organization over type-based', 'Explicit dependencies and boundaries', 'Testability at every layer', 'Progressive complexity: simple defaults, escape hatches for complex cases'] },
      { type: 'text', content: '# Folder Structure\n\nA feature-based folder structure scales better than type-based organization.' },
      { type: 'code', content: '', codeBlock: { language: 'text', filename: 'folder-structure.txt', code: `src/
├── app/                    # App-level setup
│   ├── App.tsx
│   ├── routes.tsx
│   └── providers.tsx
├── features/               # Feature modules
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── store/
│   │   ├── types.ts
│   │   └── index.ts        # Public API
│   ├── dashboard/
│   └── settings/
├── shared/                 # Shared across features
│   ├── components/
│   │   ├── ui/             # Design system
│   │   └── common/         # Business components
│   ├── hooks/
│   ├── utils/
│   └── types/
├── lib/                    # Third-party integrations
│   ├── api/
│   └── analytics/
└── assets/` }},
      { type: 'text', content: '# Feature Modules\n\nEach feature is a self-contained module with clear boundaries and a public API.' },
      { type: 'code', content: '', codeBlock: { language: 'typescript', filename: 'features/auth/index.ts', code: `// Public API - only export what other features need
export { LoginForm, SignupForm, AuthProvider } from './components';
export { useAuth, useCurrentUser } from './hooks';
export { authService } from './services';
export type { User, AuthState } from './types';

// Internal implementation stays private
// features/auth/components/LoginForm.tsx
// features/auth/hooks/useAuthState.ts
// features/auth/services/authApi.ts` }},
      { type: 'diagram', content: 'flowchart LR\n    A[Feature A] --> S[Shared]\n    B[Feature B] --> S\n    C[Feature C] --> S\n    A -.-> B\n    style S fill:#f9f,stroke:#333', diagramType: 'flowchart' },
      { type: 'callout', content: 'Features should never import directly from another feature\'s internal folders. Use the public API (index.ts) only.', calloutType: 'warning' },
      { type: 'text', content: '# State Management at Scale\n\nChoose the right state management approach for each type of state.' },
      { type: 'code', content: '', codeBlock: { language: 'typescript', filename: 'state-layers.tsx', code: `// 1. Server State - React Query / TanStack Query
const { data: users } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
});

// 2. Global UI State - Zustand / Redux
const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
}));

// 3. Local Component State - useState/useReducer
function Form() {
  const [values, setValues] = useState(initialValues);
  return <form>...</form>;
}

// 4. URL State - React Router
function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get('filter');
}

// 5. Form State - React Hook Form
function ContactForm() {
  const { register, handleSubmit } = useForm<FormData>();
}`, highlightLines: [2, 8, 16, 22, 28] }},
      { type: 'callout', content: 'Match state management tools to state types. Don\'t use Redux for everything!', calloutType: 'tip' },
    ],
    relatedPosts: ['react-performance', 'testing-strategy-guide'],
  },
  {
    id: 'architecture-microservices',
    slug: 'microservices-vs-monolith',
    title: 'Microservices vs Monolith: Making the Right Choice',
    excerpt: 'A practical guide to choosing between microservices and monolithic architecture based on your team and project needs.',
    coverImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
    author: { name: 'Lisa Thompson', avatar: 'https://i.pravatar.cc/150?u=lisa', role: 'Engineering Director' },
    publishedAt: '2024-02-25',
    category: 'architecture',
    tags: ['microservices', 'monolith', 'system-design'],
    readingTime: 10,
    tableOfContents: [
      { id: 'comparison', title: 'Quick Comparison', level: 1 },
      { id: 'when-monolith', title: 'When to Choose Monolith', level: 1 },
      { id: 'when-microservices', title: 'When to Choose Microservices', level: 1 },
    ],
    content: [
      { type: 'text', content: '# Quick Comparison\n\nBoth architectures have their place. The key is understanding the trade-offs.' },
      { type: 'diagram', content: 'flowchart LR\n    subgraph Monolith\n        A[Single Codebase] --> B[Single Deploy]\n        B --> C[Single Database]\n    end\n    subgraph Microservices\n        D[Service A] --> G[Gateway]\n        E[Service B] --> G\n        F[Service C] --> G\n        D --> H[(DB A)]\n        E --> I[(DB B)]\n        F --> J[(DB C)]\n    end', diagramType: 'flowchart' },
      { type: 'text', content: '# When to Choose Monolith\n\nStart with a monolith when:' },
      { type: 'list', content: '', listItems: ['Small team (< 10 developers)', 'New product with unclear domain boundaries', 'Need to move fast and iterate quickly', 'Limited DevOps expertise', 'Strong consistency requirements'] },
      { type: 'callout', content: 'A well-structured monolith is better than a poorly implemented microservices architecture.', calloutType: 'tip' },
    ],
    relatedPosts: ['nodejs-scaling', 'devops-docker-guide'],
  },
];
