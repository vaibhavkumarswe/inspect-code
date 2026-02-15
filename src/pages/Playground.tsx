import { useState, useCallback, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { 
  Play, 
  RotateCcw, 
  Terminal, 
  Eye, 
  Code2, 
  Loader2,
  Download,
  Copy,
  Check,
  FileCode,
  Palette,
  Layout
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/store/hooks';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/components/ui/resizable';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

type LanguageMode = 'javascript' | 'typescript' | 'react' | 'html';

interface ConsoleLog {
  type: 'log' | 'error' | 'warn' | 'info';
  content: string;
  timestamp: Date;
}

interface Template {
  id: string;
  name: string;
  language: LanguageMode;
  code: string;
  css: string;
}

const templates: Template[] = [
  {
    id: 'react-counter',
    name: 'React Counter',
    language: 'react',
    code: `const App = () => {
  const [count, setCount] = React.useState(0);
  
  return (
    <div className="app">
      <h1>React Counter</h1>
      <p className="count">{count}</p>
      <div className="buttons">
        <button onClick={() => setCount(c => c - 1)}>-</button>
        <button onClick={() => setCount(0)}>Reset</button>
        <button onClick={() => setCount(c => c + 1)}>+</button>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);`,
    css: `.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: 1rem;
}

h1 {
  font-size: 2rem;
  background: linear-gradient(135deg, #00d4ff, #a855f7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.count {
  font-size: 4rem;
  font-weight: bold;
}

.buttons {
  display: flex;
  gap: 0.5rem;
}

button {
  padding: 0.75rem 1.5rem;
  font-size: 1.25rem;
  border: none;
  border-radius: 0.5rem;
  background: #333;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
}

button:hover {
  background: #555;
  transform: scale(1.05);
}`,
  },
  {
    id: 'js-vanilla',
    name: 'Vanilla JS',
    language: 'javascript',
    code: `// Vanilla JavaScript Example
const app = document.getElementById('app');

const heading = document.createElement('h1');
heading.textContent = 'Hello, JavaScript!';
app.appendChild(heading);

const button = document.createElement('button');
button.textContent = 'Click me!';
button.onclick = () => {
  console.log('Button clicked!');
  alert('Hello from JavaScript!');
};
app.appendChild(button);

console.log('App initialized!');`,
    css: `body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: 1rem;
}

h1 {
  font-size: 2rem;
  color: #f7df1e;
}

button {
  padding: 1rem 2rem;
  font-size: 1rem;
  border: none;
  border-radius: 0.5rem;
  background: #f7df1e;
  color: #000;
  cursor: pointer;
}

button:hover {
  opacity: 0.9;
}`,
  },
  {
    id: 'ts-example',
    name: 'TypeScript',
    language: 'typescript',
    code: `// TypeScript Example
interface User {
  name: string;
  age: number;
  email: string;
}

function greetUser(user: User): string {
  return \`Hello, \${user.name}! You are \${user.age} years old.\`;
}

const user: User = {
  name: 'Developer',
  age: 25,
  email: 'dev@example.com'
};

const app = document.getElementById('app');
if (app) {
  app.innerHTML = \`
    <h1>\${greetUser(user)}</h1>
    <p>Email: \${user.email}</p>
  \`;
}

console.log('User data:', user);`,
    css: `body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: 1rem;
}

h1 {
  font-size: 1.5rem;
  color: #3178c6;
}

p {
  color: #888;
}`,
  },
  {
    id: 'html-basic',
    name: 'HTML/CSS',
    language: 'html',
    code: `<!DOCTYPE html>
<html>
<head>
  <title>My Page</title>
</head>
<body>
  <div class="container">
    <h1>Welcome!</h1>
    <p>This is a basic HTML template.</p>
    <button onclick="alert('Hello!')">Click Me</button>
  </div>
</body>
</html>`,
    css: `.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: 1rem;
}

h1 {
  font-size: 2.5rem;
  background: linear-gradient(135deg, #ff6b6b, #feca57);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

button {
  padding: 1rem 2rem;
  font-size: 1rem;
  border: 2px solid #ff6b6b;
  border-radius: 2rem;
  background: transparent;
  color: #ff6b6b;
  cursor: pointer;
  transition: all 0.3s;
}

button:hover {
  background: #ff6b6b;
  color: white;
}`,
  },
  {
    id: 'react-todo',
    name: 'React Todo App',
    language: 'react',
    code: `const App = () => {
  const [todos, setTodos] = React.useState([
    { id: 1, text: 'Learn React', done: false },
    { id: 2, text: 'Build something cool', done: false },
  ]);
  const [input, setInput] = React.useState('');

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input, done: false }]);
    setInput('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <div className="app">
      <h1>📝 Todo App</h1>
      <div className="input-group">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a task..."
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={todo.done ? 'done' : ''}>
            <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)}>×</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);`,
    css: `.app {
  max-width: 400px;
  margin: 2rem auto;
  padding: 1.5rem;
}

h1 { 
  text-align: center; 
  margin-bottom: 1.5rem;
}

.input-group {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #333;
  border-radius: 0.5rem;
  background: #1a1a2e;
  color: white;
}

button {
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 0.5rem;
  background: #00d4ff;
  color: #000;
  cursor: pointer;
}

.todo-list {
  list-style: none;
  padding: 0;
}

.todo-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  background: #1a1a2e;
  border-radius: 0.5rem;
}

.todo-list li span {
  cursor: pointer;
}

.todo-list li.done span {
  text-decoration: line-through;
  opacity: 0.5;
}

.todo-list li button {
  background: #ff4757;
  padding: 0.25rem 0.5rem;
  font-size: 1rem;
}`,
  },
];

const languageInfo = {
  javascript: { label: 'JavaScript', color: '#f7df1e', monacoLang: 'javascript' },
  typescript: { label: 'TypeScript', color: '#3178c6', monacoLang: 'typescript' },
  react: { label: 'React', color: '#61dafb', monacoLang: 'javascript' },
  html: { label: 'HTML', color: '#e34f26', monacoLang: 'html' },
};

const Playground = () => {
  const theme = useAppSelector((state) => state.theme.mode);
  
  const [language, setLanguage] = useState<LanguageMode>('react');
  const [code, setCode] = useState(templates[0].code);
  const [css, setCss] = useState(templates[0].css);
  const [activeTab, setActiveTab] = useState<'code' | 'css'>('code');
  const [consoleLogs, setConsoleLogs] = useState<ConsoleLog[]>([]);
  const [previewHtml, setPreviewHtml] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleTemplateChange = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setLanguage(template.language);
      setCode(template.code);
      setCss(template.css);
      setConsoleLogs([]);
    }
  };

  const runCode = useCallback(() => {
    setIsRunning(true);
    setConsoleLogs([]);
    
    const isReact = language === 'react';
    const isTypeScript = language === 'typescript';
    const isHtml = language === 'html';
    
    let processedCode = code;
    
    if (isTypeScript) {
      processedCode = code
        .replace(/:\s*(string|number|boolean|void|any|unknown|never|object|null|undefined|\w+\[\]|Record<[^>]+>|Pick<[^>]+>|Omit<[^>]+>|Partial<[^>]+>|Required<[^>]+>|\{[^}]*\})/g, '')
        .replace(/<\w+>/g, '')
        .replace(/as \w+/g, '')
        .replace(/interface\s+\w+\s*\{[^}]*\}/g, '')
        .replace(/type\s+\w+\s*=\s*[^;]+;/g, '');
    }
    
    const html = isHtml ? code : `
      <!DOCTYPE html>
      <html>
        <head>
          ${isReact ? `
            <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
            <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
            <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
          ` : ''}
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { 
              font-family: system-ui, -apple-system, sans-serif;
              background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%);
              color: white;
              min-height: 100vh;
              padding: 1rem;
            }
            ${css}
          </style>
        </head>
        <body>
          <div id="app"></div>
          <script>
            (function() {
              const originalConsole = {
                log: console.log,
                error: console.error,
                warn: console.warn,
                info: console.info
              };
              
              function sendToParent(type, args) {
                window.parent.postMessage({
                  type: 'console',
                  logType: type,
                  content: args.map(arg => 
                    typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
                  ).join(' ')
                }, '*');
              }
              
              console.log = (...args) => {
                originalConsole.log(...args);
                sendToParent('log', args);
              };
              console.error = (...args) => {
                originalConsole.error(...args);
                sendToParent('error', args);
              };
              console.warn = (...args) => {
                originalConsole.warn(...args);
                sendToParent('warn', args);
              };
              console.info = (...args) => {
                originalConsole.info(...args);
                sendToParent('info', args);
              };
              
              window.onerror = function(msg, url, line, col, error) {
                sendToParent('error', [msg + ' (line ' + line + ')']);
                return false;
              };
            })();
          </script>
          ${isReact ? `
            <script type="text/babel">
              try {
                ${processedCode}
              } catch (error) {
                console.error(error.message);
              }
            </script>
          ` : `
            <script>
              try {
                ${processedCode}
              } catch (error) {
                console.error(error.message);
              }
            </script>
          `}
        </body>
      </html>
    `;
    
    setPreviewHtml(html);
    setTimeout(() => setIsRunning(false), 500);
  }, [code, css, language]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'console') {
        setConsoleLogs((prev) => [
          ...prev,
          {
            type: event.data.logType,
            content: event.data.content,
            timestamp: new Date(),
          },
        ]);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Auto-run on initial load
  useEffect(() => {
    const timer = setTimeout(() => runCode(), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleReset = () => {
    const template = templates.find(t => t.language === language);
    if (template) {
      setCode(template.code);
      setCss(template.css);
      setConsoleLogs([]);
      setTimeout(() => runCode(), 100);
    }
  };

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success('Code copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadCode = () => {
    const ext = language === 'html' ? 'html' : language === 'typescript' ? 'ts' : 'js';
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `playground.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('File downloaded!');
  };

  return (
    <div className="min-h-screen pt-16 bg-background">
      {/* Toolbar */}
      <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-16 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-primary" />
                <span className="font-semibold">Playground</span>
              </div>
              
              <Select value={language} onValueChange={(v) => setLanguage(v as LanguageMode)}>
                <SelectTrigger className="w-36 h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(languageInfo).map(([key, info]) => (
                    <SelectItem key={key} value={key}>
                      <span className="flex items-center gap-2">
                        <span 
                          className="w-2 h-2 rounded-full" 
                          style={{ backgroundColor: info.color }}
                        />
                        {info.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Layout className="w-4 h-4" />
                    Templates
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  <DropdownMenuLabel>Quick Start</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {templates.map((template) => (
                    <DropdownMenuItem
                      key={template.id}
                      onClick={() => handleTemplateChange(template.id)}
                    >
                      <span 
                        className="w-2 h-2 rounded-full mr-2" 
                        style={{ backgroundColor: languageInfo[template.language].color }}
                      />
                      {template.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={copyCode}
                className="gap-2"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                Copy
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={downloadCode}
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </Button>
              <Button
                onClick={runCode}
                size="sm"
                className="gap-2 bg-primary hover:bg-primary/90"
                disabled={isRunning}
              >
                {isRunning ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
                Run
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Editor and Preview */}
      <div className="h-[calc(100vh-140px)]">
        <ResizablePanelGroup direction="horizontal">
          {/* Code Editor Panel */}
          <ResizablePanel defaultSize={50} minSize={30}>
            <div className="h-full flex flex-col bg-card/30">
              {/* Editor Tabs */}
              <div className="flex items-center gap-1 px-4 py-2 bg-muted/30 border-b border-border/30">
                <button
                  onClick={() => setActiveTab('code')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === 'code'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <FileCode className="h-4 w-4" />
                  {languageInfo[language].label}
                </button>
                {language !== 'html' && (
                  <button
                    onClick={() => setActiveTab('css')}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeTab === 'css'
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <Palette className="h-4 w-4" />
                    CSS
                  </button>
                )}
              </div>

              {/* Monaco Editor */}
              <div className="flex-1">
                <Editor
                  height="100%"
                  language={activeTab === 'css' ? 'css' : languageInfo[language].monacoLang}
                  value={activeTab === 'code' ? code : css}
                  onChange={(value) => {
                    if (activeTab === 'code') {
                      setCode(value || '');
                    } else {
                      setCss(value || '');
                    }
                  }}
                  theme={theme === 'dark' ? 'vs-dark' : 'light'}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    fontFamily: 'JetBrains Mono, monospace',
                    lineNumbers: 'on',
                    scrollBeyondLastLine: false,
                    wordWrap: 'on',
                    automaticLayout: true,
                    padding: { top: 16 },
                    tabSize: 2,
                    smoothScrolling: true,
                    cursorBlinking: 'smooth',
                    cursorSmoothCaretAnimation: 'on',
                    renderLineHighlight: 'all',
                    bracketPairColorization: { enabled: true },
                  }}
                />
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle className="bg-border/30 hover:bg-primary/50 transition-colors" />

          {/* Preview and Console Panel */}
          <ResizablePanel defaultSize={50} minSize={30}>
            <ResizablePanelGroup direction="vertical">
              {/* Preview */}
              <ResizablePanel defaultSize={70} minSize={30}>
                <div className="h-full flex flex-col">
                  <div className="flex items-center gap-2 px-4 py-2 bg-muted/30 border-b border-border/30">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-destructive/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-background/50 text-sm">
                        <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-muted-foreground">Preview</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 bg-[#0f0f1a] relative overflow-hidden">
                    {isRunning && (
                      <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10">
                        <div className="flex flex-col items-center gap-3">
                          <Loader2 className="h-8 w-8 animate-spin text-primary" />
                          <span className="text-sm text-muted-foreground">Running...</span>
                        </div>
                      </div>
                    )}
                    <iframe
                      ref={iframeRef}
                      title="Preview"
                      className="w-full h-full border-0"
                      sandbox="allow-scripts"
                      srcDoc={previewHtml}
                    />
                  </div>
                </div>
              </ResizablePanel>

              <ResizableHandle withHandle className="bg-border/30 hover:bg-primary/50 transition-colors" />

              {/* Console */}
              <ResizablePanel defaultSize={30} minSize={15}>
                <div className="h-full flex flex-col bg-[#1a1a2e]/80">
                  <div className="flex items-center justify-between px-4 py-2 border-b border-border/30">
                    <div className="flex items-center gap-2">
                      <Terminal className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">Console</span>
                      {consoleLogs.length > 0 && (
                        <span className="px-2 py-0.5 rounded-full text-xs bg-muted/50 text-muted-foreground">
                          {consoleLogs.length}
                        </span>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setConsoleLogs([])}
                      className="h-6 px-2 text-xs"
                    >
                      Clear
                    </Button>
                  </div>
                  <div className="flex-1 overflow-auto p-3 font-mono text-sm">
                    {consoleLogs.length === 0 ? (
                      <div className="flex items-center gap-2 text-muted-foreground text-xs">
                        <div className="w-2 h-2 rounded-full bg-green-500/50 animate-pulse" />
                        <span>Console output will appear here...</span>
                      </div>
                    ) : (
                      consoleLogs.map((log, index) => (
                        <div
                          key={index}
                          className={`py-1.5 px-3 rounded-lg mb-1 ${
                            log.type === 'error'
                              ? 'text-red-400 bg-red-500/10 border-l-2 border-red-500'
                              : log.type === 'warn'
                              ? 'text-yellow-400 bg-yellow-500/10 border-l-2 border-yellow-500'
                              : log.type === 'info'
                              ? 'text-blue-400 bg-blue-500/10 border-l-2 border-blue-500'
                              : 'text-foreground bg-muted/30 border-l-2 border-green-500'
                          }`}
                        >
                          <span className="text-muted-foreground text-xs mr-2 opacity-50">
                            {log.timestamp.toLocaleTimeString()}
                          </span>
                          {log.content}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default Playground;
