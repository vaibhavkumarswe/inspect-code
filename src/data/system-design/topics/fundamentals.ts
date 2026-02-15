import type { SystemDesignTopic } from '../types';

export const fundamentalsTopics: SystemDesignTopic[] = [
  {
    id: 'cap-theorem',
    title: 'CAP Theorem',
    description: 'Understanding Consistency, Availability, and Partition Tolerance trade-offs in distributed systems.',
    category: 'fundamentals',
    difficulty: 'intermediate',
    tags: ['distributed', 'trade-offs', 'theory'],
    keyPoints: [
      'Consistency: All nodes see the same data at the same time',
      'Availability: Every request receives a response',
      'Partition Tolerance: System continues despite network failures',
      'You can only guarantee 2 out of 3 properties',
    ],
    useCases: ['Database selection', 'Distributed system design'],
    diagram: {
      type: 'comparison',
      title: 'CAP Theorem Trade-offs',
      nodes: [
        { id: 'c', label: 'Consistency', type: 'primary', description: 'All nodes see same data' },
        { id: 'a', label: 'Availability', type: 'secondary', description: 'Every request gets a response' },
        { id: 'p', label: 'Partition Tolerance', type: 'accent', description: 'System works despite network splits' },
        { id: 'cp', label: 'CP Systems', type: 'default', description: 'MongoDB, HBase, Redis' },
        { id: 'ap', label: 'AP Systems', type: 'default', description: 'Cassandra, DynamoDB, CouchDB' },
        { id: 'ca', label: 'CA Systems', type: 'default', description: 'Traditional RDBMS (single node)' },
      ],
      edges: [
        { from: 'c', to: 'cp', label: 'choose C+P' },
        { from: 'p', to: 'cp' },
        { from: 'a', to: 'ap', label: 'choose A+P' },
        { from: 'p', to: 'ap' },
        { from: 'c', to: 'ca', label: 'choose C+A' },
        { from: 'a', to: 'ca' },
      ],
    },
    interviewQuestions: [
      'Explain the CAP theorem and its implications.',
      'Can a system guarantee all three properties? Why or why not?',
      'Give examples of CP, AP, and CA systems.',
    ],
  },
  {
    id: 'acid-properties',
    title: 'ACID Properties',
    description: 'Atomicity, Consistency, Isolation, and Durability - the pillars of database transactions.',
    category: 'fundamentals',
    difficulty: 'beginner',
    tags: ['database', 'transactions', 'reliability'],
    articleUrl: 'https://www.geeksforgeeks.org/acid-properties-in-dbms/',
    keyPoints: [
      'Atomicity: All or nothing transactions',
      'Consistency: Valid state transitions only',
      'Isolation: Concurrent transactions don\'t interfere',
      'Durability: Committed data persists',
    ],
    interviewQuestions: [
      'What are ACID properties and why are they important?',
      'How does isolation level affect concurrency?',
      'Compare ACID with BASE properties.',
    ],
  },
  {
    id: 'base-properties',
    title: 'BASE Properties',
    description: 'Basically Available, Soft state, Eventually consistent - alternative to ACID for distributed systems.',
    category: 'fundamentals',
    difficulty: 'intermediate',
    tags: ['distributed', 'nosql', 'consistency'],
    articleUrl: 'https://www.geeksforgeeks.org/acid-model-vs-base-model-for-database/',
    keyPoints: [
      'Basically Available: System guarantees availability',
      'Soft state: State may change over time without input',
      'Eventually consistent: System will converge to consistent state',
      'Favors availability over consistency',
    ],
    interviewQuestions: [
      'When would you choose BASE over ACID?',
      'What does eventual consistency mean in practice?',
    ],
  },
  {
    id: 'latency-numbers',
    title: 'Latency Numbers Every Dev Should Know',
    description: 'Critical latency benchmarks from L1 cache to cross-continent network calls.',
    category: 'fundamentals',
    difficulty: 'beginner',
    tags: ['performance', 'optimization', 'benchmarks'],
    articleUrl: 'https://gist.github.com/jboner/2841832',
    keyPoints: [
      'L1 cache reference: ~0.5 ns',
      'Main memory reference: ~100 ns',
      'SSD random read: ~150 μs',
      'Round trip within same datacenter: ~500 μs',
      'Disk seek: ~10 ms',
      'Cross-continent round trip: ~150 ms',
    ],
    interviewQuestions: [
      'Why is it important to know latency numbers?',
      'How do these numbers influence system design decisions?',
    ],
  },
  {
    id: 'load-balancing',
    title: 'Load Balancing',
    description: 'Distributing traffic across multiple servers to ensure reliability and performance.',
    category: 'fundamentals',
    difficulty: 'beginner',
    tags: ['scalability', 'availability', 'traffic'],
    keyPoints: [
      'Round Robin, Least Connections, IP Hash algorithms',
      'Layer 4 vs Layer 7 load balancing',
      'Health checks and failover',
      'Sticky sessions considerations',
    ],
    diagram: {
      type: 'flow',
      title: 'Load Balancer Architecture',
      nodes: [
        { id: 'client', label: 'Clients', type: 'default' },
        { id: 'lb', label: 'Load Balancer', type: 'primary' },
        { id: 's1', label: 'Server 1', type: 'secondary' },
        { id: 's2', label: 'Server 2', type: 'secondary' },
        { id: 's3', label: 'Server 3', type: 'secondary' },
      ],
      edges: [
        { from: 'client', to: 'lb', label: 'requests' },
        { from: 'lb', to: 's1', label: 'distribute' },
        { from: 'lb', to: 's2' },
        { from: 'lb', to: 's3' },
      ],
    },
    codeExamples: [
      {
        title: 'Round Robin Algorithm',
        language: 'typescript',
        code: `class RoundRobinBalancer {
  private servers: string[];
  private current = 0;

  constructor(servers: string[]) {
    this.servers = servers;
  }

  getNext(): string {
    const server = this.servers[this.current];
    this.current = (this.current + 1) % this.servers.length;
    return server;
  }
}`,
        description: 'Simple round-robin load balancing implementation',
      },
    ],
    interviewQuestions: [
      'What are the different load balancing algorithms?',
      'What is the difference between L4 and L7 load balancing?',
      'How do you handle sticky sessions?',
    ],
  },
  {
    id: 'caching-strategies',
    title: 'Caching Strategies',
    description: 'Cache-aside, write-through, write-behind, and refresh-ahead patterns.',
    category: 'fundamentals',
    difficulty: 'intermediate',
    tags: ['performance', 'patterns', 'optimization'],
    keyPoints: [
      'Cache-aside: Application manages cache manually',
      'Write-through: Write to cache and DB simultaneously',
      'Write-behind: Write to cache, async write to DB',
      'Refresh-ahead: Proactively refresh before expiry',
    ],
    diagram: {
      type: 'flow',
      title: 'Cache-Aside Pattern',
      nodes: [
        { id: 'app', label: 'Application', type: 'primary' },
        { id: 'cache', label: 'Cache (Redis)', type: 'accent' },
        { id: 'db', label: 'Database', type: 'secondary' },
      ],
      edges: [
        { from: 'app', to: 'cache', label: '1. Check cache' },
        { from: 'cache', to: 'app', label: '2. Cache miss', style: 'dashed' },
        { from: 'app', to: 'db', label: '3. Query DB' },
        { from: 'app', to: 'cache', label: '4. Update cache' },
      ],
    },
    interviewQuestions: [
      'Compare cache-aside vs write-through patterns.',
      'How do you handle cache invalidation?',
      'What is cache stampede and how do you prevent it?',
    ],
  },
];
