import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Copy, Check, Code2, Search, Filter, 
  FileCode, Terminal, Palette, Zap
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Snippet {
  id: string;
  title: string;
  description: string;
  language: string;
  category: string;
  code: string;
  icon: typeof Code2;
}

const snippets: Snippet[] = [
  {
    id: '1',
    title: 'useDebounce Hook',
    description: 'Custom React hook for debouncing values',
    language: 'typescript',
    category: 'React',
    icon: Zap,
    code: `import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}`,
  },
  {
    id: '2',
    title: 'useLocalStorage Hook',
    description: 'Persist state to localStorage with TypeScript',
    language: 'typescript',
    category: 'React',
    icon: Code2,
    code: `import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    window.localStorage.setItem(key, JSON.stringify(valueToStore));
  };

  return [storedValue, setValue] as const;
}`,
  },
  {
    id: '3',
    title: 'Glass Morphism Card',
    description: 'Beautiful frosted glass effect with CSS',
    language: 'css',
    category: 'CSS',
    icon: Palette,
    code: `.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 
    0 4px 30px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}`,
  },
  {
    id: '4',
    title: 'Fetch with Retry',
    description: 'Fetch wrapper with automatic retry logic',
    language: 'typescript',
    category: 'Utility',
    icon: Terminal,
    code: `async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  retries = 3,
  delay = 1000
): Promise<Response> {
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
    return response;
  } catch (error) {
    if (retries === 0) throw error;
    await new Promise(r => setTimeout(r, delay));
    return fetchWithRetry(url, options, retries - 1, delay * 2);
  }
}`,
  },
  {
    id: '5',
    title: 'Tailwind Gradient Text',
    description: 'Create gradient text with Tailwind CSS',
    language: 'jsx',
    category: 'CSS',
    icon: Palette,
    code: `<span className="
  bg-gradient-to-r 
  from-purple-500 
  via-pink-500 
  to-red-500 
  bg-clip-text 
  text-transparent
">
  Gradient Text
</span>`,
  },
  {
    id: '6',
    title: 'Array Shuffle',
    description: 'Fisher-Yates shuffle algorithm',
    language: 'typescript',
    category: 'Utility',
    icon: Zap,
    code: `function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}`,
  },
  {
    id: '7',
    title: 'useClickOutside Hook',
    description: 'Detect clicks outside a component',
    language: 'typescript',
    category: 'React',
    icon: Code2,
    code: `import { useEffect, useRef } from 'react';

export function useClickOutside<T extends HTMLElement>(
  callback: () => void
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [callback]);

  return ref;
}`,
  },
  {
    id: '8',
    title: 'Format Date Relative',
    description: 'Human-readable relative time formatting',
    language: 'typescript',
    category: 'Utility',
    icon: Terminal,
    code: `function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count >= 1) {
      return \`\${count} \${interval.label}\${count > 1 ? 's' : ''} ago\`;
    }
  }
  
  return 'just now';
}`,
  },
];

const categories = ['All', ...new Set(snippets.map(s => s.category))];

const Snippets = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredSnippets = snippets.filter(snippet => {
    const matchesSearch = 
      snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || snippet.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const copyToClipboard = async (id: string, code: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getLanguageColor = (language: string) => {
    switch (language) {
      case 'typescript': return 'text-blue-500 bg-blue-500/10';
      case 'javascript': return 'text-yellow-500 bg-yellow-500/10';
      case 'css': return 'text-pink-500 bg-pink-500/10';
      case 'jsx': return 'text-cyan-500 bg-cyan-500/10';
      default: return 'text-primary bg-primary/10';
    }
  };

  return (
    <div className="min-h-screen py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <FileCode className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Code Library</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Code <span className="gradient-text">Snippets</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of useful code snippets that I use frequently. 
            Feel free to copy and use them in your projects.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search snippets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary border-border"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="h-4 w-4 text-muted-foreground" />
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Snippets Grid */}
        <motion.div
          layout
          className="grid lg:grid-cols-2 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredSnippets.map((snippet, index) => (
              <motion.div
                key={snippet.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                className="bento-card overflow-hidden group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <snippet.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold">{snippet.title}</h3>
                      <p className="text-sm text-muted-foreground">{snippet.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getLanguageColor(snippet.language)}`}>
                      {snippet.language}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(snippet.id, snippet.code)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {copiedId === snippet.id ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                
                <pre className="p-4 rounded-lg bg-secondary/50 overflow-x-auto text-sm">
                  <code className="font-mono text-foreground/90">
                    {snippet.code}
                  </code>
                </pre>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredSnippets.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Code2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No snippets found matching your criteria.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Snippets;
