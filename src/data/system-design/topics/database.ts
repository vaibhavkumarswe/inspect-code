import type { SystemDesignTopic } from '../types';

export const databaseTopics: SystemDesignTopic[] = [
  {
    id: 'database-normalization',
    title: 'Database Normalization',
    description: '1NF, 2NF, 3NF, BCNF - organizing data to reduce redundancy.',
    category: 'database',
    difficulty: 'beginner',
    tags: ['sql', 'schema', 'normalization'],
    articleUrl: 'https://www.geeksforgeeks.org/normal-forms-in-dbms/',
    keyPoints: [
      '1NF: Atomic values, no repeating groups',
      '2NF: No partial dependencies on composite key',
      '3NF: No transitive dependencies',
      'BCNF: Every determinant is a candidate key',
    ],
    interviewQuestions: [
      'Explain the different normal forms.',
      'When should you denormalize?',
    ],
  },
  {
    id: 'denormalization',
    title: 'Denormalization',
    description: 'Intentionally adding redundancy for read performance.',
    category: 'database',
    difficulty: 'intermediate',
    tags: ['performance', 'trade-offs', 'reads'],
    articleUrl: 'https://www.geeksforgeeks.org/denormalization-in-databases/',
    keyPoints: [
      'Trade storage for read performance',
      'Reduces complex JOINs',
      'Increases write complexity',
      'Common in read-heavy workloads',
    ],
    interviewQuestions: [
      'When is denormalization appropriate?',
      'What are the risks of denormalization?',
    ],
  },
  {
    id: 'database-indexing',
    title: 'Database Indexing',
    description: 'B-trees, hash indexes, and composite indexes for query optimization.',
    category: 'database',
    difficulty: 'intermediate',
    tags: ['performance', 'queries', 'optimization'],
    keyPoints: [
      'B-tree indexes: Balanced tree for range queries',
      'Hash indexes: O(1) lookups for equality',
      'Composite indexes: Multi-column indexes',
      'Index trade-off: Faster reads, slower writes',
    ],
    codeExamples: [
      {
        title: 'Creating Indexes in SQL',
        language: 'sql',
        code: `-- Single column index
CREATE INDEX idx_users_email ON users(email);

-- Composite index (order matters!)
CREATE INDEX idx_orders_user_date 
  ON orders(user_id, created_at DESC);

-- Partial index (PostgreSQL)
CREATE INDEX idx_active_users 
  ON users(email) WHERE active = true;

-- Covering index
CREATE INDEX idx_orders_covering 
  ON orders(user_id, status, total);`,
        description: 'Common index patterns for query optimization',
      },
    ],
    interviewQuestions: [
      'How does a B-tree index work?',
      'What is a covering index?',
      'How do you decide which columns to index?',
    ],
  },
  {
    id: 'sharding',
    title: 'Database Sharding',
    description: 'Horizontal partitioning of data across multiple databases.',
    category: 'database',
    difficulty: 'advanced',
    tags: ['scalability', 'partitioning', 'distributed'],
    keyPoints: [
      'Horizontal vs Vertical sharding',
      'Shard key selection strategies',
      'Range-based vs Hash-based sharding',
      'Cross-shard queries and joins',
      'Resharding challenges',
    ],
    diagram: {
      type: 'architecture',
      title: 'Horizontal Sharding',
      nodes: [
        { id: 'app', label: 'Application', type: 'primary' },
        { id: 'router', label: 'Shard Router', type: 'accent' },
        { id: 's1', label: 'Shard 1 (A-H)', type: 'secondary' },
        { id: 's2', label: 'Shard 2 (I-P)', type: 'secondary' },
        { id: 's3', label: 'Shard 3 (Q-Z)', type: 'secondary' },
      ],
      edges: [
        { from: 'app', to: 'router', label: 'query' },
        { from: 'router', to: 's1', label: 'route by key' },
        { from: 'router', to: 's2' },
        { from: 'router', to: 's3' },
      ],
    },
    interviewQuestions: [
      'How do you choose a shard key?',
      'What are the problems with cross-shard queries?',
      'How do you handle resharding?',
    ],
  },
  {
    id: 'database-replication',
    title: 'Database Replication',
    description: 'Master-slave, master-master, and synchronous vs async replication.',
    category: 'database',
    difficulty: 'advanced',
    tags: ['availability', 'redundancy', 'sync'],
    articleUrl: 'https://www.geeksforgeeks.org/data-replication-in-dbms/',
    keyPoints: [
      'Master-slave: Writes to master, reads from replicas',
      'Master-master: Writes to any node, conflict resolution needed',
      'Synchronous: Strong consistency, higher latency',
      'Asynchronous: Low latency, eventual consistency',
    ],
    interviewQuestions: [
      'Compare synchronous vs asynchronous replication.',
      'How do you handle write conflicts in multi-master?',
    ],
  },
  {
    id: 'sql-vs-nosql',
    title: 'SQL vs NoSQL',
    description: 'When to choose relational vs non-relational databases.',
    category: 'database',
    difficulty: 'intermediate',
    tags: ['decision', 'trade-offs', 'storage'],
    articleUrl: 'https://www.mongodb.com/nosql-explained/nosql-vs-sql',
    keyPoints: [
      'SQL: Structured data, ACID, complex queries',
      'NoSQL: Flexible schema, horizontal scaling',
      'Document stores: MongoDB, CouchDB',
      'Key-value: Redis, DynamoDB',
      'Column-family: Cassandra, HBase',
      'Graph: Neo4j, ArangoDB',
    ],
    interviewQuestions: [
      'When would you choose SQL over NoSQL?',
      'What are the different types of NoSQL databases?',
    ],
  },
  {
    id: 'time-series-db',
    title: 'Time-Series Databases',
    description: 'Specialized databases for time-stamped data like metrics and IoT.',
    category: 'database',
    difficulty: 'intermediate',
    tags: ['metrics', 'iot', 'specialized'],
    articleUrl: 'https://www.influxdata.com/time-series-database/',
    keyPoints: [
      'Optimized for append-heavy workloads',
      'Time-based partitioning and retention',
      'Downsampling for older data',
      'Examples: InfluxDB, TimescaleDB, Prometheus',
    ],
    interviewQuestions: [
      'Why use a time-series database over a regular RDBMS?',
      'How do you handle data retention?',
    ],
  },
];
