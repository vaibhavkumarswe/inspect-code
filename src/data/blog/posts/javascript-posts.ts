import type { BlogPost } from '../types';

export const javascriptPosts: BlogPost[] = [
  {
    id: 'js-closures-deep-dive',
    slug: 'javascript-closures-deep-dive',
    title: 'JavaScript Closures: A Deep Dive with Practical Examples',
    excerpt: 'Master closures in JavaScript with real-world examples, common pitfalls, and advanced patterns for building robust applications.',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
    author: { name: 'Alex Chen', avatar: 'https://i.pravatar.cc/150?u=alex', role: 'Senior Developer' },
    publishedAt: '2024-01-15',
    category: 'javascript',
    tags: ['closures', 'fundamentals', 'scope', 'memory'],
    readingTime: 8,
    featured: true,
    tableOfContents: [
      { id: 'what-are-closures', title: 'What Are Closures?', level: 1 },
      { id: 'lexical-scope', title: 'Understanding Lexical Scope', level: 2 },
      { id: 'practical-examples', title: 'Practical Examples', level: 1 },
      { id: 'common-pitfalls', title: 'Common Pitfalls', level: 1 },
    ],
    content: [
      { type: 'text', content: '# What Are Closures?\n\nA closure is a function that has access to variables from its outer (enclosing) scope, even after the outer function has returned. This powerful feature enables data privacy, function factories, and module patterns.' },
      { type: 'code', content: '', codeBlock: { language: 'javascript', filename: 'closure-example.js', code: `function createCounter() {
  let count = 0; // Private variable
  
  return {
    increment() {
      count++;
      return count;
    },
    decrement() {
      count--;
      return count;
    },
    getCount() {
      return count;
    }
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount());  // 2
// count is not accessible directly!`, highlightLines: [2, 5, 9, 13] }},
      { type: 'callout', content: 'Closures "close over" their lexical environment, capturing variables by reference, not by value.', calloutType: 'tip' },
      { type: 'text', content: '## Understanding Lexical Scope\n\nLexical scope means that a function\'s scope is determined by where it is written in the code, not where it is called.' },
      { type: 'diagram', content: 'flowchart TB\n    A[Global Scope] --> B[Outer Function Scope]\n    B --> C[Inner Function Scope]\n    C --> D[Closure captures B variables]', diagramType: 'flowchart' },
      { type: 'text', content: '## Practical Examples\n\nHere are some real-world use cases for closures:' },
      { type: 'list', content: '', listItems: ['Data privacy and encapsulation', 'Partial application and currying', 'Memoization caching', 'Event handlers with state', 'Module patterns'] },
      { type: 'code', content: '', codeBlock: { language: 'javascript', filename: 'memoization.js', code: `function memoize(fn) {
  const cache = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      console.log('Returning cached result');
      return cache.get(key);
    }
    
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Usage
const expensiveOperation = memoize((n) => {
  console.log('Computing...');
  return n * n;
});

expensiveOperation(5); // Computing... 25
expensiveOperation(5); // Returning cached result 25` }},
      { type: 'callout', content: 'Be careful with closures in loops! Use let instead of var, or create a new scope for each iteration.', calloutType: 'warning' },
    ],
    relatedPosts: ['ts-advanced-types', 'react-hooks-patterns'],
  },
  {
    id: 'js-async-patterns',
    slug: 'mastering-async-javascript',
    title: 'Mastering Async JavaScript: From Callbacks to Async/Await',
    excerpt: 'Learn the evolution of asynchronous JavaScript and master modern async patterns for cleaner, more maintainable code.',
    coverImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800',
    author: { name: 'Alex Chen', avatar: 'https://i.pravatar.cc/150?u=alex', role: 'Senior Developer' },
    publishedAt: '2024-02-01',
    category: 'javascript',
    tags: ['async', 'promises', 'async-await', 'concurrency'],
    readingTime: 12,
    tableOfContents: [
      { id: 'callback-hell', title: 'The Callback Hell Problem', level: 1 },
      { id: 'promises', title: 'Promises to the Rescue', level: 1 },
      { id: 'async-await', title: 'Async/Await Syntax', level: 1 },
      { id: 'error-handling', title: 'Error Handling Patterns', level: 1 },
      { id: 'parallel-execution', title: 'Parallel Execution', level: 1 },
    ],
    content: [
      { type: 'text', content: '# The Callback Hell Problem\n\nBefore Promises, JavaScript relied on callbacks for async operations. This often led to deeply nested, hard-to-read code known as "callback hell" or the "pyramid of doom".' },
      { type: 'code', content: '', codeBlock: { language: 'javascript', filename: 'callback-hell.js', code: `// ❌ Callback Hell
getData(function(a) {
  getMoreData(a, function(b) {
    getMoreData(b, function(c) {
      getMoreData(c, function(d) {
        // Deep nesting continues...
        console.log(d);
      });
    });
  });
});` }},
      { type: 'text', content: '# Promises to the Rescue\n\nPromises provide a cleaner way to handle async operations with chainable `.then()` methods.' },
      { type: 'code', content: '', codeBlock: { language: 'javascript', filename: 'promises.js', code: `// ✅ Promise Chain
getData()
  .then(a => getMoreData(a))
  .then(b => getMoreData(b))
  .then(c => getMoreData(c))
  .then(d => console.log(d))
  .catch(error => console.error(error));

// Creating a Promise
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id) {
        resolve({ id, name: 'John' });
      } else {
        reject(new Error('User not found'));
      }
    }, 1000);
  });
}` }},
      { type: 'text', content: '# Async/Await Syntax\n\nAsync/await makes asynchronous code look and behave like synchronous code, dramatically improving readability.' },
      { type: 'code', content: '', codeBlock: { language: 'javascript', filename: 'async-await.js', code: `// ✅ Async/Await
async function fetchAllData() {
  try {
    const a = await getData();
    const b = await getMoreData(a);
    const c = await getMoreData(b);
    const d = await getMoreData(c);
    return d;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// With parallel execution
async function fetchInParallel() {
  const [users, posts, comments] = await Promise.all([
    fetchUsers(),
    fetchPosts(),
    fetchComments()
  ]);
  
  return { users, posts, comments };
}`, highlightLines: [3, 4, 5, 6, 17, 18, 19, 20] }},
      { type: 'callout', content: 'Always use try/catch with async/await for proper error handling.', calloutType: 'tip' },
    ],
    relatedPosts: ['js-closures-deep-dive', 'nodejs-event-loop'],
  },
  {
    id: 'js-es2024-features',
    slug: 'javascript-es2024-new-features',
    title: 'ES2024: New JavaScript Features You Should Know',
    excerpt: 'Explore the latest additions to JavaScript including Array grouping, Promise.withResolvers, and more exciting features.',
    coverImage: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800',
    author: { name: 'Sarah Kim', avatar: 'https://i.pravatar.cc/150?u=sarah', role: 'Tech Lead' },
    publishedAt: '2024-03-10',
    category: 'javascript',
    tags: ['es2024', 'new-features', 'ecmascript'],
    readingTime: 6,
    tableOfContents: [
      { id: 'array-grouping', title: 'Array Grouping', level: 1 },
      { id: 'promise-resolvers', title: 'Promise.withResolvers', level: 1 },
      { id: 'regexp-v-flag', title: 'RegExp v Flag', level: 1 },
    ],
    content: [
      { type: 'text', content: '# Array Grouping\n\nThe new `Object.groupBy()` and `Map.groupBy()` methods make it easy to group array elements by a key.' },
      { type: 'code', content: '', codeBlock: { language: 'javascript', filename: 'array-grouping.js', code: `const inventory = [
  { name: "asparagus", type: "vegetables", quantity: 5 },
  { name: "bananas", type: "fruit", quantity: 0 },
  { name: "cherries", type: "fruit", quantity: 5 },
  { name: "fish", type: "meat", quantity: 22 }
];

const grouped = Object.groupBy(inventory, ({ type }) => type);

console.log(grouped);
// {
//   vegetables: [{ name: "asparagus", type: "vegetables", quantity: 5 }],
//   fruit: [
//     { name: "bananas", type: "fruit", quantity: 0 },
//     { name: "cherries", type: "fruit", quantity: 5 }
//   ],
//   meat: [{ name: "fish", type: "meat", quantity: 22 }]
// }` }},
      { type: 'text', content: '# Promise.withResolvers\n\nA cleaner way to create promises with external resolve/reject access.' },
      { type: 'code', content: '', codeBlock: { language: 'javascript', filename: 'promise-resolvers.js', code: `// Before
let resolve, reject;
const promise = new Promise((res, rej) => {
  resolve = res;
  reject = rej;
});

// After - ES2024
const { promise, resolve, reject } = Promise.withResolvers();

// Usage example
function createDeferredTask() {
  const { promise, resolve, reject } = Promise.withResolvers();
  
  // Can resolve/reject from anywhere
  setTimeout(() => resolve('Done!'), 1000);
  
  return promise;
}` }},
      { type: 'callout', content: 'Promise.withResolvers is especially useful for integrating promise-based code with callback-based APIs.', calloutType: 'info' },
    ],
    relatedPosts: ['ts-advanced-types', 'js-async-patterns'],
  },
];
