import type { SystemDesignTopic } from '../types';

export const backendTopics: SystemDesignTopic[] = [
  {
    id: 'rest-api-design',
    title: 'REST API Design',
    description: 'Best practices for designing RESTful APIs.',
    category: 'backend',
    difficulty: 'beginner',
    tags: ['api', 'rest', 'design'],
    keyPoints: [
      'Use nouns for resources, verbs for actions',
      'HTTP methods: GET, POST, PUT, PATCH, DELETE',
      'Status codes: 2xx success, 4xx client error, 5xx server error',
      'Pagination, filtering, and sorting',
      'HATEOAS for discoverability',
    ],
    codeExamples: [
      {
        title: 'RESTful API Endpoints',
        language: 'typescript',
        code: `// Good REST API design
GET    /api/v1/users          // List users
GET    /api/v1/users/:id      // Get user
POST   /api/v1/users          // Create user
PUT    /api/v1/users/:id      // Update user
DELETE /api/v1/users/:id      // Delete user

// Nested resources
GET    /api/v1/users/:id/orders
POST   /api/v1/users/:id/orders

// Filtering & Pagination
GET    /api/v1/users?role=admin&page=2&limit=20
GET    /api/v1/orders?status=pending&sort=-created_at`,
        description: 'Resource-oriented URL patterns',
      },
    ],
    interviewQuestions: [
      'What makes an API RESTful?',
      'How do you version a REST API?',
      'What is HATEOAS?',
    ],
  },
  {
    id: 'graphql-design',
    title: 'GraphQL Design',
    description: 'Schema design, resolvers, and federation.',
    category: 'backend',
    difficulty: 'intermediate',
    tags: ['api', 'graphql', 'queries'],
    keyPoints: [
      'Schema-first design with SDL',
      'Resolvers for data fetching',
      'N+1 problem and DataLoader',
      'Federation for microservices',
    ],
    codeExamples: [
      {
        title: 'GraphQL Schema',
        language: 'graphql',
        code: `type User {
  id: ID!
  name: String!
  email: String!
  orders: [Order!]!
}

type Order {
  id: ID!
  total: Float!
  status: OrderStatus!
  items: [OrderItem!]!
}

enum OrderStatus {
  PENDING
  PROCESSING
  SHIPPED
  DELIVERED
}

type Query {
  user(id: ID!): User
  users(limit: Int, offset: Int): [User!]!
}

type Mutation {
  createUser(input: CreateUserInput!): User!
}`,
        description: 'Type-safe GraphQL schema definition',
      },
    ],
    interviewQuestions: [
      'Compare REST vs GraphQL.',
      'How do you solve the N+1 problem in GraphQL?',
    ],
  },
  {
    id: 'authentication-authorization',
    title: 'Authentication & Authorization',
    description: 'OAuth, JWT, RBAC, and session management.',
    category: 'backend',
    difficulty: 'intermediate',
    tags: ['security', 'auth', 'identity'],
    keyPoints: [
      'Authentication: Who are you? (identity)',
      'Authorization: What can you do? (permissions)',
      'JWT: Stateless tokens with claims',
      'OAuth 2.0: Delegated authorization',
      'RBAC: Role-based access control',
    ],
    codeExamples: [
      {
        title: 'JWT Token Structure',
        language: 'typescript',
        code: `// JWT has 3 parts: header.payload.signature
// Header
{ "alg": "HS256", "typ": "JWT" }

// Payload (claims)
{
  "sub": "user_123",
  "name": "John Doe",
  "role": "admin",
  "iat": 1700000000,
  "exp": 1700003600
}

// Verification
const isValid = verify(token, secretKey);
const decoded = decode(token);
// Check expiry: decoded.exp > Date.now() / 1000`,
        description: 'JWT structure and verification flow',
      },
    ],
    interviewQuestions: [
      'How does OAuth 2.0 work?',
      'What are the trade-offs of JWT vs session-based auth?',
      'How do you implement RBAC?',
    ],
  },
  {
    id: 'api-versioning',
    title: 'API Versioning',
    description: 'Strategies for evolving APIs without breaking clients.',
    category: 'backend',
    difficulty: 'intermediate',
    tags: ['api', 'versioning', 'compatibility'],
    articleUrl: 'https://restfulapi.net/versioning/',
    keyPoints: [
      'URL versioning: /api/v1/, /api/v2/',
      'Header versioning: Accept: application/vnd.api.v2+json',
      'Query param versioning: ?version=2',
      'Deprecation policies and migration guides',
    ],
    interviewQuestions: [
      'What are the different API versioning strategies?',
      'How do you deprecate an API version gracefully?',
    ],
  },
  {
    id: 'idempotency',
    title: 'Idempotency',
    description: 'Designing APIs that can be safely retried.',
    category: 'backend',
    difficulty: 'intermediate',
    tags: ['api', 'reliability', 'retries'],
    keyPoints: [
      'GET, PUT, DELETE are naturally idempotent',
      'POST needs idempotency keys',
      'Prevents duplicate operations on retry',
      'Critical for payment and order systems',
    ],
    codeExamples: [
      {
        title: 'Idempotency Key Pattern',
        language: 'typescript',
        code: `async function processPayment(
  idempotencyKey: string,
  amount: number
) {
  // Check if already processed
  const existing = await cache.get(idempotencyKey);
  if (existing) return existing; // Return cached result

  // Process payment
  const result = await stripe.charges.create({
    amount,
    idempotency_key: idempotencyKey,
  });

  // Cache result for future retries
  await cache.set(idempotencyKey, result, { ttl: 86400 });
  return result;
}`,
        description: 'Using idempotency keys to prevent duplicate charges',
      },
    ],
    interviewQuestions: [
      'What is idempotency and why is it important?',
      'How do you implement idempotency for POST requests?',
    ],
  },
  {
    id: 'webhook-design',
    title: 'Webhook Design',
    description: 'Event notifications to external systems.',
    category: 'backend',
    difficulty: 'intermediate',
    tags: ['events', 'integration', 'async'],
    articleUrl: 'https://webhook.site/docs',
    keyPoints: [
      'HTTP callbacks for event notifications',
      'Retry logic with exponential backoff',
      'Signature verification for security',
      'Payload versioning and schema evolution',
    ],
    interviewQuestions: [
      'How do you ensure webhook reliability?',
      'How do you secure webhook endpoints?',
    ],
  },
];
