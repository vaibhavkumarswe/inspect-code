import type { SystemDesignTopic } from '../types';

export const scalabilityTopics: SystemDesignTopic[] = [
  {
    id: 'horizontal-scaling',
    title: 'Horizontal vs Vertical Scaling',
    description: 'Scale out vs scale up - adding machines vs adding resources.',
    category: 'scalability',
    difficulty: 'beginner',
    tags: ['scaling', 'infrastructure', 'growth'],
    articleUrl: 'https://www.cloudzero.com/blog/horizontal-vs-vertical-scaling/',
    keyPoints: [
      'Vertical: Add more CPU/RAM to existing server',
      'Horizontal: Add more servers to the pool',
      'Vertical has hardware limits, horizontal is theoretically unlimited',
      'Horizontal requires stateless application design',
    ],
    interviewQuestions: [
      'When should you scale vertically vs horizontally?',
      'What changes are needed in code to support horizontal scaling?',
    ],
  },
  {
    id: 'rate-limiting',
    title: 'Rate Limiting',
    description: 'Token bucket, leaky bucket, and sliding window algorithms.',
    category: 'scalability',
    difficulty: 'intermediate',
    tags: ['api', 'protection', 'throttling'],
    keyPoints: [
      'Token Bucket algorithm',
      'Leaky Bucket algorithm',
      'Fixed Window Counter',
      'Sliding Window Log/Counter',
    ],
    codeExamples: [
      {
        title: 'Token Bucket Algorithm',
        language: 'typescript',
        code: `class TokenBucket {
  private tokens: number;
  private lastRefill: number;

  constructor(
    private capacity: number,
    private refillRate: number // tokens per second
  ) {
    this.tokens = capacity;
    this.lastRefill = Date.now();
  }

  tryConsume(): boolean {
    this.refill();
    if (this.tokens > 0) {
      this.tokens--;
      return true; // Request allowed
    }
    return false; // Rate limited
  }

  private refill() {
    const now = Date.now();
    const elapsed = (now - this.lastRefill) / 1000;
    this.tokens = Math.min(
      this.capacity,
      this.tokens + elapsed * this.refillRate
    );
    this.lastRefill = now;
  }
}`,
        description: 'Token bucket rate limiter with configurable capacity and refill rate',
      },
    ],
    interviewQuestions: [
      'Compare token bucket vs leaky bucket algorithms.',
      'How do you implement distributed rate limiting?',
      'Where should rate limiting be applied?',
    ],
  },
  {
    id: 'cdn',
    title: 'Content Delivery Networks',
    description: 'Distributing content globally for low-latency delivery.',
    category: 'scalability',
    difficulty: 'beginner',
    tags: ['performance', 'global', 'caching'],
    articleUrl: 'https://www.cloudflare.com/learning/cdn/what-is-a-cdn/',
    keyPoints: [
      'Edge servers close to end users',
      'Static content caching (images, CSS, JS)',
      'Pull vs Push CDN strategies',
      'Cache invalidation challenges',
    ],
    interviewQuestions: [
      'How does a CDN work?',
      'What is the difference between pull and push CDNs?',
    ],
  },
  {
    id: 'message-queues',
    title: 'Message Queues',
    description: 'Kafka, RabbitMQ, SQS - async communication between services.',
    category: 'scalability',
    difficulty: 'intermediate',
    tags: ['async', 'decoupling', 'reliability'],
    keyPoints: [
      'Decouples producers from consumers',
      'Handles traffic spikes via buffering',
      'Guarantees: at-most-once, at-least-once, exactly-once',
      'Kafka for streaming, RabbitMQ for task queues',
    ],
    diagram: {
      type: 'flow',
      title: 'Message Queue Architecture',
      nodes: [
        { id: 'p1', label: 'Producer A', type: 'default' },
        { id: 'p2', label: 'Producer B', type: 'default' },
        { id: 'queue', label: 'Message Queue', type: 'primary' },
        { id: 'c1', label: 'Consumer 1', type: 'secondary' },
        { id: 'c2', label: 'Consumer 2', type: 'secondary' },
      ],
      edges: [
        { from: 'p1', to: 'queue', label: 'publish' },
        { from: 'p2', to: 'queue', label: 'publish' },
        { from: 'queue', to: 'c1', label: 'consume' },
        { from: 'queue', to: 'c2', label: 'consume' },
      ],
    },
    interviewQuestions: [
      'Compare Kafka vs RabbitMQ.',
      'What delivery guarantees exist?',
      'How do you handle dead letter queues?',
    ],
  },
  {
    id: 'auto-scaling',
    title: 'Auto-Scaling',
    description: 'Automatically adjusting resources based on demand.',
    category: 'scalability',
    difficulty: 'intermediate',
    tags: ['cloud', 'automation', 'elasticity'],
    articleUrl: 'https://aws.amazon.com/autoscaling/',
    keyPoints: [
      'Metric-based scaling (CPU, memory, request count)',
      'Predictive scaling using ML',
      'Cool-down periods to prevent thrashing',
      'Scale-in and scale-out policies',
    ],
    interviewQuestions: [
      'What metrics do you use for auto-scaling?',
      'How do you prevent scaling oscillations?',
    ],
  },
];
