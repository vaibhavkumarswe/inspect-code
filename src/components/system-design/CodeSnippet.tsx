import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import type { CodeExample } from '@/data/system-design/types';

interface CodeSnippetProps {
  example: CodeExample;
}

export const CodeSnippet = ({ example }: CodeSnippetProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(example.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">{example.title}</span>
          <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">
            {example.language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          aria-label="Copy code"
        >
          {copied ? <Check className="w-4 h-4 text-foreground" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      {example.description && (
        <div className="px-4 py-2 text-xs text-muted-foreground bg-muted/30 border-b border-border">
          {example.description}
        </div>
      )}
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed bg-card">
        <code>{example.code}</code>
      </pre>
    </div>
  );
};
