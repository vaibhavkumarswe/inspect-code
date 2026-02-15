/**
 * Coding Challenges - TypeScript
 * All TypeScript-based coding challenges
 */

import type { Challenge } from '../types';

export const typescriptChallenges: Challenge[] = [
  {
    id: 'ts-counter',
    title: 'TypeScript Counter',
    description: 'Build a type-safe counter with TypeScript.',
    language: 'typescript',
    difficulty: 'beginner',
    category: 'fundamentals',
    tags: ['types', 'interfaces', 'state'],
    initialCode: `// TypeScript Counter Challenge
// Create a type-safe counter

interface CounterState {
  count: number;
  min: number;
  max: number;
}

const container = document.getElementById('app') as HTMLDivElement;

const state: CounterState = {
  count: 0,
  min: -10,
  max: 10
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function updateCount(delta: number): void {
  state.count = clamp(state.count + delta, state.min, state.max);
  render();
}

function resetCount(): void {
  state.count = 0;
  render();
}

function render(): void {
  const isAtMin = state.count <= state.min;
  const isAtMax = state.count >= state.max;
  
  container.innerHTML = \`
    <div class="counter-wrapper">
      <p class="limits">Range: \${state.min} to \${state.max}</p>
      <h2 class="count">\${state.count}</h2>
      <div class="buttons">
        <button onclick="updateCount(-1)" \${isAtMin ? 'disabled' : ''}>-</button>
        <button onclick="resetCount()">Reset</button>
        <button onclick="updateCount(1)" \${isAtMax ? 'disabled' : ''}>+</button>
      </div>
    </div>
  \`;
}

// Make functions available globally
(window as any).updateCount = updateCount;
(window as any).resetCount = resetCount;

render();`,
    initialCss: `.counter-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
}

.limits {
  color: #a1a1aa;
  font-size: 0.875rem;
  margin: 0;
}

.count {
  font-size: 4rem;
  font-weight: bold;
  color: #06b6d4;
  margin: 0;
}

.buttons {
  display: flex;
  gap: 0.5rem;
}

.buttons button {
  padding: 0.5rem 1.5rem;
  font-size: 1.25rem;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #06b6d4, #8b5cf6);
  color: white;
  cursor: pointer;
  transition: transform 0.2s, opacity 0.2s;
}

.buttons button:hover:not(:disabled) {
  opacity: 0.9;
  transform: scale(1.05);
}

.buttons button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}`,
  },
  {
    id: 'ts-todo',
    title: 'TypeScript Todo',
    description: 'Create a type-safe todo list with interfaces.',
    language: 'typescript',
    difficulty: 'intermediate',
    category: 'state-management',
    tags: ['interfaces', 'generics', 'crud'],
    initialCode: `// TypeScript Todo List Challenge
// Create a fully typed todo list

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
}

type FilterType = 'all' | 'active' | 'completed';

interface AppState {
  todos: Todo[];
  filter: FilterType;
  nextId: number;
}

const container = document.getElementById('app') as HTMLDivElement;

const state: AppState = {
  todos: [
    { id: 1, text: 'Learn TypeScript', completed: false, createdAt: new Date() },
    { id: 2, text: 'Build type-safe apps', completed: true, createdAt: new Date() },
  ],
  filter: 'all',
  nextId: 3
};

function getFilteredTodos(): Todo[] {
  switch (state.filter) {
    case 'active': return state.todos.filter(t => !t.completed);
    case 'completed': return state.todos.filter(t => t.completed);
    default: return state.todos;
  }
}

function addTodo(): void {
  const input = document.getElementById('todoInput') as HTMLInputElement;
  if (input.value.trim()) {
    state.todos.push({
      id: state.nextId++,
      text: input.value.trim(),
      completed: false,
      createdAt: new Date()
    });
    render();
  }
}

function toggleTodo(id: number): void {
  state.todos = state.todos.map(t => 
    t.id === id ? { ...t, completed: !t.completed } : t
  );
  render();
}

function removeTodo(id: number): void {
  state.todos = state.todos.filter(t => t.id !== id);
  render();
}

function setFilter(filter: FilterType): void {
  state.filter = filter;
  render();
}

function render(): void {
  const filtered = getFilteredTodos();
  const activeCount = state.todos.filter(t => !t.completed).length;
  
  container.innerHTML = \`
    <div class="todo-app">
      <h2>TypeScript Todos</h2>
      <div class="add-todo">
        <input type="text" id="todoInput" placeholder="Add new todo..." />
        <button onclick="addTodo()">Add</button>
      </div>
      <div class="filters">
        <button class="\${state.filter === 'all' ? 'active' : ''}" onclick="setFilter('all')">All</button>
        <button class="\${state.filter === 'active' ? 'active' : ''}" onclick="setFilter('active')">Active</button>
        <button class="\${state.filter === 'completed' ? 'active' : ''}" onclick="setFilter('completed')">Done</button>
      </div>
      <ul class="todo-list">
        \${filtered.map(todo => \`
          <li class="\${todo.completed ? 'completed' : ''}">
            <input type="checkbox" \${todo.completed ? 'checked' : ''} onchange="toggleTodo(\${todo.id})" />
            <span>\${todo.text}</span>
            <button onclick="removeTodo(\${todo.id})">×</button>
          </li>
        \`).join('')}
      </ul>
      <p class="count">\${activeCount} items left</p>
    </div>
  \`;
}

// Make functions available globally
(window as any).addTodo = addTodo;
(window as any).toggleTodo = toggleTodo;
(window as any).removeTodo = removeTodo;
(window as any).setFilter = setFilter;

render();`,
    initialCss: `.todo-app {
  max-width: 400px;
  margin: 0 auto;
  padding: 1.5rem;
}

.todo-app h2 {
  margin: 0 0 1rem;
  color: #06b6d4;
}

.add-todo {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.add-todo input {
  flex: 1;
  padding: 0.5rem;
  border: 2px solid #333;
  border-radius: 6px;
  background: #1a1a2e;
  color: white;
}

.add-todo button {
  padding: 0.5rem 1rem;
  background: #06b6d4;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.filters {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.filters button {
  padding: 0.25rem 0.75rem;
  background: transparent;
  border: 1px solid #333;
  color: #a1a1aa;
  border-radius: 4px;
  cursor: pointer;
}

.filters button.active {
  background: #06b6d4;
  border-color: #06b6d4;
  color: white;
}

.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.todo-list li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: #1a1a2e;
  border-radius: 6px;
  margin-bottom: 0.5rem;
}

.todo-list li.completed span {
  text-decoration: line-through;
  opacity: 0.6;
}

.todo-list li button {
  margin-left: auto;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 4px;
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.count {
  text-align: center;
  color: #a1a1aa;
  font-size: 0.875rem;
}`,
  },
  {
    id: 'ts-generic-list',
    title: 'Generic List Component',
    description: 'Build a reusable list component using TypeScript generics.',
    language: 'typescript',
    difficulty: 'advanced',
    category: 'components',
    tags: ['generics', 'reusability', 'components'],
    initialCode: `// Generic List Challenge
// Create a type-safe reusable list component

interface ListItem {
  id: number | string;
}

interface User extends ListItem {
  name: string;
  email: string;
  role: 'admin' | 'user';
}

interface Product extends ListItem {
  name: string;
  price: number;
  category: string;
}

const container = document.getElementById('app') as HTMLDivElement;

// Sample data
const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
  { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'user' },
];

const products: Product[] = [
  { id: 'p1', name: 'Laptop', price: 999, category: 'Electronics' },
  { id: 'p2', name: 'Headphones', price: 199, category: 'Electronics' },
  { id: 'p3', name: 'Desk', price: 299, category: 'Furniture' },
];

function renderList<T extends ListItem>(
  items: T[],
  renderItem: (item: T) => string,
  title: string
): string {
  return \`
    <div class="list-container">
      <h3>\${title}</h3>
      <ul class="generic-list">
        \${items.map(item => \`<li>\${renderItem(item)}</li>\`).join('')}
      </ul>
    </div>
  \`;
}

function renderUser(user: User): string {
  return \`
    <div class="user-card">
      <strong>\${user.name}</strong>
      <span class="email">\${user.email}</span>
      <span class="badge \${user.role}">\${user.role}</span>
    </div>
  \`;
}

function renderProduct(product: Product): string {
  return \`
    <div class="product-card">
      <strong>\${product.name}</strong>
      <span class="price">$\${product.price}</span>
      <span class="category">\${product.category}</span>
    </div>
  \`;
}

function render(): void {
  container.innerHTML = \`
    <div class="app">
      <h2>Generic List Demo</h2>
      <div class="lists">
        \${renderList(users, renderUser, 'Users')}
        \${renderList(products, renderProduct, 'Products')}
      </div>
    </div>
  \`;
}

render();`,
    initialCss: `.app {
  padding: 1.5rem;
  max-width: 800px;
  margin: 0 auto;
}

.app h2 {
  color: #06b6d4;
  margin-bottom: 1.5rem;
}

.lists {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.list-container h3 {
  color: #8b5cf6;
  margin-bottom: 0.75rem;
}

.generic-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.generic-list li {
  margin-bottom: 0.5rem;
}

.user-card, .product-card {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  padding: 0.75rem;
  background: #1a1a2e;
  border-radius: 8px;
}

.email, .price, .category {
  font-size: 0.875rem;
  color: #a1a1aa;
}

.badge {
  padding: 0.125rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  margin-left: auto;
}

.badge.admin {
  background: #8b5cf6;
  color: white;
}

.badge.user {
  background: #374151;
  color: white;
}

.price {
  color: #22c55e;
  font-weight: bold;
}`,
  },
];

export default typescriptChallenges;
