/**
 * Coding Challenges - React
 * All React-based coding challenges
 */

import type { Challenge } from '../types';

export const reactChallenges: Challenge[] = [
  {
    id: 'react-counter',
    title: 'React Counter',
    description: 'Build a counter component using React hooks.',
    language: 'react',
    difficulty: 'beginner',
    category: 'hooks',
    tags: ['useState', 'events', 'components'],
    initialCode: `// React Counter Challenge
// Build a counter using React hooks

function App() {
  const [count, setCount] = React.useState(0);

  return (
    <div className="counter-wrapper">
      <h2 className="count">{count}</h2>
      <div className="buttons">
        <button onClick={() => setCount(c => c - 1)}>-</button>
        <button onClick={() => setCount(0)}>Reset</button>
        <button onClick={() => setCount(c => c + 1)}>+</button>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));`,
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
  background: linear-gradient(135deg, #61dafb, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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
  background: linear-gradient(135deg, #61dafb, #8b5cf6);
  color: white;
  cursor: pointer;
  transition: transform 0.2s, opacity 0.2s;
}

.buttons button:hover {
  opacity: 0.9;
  transform: scale(1.05);
}`,
  },
  {
    id: 'react-todo',
    title: 'React Todo List',
    description: 'Create a todo list with add, remove, and toggle functionality using React.',
    language: 'react',
    difficulty: 'beginner',
    category: 'state-management',
    tags: ['useState', 'lists', 'forms'],
    initialCode: `// React Todo List Challenge
// Create a todo list with CRUD operations

function App() {
  const [todos, setTodos] = React.useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build awesome apps', completed: true },
  ]);
  const [input, setInput] = React.useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input.trim(), completed: false }]);
      setInput('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <div className="todo-app">
      <h2>React Todos</h2>
      <div className="add-todo">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add new todo..."
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span>{todo.text}</span>
            <button onClick={() => removeTodo(todo.id)}>×</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));`,
    initialCss: `.todo-app {
  max-width: 400px;
  margin: 0 auto;
  padding: 1.5rem;
}

