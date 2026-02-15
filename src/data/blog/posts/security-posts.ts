import type { BlogPost } from '../types';

export const securityPosts: BlogPost[] = [
  {
    id: 'security-web-vulnerabilities',
    slug: 'web-security-vulnerabilities-prevention',
    title: 'Web Security Essentials: Common Vulnerabilities and How to Prevent Them',
    excerpt: 'Learn about XSS, CSRF, injection attacks, and other security vulnerabilities with practical prevention techniques.',
    coverImage: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800',
    author: { name: 'Sandra Lee', avatar: 'https://i.pravatar.cc/150?u=sandra', role: 'Security Engineer' },
    publishedAt: '2024-03-12',
    category: 'security',
    tags: ['security', 'xss', 'csrf', 'vulnerabilities', 'best-practices'],
    readingTime: 12,
    tableOfContents: [
      { id: 'xss', title: 'Cross-Site Scripting (XSS)', level: 1 },
      { id: 'csrf', title: 'CSRF Attacks', level: 1 },
      { id: 'injection', title: 'Injection Attacks', level: 1 },
      { id: 'headers', title: 'Security Headers', level: 1 },
    ],
    content: [
      { type: 'text', content: '# Cross-Site Scripting (XSS)\n\nXSS attacks inject malicious scripts into web pages viewed by other users.' },
      { type: 'code', content: '', codeBlock: { language: 'typescript', filename: 'xss-prevention.tsx', code: `// ❌ Vulnerable - directly inserting HTML
function DangerousComment({ content }: { content: string }) {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}

// ✅ Safe - React escapes by default
function SafeComment({ content }: { content: string }) {
  return <div>{content}</div>;
}

// ✅ If HTML is needed, sanitize first
import DOMPurify from 'dompurify';

function SanitizedHTML({ content }: { content: string }) {
  const sanitized = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p'],
    ALLOWED_ATTR: ['href'],
  });
  
  return <div dangerouslySetInnerHTML={{ __html: sanitized }} />;
}

// ✅ Escape user input in URLs
function UserLink({ username }: { username: string }) {
  const safeUsername = encodeURIComponent(username);
  return <a href={\`/users/\${safeUsername}\`}>{username}</a>;
}`, highlightLines: [3, 8, 15, 16, 17, 18, 25] }},
      { type: 'callout', content: 'React automatically escapes values in JSX, but dangerouslySetInnerHTML bypasses this protection.', calloutType: 'warning' },
      { type: 'text', content: '# CSRF Attacks\n\nCross-Site Request Forgery tricks users into performing unwanted actions.' },
      { type: 'code', content: '', codeBlock: { language: 'typescript', filename: 'csrf-protection.ts', code: `// Server-side: Generate and validate CSRF tokens
import { randomBytes } from 'crypto';

function generateCSRFToken(): string {
  return randomBytes(32).toString('hex');
}

// Middleware to validate CSRF token
function csrfProtection(req: Request, res: Response, next: NextFunction) {
  const token = req.headers['x-csrf-token'] || req.body._csrf;
  const sessionToken = req.session.csrfToken;
  
  if (!token || token !== sessionToken) {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }
  
  next();
}

// Client-side: Include token in requests
const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;

fetch('/api/transfer', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRF-Token': csrfToken || '',
  },
  body: JSON.stringify(data),
  credentials: 'include', // Important for cookies
});` }},
      { type: 'text', content: '# Security Headers\n\nHTTP security headers provide an additional layer of protection.' },
      { type: 'code', content: '', codeBlock: { language: 'typescript', filename: 'security-headers.ts', code: `// Express middleware for security headers
import helmet from 'helmet';

app.use(helmet());

// Or configure manually
app.use((req, res, next) => {
  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'DENY');
  
  // Enable XSS filter
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // Content Security Policy
  res.setHeader('Content-Security-Policy', [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self'",
    "connect-src 'self' https://api.example.com",
  ].join('; '));
  
  // HTTPS only
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  
  next();
});`, highlightLines: [9, 12, 15, 18, 19, 20, 21, 22, 23, 24, 27] }},
      { type: 'callout', content: 'Use the helmet package in Express apps - it sets most security headers automatically.', calloutType: 'tip' },
    ],
    relatedPosts: ['nodejs-event-loop', 'testing-strategy-guide'],
  },
];
