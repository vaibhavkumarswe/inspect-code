import type { InterviewChallenge } from './types';

export const interviewChallenges: InterviewChallenge[] = [
  {
    id: 'iv-debounce-search',
    title: 'Debounced Search Input',
    description: 'Build a search input that debounces user keystrokes and displays filtered results. This is a common frontend interview question testing your understanding of performance optimization.',
    category: 'react-hooks',
    difficulty: 'easy',
    timeLimit: 15,
    requirements: [
      'Create a search input with debounce (300ms delay)',
      'Filter a list of items based on the search query',
      'Show a loading indicator while debouncing',
      'Display "No results" when nothing matches',
    ],
    hints: [
      'Use useState for the input value and a separate state for the debounced value',
      'Use useEffect with a setTimeout to implement the debounce',
      'Clean up the timeout in the useEffect return function',
    ],
    tags: ['useState', 'useEffect', 'debounce', 'performance'],
    initialCode: `const items = ['React', 'Angular', 'Vue', 'Svelte', 'Next.js', 'Remix', 'Astro', 'SolidJS'];

const App = () => {
  // TODO: Implement debounced search
  // 1. Create state for search query
  // 2. Create a debounce mechanism with useEffect
  // 3. Filter and display results

  return (
    <div className="app">
      <h1>🔍 Debounced Search</h1>
      <input placeholder="Search frameworks..." />
      <ul>
        {items.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);`,
    initialCss: `.app {
  max-width: 400px;
  margin: 2rem auto;
  padding: 1.5rem;
}
h1 { text-align: center; margin-bottom: 1rem; }
input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #333;
  border-radius: 0.5rem;
  background: #1a1a2e;
  color: white;
  font-size: 1rem;
  margin-bottom: 1rem;
}
input:focus { outline: none; border-color: #3b82f6; }
ul { list-style: none; padding: 0; }
li {
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  background: #1a1a2e;
  border-radius: 0.5rem;
  transition: background 0.2s;
}
li:hover { background: #2a2a4e; }
.loading { text-align: center; color: #888; padding: 1rem; }
.no-results { text-align: center; color: #666; padding: 2rem; }`,
  },
  {
    id: 'iv-todo-app',
    title: 'Todo App with CRUD',
    description: 'Build a complete Todo application with add, toggle, delete, and filter functionality. Tests your component design and state management skills.',
    category: 'state-management',
    difficulty: 'easy',
    timeLimit: 20,
    requirements: [
      'Add new todos with an input field and Enter key',
      'Toggle todo completion with a click',
      'Delete todos with a delete button',
      'Filter todos: All, Active, Completed',
      'Show remaining count of active todos',
    ],
    hints: [
      'Use an array of objects with id, text, and completed properties',
      'Use filter to implement the different views',
      'Generate unique IDs with Date.now()',
    ],
    tags: ['useState', 'CRUD', 'filtering', 'state-management'],
    initialCode: `const App = () => {
  // TODO: Implement Todo App
  // 1. State for todos array and filter mode
  // 2. Add, toggle, delete functions
  // 3. Filter logic for All/Active/Completed

  return (
    <div className="app">
      <h1>✅ Todo App</h1>
      <div className="input-group">
        <input placeholder="What needs to be done?" />
      </div>
      <div className="filters">
        <button className="active">All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
      <ul className="todo-list">
        <li>
          <span>Sample todo</span>
          <button className="delete">×</button>
        </li>
      </ul>
      <p className="count">0 items left</p>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);`,
    initialCss: `.app {
  max-width: 450px;
  margin: 2rem auto;
  padding: 1.5rem;
}
h1 { text-align: center; margin-bottom: 1.5rem; }
.input-group { margin-bottom: 1rem; }
.input-group input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #333;
  border-radius: 0.5rem;
  background: #1a1a2e;
  color: white;
  font-size: 1rem;
}
.filters {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.filters button {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #333;
  border-radius: 0.5rem;
  background: transparent;
  color: #888;
  cursor: pointer;
  transition: all 0.2s;
}
.filters button.active, .filters button:hover {
  border-color: #3b82f6;
  color: #3b82f6;
  background: #3b82f620;
}
.todo-list { list-style: none; padding: 0; }
.todo-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  background: #1a1a2e;
  border-radius: 0.5rem;
}
.todo-list li span { cursor: pointer; }
.todo-list li.done span { text-decoration: line-through; opacity: 0.5; }
.delete {
  background: #ef444430;
  border: none;
  color: #ef4444;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1.2rem;
}
.count { text-align: center; color: #666; margin-top: 1rem; font-size: 0.875rem; }`,
  },
  {
    id: 'iv-infinite-scroll',
    title: 'Infinite Scroll List',
    description: 'Implement an infinite scroll list that loads more items as the user scrolls to the bottom. Tests your understanding of Intersection Observer and async data loading.',
    category: 'dom-manipulation',
    difficulty: 'medium',
    timeLimit: 25,
    requirements: [
      'Display a list of items (simulate API with setTimeout)',
      'Load 10 more items when user scrolls near the bottom',
      'Show a loading spinner while fetching',
      'Use Intersection Observer API',
      'Handle the "no more items" state',
    ],
    hints: [
      'Create a sentinel element at the bottom of the list',
      'Use useRef for the Intersection Observer and sentinel element',
      'Use useCallback to create a stable observer callback',
    ],
    tags: ['IntersectionObserver', 'useRef', 'useCallback', 'pagination'],
    initialCode: `// Simulated API
const fetchItems = (page) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const items = Array.from({ length: 10 }, (_, i) => ({
        id: page * 10 + i + 1,
        title: \`Item #\${page * 10 + i + 1}\`,
        description: \`Description for item \${page * 10 + i + 1}\`,
      }));
      resolve({ items, hasMore: page < 5 });
    }, 800);
  });
};

const App = () => {
  // TODO: Implement infinite scroll
  // 1. State for items, page, loading, hasMore
  // 2. Intersection Observer to detect scroll bottom
  // 3. Load more items when sentinel is visible

  return (
    <div className="app">
      <h1>📜 Infinite Scroll</h1>
      <div className="list">
        <div className="item">
          <h3>Item #1</h3>
          <p>Description for item 1</p>
        </div>
      </div>
      <div className="loading">Loading...</div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);`,
    initialCss: `.app {
  max-width: 500px;
  margin: 2rem auto;
  padding: 1.5rem;
}
h1 { text-align: center; margin-bottom: 1.5rem; }
.list { display: flex; flex-direction: column; gap: 0.75rem; }
.item {
  padding: 1rem 1.25rem;
  background: #1a1a2e;
  border-radius: 0.75rem;
  border: 1px solid #333;
}
.item h3 { margin-bottom: 0.25rem; font-size: 1rem; }
.item p { color: #888; font-size: 0.875rem; }
.loading {
  text-align: center;
  padding: 2rem;
  color: #3b82f6;
}
.end-message {
  text-align: center;
  padding: 2rem;
  color: #666;
}`,
  },
  {
    id: 'iv-modal-component',
    title: 'Accessible Modal Component',
    description: 'Build a reusable, accessible modal component with focus trap, ESC to close, and backdrop click. Tests component design and accessibility knowledge.',
    category: 'component-design',
    difficulty: 'medium',
    timeLimit: 30,
    requirements: [
      'Open/close modal with a trigger button',
      'Close on ESC key press',
      'Close on backdrop (overlay) click',
      'Trap focus inside the modal when open',
      'Animate open/close transitions',
      'Include proper ARIA attributes',
    ],
    hints: [
      'Use createPortal to render the modal outside the component tree',
      'Use useEffect to add/remove keydown listener for ESC',
      'Set aria-modal="true" and role="dialog" on the modal',
    ],
    tags: ['accessibility', 'portal', 'focus-trap', 'ARIA', 'component-design'],
    initialCode: `const App = () => {
  // TODO: Build an accessible modal
  // 1. State for open/close
  // 2. ESC key handler
  // 3. Backdrop click handler
  // 4. Focus management
  // 5. ARIA attributes

  return (
    <div className="app">
      <h1>🪟 Accessible Modal</h1>
      <p>Build a fully accessible modal component</p>
      <button className="trigger-btn">Open Modal</button>
      
      {/* Modal goes here */}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);`,
    initialCss: `.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: 1rem;
}
.trigger-btn {
  padding: 0.75rem 2rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.trigger-btn:hover { background: #2563eb; }
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}
.modal {
  background: #1a1a2e;
  border: 1px solid #333;
  border-radius: 1rem;
  padding: 2rem;
  max-width: 450px;
  width: 90%;
  position: relative;
}
.modal h2 { margin-bottom: 1rem; }
.modal p { color: #888; margin-bottom: 1.5rem; }
.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #888;
  font-size: 1.5rem;
  cursor: pointer;
}
.modal-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}
.modal-actions button {
  padding: 0.5rem 1.25rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
}
.btn-cancel { background: #333; color: white; }
.btn-confirm { background: #3b82f6; color: white; }`,
  },
  {
    id: 'iv-data-table',
    title: 'Sortable Data Table',
    description: 'Build a data table with sorting, searching, and pagination. A classic frontend machine coding question that tests data manipulation skills.',
    category: 'component-design',
    difficulty: 'medium',
    timeLimit: 30,
    requirements: [
      'Display data in a table with columns: Name, Email, Role, Status',
      'Click column headers to sort (asc/desc toggle)',
      'Add a search bar that filters across all columns',
      'Implement pagination (5 items per page)',
      'Show sort direction indicator on active column',
    ],
    hints: [
      'Use Array.sort() with a comparator based on the active column',
      'Track sort column and direction in state',
      'Filter first, then sort, then paginate',
    ],
    tags: ['sorting', 'filtering', 'pagination', 'tables'],
    initialCode: `const users = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active' },
  { id: 3, name: 'Carol Williams', email: 'carol@example.com', role: 'Viewer', status: 'Inactive' },
  { id: 4, name: 'Dave Brown', email: 'dave@example.com', role: 'Editor', status: 'Active' },
  { id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'Admin', status: 'Active' },
  { id: 6, name: 'Frank Miller', email: 'frank@example.com', role: 'Viewer', status: 'Inactive' },
  { id: 7, name: 'Grace Wilson', email: 'grace@example.com', role: 'Editor', status: 'Active' },
  { id: 8, name: 'Hank Moore', email: 'hank@example.com', role: 'Viewer', status: 'Active' },
  { id: 9, name: 'Ivy Taylor', email: 'ivy@example.com', role: 'Admin', status: 'Inactive' },
  { id: 10, name: 'Jack Anderson', email: 'jack@example.com', role: 'Editor', status: 'Active' },
  { id: 11, name: 'Kate Thomas', email: 'kate@example.com', role: 'Viewer', status: 'Active' },
  { id: 12, name: 'Leo Jackson', email: 'leo@example.com', role: 'Admin', status: 'Active' },
];

const App = () => {
  // TODO: Implement sortable data table
  // 1. State for sort column, direction, search, page
  // 2. Filter → Sort → Paginate pipeline
  // 3. Clickable column headers with direction indicator

  return (
    <div className="app">
      <h1>📊 Data Table</h1>
      <input placeholder="Search users..." className="search" />
      <table>
        <thead>
          <tr>
            <th>Name ↕</th>
            <th>Email ↕</th>
            <th>Role ↕</th>
            <th>Status ↕</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Alice Johnson</td><td>alice@example.com</td><td>Admin</td><td>Active</td></tr>
        </tbody>
      </table>
      <div className="pagination">
        <button>← Prev</button>
        <span>Page 1 of 3</span>
        <button>Next →</button>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);`,
    initialCss: `.app {
  max-width: 700px;
  margin: 2rem auto;
  padding: 1.5rem;
}
h1 { text-align: center; margin-bottom: 1.5rem; }
.search {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #333;
  border-radius: 0.5rem;
  background: #1a1a2e;
  color: white;
  margin-bottom: 1rem;
}
table { width: 100%; border-collapse: collapse; }
th, td {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid #333;
}
th {
  background: #1a1a2e;
  cursor: pointer;
  user-select: none;
  font-weight: 600;
}
th:hover { color: #3b82f6; }
tr:hover td { background: #1a1a2e40; }
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}
.pagination button {
  padding: 0.5rem 1rem;
  background: #333;
  border: none;
  color: white;
  border-radius: 0.5rem;
  cursor: pointer;
}
.pagination button:disabled { opacity: 0.4; cursor: not-allowed; }`,
  },
  {
    id: 'iv-form-validation',
    title: 'Form with Custom Validation',
    description: 'Build a signup form with real-time validation, error messages, and submission handling. Tests form state management and UX patterns.',
    category: 'react-hooks',
    difficulty: 'medium',
    timeLimit: 25,
    requirements: [
      'Fields: Name, Email, Password, Confirm Password',
      'Real-time validation on blur and on change after first blur',
      'Show inline error messages below each field',
      'Password strength indicator (weak/medium/strong)',
      'Disable submit button until all fields are valid',
      'Show success message on valid submission',
    ],
    hints: [
      'Track "touched" state for each field to know when to show errors',
      'Create a validate function that returns an errors object',
      'Password strength: check length, uppercase, numbers, special chars',
    ],
    tags: ['forms', 'validation', 'UX', 'useState'],
    initialCode: `const App = () => {
  // TODO: Implement form with validation
  // 1. State for form values, errors, touched fields
  // 2. Validation logic per field
  // 3. Password strength calculation
  // 4. Submit handler

  return (
    <div className="app">
      <h1>📝 Sign Up</h1>
      <form>
        <div className="field">
          <label>Name</label>
          <input type="text" placeholder="John Doe" />
        </div>
        <div className="field">
          <label>Email</label>
          <input type="email" placeholder="john@example.com" />
        </div>
        <div className="field">
          <label>Password</label>
          <input type="password" placeholder="••••••••" />
          <div className="strength-bar"><div className="strength-fill"></div></div>
        </div>
        <div className="field">
          <label>Confirm Password</label>
          <input type="password" placeholder="••••••••" />
        </div>
        <button type="submit" className="submit-btn">Create Account</button>
      </form>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);`,
    initialCss: `.app {
  max-width: 400px;
  margin: 2rem auto;
  padding: 1.5rem;
}
h1 { text-align: center; margin-bottom: 1.5rem; }
.field { margin-bottom: 1.25rem; }
label { display: block; margin-bottom: 0.5rem; font-size: 0.875rem; color: #ccc; }
input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #333;
  border-radius: 0.5rem;
  background: #1a1a2e;
  color: white;
  font-size: 1rem;
}
input:focus { outline: none; border-color: #3b82f6; }
input.error { border-color: #ef4444; }
.error-msg { color: #ef4444; font-size: 0.75rem; margin-top: 0.25rem; }
.strength-bar {
  height: 4px;
  background: #333;
  border-radius: 2px;
  margin-top: 0.5rem;
  overflow: hidden;
}
.strength-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 0.3s, background 0.3s;
}
.submit-btn {
  width: 100%;
  padding: 0.75rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.submit-btn:hover { background: #2563eb; }
.submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.success { text-align: center; color: #22c55e; padding: 2rem; }`,
  },
  {
    id: 'iv-drag-drop',
    title: 'Drag & Drop Kanban Board',
    description: 'Build a simple Kanban board with drag-and-drop between columns. A hard interview question testing advanced DOM interaction and state management.',
    category: 'dom-manipulation',
    difficulty: 'hard',
    timeLimit: 45,
    requirements: [
      'Three columns: Todo, In Progress, Done',
      'Drag cards between columns using HTML5 Drag & Drop API',
      'Visual feedback during drag (opacity change, drop zone highlight)',
      'Add new cards to the Todo column',
      'Delete cards from any column',
    ],
    hints: [
      'Use onDragStart, onDragOver (with preventDefault), and onDrop events',
      'Store the dragged item ID in dataTransfer or state',
      'Structure state as an object with column IDs as keys and arrays of cards as values',
    ],
    tags: ['drag-drop', 'HTML5', 'kanban', 'state-management'],
    initialCode: `const initialData = {
  todo: [
    { id: '1', text: 'Design homepage' },
    { id: '2', text: 'Setup CI/CD' },
  ],
  inProgress: [
    { id: '3', text: 'Build API endpoints' },
  ],
  done: [
    { id: '4', text: 'Project kickoff' },
  ],
};

const App = () => {
  // TODO: Implement Kanban board
  // 1. State for columns and cards
  // 2. Drag & Drop handlers
  // 3. Add/delete card functions

  return (
    <div className="app">
      <h1>📋 Kanban Board</h1>
      <div className="board">
        <div className="column">
          <h2>Todo</h2>
          <div className="cards">
            <div className="card" draggable>Design homepage</div>
          </div>
          <button className="add-btn">+ Add Card</button>
        </div>
        <div className="column">
          <h2>In Progress</h2>
          <div className="cards">
            <div className="card" draggable>Build API endpoints</div>
          </div>
        </div>
        <div className="column">
          <h2>Done</h2>
          <div className="cards">
            <div className="card" draggable>Project kickoff</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);`,
    initialCss: `.app {
  max-width: 900px;
  margin: 1rem auto;
  padding: 1rem;
}
h1 { text-align: center; margin-bottom: 1.5rem; font-size: 1.5rem; }
.board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
.column {
  background: #1a1a2e;
  border-radius: 0.75rem;
  padding: 1rem;
  border: 1px solid #333;
  min-height: 300px;
}
.column.drag-over {
  border-color: #3b82f6;
  background: #1a1a3e;
}
.column h2 {
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #888;
  margin-bottom: 0.75rem;
}
.cards { display: flex; flex-direction: column; gap: 0.5rem; min-height: 50px; }
.card {
  background: #0f0f1a;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #333;
  cursor: grab;
  transition: all 0.2s;
  font-size: 0.875rem;
}
.card:active { cursor: grabbing; }
.card.dragging { opacity: 0.4; }
.card:hover { border-color: #555; }
.add-btn {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  background: transparent;
  border: 1px dashed #444;
  border-radius: 0.5rem;
  color: #666;
  cursor: pointer;
  font-size: 0.8rem;
}
.add-btn:hover { border-color: #3b82f6; color: #3b82f6; }`,
  },
  {
    id: 'iv-useReducer-cart',
    title: 'Shopping Cart with useReducer',
    description: 'Build a shopping cart using useReducer for complex state management. Tests your understanding of the reducer pattern and action dispatching.',
    category: 'state-management',
    difficulty: 'medium',
    timeLimit: 30,
    requirements: [
      'Display a list of products with "Add to Cart" buttons',
      'Show cart with item quantities and total price',
      'Increment/decrement item quantities in cart',
      'Remove items from cart',
      'Use useReducer (not useState) for cart state',
    ],
    hints: [
      'Define action types: ADD_ITEM, REMOVE_ITEM, INCREMENT, DECREMENT',
      'Cart state can be an array of { product, quantity } objects',
      'Calculate total price with reduce()',
    ],
    tags: ['useReducer', 'state-management', 'e-commerce', 'reducer-pattern'],
    initialCode: `const products = [
  { id: 1, name: 'Wireless Headphones', price: 79.99, emoji: '🎧' },
  { id: 2, name: 'Mechanical Keyboard', price: 129.99, emoji: '⌨️' },
  { id: 3, name: 'USB-C Hub', price: 49.99, emoji: '🔌' },
  { id: 4, name: 'Webcam HD', price: 89.99, emoji: '📷' },
  { id: 5, name: 'Monitor Light', price: 34.99, emoji: '💡' },
];

// TODO: Define reducer and action types

const App = () => {
  // TODO: Implement shopping cart with useReducer

  return (
    <div className="app">
      <h1>🛒 Shopping Cart</h1>
      <div className="layout">
        <div className="products">
          <h2>Products</h2>
          {products.map(p => (
            <div key={p.id} className="product">
              <span className="emoji">{p.emoji}</span>
              <div>
                <h3>{p.name}</h3>
                <p>\${p.price}</p>
              </div>
              <button>Add</button>
            </div>
          ))}
        </div>
        <div className="cart">
          <h2>Cart (0)</h2>
          <p className="empty">Cart is empty</p>
          <div className="total">
            <span>Total:</span>
            <span>$0.00</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);`,
    initialCss: `.app {
  max-width: 700px;
  margin: 1rem auto;
  padding: 1rem;
}
h1 { text-align: center; margin-bottom: 1rem; }
h2 { font-size: 1.1rem; margin-bottom: 0.75rem; }
.layout { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
.products, .cart {
  background: #1a1a2e;
  border-radius: 0.75rem;
  padding: 1rem;
  border: 1px solid #333;
}
.product {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  background: #0f0f1a;
  border-radius: 0.5rem;
}
.product .emoji { font-size: 1.5rem; }
.product h3 { font-size: 0.875rem; }
.product p { font-size: 0.75rem; color: #3b82f6; }
.product button {
  margin-left: auto;
  padding: 0.4rem 0.75rem;
  background: #3b82f6;
  border: none;
  color: white;
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 0.75rem;
}
.cart-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #333;
  font-size: 0.85rem;
}
.qty-controls { display: flex; align-items: center; gap: 0.5rem; }
.qty-controls button {
  width: 24px; height: 24px;
  display: flex; align-items: center; justify-content: center;
  background: #333; border: none; color: white;
  border-radius: 0.25rem; cursor: pointer; font-size: 0.8rem;
}
.empty { color: #666; text-align: center; padding: 2rem 0; font-size: 0.875rem; }
.total {
  display: flex;
  justify-content: space-between;
  padding-top: 0.75rem;
  margin-top: 0.75rem;
  border-top: 1px solid #333;
  font-weight: bold;
}`,
  },
];
