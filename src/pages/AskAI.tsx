import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Code, BookOpen, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AskAI = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hi! I'm an AI assistant for InspectCode. Ask me about coding, web development, JavaScript, React, TypeScript, or any programming topic!`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const responses: Record<string, string> = {
    react: "React is a JavaScript library for building user interfaces. It uses a component-based architecture and a virtual DOM for efficient updates. Key concepts include JSX, props, state, and hooks like useState and useEffect.",
    typescript: "TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. It adds static types, interfaces, and other features that help catch errors early and improve code quality.",
    javascript: "JavaScript is a versatile programming language primarily used for web development. It supports object-oriented, functional, and event-driven programming paradigms.",
    hooks: "React Hooks let you use state and other React features in functional components. Common hooks include useState, useEffect, useContext, useReducer, and useMemo.",
    state: "State in React represents data that changes over time. Use useState for simple state, useReducer for complex state logic, and context for global state management.",
    css: "CSS (Cascading Style Sheets) is used to style HTML elements. Modern CSS includes flexbox, grid, custom properties (CSS variables), and media queries for responsive design.",
    api: "APIs (Application Programming Interfaces) allow different software systems to communicate. In web dev, you'll often work with REST APIs or GraphQL, using fetch or axios to make HTTP requests.",
    testing: "Testing ensures your code works correctly. Common approaches include unit testing (Jest), component testing (React Testing Library), and end-to-end testing (Cypress, Playwright).",
    git: "Git is a version control system for tracking code changes. Key commands include git add, git commit, git push, git pull, git branch, and git merge.",
    node: "Node.js is a JavaScript runtime that lets you run JavaScript on the server. It's commonly used to build APIs, web servers, and command-line tools.",
  };

  const findResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    for (const [keyword, response] of Object.entries(responses)) {
      if (lowerQuery.includes(keyword)) {
        return response;
      }
    }
    
    return "That's a great question! For detailed answers, I recommend checking our Blog for tutorials or trying the Coding Challenges to practice. You can also explore the Resources section for curated learning materials.";
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 500));
    
    const response = findResponse(userMessage.content);
    
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date(),
    };
    
    setIsTyping(false);
    setMessages(prev => [...prev, assistantMessage]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestedQuestions = [
    "What is React?",
    "Explain TypeScript",
    "How do hooks work?",
    "What is state management?",
    "Tell me about testing",
  ];

  return (
    <div className="min-h-screen pb-16">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            AI Assistant
          </div>
          <h1 className="text-3xl font-bold mb-2">Ask About Coding</h1>
          <p className="text-muted-foreground">
            Get quick answers about web development and programming
          </p>
        </div>

        {/* Chat Container */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          {/* Messages */}
          <div className="h-[400px] overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    message.role === 'assistant'
                      ? 'bg-primary/20 text-primary'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {message.role === 'assistant' ? (
                    <Bot className="h-4 w-4" />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                </div>
                <div
                  className={`max-w-[80%] rounded-xl px-4 py-3 ${
                    message.role === 'assistant'
                      ? 'bg-muted text-foreground'
                      : 'bg-primary text-primary-foreground'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="bg-muted rounded-xl px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          {messages.length <= 2 && (
            <div className="px-6 pb-4">
              <p className="text-xs text-muted-foreground mb-2">Try asking:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInput(question)}
                    className="px-3 py-1.5 text-xs rounded-full bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about coding..."
                className="flex-1"
                disabled={isTyping}
              />
              <Button onClick={handleSend} disabled={!input.trim() || isTyping}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="/blog" className="p-4 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors">
            <BookOpen className="h-5 w-5 text-primary mb-2" />
            <h3 className="font-semibold mb-1">Read the Blog</h3>
            <p className="text-sm text-muted-foreground">In-depth tutorials and guides</p>
          </a>
          <a href="/coding" className="p-4 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors">
            <Code className="h-5 w-5 text-primary mb-2" />
            <h3 className="font-semibold mb-1">Practice Coding</h3>
            <p className="text-sm text-muted-foreground">Hands-on coding challenges</p>
          </a>
          <a href="/resources" className="p-4 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors">
            <Lightbulb className="h-5 w-5 text-primary mb-2" />
            <h3 className="font-semibold mb-1">Explore Resources</h3>
            <p className="text-sm text-muted-foreground">Curated tools and materials</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AskAI;
