import type { SystemDesignTopic } from '../types';

export const hldTopics: SystemDesignTopic[] = [
  {
    id: 'microservices',
    title: 'Microservices Architecture',
    description: 'Designing loosely coupled, independently deployable services.',
    category: 'hld',
    difficulty: 'advanced',
    tags: ['architecture', 'scalability', 'deployment'],
    keyPoints: [
      'Single responsibility per service',
      'Independent deployment and scaling',
      'Service discovery and communication',
      'Data isolation per service',
      'API contracts between services',
    ],
    diagram: {
      type: 'architecture',
      title: 'Microservices Architecture',
      nodes: [
        { id: 'gateway', label: 'API Gateway', type: 'primary' },
        { id: 'auth', label: 'Auth Service', type: 'secondary' },
        { id: 'user', label: 'User Service', type: 'secondary' },
        { id: 'order', label: 'Order Service', type: 'secondary' },
        { id: 'payment', label: 'Payment Service', type: 'secondary' },
        { id: 'mq', label: 'Message Queue', type: 'accent' },
      ],
      edges: [
        { from: 'gateway', to: 'auth' },
        { from: 'gateway', to: 'user' },
        { from: 'gateway', to: 'order' },
        { from: 'order', to: 'mq', label: 'events' },
        { from: 'mq', to: 'payment', label: 'process' },
      ],
    },
    interviewQuestions: [
      'How do microservices communicate?',
      'What are the challenges of distributed transactions?',
      'When should you NOT use microservices?',
    ],
  },
  {
    id: 'monolith-vs-microservices',
    title: 'Monolith vs Microservices',
    description: 'When to use monolithic architecture vs microservices.',
    category: 'hld',
    difficulty: 'intermediate',
    tags: ['architecture', 'trade-offs', 'decision'],
    articleUrl: 'https://www.atlassian.com/microservices/microservices-architecture/microservices-vs-monolith',
    keyPoints: [
      'Monolith: Simple, easy to develop and deploy initially',
      'Microservices: Better scalability but increased complexity',
      'Start monolith, evolve to microservices when needed',
      'Consider team size, domain complexity, scaling needs',
    ],
    interviewQuestions: [
      'When would you choose a monolith over microservices?',
      'How do you migrate from monolith to microservices?',
    ],
  },
  {
    id: 'api-gateway',
    title: 'API Gateway Pattern',
    description: 'Single entry point for all client requests with routing, auth, and rate limiting.',
    category: 'hld',
    difficulty: 'intermediate',
    tags: ['api', 'routing', 'security'],
    articleUrl: 'https://microservices.io/patterns/apigateway.html',
    keyPoints: [
      'Single entry point for all APIs',
      'Authentication and authorization',
      'Rate limiting and throttling',
      'Request/response transformation',
      'Load balancing and routing',
    ],
    interviewQuestions: [
      'What are the responsibilities of an API gateway?',
      'How does an API gateway differ from a load balancer?',
    ],
  },
  {
    id: 'event-driven-architecture',
    title: 'Event-Driven Architecture',
    description: 'Building systems that react to events using message queues and event buses.',
    category: 'hld',
    difficulty: 'advanced',
    tags: ['events', 'async', 'decoupling'],
    keyPoints: [
      'Producers emit events, consumers react',
      'Loose coupling between services',
      'Event sourcing stores all state changes',
      'Eventual consistency trade-off',
    ],
    codeExamples: [
      {
        title: 'Event Emitter Pattern',
        language: 'typescript',
        code: `type EventHandler = (data: any) => void;

class EventBus {
  private handlers: Map<string, EventHandler[]> = new Map();

  on(event: string, handler: EventHandler) {
    const handlers = this.handlers.get(event) || [];
    handlers.push(handler);
    this.handlers.set(event, handlers);
  }

  emit(event: string, data: any) {
    const handlers = this.handlers.get(event) || [];
    handlers.forEach(handler => handler(data));
  }
}`,
        description: 'Simple event bus for decoupled communication',
      },
    ],
    interviewQuestions: [
      'What is event sourcing?',
      'How do you handle event ordering?',
      'What are the benefits over request-response?',
    ],
  },
  {
    id: 'cqrs',
    title: 'CQRS Pattern',
    description: 'Command Query Responsibility Segregation - separating reads from writes.',
    category: 'hld',
    difficulty: 'advanced',
    tags: ['patterns', 'scalability', 'reads-writes'],
    articleUrl: 'https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs',
    keyPoints: [
      'Separate read and write models',
      'Optimized read models for queries',
      'Write model handles business logic',
      'Often combined with Event Sourcing',
    ],
    interviewQuestions: [
      'When is CQRS beneficial?',
      'How does CQRS relate to event sourcing?',
    ],
  },
  {
    id: 'saga-pattern',
    title: 'Saga Pattern',
    description: 'Managing distributed transactions across multiple services.',
    category: 'hld',
    difficulty: 'expert',
    tags: ['transactions', 'distributed', 'patterns'],
    keyPoints: [
      'Choreography: Services react to events',
      'Orchestration: Central coordinator manages flow',
      'Compensating transactions for rollback',
      'Ensures data consistency without 2PC',
    ],
    diagram: {
      type: 'flow',
      title: 'Saga Pattern - Orchestration',
      nodes: [
        { id: 'orch', label: 'Saga Orchestrator', type: 'primary' },
        { id: 'order', label: 'Create Order', type: 'secondary' },
        { id: 'payment', label: 'Process Payment', type: 'secondary' },
        { id: 'inventory', label: 'Reserve Inventory', type: 'secondary' },
        { id: 'ship', label: 'Ship Order', type: 'secondary' },
      ],
      edges: [
        { from: 'orch', to: 'order', label: 'step 1' },
        { from: 'orch', to: 'payment', label: 'step 2' },
        { from: 'orch', to: 'inventory', label: 'step 3' },
        { from: 'orch', to: 'ship', label: 'step 4' },
      ],
    },
    interviewQuestions: [
      'Compare choreography vs orchestration.',
      'How do you handle failures in a saga?',
      'What is a compensating transaction?',
    ],
  },
];
