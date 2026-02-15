import type { BlogPost } from '../types';

export const devopsPosts: BlogPost[] = [
  {
    id: 'devops-docker-guide',
    slug: 'docker-for-developers-complete-guide',
    title: 'Docker for Developers: From Zero to Production',
    excerpt: 'Learn Docker from basics to production deployment with practical examples for containerizing your applications.',
    coverImage: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800',
    author: { name: 'Michael Roberts', avatar: 'https://i.pravatar.cc/150?u=michael', role: 'DevOps Engineer' },
    publishedAt: '2024-02-10',
    category: 'devops',
    tags: ['docker', 'containers', 'deployment', 'ci-cd'],
    readingTime: 14,
    tableOfContents: [
      { id: 'basics', title: 'Docker Basics', level: 1 },
      { id: 'dockerfile', title: 'Writing Dockerfiles', level: 1 },
      { id: 'compose', title: 'Docker Compose', level: 1 },
      { id: 'best-practices', title: 'Production Best Practices', level: 1 },
    ],
    content: [
      { type: 'text', content: '# Docker Basics\n\nDocker containers package your application with all its dependencies, ensuring it runs the same everywhere.' },
      { type: 'code', content: '', codeBlock: { language: 'bash', filename: 'docker-commands.sh', code: `# Pull an image
docker pull node:20-alpine

# Run a container
docker run -d -p 3000:3000 --name myapp myimage

# List running containers
docker ps

# View logs
docker logs -f myapp

# Execute command in container
docker exec -it myapp sh

# Stop and remove
docker stop myapp && docker rm myapp` }},
      { type: 'text', content: '# Writing Dockerfiles\n\nA well-optimized Dockerfile is crucial for build speed and image size.' },
      { type: 'code', content: '', codeBlock: { language: 'dockerfile', filename: 'Dockerfile', code: `# Multi-stage build for Node.js
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./
RUN npm ci --only=production

# Copy source and build
COPY . .
RUN npm run build

# Production image
FROM node:20-alpine AS production

WORKDIR /app

# Copy only necessary files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Non-root user for security
RUN addgroup -g 1001 -S nodejs && \\
    adduser -S nodejs -u 1001
USER nodejs

EXPOSE 3000
CMD ["node", "dist/index.js"]`, highlightLines: [2, 7, 8, 14, 26, 27, 28] }},
      { type: 'callout', content: 'Multi-stage builds can reduce image size by 70%+ by excluding dev dependencies and build tools.', calloutType: 'tip' },
      { type: 'text', content: '# Docker Compose\n\nDocker Compose simplifies multi-container applications.' },
      { type: 'code', content: '', codeBlock: { language: 'yaml', filename: 'docker-compose.yml', code: `version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://postgres:password@db:5432/myapp
      - REDIS_URL=redis://cache:6379
    depends_on:
      - db
      - cache
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_PASSWORD: password
      POSTGRES_DB: myapp
    volumes:
      - postgres_data:/var/lib/postgresql/data

  cache:
    image: redis:7-alpine

volumes:
  postgres_data:` }},
      { type: 'callout', content: 'Always use health checks in production to ensure containers are actually serving traffic.', calloutType: 'warning' },
    ],
    relatedPosts: ['nodejs-scaling', 'architecture-microservices'],
  },
  {
    id: 'devops-cicd-github',
    slug: 'github-actions-cicd-guide',
    title: 'GitHub Actions: Building a Complete CI/CD Pipeline',
    excerpt: 'Set up automated testing, building, and deployment with GitHub Actions for your JavaScript projects.',
    coverImage: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800',
    author: { name: 'Michael Roberts', avatar: 'https://i.pravatar.cc/150?u=michael', role: 'DevOps Engineer' },
    publishedAt: '2024-03-05',
    category: 'devops',
    tags: ['github-actions', 'ci-cd', 'automation', 'testing'],
    readingTime: 11,
    tableOfContents: [
      { id: 'basics', title: 'GitHub Actions Basics', level: 1 },
      { id: 'testing', title: 'Automated Testing', level: 1 },
      { id: 'deployment', title: 'Deployment Workflows', level: 1 },
    ],
    content: [
      { type: 'text', content: '# GitHub Actions Basics\n\nGitHub Actions automates your software development workflows directly in your repository.' },
      { type: 'code', content: '', codeBlock: { language: 'yaml', filename: '.github/workflows/ci.yml', code: `name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linting
        run: npm run lint
      
      - name: Run tests
        run: npm run test:coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info` }},
      { type: 'diagram', content: 'flowchart LR\n    A[Push/PR] --> B[Checkout]\n    B --> C[Install]\n    C --> D[Lint]\n    D --> E[Test]\n    E --> F[Build]\n    F --> G[Deploy]', diagramType: 'flowchart' },
      { type: 'callout', content: 'Cache dependencies and Docker layers to significantly speed up your CI builds.', calloutType: 'tip' },
    ],
    relatedPosts: ['devops-docker-guide', 'testing-strategy-guide'],
  },
];