.todo-app h2 {
  margin: 0 0 1rem;
  color: #61dafb;
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
  background: #61dafb;
  color: #1a1a2e;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
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
    id: 'react-use-effect',
    title: 'useEffect Timer',
    description: 'Learn useEffect by building a timer with cleanup.',
    language: 'react',
    difficulty: 'intermediate',
    category: 'hooks',
    tags: ['useEffect', 'cleanup', 'timer'],
    initialCode: `// useEffect Timer Challenge
// Build a timer demonstrating useEffect cleanup

function App() {
  const [seconds, setSeconds] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(false);

  React.useEffect(() => {
    let interval = null;
    
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    }

    // Cleanup function
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return \`\${String(mins).padStart(2, '0')}:\${String(secs).padStart(2, '0')}\`;
  };

  const reset = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  return (
    <div className="timer">
      <h1 className="time">{formatTime(seconds)}</h1>
      <div className="controls">
        <button 
          onClick={() => setIsRunning(!isRunning)}
          className={isRunning ? 'stop' : 'start'}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button onClick={reset} className="reset">Reset</button>
      </div>
      <p className="hint">
        This timer uses useEffect with cleanup to prevent memory leaks!
      </p>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));`,
    initialCss: `.timer {
  text-align: center;
  padding: 2rem;
}

.time {
  font-size: 5rem;
  font-family: monospace;
  color: #61dafb;
  margin: 0 0 1.5rem;
}

.controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.controls button {
  padding: 0.75rem 2rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s;
}

.controls button.start {
  background: #22c55e;
  color: white;
}

.controls button.stop {
  background: #f59e0b;
  color: white;
}

.controls button.reset {
  background: #374151;
  color: white;
}

.controls button:hover {
  transform: scale(1.05);
}

.hint {
  color: #a1a1aa;
  font-size: 0.875rem;
  max-width: 300px;
  margin: 0 auto;
}`,
  },
  {
    id: 'react-context',
    title: 'Theme Context',
    description: 'Use React Context to create a theme switcher.',
    language: 'react',
    difficulty: 'intermediate',
    category: 'state-management',
    tags: ['context', 'theming', 'provider'],
    initialCode: `// React Context Challenge
// Create a theme switcher using Context

const ThemeContext = React.createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = React.useState('dark');
  
  const toggleTheme = () => {
    setTheme(t => t === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  return React.useContext(ThemeContext);
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme} className="theme-toggle">
      {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
}

function Card() {
  const { theme } = useTheme();
  
  return (
    <div className={\`card \${theme}\`}>
      <h3>Themed Card</h3>
      <p>This card responds to the theme context!</p>
    </div>
  );
}

function App() {
  const { theme } = useTheme();
  
  return (
    <div className={\`app \${theme}\`}>
      <h2>Context Theme Demo</h2>
      <ThemeToggle />
      <Card />
      <Card />
    </div>
  );
}

ReactDOM.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  document.getElementById('app')
);`,
    initialCss: `.app {
  padding: 2rem;
  min-height: 100vh;
  transition: all 0.3s ease;
}

.app.dark {
  background: #0f0f1a;
  color: white;
}

.app.light {
  background: #f5f5f5;
  color: #1a1a2e;
}

.app h2 {
  color: #61dafb;
  margin-bottom: 1rem;
}

.theme-toggle {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  transition: all 0.3s;
}

.dark .theme-toggle {
  background: #374151;
  color: white;
}

.light .theme-toggle {
  background: #e5e7eb;
  color: #1a1a2e;
}

.card {
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
}

.card.dark {
  background: #1a1a2e;
  border: 1px solid #333;
}

.card.light {
  background: white;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.card h3 {
  margin: 0 0 0.5rem;
  color: #61dafb;
}

.card p {
  margin: 0;
  opacity: 0.8;
}`,
  },
  {
    id: 'react-custom-hook',
    title: 'Custom Hook: useLocalStorage',
    description: 'Create a custom hook for persisting state to localStorage.',
    language: 'react',
    difficulty: 'advanced',
    category: 'hooks',
    tags: ['custom-hooks', 'localStorage', 'persistence'],
    initialCode: `// Custom Hook Challenge
// Create useLocalStorage hook

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = React.useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

function App() {
  const [name, setName] = useLocalStorage('name', '');
  const [count, setCount] = useLocalStorage('count', 0);
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [input, setInput] = React.useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, done: false }]);
      setInput('');
    }
  };

  return (
    <div className="app">
      <h2>useLocalStorage Demo</h2>
      <p className="hint">Data persists even after page refresh!</p>
      
      <div className="section">
        <label>Your Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name..."
        />
        {name && <p>Hello, {name}! 👋</p>}
      </div>

      <div className="section">
        <label>Persistent Counter:</label>
        <div className="counter">
          <button onClick={() => setCount(c => c - 1)}>-</button>
          <span>{count}</span>
          <button onClick={() => setCount(c => c + 1)}>+</button>
        </div>
      </div>

      <div className="section">
        <label>Persistent Todos:</label>
        <div className="add-todo">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            placeholder="Add todo..."
          />
          <button onClick={addTodo}>Add</button>
        </div>
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              {todo.text}
              <button onClick={() => setTodos(todos.filter(t => t.id !== todo.id))}>×</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));`,
    initialCss: `.app {
  padding: 1.5rem;
  max-width: 400px;
  margin: 0 auto;
}

.app h2 {
  color: #61dafb;
  margin: 0 0 0.5rem;
}

.hint {
  color: #22c55e;
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
}

.section {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #1a1a2e;
  border-radius: 8px;
}

.section label {
  display: block;
  color: #a1a1aa;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.section input {
  width: 100%;
  padding: 0.5rem;
  border: 2px solid #333;
  border-radius: 6px;
  background: #0f0f1a;
  color: white;
}

.counter {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.counter button {
  padding: 0.5rem 1rem;
  background: #61dafb;
  color: #1a1a2e;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.counter span {
  font-size: 1.5rem;
  font-weight: bold;
  color: #61dafb;
}

.add-todo {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.add-todo button {
  padding: 0.5rem 1rem;
  background: #61dafb;
  color: #1a1a2e;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  background: #0f0f1a;
  border-radius: 4px;
  margin-bottom: 0.25rem;
}

li button {
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 24px;
  height: 24px;
}`,
  },
];

export default reactChallenges;
