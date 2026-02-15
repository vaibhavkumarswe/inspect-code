import type { BlogPost } from '../types';

export const reactPosts: BlogPost[] = [
  {
    id: 'react-hooks-patterns',
    slug: 'react-hooks-advanced-patterns',
    title: 'Advanced React Hooks Patterns for Production Apps',
    excerpt: 'Learn advanced React hooks patterns including custom hooks, composition patterns, and performance optimization techniques.',
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
    author: { name: 'Emily Chen', avatar: 'https://i.pravatar.cc/150?u=emily', role: 'React Architect' },
    publishedAt: '2024-01-25',
    category: 'react',
    tags: ['hooks', 'patterns', 'custom-hooks', 'performance'],
    readingTime: 14,
    featured: true,
    tableOfContents: [
      { id: 'custom-hooks', title: 'Building Custom Hooks', level: 1 },
      { id: 'composition', title: 'Hook Composition Patterns', level: 1 },
      { id: 'performance', title: 'Performance Optimization', level: 1 },
      { id: 'testing', title: 'Testing Custom Hooks', level: 1 },
    ],
    content: [
      { type: 'text', content: '# Building Custom Hooks\n\nCustom hooks allow you to extract and reuse stateful logic across components. They follow the naming convention `use*` and can call other hooks.' },
      { type: 'code', content: '', codeBlock: { language: 'typescript', filename: 'useLocalStorage.ts', code: `import { useState, useEffect } from 'react';

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  // Get stored value or use initial
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Update localStorage when value changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

// Usage
function Settings() {
  const [theme, setTheme] = useLocalStorage('theme', 'dark');
  
  return (
    <button onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}>
      Toggle Theme: {theme}
    </button>
  );
}`, highlightLines: [3, 4, 5, 8, 19] }},
      { type: 'text', content: '# Hook Composition Patterns\n\nCompose multiple hooks together to create powerful, reusable abstractions.' },
      { type: 'code', content: '', codeBlock: { language: 'typescript', filename: 'useFetch.ts', code: `import { useState, useEffect, useCallback } from 'react';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

function useFetch<T>(url: string) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const refetch = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({ data: null, loading: false, error: error as Error });
    }
  }, [url]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { ...state, refetch };
}

// Composed hook
function useUser(userId: string) {
  const { data: user, loading, error } = useFetch<User>(
    \`/api/users/\${userId}\`
  );
  
  const isAdmin = user?.role === 'admin';
  
  return { user, loading, error, isAdmin };
}` }},
      { type: 'diagram', content: 'flowchart TB\n    A[useUser] --> B[useFetch]\n    B --> C[useState]\n    B --> D[useEffect]\n    B --> E[useCallback]', diagramType: 'flowchart' },
      { type: 'text', content: '# Performance Optimization\n\nOptimize hooks for better performance using memoization and proper dependency management.' },
      { type: 'code', content: '', codeBlock: { language: 'typescript', filename: 'useDebounce.ts', code: `import { useState, useEffect, useRef, useMemo, useCallback } from 'react';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// Optimized search with debounce
function SearchComponent() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  
  // Only fetch when debounced value changes
  const { data } = useFetch<SearchResults>(
    \`/api/search?q=\${debouncedQuery}\`
  );
  
  return (
    <input
      value={query}
      onChange={e => setQuery(e.target.value)}
      placeholder="Search..."
    />
  );
}` }},
      { type: 'callout', content: 'Always check your effect dependencies with eslint-plugin-react-hooks to avoid stale closures.', calloutType: 'warning' },
    ],
    relatedPosts: ['react-typescript-patterns', 'react-performance'],
  },
  {
    id: 'react-typescript-patterns',
    slug: 'react-typescript-patterns-2024',
    title: 'React + TypeScript Patterns for 2024',
    excerpt: 'Modern patterns for building type-safe React applications with TypeScript, including component patterns, context, and more.',
    coverImage: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800',
    author: { name: 'Emily Chen', avatar: 'https://i.pravatar.cc/150?u=emily', role: 'React Architect' },
    publishedAt: '2024-02-20',
    category: 'react',
    tags: ['typescript', 'patterns', 'best-practices'],
    readingTime: 12,
    tableOfContents: [
      { id: 'component-types', title: 'Component Type Patterns', level: 1 },
      { id: 'props-patterns', title: 'Props Patterns', level: 1 },
      { id: 'context-types', title: 'Typed Context', level: 1 },
    ],
    content: [
      { type: 'text', content: '# Component Type Patterns\n\nLearn the best ways to type React components in TypeScript.' },
      { type: 'code', content: '', codeBlock: { language: 'typescript', filename: 'component-patterns.tsx', code: `import { ReactNode, ComponentProps, forwardRef } from 'react';

// ✅ Prefer interface for props
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  onClick?: () => void;
}

// ✅ Component with typed props
function Button({ variant = 'primary', size = 'md', children, onClick }: ButtonProps) {
  return (
    <button className={\`btn btn-\${variant} btn-\${size}\`} onClick={onClick}>
      {children}
    </button>
  );
}

// ✅ Extending native element props
interface InputProps extends ComponentProps<'input'> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...props }, ref) => (
    <div>
      <label>{label}</label>
      <input ref={ref} {...props} />
      {error && <span className="error">{error}</span>}
    </div>
  )
);`, highlightLines: [4, 5, 6, 21, 22, 23] }},
      { type: 'text', content: '# Props Patterns\n\nAdvanced patterns for handling complex prop requirements.' },
      { type: 'code', content: '', codeBlock: { language: 'typescript', filename: 'props-patterns.tsx', code: `// Discriminated unions for conditional props
type ModalProps = 
  | { type: 'alert'; message: string; onConfirm: () => void }
  | { type: 'confirm'; message: string; onConfirm: () => void; onCancel: () => void }
  | { type: 'prompt'; message: string; onSubmit: (value: string) => void };

function Modal(props: ModalProps) {
  switch (props.type) {
    case 'alert':
      return <AlertModal {...props} />;
    case 'confirm':
      return <ConfirmModal {...props} />;
    case 'prompt':
      return <PromptModal {...props} />;
  }
}

// Polymorphic component
type PolymorphicProps<E extends React.ElementType> = {
  as?: E;
} & React.ComponentPropsWithoutRef<E>;

function Box<E extends React.ElementType = 'div'>({
  as,
  children,
  ...props
}: PolymorphicProps<E> & { children: ReactNode }) {
  const Component = as || 'div';
  return <Component {...props}>{children}</Component>;
}

// Usage
<Box as="section" className="container">Content</Box>
<Box as="article">Article content</Box>` }},
      { type: 'callout', content: 'Polymorphic components are powerful but complex. Use them sparingly for design system primitives.', calloutType: 'tip' },
    ],
    relatedPosts: ['ts-advanced-types', 'react-hooks-patterns'],
  },
  {
    id: 'react-performance',
    slug: 'react-performance-optimization-guide',
    title: 'React Performance Optimization: The Complete Guide',
    excerpt: 'Master React performance with practical techniques for memoization, virtualization, code splitting, and profiling.',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    author: { name: 'David Park', avatar: 'https://i.pravatar.cc/150?u=david', role: 'Performance Engineer' },
    publishedAt: '2024-03-01',
    category: 'react',
    tags: ['performance', 'optimization', 'memoization', 'profiling'],
    readingTime: 16,
    tableOfContents: [
      { id: 'identifying', title: 'Identifying Performance Issues', level: 1 },
      { id: 'memoization', title: 'Memoization Strategies', level: 1 },
      { id: 'virtualization', title: 'List Virtualization', level: 1 },
      { id: 'code-splitting', title: 'Code Splitting', level: 1 },
    ],
    content: [
      { type: 'text', content: '# Identifying Performance Issues\n\nBefore optimizing, you need to identify where performance problems exist using React DevTools Profiler.' },
      { type: 'image', content: '', imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800', imageAlt: 'Performance monitoring dashboard' },
      { type: 'list', content: '', listItems: ['Use React DevTools Profiler to record interactions', 'Look for components that re-render unnecessarily', 'Check for expensive calculations in render', 'Monitor bundle size with webpack-bundle-analyzer', 'Use Lighthouse for overall performance metrics'] },
      { type: 'text', content: '# Memoization Strategies\n\nUse React.memo, useMemo, and useCallback strategically to prevent unnecessary re-renders.' },
      { type: 'code', content: '', codeBlock: { language: 'typescript', filename: 'memoization.tsx', code: `import { memo, useMemo, useCallback } from 'react';

// Memoize expensive component
const ExpensiveList = memo(function ExpensiveList({ 
  items, 
  onItemClick 
}: ExpensiveListProps) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id} onClick={() => onItemClick(item.id)}>
          {item.name}
        </li>
      ))}
    </ul>
  );
});

// Parent component with stable references
function Parent() {
  const [items, setItems] = useState<Item[]>([]);
  const [filter, setFilter] = useState('');
  
  // ✅ Memoize filtered results
  const filteredItems = useMemo(
    () => items.filter(item => item.name.includes(filter)),
    [items, filter]
  );
  
  // ✅ Stable callback reference
  const handleItemClick = useCallback((id: string) => {
    console.log('Clicked:', id);
  }, []);
  
  return (
    <ExpensiveList 
      items={filteredItems} 
      onItemClick={handleItemClick} 
    />
  );
}`, highlightLines: [4, 25, 26, 27, 30, 31, 32] }},
      { type: 'callout', content: 'Don\'t memoize everything! Profile first, then optimize the specific bottlenecks.', calloutType: 'warning' },
    ],
    relatedPosts: ['react-hooks-patterns', 'architecture-scalable-frontend'],
  },
];
