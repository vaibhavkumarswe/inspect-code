import { useState, useCallback, useRef, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Editor from '@monaco-editor/react';
import { Play, RotateCcw, Terminal, Eye, Code2, ArrowLeft, Lightbulb, ChevronDown, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/store/hooks';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/components/ui/resizable';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { 
  getChallengeById, 
  languageLabels, 
  languageColors,
  difficultyColors,
  difficultyLabels,
} from '@/data/challenges/index';
import EditorSettings, { defaultEditorSettings, type EditorSettingsState } from '@/components/coding/EditorSettings';

interface ConsoleLog {
  type: 'log' | 'error' | 'warn' | 'info';
  content: string;
  timestamp: Date;
}

const ChallengeEditor = () => {
  const { challengeId } = useParams<{ challengeId: string }>();
  const navigate = useNavigate();
  const theme = useAppSelector((state) => state.theme.mode);
  
  const challenge = challengeId ? getChallengeById(challengeId) : null;
  
  const [code, setCode] = useState('');
  const [css, setCss] = useState('');
  const [consoleLogs, setConsoleLogs] = useState<ConsoleLog[]>([]);
  const [activeTab, setActiveTab] = useState<'code' | 'css'>('code');
  const [previewHtml, setPreviewHtml] = useState('');
  const [editorSettings, setEditorSettings] = useState<EditorSettingsState>(defaultEditorSettings);
  const [hintsOpen, setHintsOpen] = useState(false);
  const [showHint, setShowHint] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Initialize code when challenge changes
  useEffect(() => {
    if (challenge) {
      setCode(challenge.initialCode);
      setCss(challenge.initialCss || '');
      setConsoleLogs([]);
      setShowHint(0);
      setHintsOpen(false);
      setPreviewHtml(''); // Clear preview before running
    }
  }, [challengeId, challenge]);

  const handleReset = () => {
    if (challenge) {
      setCode(challenge.initialCode);
      setCss(challenge.initialCss || '');
      setConsoleLogs([]);
      // Run immediately after reset
      setTimeout(() => runCode(), 100);
    }
  };

  const getEditorLanguage = () => {
    if (activeTab === 'css') return 'css';
    if (!challenge) return 'javascript';
    switch (challenge.language) {
      case 'typescript': return 'typescript';
      case 'react': return 'javascript';
      default: return 'javascript';
    }
  };

  const runCode = useCallback(() => {
    if (!challenge) return;
    
    setIsRunning(true);
    setConsoleLogs([]);
    
    const isReact = challenge.language === 'react';
    const isTypeScript = challenge.language === 'typescript';
    
    // Get current code values directly from state
    const currentCode = code || challenge.initialCode;
    const currentCss = css || challenge.initialCss || '';
    
    const processedCode = isTypeScript 
      ? currentCode.replace(/:\s*(string|number|boolean|void|any|unknown|never|object|null|undefined|\w+\[\]|Record<[^>]+>|Pick<[^>]+>|Omit<[^>]+>|Partial<[^>]+>|Required<[^>]+>|\{[^}]*\})/g, '')
           .replace(/<\w+>/g, '')
           .replace(/as \w+/g, '')
           .replace(/interface\s+\w+\s*\{[^}]*\}/g, '')
           .replace(/type\s+\w+\s*=\s*[^;]+;/g, '')
      : currentCode;
    
    const html = `
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
            ${currentCss}
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
  }, [code, css, challenge]);

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

  // Run code when challenge loads (with a delay to ensure state is set)
  useEffect(() => {
    if (challenge && code) {
      const timer = setTimeout(() => {
        runCode();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [challengeId]); // Only trigger on challengeId change

  if (!challenge) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center glass-card p-8 rounded-3xl border border-border/50"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-destructive/20 flex items-center justify-center">
            <Code2 className="h-8 w-8 text-destructive" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Challenge not found</h1>
          <p className="text-muted-foreground mb-6">The challenge you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/coding')} variant="outline" className="rounded-full">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Challenges
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <div className="flex items-center gap-4 mb-3">
            <Link 
              to="/coding"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm">All Challenges</span>
            </Link>
          </div>
          
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold gradient-text">
                  {challenge.title}
                </h1>
                <span 
                  className="px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm"
                  style={{ 
                    backgroundColor: `${languageColors[challenge.language]}20`,
                    color: languageColors[challenge.language],
                    border: `1px solid ${languageColors[challenge.language]}30`,
                  }}
                >
                  {languageLabels[challenge.language]}
                </span>
                <span 
                  className="px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm"
                  style={{ 
                    backgroundColor: `${difficultyColors[challenge.difficulty]}20`,
                    color: difficultyColors[challenge.difficulty],
                    border: `1px solid ${difficultyColors[challenge.difficulty]}30`,
                  }}
                >
                  {difficultyLabels[challenge.difficulty]}
                </span>
              </div>
              <p className="text-sm text-muted-foreground max-w-xl">
                {challenge.description}
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={runCode} 
                className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 rounded-full px-5 shadow-lg shadow-primary/25"
                disabled={isRunning}
              >
                {isRunning ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
                {isRunning ? 'Running...' : 'Run Code'}
              </Button>
              <Button onClick={handleReset} variant="outline" className="gap-2 rounded-full">
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
            </div>
          </div>
          
          {/* Tags & Hints */}
          <div className="flex flex-wrap items-center gap-3 mt-3">
            {challenge.tags?.map((tag) => (
              <span 
                key={tag}
                className="px-2.5 py-1 rounded-full text-xs bg-muted/50 text-muted-foreground backdrop-blur-sm border border-border/30"
              >
                #{tag}
              </span>
            ))}
            
            {challenge.hints && challenge.hints.length > 0 && (
              <Collapsible open={hintsOpen} onOpenChange={setHintsOpen}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-1 h-7 text-xs rounded-full">
                    <Lightbulb className="h-3 w-3 text-yellow-500" />
                    Hints ({showHint}/{challenge.hints.length})
                    <ChevronDown className={`h-3 w-3 transition-transform ${hintsOpen ? 'rotate-180' : ''}`} />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="absolute z-10 mt-2 p-4 glass-card rounded-2xl border border-border/50 max-w-md shadow-2xl">
                  {challenge.hints.slice(0, showHint + 1).map((hint, idx) => (
                    <p key={idx} className="text-sm text-muted-foreground mb-2">
                      <span className="font-medium text-yellow-500">💡 Hint {idx + 1}:</span> {hint}
                    </p>
                  ))}
                  {showHint < challenge.hints.length - 1 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setShowHint(prev => prev + 1)}
                      className="text-xs rounded-full"
                    >
                      Show next hint
                    </Button>
                  )}
                </CollapsibleContent>
              </Collapsible>
            )}
          </div>
        </motion.div>

        {/* Editor and Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="h-[calc(100vh-280px)] min-h-[500px] glass-card rounded-3xl border border-border/50 overflow-hidden shadow-2xl"
        >
          <ResizablePanelGroup direction="horizontal">
            {/* Code Editor Panel */}
            <ResizablePanel defaultSize={50} minSize={30}>
              <div className="h-full flex flex-col bg-background/50">
                {/* Editor Tabs */}
                <div className="flex items-center justify-between px-4 py-2 bg-muted/30 border-b border-border/30 backdrop-blur-sm">
                  <div className="flex items-center gap-1 p-1 rounded-xl bg-background/50">
                    <button
                      onClick={() => setActiveTab('code')}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        activeTab === 'code'
                          ? 'bg-primary text-primary-foreground shadow-md'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      <Code2 className="h-4 w-4" />
                      {languageLabels[challenge.language]}
                    </button>
                    <button
                      onClick={() => setActiveTab('css')}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        activeTab === 'css'
                          ? 'bg-primary text-primary-foreground shadow-md'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      <Code2 className="h-4 w-4" />
                      CSS
                    </button>
                  </div>
                  <EditorSettings 
                    settings={editorSettings} 
                    onChange={setEditorSettings}
                  />
                </div>

                {/* Monaco Editor */}
                <div className="flex-1">
                  <Editor
                    height="100%"
                    language={getEditorLanguage()}
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
                      minimap: { enabled: editorSettings.minimap },
                      fontSize: editorSettings.fontSize,
                      fontFamily: editorSettings.fontFamily,
                      lineNumbers: editorSettings.lineNumbers ? 'on' : 'off',
                      scrollBeyondLastLine: false,
                      wordWrap: editorSettings.wordWrap ? 'on' : 'off',
                      automaticLayout: true,
                      padding: { top: 16 },
                      tabSize: editorSettings.tabSize,
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
                    <div className="flex items-center gap-2 px-4 py-2 bg-muted/30 border-b border-border/30 backdrop-blur-sm">
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
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
                            <span className="text-sm text-muted-foreground">Compiling...</span>
                          </div>
                        </div>
                      )}
                      <iframe
                        ref={iframeRef}
                        title="Preview"
                        className="w-full h-full border-0"
                        sandbox="allow-scripts"
                        srcDoc={previewHtml}
                        key={previewHtml ? 'loaded' : 'empty'}
                      />
                    </div>
                  </div>
                </ResizablePanel>

                <ResizableHandle withHandle className="bg-border/30 hover:bg-primary/50 transition-colors" />

                {/* Console */}
                <ResizablePanel defaultSize={30} minSize={15}>
                  <div className="h-full flex flex-col bg-[#1a1a2e]/80 backdrop-blur-sm">
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
                        className="h-6 px-2 text-xs rounded-full"
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
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
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
                          </motion.div>
                        ))
                      )}
                    </div>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        </motion.div>
      </div>
    </div>
  );
};

export default ChallengeEditor;