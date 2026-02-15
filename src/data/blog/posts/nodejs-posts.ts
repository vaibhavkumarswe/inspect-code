import type { BlogPost } from '../types';

export const nodejsPosts: BlogPost[] = [
  {
    id: 'nodejs-event-loop',
    slug: 'nodejs-event-loop-explained',
    title: 'Node.js Event Loop Explained: From Theory to Practice',
    excerpt: 'Understand the Node.js event loop, its phases, and how to write non-blocking code effectively.',
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
    author: { name: 'James Wilson', avatar: 'https://i.pravatar.cc/150?u=james', role: 'Backend Lead' },
    publishedAt: '2024-02-05',
    category: 'nodejs',
    tags: ['event-loop', 'async', 'performance', 'internals'],
    readingTime: 11,
    featured: true,
    tableOfContents: [
      { id: 'overview', title: 'Event Loop Overview', level: 1 },
      { id: 'phases', title: 'Event Loop Phases', level: 1 },
      { id: 'microtasks', title: 'Microtasks vs Macrotasks', level: 1 },
      { id: 'best-practices', title: 'Best Practices', level: 1 },
    ],
    content: [
      { type: 'text', content: '# Event Loop Overview\n\nThe event loop is the heart of Node.js. It enables non-blocking I/O operations by offloading operations to the system kernel whenever possible.' },
      { type: 'diagram', content: 'flowchart TB\n    A[Incoming Request] --> B{Event Loop}\n    B --> C[Timers]\n    C --> D[Pending Callbacks]\n    D --> E[Idle/Prepare]\n    E --> F[Poll]\n    F --> G[Check]\n    G --> H[Close Callbacks]\n    H --> B', diagramType: 'flowchart' },
      { type: 'text', content: '# Event Loop Phases\n\nThe event loop has six main phases, each with its own FIFO queue of callbacks to execute.' },
      { type: 'code', content: '', codeBlock: { language: 'javascript', filename: 'event-loop-phases.js', code: `// Phase demonstration
console.log('1. Synchronous - Script start');

setTimeout(() => {
  console.log('4. Timers phase');
}, 0);

setImmediate(() => {
  console.log('5. Check phase');
});

Promise.resolve().then(() => {
  console.log('3. Microtask - Promise');
});

process.nextTick(() => {
  console.log('2. Microtask - nextTick (highest priority)');
});

console.log('1. Synchronous - Script end');

// Output order:
// 1. Synchronous - Script start
// 1. Synchronous - Script end
// 2. Microtask - nextTick
// 3. Microtask - Promise
// 4. Timers phase
// 5. Check phase`, highlightLines: [4, 8, 12, 16] }},
      { type: 'text', content: '# Microtasks vs Macrotasks\n\nUnderstanding the difference is crucial for predicting execution order.' },
      { type: 'list', content: '', listItems: ['Microtasks: process.nextTick, Promise callbacks, queueMicrotask', 'Macrotasks: setTimeout, setInterval, setImmediate, I/O callbacks', 'Microtasks are processed between each phase of the event loop', 'process.nextTick has the highest priority among microtasks'] },
      { type: 'code', content: '', codeBlock: { language: 'javascript', filename: 'async-patterns.js', code: `// ❌ Blocking the event loop
function blockingOperation() {
  const end = Date.now() + 5000;
  while (Date.now() < end) {} // Blocks for 5 seconds!
}

// ✅ Non-blocking with setImmediate
async function processLargeArray(items) {
  const results = [];
  
  for (let i = 0; i < items.length; i++) {
    results.push(await processItem(items[i]));
    
    // Yield to event loop every 100 items
    if (i % 100 === 0) {
      await new Promise(resolve => setImmediate(resolve));
    }
  }
  
  return results;
}

// ✅ Using worker threads for CPU-intensive tasks
const { Worker } = require('worker_threads');

function runInWorker(data) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./heavy-task.js', { workerData: data });
    worker.on('message', resolve);
    worker.on('error', reject);
  });
}` }},
      { type: 'callout', content: 'Never block the event loop with synchronous operations. Use worker threads for CPU-intensive tasks.', calloutType: 'danger' },
    ],
    relatedPosts: ['js-async-patterns', 'nodejs-scaling'],
  },
  {
    id: 'nodejs-scaling',
    slug: 'scaling-nodejs-applications',
    title: 'Scaling Node.js Applications: From Single Server to Kubernetes',
    excerpt: 'Learn strategies for scaling Node.js apps including clustering, load balancing, and container orchestration.',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
    author: { name: 'James Wilson', avatar: 'https://i.pravatar.cc/150?u=james', role: 'Backend Lead' },
    publishedAt: '2024-03-15',
    category: 'nodejs',
    tags: ['scaling', 'kubernetes', 'clustering', 'devops'],
    readingTime: 13,
    tableOfContents: [
      { id: 'vertical', title: 'Vertical Scaling', level: 1 },
      { id: 'horizontal', title: 'Horizontal Scaling', level: 1 },
      { id: 'clustering', title: 'Node.js Clustering', level: 1 },
      { id: 'kubernetes', title: 'Kubernetes Deployment', level: 1 },
    ],
    content: [
      { type: 'text', content: '# Vertical Scaling\n\nVertical scaling means adding more power to your existing server. In Node.js, this includes optimizing memory usage and utilizing all CPU cores.' },
      { type: 'code', content: '', codeBlock: { language: 'javascript', filename: 'cluster.js', code: `const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isPrimary) {
  console.log(\`Primary \${process.pid} is running\`);
  
  // Fork workers for each CPU
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
  cluster.on('exit', (worker, code, signal) => {
    console.log(\`Worker \${worker.process.pid} died\`);
    // Restart the worker
    cluster.fork();
  });
} else {
  // Workers share the TCP connection
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end(\`Hello from worker \${process.pid}\`);
  }).listen(8000);
  
  console.log(\`Worker \${process.pid} started\`);
}`, highlightLines: [5, 9, 10, 11, 15, 16] }},
      { type: 'text', content: '# Horizontal Scaling\n\nHorizontal scaling involves adding more instances of your application behind a load balancer.' },
      { type: 'diagram', content: 'flowchart TB\n    A[Load Balancer] --> B[Node.js Instance 1]\n    A --> C[Node.js Instance 2]\n    A --> D[Node.js Instance 3]\n    B --> E[(Redis Cache)]\n    C --> E\n    D --> E\n    E --> F[(PostgreSQL)]', diagramType: 'flowchart' },
      { type: 'callout', content: 'Use Redis for session storage when scaling horizontally to ensure session persistence across instances.', calloutType: 'tip' },
    ],
    relatedPosts: ['nodejs-event-loop', 'devops-docker-guide'],
  },
];
