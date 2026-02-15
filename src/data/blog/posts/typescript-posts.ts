import type { BlogPost } from '../types';

export const typescriptPosts: BlogPost[] = [
  {
    id: 'ts-advanced-types',
    slug: 'typescript-advanced-type-patterns',
    title: 'Advanced TypeScript: Type Patterns Every Developer Should Know',
    excerpt: 'Level up your TypeScript skills with advanced type patterns including conditional types, mapped types, and template literal types.',
    coverImage: 'https://images.unsplash.com/photo-1619410283995-43d9134e7656?w=800',
    author: { name: 'Marcus Johnson', avatar: 'https://i.pravatar.cc/150?u=marcus', role: 'Principal Engineer' },
    publishedAt: '2024-01-20',
    category: 'typescript',
    tags: ['types', 'generics', 'utility-types', 'advanced'],
    readingTime: 15,
    featured: true,
    tableOfContents: [
      { id: 'conditional-types', title: 'Conditional Types', level: 1 },
      { id: 'mapped-types', title: 'Mapped Types', level: 1 },
      { id: 'template-literal', title: 'Template Literal Types', level: 1 },
      { id: 'infer-keyword', title: 'The Infer Keyword', level: 1 },
    ],
    content: [
      { type: 'text', content: '# Conditional Types\n\nConditional types allow you to create types that depend on other types, similar to ternary operators in JavaScript.' },
      { type: 'code', content: '', codeBlock: { language: 'typescript', filename: 'conditional-types.ts', code: `// Basic conditional type
type IsString<T> = T extends string ? true : false;

type A = IsString<string>;  // true
type B = IsString<number>;  // false

// Practical example: Extract return type
type ExtractReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function fetchUser() {
  return { id: 1, name: 'John' };
}

type UserType = ExtractReturnType<typeof fetchUser>;
// { id: number; name: string; }

// Distributive conditional types
type ToArray<T> = T extends any ? T[] : never;
type StrOrNumArray = ToArray<string | number>;
// string[] | number[]`, highlightLines: [2, 9, 19] }},
      { type: 'text', content: '# Mapped Types\n\nMapped types allow you to create new types by transforming properties of existing types.' },
      { type: 'code', content: '', codeBlock: { language: 'typescript', filename: 'mapped-types.ts', code: `interface User {
  id: number;
  name: string;
  email: string;
}

// Make all properties optional
type PartialUser = {
  [K in keyof User]?: User[K];
};

// Make all properties readonly
type ReadonlyUser = {
  readonly [K in keyof User]: User[K];
};

// Create a type with only specific keys
type UserPreview = Pick<User, 'id' | 'name'>;

// Create getters for all properties
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};

type UserGetters = Getters<User>;
// {
//   getId: () => number;
//   getName: () => string;
//   getEmail: () => string;
// }` }},
      { type: 'diagram', content: 'flowchart LR\n    A[Original Type] --> B[Mapped Type]\n    B --> C[Transformed Properties]\n    C --> D[New Type]', diagramType: 'flowchart' },
      { type: 'text', content: '# Template Literal Types\n\nTemplate literal types build on string literal types to create powerful string manipulation at the type level.' },
      { type: 'code', content: '', codeBlock: { language: 'typescript', filename: 'template-literal.ts', code: `// Event handler types
type EventName = 'click' | 'focus' | 'blur';
type EventHandler = \`on\${Capitalize<EventName>}\`;
// 'onClick' | 'onFocus' | 'onBlur'

// API endpoint types
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type Endpoint = '/users' | '/posts' | '/comments';
type ApiRoute = \`\${HttpMethod} \${Endpoint}\`;
// 'GET /users' | 'GET /posts' | ... (12 combinations)

// CSS unit types
type CSSValue = \`\${number}px\` | \`\${number}rem\` | \`\${number}%\`;

function setWidth(value: CSSValue) {
  // ...
}

setWidth('100px');  // ✅
setWidth('2rem');   // ✅
setWidth('50%');    // ✅
setWidth('100');    // ❌ Error` }},
      { type: 'callout', content: 'Template literal types are incredibly powerful for creating type-safe APIs and DSLs.', calloutType: 'tip' },
    ],
    relatedPosts: ['ts-generics-guide', 'react-typescript-patterns'],
  },
  {
    id: 'ts-generics-guide',
    slug: 'typescript-generics-complete-guide',
    title: 'The Complete Guide to TypeScript Generics',
    excerpt: 'Master TypeScript generics from basics to advanced patterns. Learn to write flexible, reusable, type-safe code.',
    coverImage: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800',
    author: { name: 'Marcus Johnson', avatar: 'https://i.pravatar.cc/150?u=marcus', role: 'Principal Engineer' },
    publishedAt: '2024-02-15',
    category: 'typescript',
    tags: ['generics', 'type-safety', 'reusability'],
    readingTime: 10,
    tableOfContents: [
      { id: 'intro', title: 'Introduction to Generics', level: 1 },
      { id: 'constraints', title: 'Generic Constraints', level: 1 },
      { id: 'multiple', title: 'Multiple Type Parameters', level: 1 },
      { id: 'defaults', title: 'Default Type Parameters', level: 1 },
    ],
    content: [
      { type: 'text', content: '# Introduction to Generics\n\nGenerics allow you to create reusable components that work with multiple types while maintaining type safety.' },
      { type: 'code', content: '', codeBlock: { language: 'typescript', filename: 'generics-intro.ts', code: `// Without generics - loses type information
function identity(arg: any): any {
  return arg;
}

// With generics - preserves type
function identityGeneric<T>(arg: T): T {
  return arg;
}

const num = identityGeneric(42);        // type: number
const str = identityGeneric('hello');   // type: string

// Generic interfaces
interface Box<T> {
  value: T;
  getValue(): T;
}

const numberBox: Box<number> = {
  value: 42,
  getValue() { return this.value; }
};` }},
      { type: 'text', content: '# Generic Constraints\n\nConstraints allow you to limit what types can be used with a generic.' },
      { type: 'code', content: '', codeBlock: { language: 'typescript', filename: 'constraints.ts', code: `interface Lengthwise {
  length: number;
}

// T must have a length property
function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength('hello');        // ✅ strings have length
logLength([1, 2, 3]);      // ✅ arrays have length
logLength({ length: 10 }); // ✅ objects with length
logLength(123);            // ❌ Error: number has no length

// keyof constraint
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: 1, name: 'John' };
getProperty(user, 'name');   // ✅ 'John'
getProperty(user, 'age');    // ❌ Error: 'age' not in user` }},
      { type: 'callout', content: 'Use extends to constrain generic types and ensure they have required properties or methods.', calloutType: 'info' },
    ],
    relatedPosts: ['ts-advanced-types', 'react-typescript-patterns'],
  },
];
