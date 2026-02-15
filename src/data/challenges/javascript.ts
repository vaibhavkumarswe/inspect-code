/**
 * Coding Challenges - JavaScript
 * All JavaScript-based coding challenges
 */

import type { Challenge } from '../types';

export const javascriptChallenges: Challenge[] = [
  {
    id: 'js-counter',
    title: 'Counter Component',
    description: 'Build a counter with increment, decrement, and reset functionality.',
    language: 'javascript',
    difficulty: 'beginner',
    category: 'fundamentals',
    tags: ['dom', 'events', 'state'],
    initialCode: `// Counter Challenge
// Create a counter with +, -, and reset buttons

const container = document.getElementById('app');

let count = 0;

function render() {
  container.innerHTML = \`
    <div class="counter-wrapper">
      <h2 class="count">\${count}</h2>
      <div class="buttons">
        <button onclick="decrement()">-</button>
        <button onclick="reset()">Reset</button>
        <button onclick="increment()">+</button>
      </div>
    </div>
  \`;
}

function increment() {
  count++;
  render();
}

function decrement() {
  count--;
  render();
}

function reset() {
  count = 0;
  render();
}

render();`,
    initialCss: `.counter-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
}

.count {
  font-size: 4rem;
  font-weight: bold;
  color: #8b5cf6;
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
  background: linear-gradient(135deg, #8b5cf6, #06b6d4);
  color: white;
  cursor: pointer;
  transition: transform 0.2s, opacity 0.2s;
}

.buttons button:hover {
  opacity: 0.9;
  transform: scale(1.05);
}`,
    hints: [
      'Use a variable to store the current count',
      'Create separate functions for each button action',
      'Remember to call render() after updating the count'
    ],
  },
  {
    id: 'js-todo',
    title: 'Todo List',
    description: 'Create a todo list with add, remove, and toggle complete functionality.',
    language: 'javascript',
    difficulty: 'beginner',
    category: 'dom-manipulation',
    tags: ['array', 'dom', 'crud'],
    initialCode: `// Todo List Challenge
// Create a todo list with CRUD operations

const container = document.getElementById('app');

let todos = [
  { id: 1, text: 'Learn JavaScript', completed: false },
  { id: 2, text: 'Build projects', completed: true },
];
let nextId = 3;

function render() {
  container.innerHTML = \`
    <div class="todo-app">
      <h2>My Todos</h2>
      <div class="add-todo">
        <input type="text" id="todoInput" placeholder="Add new todo..." />
        <button onclick="addTodo()">Add</button>
      </div>
      <ul class="todo-list">
        \${todos.map(todo => \`
          <li class="\${todo.completed ? 'completed' : ''}">
            <input 
              type="checkbox" 
              \${todo.completed ? 'checked' : ''} 
              onchange="toggleTodo(\${todo.id})"
            />
            <span>\${todo.text}</span>
            <button onclick="removeTodo(\${todo.id})">×</button>
          </li>
        \`).join('')}
      </ul>
    </div>
  \`;
}

function addTodo() {
  const input = document.getElementById('todoInput');
  if (input.value.trim()) {
    todos.push({ id: nextId++, text: input.value.trim(), completed: false });
    render();
  }
}

function toggleTodo(id) {
  todos = todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
  render();
}

function removeTodo(id) {
  todos = todos.filter(t => t.id !== id);
  render();
}

render();`,
    initialCss: `.todo-app {
  max-width: 400px;
  margin: 0 auto;
  padding: 1.5rem;
}

.todo-app h2 {
  margin: 0 0 1rem;
  color: #8b5cf6;
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
  background: #8b5cf6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
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
}`,
  },
  {
    id: 'js-accordion',
    title: 'Accordion Component',
    description: 'Build an accordion with expandable sections.',
    language: 'javascript',
    difficulty: 'beginner',
    category: 'components',
    tags: ['ui', 'toggle', 'animation'],
    initialCode: `// Accordion Challenge
// Create an accordion component

const container = document.getElementById('app');

const items = [
  { id: 1, title: 'What is JavaScript?', content: 'JavaScript is a programming language that enables interactive web pages.' },
  { id: 2, title: 'What is React?', content: 'React is a JavaScript library for building user interfaces.' },
  { id: 3, title: 'What is TypeScript?', content: 'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.' },
];

let openId = null;

function render() {
  container.innerHTML = \`
    <div class="accordion">
      <h2>FAQ Accordion</h2>
      \${items.map(item => \`
        <div class="accordion-item \${openId === item.id ? 'open' : ''}">
          <button class="accordion-header" onclick="toggle(\${item.id})">
            <span>\${item.title}</span>
            <span class="icon">\${openId === item.id ? '−' : '+'}</span>
          </button>
          <div class="accordion-content">
            <p>\${item.content}</p>
          </div>
        </div>
      \`).join('')}
    </div>
  \`;
}

function toggle(id) {
  openId = openId === id ? null : id;
  render();
}

render();`,
    initialCss: `.accordion {
  max-width: 500px;
  margin: 0 auto;
  padding: 1.5rem;
}

.accordion h2 {
  margin: 0 0 1rem;
  color: #8b5cf6;
}

.accordion-item {
  background: #1a1a2e;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  overflow: hidden;
}

.accordion-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: transparent;
  border: none;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.accordion-header:hover {
  background: rgba(139, 92, 246, 0.1);
}

.icon {
  font-size: 1.25rem;
  color: #8b5cf6;
}

.accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.accordion-item.open .accordion-content {
  max-height: 200px;
}

.accordion-content p {
  padding: 0 1rem 1rem;
  margin: 0;
  color: #a1a1aa;
}`,
  },
  {
    id: 'js-stopwatch',
    title: 'Stopwatch Timer',
    description: 'Create a stopwatch with start, stop, reset, and lap functionality.',
    language: 'javascript',
    difficulty: 'intermediate',
    category: 'state-management',
    tags: ['timer', 'setInterval', 'state'],
    initialCode: `// Stopwatch Challenge
// Create a stopwatch with lap functionality

const container = document.getElementById('app');

let time = 0;
let isRunning = false;
let intervalId = null;
let laps = [];

function formatTime(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const centiseconds = Math.floor((ms % 1000) / 10);
  return \`\${String(minutes).padStart(2, '0')}:\${String(seconds).padStart(2, '0')}.\${String(centiseconds).padStart(2, '0')}\`;
}

function render() {
  container.innerHTML = \`
    <div class="stopwatch">
      <h1 class="time">\${formatTime(time)}</h1>
      <div class="controls">
        <button onclick="toggleTimer()" class="\${isRunning ? 'stop' : 'start'}">
          \${isRunning ? 'Stop' : 'Start'}
        </button>
        <button onclick="addLap()" \${!isRunning ? 'disabled' : ''}>Lap</button>
        <button onclick="resetTimer()">Reset</button>
      </div>
      <ul class="laps">
        \${laps.map((lap, i) => \`
          <li>Lap \${laps.length - i}: \${formatTime(lap)}</li>
        \`).join('')}
      </ul>
    </div>
  \`;
}

function toggleTimer() {
  if (isRunning) {
    clearInterval(intervalId);
  } else {
    intervalId = setInterval(() => {
      time += 10;
      render();
    }, 10);
  }
  isRunning = !isRunning;
  render();
}

function addLap() {
  laps.unshift(time);
  render();
}

function resetTimer() {
  clearInterval(intervalId);
  time = 0;
  isRunning = false;
  laps = [];
  render();
}

render();`,
    initialCss: `.stopwatch {
  text-align: center;
  padding: 2rem;
}

.time {
  font-size: 4rem;
  font-family: monospace;
  color: #06b6d4;
  margin: 0 0 1.5rem;
}

.controls {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.controls button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.controls button.start {
  background: #22c55e;
  color: white;
}

.controls button.stop {
  background: #ef4444;
  color: white;
}

.controls button:not(.start):not(.stop) {
  background: #374151;
  color: white;
}

.controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.laps {
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 200px;
  overflow-y: auto;
}

.laps li {
  padding: 0.5rem;
  background: #1a1a2e;
  margin-bottom: 0.25rem;
  border-radius: 4px;
  font-family: monospace;
}`,
  },
  {
    id: 'js-calculator',
    title: 'Calculator',
    description: 'Build a functional calculator with basic operations.',
    language: 'javascript',
    difficulty: 'intermediate',
    category: 'fundamentals',
    tags: ['math', 'logic', 'ui'],
    initialCode: `// Calculator Challenge
// Build a functional calculator

const container = document.getElementById('app');

let display = '0';
let currentValue = null;
let operator = null;
let waitingForOperand = false;

function render() {
  container.innerHTML = \`
    <div class="calculator">
      <div class="display">\${display}</div>
      <div class="buttons">
        <button onclick="clear()" class="span-2 secondary">C</button>
        <button onclick="inputOperator('/')" class="operator">÷</button>
        <button onclick="inputOperator('*')" class="operator">×</button>
        
        <button onclick="inputDigit('7')">7</button>
        <button onclick="inputDigit('8')">8</button>
        <button onclick="inputDigit('9')">9</button>
        <button onclick="inputOperator('-')" class="operator">−</button>
        
        <button onclick="inputDigit('4')">4</button>
        <button onclick="inputDigit('5')">5</button>
        <button onclick="inputDigit('6')">6</button>
        <button onclick="inputOperator('+')" class="operator">+</button>
        
        <button onclick="inputDigit('1')">1</button>
        <button onclick="inputDigit('2')">2</button>
        <button onclick="inputDigit('3')">3</button>
        <button onclick="calculate()" class="span-row-2 equals">=</button>
        
        <button onclick="inputDigit('0')" class="span-2">0</button>
        <button onclick="inputDot()">.</button>
      </div>
    </div>
  \`;
}

function inputDigit(digit) {
  if (waitingForOperand) {
    display = digit;
    waitingForOperand = false;
  } else {
    display = display === '0' ? digit : display + digit;
  }
  render();
}

function inputDot() {
  if (!display.includes('.')) {
    display += '.';
    render();
  }
}

function inputOperator(op) {
  const value = parseFloat(display);
  if (currentValue === null) {
    currentValue = value;
  } else if (operator) {
    const result = performCalculation();
    display = String(result);
    currentValue = result;
  }
  operator = op;
  waitingForOperand = true;
  render();
}

function performCalculation() {
  const value = parseFloat(display);
  switch (operator) {
    case '+': return currentValue + value;
    case '-': return currentValue - value;
    case '*': return currentValue * value;
    case '/': return currentValue / value;
    default: return value;
  }
}

function calculate() {
  if (operator && currentValue !== null) {
    const result = performCalculation();
    display = String(result);
    currentValue = null;
    operator = null;
    waitingForOperand = true;
    render();
  }
}

function clear() {
  display = '0';
  currentValue = null;
  operator = null;
  waitingForOperand = false;
  render();
}

render();`,
    initialCss: `.calculator {
  width: 280px;
  margin: 0 auto;
  background: #1a1a2e;
  border-radius: 16px;
  padding: 1rem;
}

.display {
  background: #0f0f1a;
  padding: 1rem;
  text-align: right;
  font-size: 2rem;
  font-family: monospace;
  color: #06b6d4;
  border-radius: 8px;
  margin-bottom: 1rem;
  overflow: hidden;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
}

.buttons button {
  padding: 1rem;
  font-size: 1.25rem;
  border: none;
  border-radius: 8px;
  background: #2a2a4a;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
}

.buttons button:hover {
  background: #3a3a5a;
}

.buttons button.operator {
  background: #8b5cf6;
}

.buttons button.equals {
  background: #06b6d4;
}

.buttons button.secondary {
  background: #374151;
}

.span-2 { grid-column: span 2; }
.span-row-2 { grid-row: span 2; }`,
  },
];

export default javascriptChallenges;
