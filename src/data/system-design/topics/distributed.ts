import type { SystemDesignTopic } from '../types';

export const distributedTopics: SystemDesignTopic[] = [
  {
    id: 'consensus-algorithms',
    title: 'Consensus Algorithms',
    description: 'Paxos, Raft, and achieving agreement in distributed systems.',
    category: 'distributed',
    difficulty: 'expert',
    tags: ['distributed', 'consensus', 'algorithms'],
    articleUrl: 'https://raft.github.io/',
    keyPoints: [
      'Paxos: Classic but complex consensus protocol',
      'Raft: Understandable alternative to Paxos',
      'Leader election, log replication, safety',
      'Byzantine fault tolerance (BFT) for malicious nodes',
    ],
    interviewQuestions: [
      'How does Raft achieve consensus?',
      'What is the difference between Paxos and Raft?',
      'What is Byzantine fault tolerance?',
    ],
  },
  {
    id: 'bloom-filter',
    title: 'Bloom Filter',
    description: 'Probabilistic data structure for membership testing with false positives.',
    category: 'distributed',
    difficulty: 'advanced',
    tags: ['data-structures', 'probabilistic', 'space-efficient'],
    keyPoints: [
      'Space-efficient probabilistic data structure',
      'Fast membership testing (O(k) where k is hash functions)',
      'False positives possible, false negatives impossible',
      'Cannot remove elements (Counting Bloom Filters can)',
      'Used in: databases, caches, spell checkers',
    ],
    useCases: [
      'Database query optimization',
      'Cache filtering',
      'Spam detection',
      'Distributed systems deduplication',
    ],
    codeExamples: [
      {
        title: 'Bloom Filter Implementation',
        language: 'typescript',
        code: `class BloomFilter {
  private bits: boolean[];
  private hashCount: number;

  constructor(size: number, hashCount: number) {
    this.bits = new Array(size).fill(false);
    this.hashCount = hashCount;
  }

  private hash(value: string, seed: number): number {
    let h = seed;
    for (let i = 0; i < value.length; i++) {
      h = (h * 31 + value.charCodeAt(i)) % this.bits.length;
    }
    return Math.abs(h);
  }

  add(value: string): void {
    for (let i = 0; i < this.hashCount; i++) {
      const index = this.hash(value, i + 1);
      this.bits[index] = true;
    }
  }

  mightContain(value: string): boolean {
    for (let i = 0; i < this.hashCount; i++) {
      const index = this.hash(value, i + 1);
      if (!this.bits[index]) return false;
    }
    return true; // Might be a false positive
  }
}`,
        description: 'Simple bloom filter with configurable hash functions',
      },
    ],
    interviewQuestions: [
      'How does a Bloom filter work?',
      'What is the false positive rate formula?',
      'When would you use a Bloom filter?',
    ],
  },
  {
    id: 'consistent-hashing',
    title: 'Consistent Hashing',
    description: 'Distributing data across nodes with minimal redistribution.',
    category: 'distributed',
    difficulty: 'advanced',
    tags: ['hashing', 'distribution', 'scalability'],
    keyPoints: [
      'Hash ring maps both keys and nodes',
      'Adding/removing a node affects only neighbors',
      'Virtual nodes improve distribution',
      'Used in: Cassandra, DynamoDB, CDNs',
    ],
    diagram: {
      type: 'architecture',
      title: 'Consistent Hashing Ring',
      nodes: [
        { id: 'n1', label: 'Node A', type: 'primary' },
        { id: 'n2', label: 'Node B', type: 'secondary' },
        { id: 'n3', label: 'Node C', type: 'accent' },
        { id: 'k1', label: 'Key 1', type: 'default' },
        { id: 'k2', label: 'Key 2', type: 'default' },
        { id: 'k3', label: 'Key 3', type: 'default' },
      ],
      edges: [
        { from: 'k1', to: 'n1', label: 'maps to' },
        { from: 'k2', to: 'n2', label: 'maps to' },
        { from: 'k3', to: 'n3', label: 'maps to' },
      ],
    },
    interviewQuestions: [
      'How does consistent hashing minimize redistribution?',
      'What are virtual nodes and why are they needed?',
    ],
  },
  {
    id: 'distributed-caching',
    title: 'Distributed Caching',
    description: 'Redis, Memcached, and cache invalidation strategies.',
    category: 'distributed',
    difficulty: 'advanced',
    tags: ['caching', 'performance', 'distributed'],
    articleUrl: 'https://redis.io/docs/manual/',
    keyPoints: [
      'Redis: In-memory with persistence and data structures',
      'Memcached: Simple key-value, multi-threaded',
      'Cache invalidation strategies (TTL, event-based)',
      'Cache consistency in distributed environments',
    ],
    interviewQuestions: [
      'Compare Redis vs Memcached.',
      'How do you handle cache invalidation?',
      'What is the thundering herd problem?',
    ],
  },
  {
    id: 'leader-election',
    title: 'Leader Election',
    description: 'Algorithms for choosing a coordinator in distributed systems.',
    category: 'distributed',
    difficulty: 'advanced',
    tags: ['coordination', 'algorithms', 'fault-tolerance'],
    articleUrl: 'https://www.geeksforgeeks.org/leader-election-in-distributed-systems/',
    keyPoints: [
      'Bully algorithm: Highest ID becomes leader',
      'Ring algorithm: Token passing election',
      'ZooKeeper: Ephemeral nodes for election',
      'Handles leader failures and network partitions',
    ],
    interviewQuestions: [
      'How does leader election work in ZooKeeper?',
      'What happens when the leader fails?',
    ],
  },
  {
    id: 'distributed-locks',
    title: 'Distributed Locks',
    description: 'Coordinating access to shared resources across nodes.',
    category: 'distributed',
    difficulty: 'advanced',
    tags: ['concurrency', 'coordination', 'synchronization'],
    keyPoints: [
      'Redis SETNX for simple distributed locks',
      'Redlock algorithm for fault-tolerant locking',
      'ZooKeeper recipes for distributed locking',
      'Lock timeouts and fencing tokens',
    ],
    codeExamples: [
      {
        title: 'Redis Distributed Lock',
        language: 'typescript',
        code: `class RedisLock {
  async acquire(
    key: string,
    ttl: number
  ): Promise<string | null> {
    const token = crypto.randomUUID();
    const acquired = await redis.set(
      key, token, 'NX', 'PX', ttl
    );
    return acquired ? token : null;
  }

  async release(key: string, token: string) {
    // Lua script for atomic check-and-delete
    const script = \`
      if redis.call("get", KEYS[1]) == ARGV[1] then
        return redis.call("del", KEYS[1])
      else
        return 0
      end
    \`;
    await redis.eval(script, 1, key, token);
  }
}`,
        description: 'Atomic lock acquisition and release using Redis',
      },
    ],
    interviewQuestions: [
      'Why is distributed locking hard?',
      'What is the Redlock algorithm?',
      'What are fencing tokens?',
    ],
  },
  {
    id: 'circuit-breaker',
    title: 'Circuit Breaker Pattern',
    description: 'Preventing cascading failures in distributed systems.',
    category: 'distributed',
    difficulty: 'intermediate',
    tags: ['resilience', 'patterns', 'fault-tolerance'],
    keyPoints: [
      'States: Closed (normal) → Open (failing) → Half-Open (testing)',
      'Monitors failure rate and trips when threshold exceeded',
      'Prevents cascading failures across services',
      'Allows system to recover gracefully',
    ],
    diagram: {
      type: 'flow',
      title: 'Circuit Breaker States',
      nodes: [
        { id: 'closed', label: 'Closed (Normal)', type: 'secondary', description: 'Requests flow through' },
        { id: 'open', label: 'Open (Failing)', type: 'warning', description: 'Requests fail fast' },
        { id: 'half', label: 'Half-Open', type: 'accent', description: 'Testing recovery' },
      ],
      edges: [
        { from: 'closed', to: 'open', label: 'failure threshold' },
        { from: 'open', to: 'half', label: 'timeout expires' },
        { from: 'half', to: 'closed', label: 'success' },
        { from: 'half', to: 'open', label: 'failure' },
      ],
    },
    interviewQuestions: [
      'How does the circuit breaker pattern work?',
      'What happens when the circuit is open?',
    ],
  },
  {
    id: 'bulkhead-pattern',
    title: 'Bulkhead Pattern',
    description: 'Isolating failures to prevent system-wide outages.',
    category: 'distributed',
    difficulty: 'intermediate',
    tags: ['resilience', 'patterns', 'isolation'],
    articleUrl: 'https://learn.microsoft.com/en-us/azure/architecture/patterns/bulkhead',
    keyPoints: [
      'Named after ship bulkheads that contain flooding',
      'Isolate critical resources into pools',
      'Thread pool bulkhead: Separate thread pools per service',
      'Connection pool bulkhead: Dedicated connections per dependency',
    ],
    interviewQuestions: [
      'How does the bulkhead pattern prevent cascading failures?',
      'Compare bulkhead with circuit breaker.',
    ],
  },
];
