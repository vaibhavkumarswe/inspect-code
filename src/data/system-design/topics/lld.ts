import type { SystemDesignTopic } from '../types';

export const lldTopics: SystemDesignTopic[] = [
  {
    id: 'solid-principles',
    title: 'SOLID Principles',
    description: 'Five design principles for maintainable and extensible software.',
    category: 'lld',
    difficulty: 'beginner',
    tags: ['oop', 'principles', 'clean-code'],
    keyPoints: [
      'Single Responsibility Principle',
      'Open/Closed Principle',
      'Liskov Substitution Principle',
      'Interface Segregation Principle',
      'Dependency Inversion Principle',
    ],
    codeExamples: [
      {
        title: 'Single Responsibility Principle',
        language: 'typescript',
        code: `// Bad: One class doing too much
class UserManager {
  createUser(data: UserData) { /* ... */ }
  sendEmail(user: User) { /* ... */ }
  generateReport(user: User) { /* ... */ }
}

// Good: Separate responsibilities
class UserService {
  createUser(data: UserData) { /* ... */ }
}

class EmailService {
  sendEmail(to: string, body: string) { /* ... */ }
}

class ReportService {
  generateReport(user: User) { /* ... */ }
}`,
        description: 'Each class should have only one reason to change',
      },
    ],
    interviewQuestions: [
      'Explain each SOLID principle with examples.',
      'Which principle is most commonly violated?',
      'How does SOLID apply to functional programming?',
    ],
  },
  {
    id: 'design-patterns',
    title: 'Design Patterns Overview',
    description: 'Creational, Structural, and Behavioral patterns for common problems.',
    category: 'lld',
    difficulty: 'intermediate',
    tags: ['patterns', 'oop', 'reusability'],
    articleUrl: 'https://refactoring.guru/design-patterns',
    keyPoints: [
      'Creational: Factory, Singleton, Builder, Prototype',
      'Structural: Adapter, Decorator, Facade, Proxy',
      'Behavioral: Observer, Strategy, Command, State',
    ],
    interviewQuestions: [
      'What are the three categories of design patterns?',
      'When would you use the Builder pattern?',
    ],
  },
  {
    id: 'factory-pattern',
    title: 'Factory Pattern',
    description: 'Creating objects without specifying the exact class.',
    category: 'lld',
    difficulty: 'beginner',
    tags: ['creational', 'patterns', 'oop'],
    codeExamples: [
      {
        title: 'Factory Method',
        language: 'typescript',
        code: `interface Notification {
  send(message: string): void;
}

class EmailNotification implements Notification {
  send(message: string) {
    console.log(\`Email: \${message}\`);
  }
}

class SMSNotification implements Notification {
  send(message: string) {
    console.log(\`SMS: \${message}\`);
  }
}

class NotificationFactory {
  static create(type: 'email' | 'sms'): Notification {
    switch (type) {
      case 'email': return new EmailNotification();
      case 'sms': return new SMSNotification();
      default: throw new Error('Unknown type');
    }
  }
}`,
        description: 'Decouple object creation from usage',
      },
    ],
    interviewQuestions: [
      'What problem does the Factory pattern solve?',
      'Compare Factory Method vs Abstract Factory.',
    ],
  },
  {
    id: 'singleton-pattern',
    title: 'Singleton Pattern',
    description: 'Ensuring a class has only one instance with global access.',
    category: 'lld',
    difficulty: 'beginner',
    tags: ['creational', 'patterns', 'oop'],
    codeExamples: [
      {
        title: 'Thread-Safe Singleton',
        language: 'typescript',
        code: `class DatabaseConnection {
  private static instance: DatabaseConnection;
  
  private constructor() {
    // private to prevent direct construction
  }

  static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  query(sql: string) {
    console.log(\`Executing: \${sql}\`);
  }
}`,
        description: 'Ensures only one instance exists globally',
      },
    ],
    interviewQuestions: [
      'What are the drawbacks of the Singleton pattern?',
      'How is Singleton different from a global variable?',
    ],
  },
  {
    id: 'observer-pattern',
    title: 'Observer Pattern',
    description: 'One-to-many dependency for event notification.',
    category: 'lld',
    difficulty: 'intermediate',
    tags: ['behavioral', 'patterns', 'events'],
    articleUrl: 'https://refactoring.guru/design-patterns/observer',
    keyPoints: [
      'Subject maintains list of observers',
      'Observers are notified on state changes',
      'Loose coupling between subject and observers',
      'Foundation for event-driven systems',
    ],
    interviewQuestions: [
      'How does the Observer pattern work?',
      'What are the differences from Pub/Sub?',
    ],
  },
  {
    id: 'strategy-pattern',
    title: 'Strategy Pattern',
    description: 'Defining a family of algorithms and making them interchangeable.',
    category: 'lld',
    difficulty: 'intermediate',
    tags: ['behavioral', 'patterns', 'algorithms'],
    codeExamples: [
      {
        title: 'Strategy Pattern Example',
        language: 'typescript',
        code: `interface SortStrategy {
  sort(data: number[]): number[];
}

class QuickSort implements SortStrategy {
  sort(data: number[]): number[] {
    // Quick sort implementation
    return [...data].sort((a, b) => a - b);
  }
}

class MergeSort implements SortStrategy {
  sort(data: number[]): number[] {
    // Merge sort implementation
    return [...data].sort((a, b) => a - b);
  }
}

class Sorter {
  constructor(private strategy: SortStrategy) {}

  setStrategy(strategy: SortStrategy) {
    this.strategy = strategy;
  }

  sort(data: number[]) {
    return this.strategy.sort(data);
  }
}`,
        description: 'Swap algorithms at runtime without changing client code',
      },
    ],
    interviewQuestions: [
      'How does Strategy differ from Template Method?',
      'Give a real-world example of Strategy pattern.',
    ],
  },
  {
    id: 'decorator-pattern',
    title: 'Decorator Pattern',
    description: 'Adding behavior to objects dynamically without affecting others.',
    category: 'lld',
    difficulty: 'intermediate',
    tags: ['structural', 'patterns', 'composition'],
    articleUrl: 'https://refactoring.guru/design-patterns/decorator',
    keyPoints: [
      'Wraps existing objects to add behavior',
      'Follows Open/Closed Principle',
      'More flexible than inheritance',
      'Can be stacked for combined behavior',
    ],
    interviewQuestions: [
      'How does Decorator differ from inheritance?',
      'When should you use Decorator over subclassing?',
    ],
  },
];
