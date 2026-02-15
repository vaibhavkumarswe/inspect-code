import { useState, useCallback, useRef, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Editor from '@monaco-editor/react';
import {
  Play, RotateCcw, Terminal, Eye, Code2, ArrowLeft,
  Lightbulb, ChevronDown, Loader2, Clock, AlertTriangle,
  CheckCircle2, Pause, SkipForward,
} from 'lucide-react';
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
  getInterviewById,
  difficultyConfig,
  categoryLabels,
} from '@/data/interview';

interface ConsoleLog {
  type: 'log' | 'error' | 'warn' | 'info';
  content: string;
  timestamp: Date;
}

type SessionStatus = 'ready' | 'running' | 'paused' | 'completed' | 'timeout';

const InterviewSession = () => {
  const { interviewId } = useParams<{ interviewId: string }>();
  const navigate = useNavigate();
  const theme = useAppSelector((state) => state.theme.mode);

  const challenge = interviewId ? getInterviewById(interviewId) : null;

  const [code, setCode] = useState('');
  const [css, setCss] = useState('');
  const [activeTab, setActiveTab] = useState<'code' | 'css'>('code');
  const [consoleLogs, setConsoleLogs] = useState<ConsoleLog[]>([]);
  const [previewHtml, setPreviewHtml] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [hintsOpen, setHintsOpen] = useState(false);
  const [showHint, setShowHint] = useState(0);
  const [reqsOpen, setReqsOpen] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Timer state
  const [sessionStatus, setSessionStatus] = useState<SessionStatus>('ready');
  const [timeRemaining, setTimeRemaining] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize
  useEffect(() => {
    if (challenge) {
      setCode(challenge.initialCode);
      setCss(challenge.initialCss || '');
      setTimeRemaining(challenge.timeLimit * 60);
      setConsoleLogs([]);
      setShowHint(0);
      setHintsOpen(false);
      setSessionStatus('ready');
      setPreviewHtml('');
    }
  }, [interviewId, challenge]);

  // Timer logic
  useEffect(() => {
    if (sessionStatus === 'running') {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setSessionStatus('timeout');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [sessionStatus]);

  const startSession = () => setSessionStatus('running');
  const pauseSession = () => setSessionStatus('paused');
  const resumeSession = () => setSessionStatus('running');
  const completeSession = () => setSessionStatus('completed');

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const timePercent = challenge ? (timeRemaining / (challenge.timeLimit * 60)) * 100 : 100;
  const isTimeLow = timePercent < 20;

  const handleReset = () => {
    if (challenge) {
      setCode(challenge.initialCode);
      setCss(challenge.initialCss || '');
      setConsoleLogs([]);
      setTimeout(() => runCode(), 100);
    }
  };

  const runCode = useCallback(() => {
    if (!challenge) return;
    setIsRunning(true);
    setConsoleLogs([]);
    const isReact = true; // all interview challenges use React

    const html = `<!DOCTYPE html><html><head>
      <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
      <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
      <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: system-ui, sans-serif; background: linear-gradient(135deg, #0f0f1a, #1a1a2e); color: white; min-height: 100vh; padding: 1rem; }
        ${css}
      </style></head><body><div id="app"></div>
      <script>(function(){
        const orig={log:console.log,error:console.error,warn:console.warn,info:console.info};
        function send(t,a){window.parent.postMessage({type:'console',logType:t,content:a.map(x=>typeof x==='object'?JSON.stringify(x,null,2):String(x)).join(' ')},'*');}
        console.log=(...a)=>{orig.log(...a);send('log',a);};
        console.error=(...a)=>{orig.error(...a);send('error',a);};
        console.warn=(...a)=>{orig.warn(...a);send('warn',a);};
        console.info=(...a)=>{orig.info(...a);send('info',a);};
        window.onerror=(m,u,l)=>{send('error',[m+' (line '+l+')']);return false;};
      })();</script>
      <script type="text/babel">try{${code}}catch(e){console.error(e.message);}</script>
    </body></html>`;

    setPreviewHtml(html);
    setTimeout(() => setIsRunning(false), 500);
  }, [code, css, challenge]);

  // Console message handler
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event.data?.type === 'console') {
        setConsoleLogs(prev => [...prev, { type: event.data.logType, content: event.data.content, timestamp: new Date() }]);
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  // Auto-run on load
  useEffect(() => {
    if (challenge && code) {
      const t = setTimeout(() => runCode(), 300);
      return () => clearTimeout(t);
    }
  }, [interviewId]);

  if (!challenge) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center p-8 rounded-2xl border border-border bg-card">
          <Code2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Challenge not found</h1>
          <p className="text-muted-foreground mb-4">This interview challenge doesn't exist.</p>
          <Button onClick={() => navigate('/interview')} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Interview Prep
          </Button>
        </div>
      </div>
    );
  }

  const diffConf = difficultyConfig[challenge.difficulty];

  return (
    <div className="min-h-screen pt-20 bg-background">
      <div className="container mx-auto px-4 py-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
          <div className="flex items-center gap-4 mb-3">
            <Link to="/interview" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm">Interview Prep</span>
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl sm:text-2xl font-bold gradient-text">{challenge.title}</h1>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ backgroundColor: `${diffConf.color}20`, color: diffConf.color, border: `1px solid ${diffConf.color}30` }}>
                  {diffConf.label}
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs bg-muted text-muted-foreground">
                  {categoryLabels[challenge.category]}
                </span>
              </div>
              <p className="text-sm text-muted-foreground max-w-xl">{challenge.description}</p>
            </div>

            {/* Timer + Controls */}
            <div className="flex items-center gap-3">
              {/* Timer display */}
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${isTimeLow ? 'border-destructive bg-destructive/10 text-destructive' : 'border-primary/30 bg-primary/10 text-primary'}`}>
                <Clock className="w-4 h-4" />
                <span className="font-mono font-bold text-lg">{formatTime(timeRemaining)}</span>
              </div>

              {sessionStatus === 'ready' && (
                <Button onClick={startSession} className="gap-2 bg-primary text-primary-foreground rounded-full">
                  <Play className="h-4 w-4" /> Start
                </Button>
              )}
              {sessionStatus === 'running' && (
                <>
                  <Button onClick={pauseSession} variant="outline" size="icon" className="rounded-full"><Pause className="h-4 w-4" /></Button>
                  <Button onClick={completeSession} className="gap-2 rounded-full bg-accent text-accent-foreground">
                    <CheckCircle2 className="h-4 w-4" /> Submit
                  </Button>
                </>
              )}
              {sessionStatus === 'paused' && (
                <Button onClick={resumeSession} className="gap-2 rounded-full"><Play className="h-4 w-4" /> Resume</Button>
              )}
              {(sessionStatus === 'completed' || sessionStatus === 'timeout') && (
                <Button onClick={() => navigate('/interview')} variant="outline" className="gap-2 rounded-full">
                  <SkipForward className="h-4 w-4" /> Next Challenge
                </Button>
              )}
            </div>
          </div>

          {/* Requirements & Hints */}
          <div className="flex flex-wrap gap-2 mt-3">
            {challenge.tags.map(tag => (
              <span key={tag} className="px-2 py-0.5 rounded-full text-xs bg-muted text-muted-foreground border border-border/30">#{tag}</span>
            ))}
          </div>
        </motion.div>

        {/* Status banners */}
        {sessionStatus === 'timeout' && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4 p-4 rounded-xl border border-destructive bg-destructive/10 flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <div>
              <p className="font-semibold text-destructive">Time's Up!</p>
              <p className="text-sm text-muted-foreground">Review your solution and try again or move on.</p>
            </div>
          </motion.div>
        )}
        {sessionStatus === 'completed' && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4 p-4 rounded-xl border border-accent bg-accent/10 flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-accent" />
            <div>
              <p className="font-semibold text-accent">Submitted!</p>
              <p className="text-sm text-muted-foreground">Time remaining: {formatTime(timeRemaining)}. Review your code against the requirements below.</p>
            </div>
          </motion.div>
        )}

        {/* Editor + Preview */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="h-[calc(100vh-320px)] min-h-[400px] rounded-2xl border border-border overflow-hidden">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={50} minSize={30}>
              <div className="h-full flex flex-col bg-background">
                <div className="flex items-center justify-between px-4 py-2 bg-muted/30 border-b border-border/30">
                  <div className="flex items-center gap-1 p-1 rounded-lg bg-background/50">
                    <button onClick={() => setActiveTab('code')} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'code' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                      <Code2 className="h-4 w-4 inline mr-1" />Code
                    </button>
                    <button onClick={() => setActiveTab('css')} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'css' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                      CSS
                    </button>
                  </div>
                  <div className="flex gap-1">
                    <Button onClick={runCode} size="sm" className="gap-1 rounded-full" disabled={isRunning}>
                      {isRunning ? <Loader2 className="h-3 w-3 animate-spin" /> : <Play className="h-3 w-3" />}
                      Run
                    </Button>
                    <Button onClick={handleReset} variant="ghost" size="sm" className="gap-1 rounded-full">
                      <RotateCcw className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="flex-1">
                  <Editor
                    height="100%"
                    language={activeTab === 'css' ? 'css' : 'javascript'}
                    value={activeTab === 'code' ? code : css}
                    onChange={val => activeTab === 'code' ? setCode(val || '') : setCss(val || '')}
                    theme={theme === 'dark' ? 'vs-dark' : 'light'}
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      scrollBeyondLastLine: false,
                      wordWrap: 'on',
                      automaticLayout: true,
                      padding: { top: 12 },
                      tabSize: 2,
                      bracketPairColorization: { enabled: true },
                    }}
                  />
                </div>
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle className="bg-border/30 hover:bg-primary/50 transition-colors" />

            <ResizablePanel defaultSize={50} minSize={30}>
              <ResizablePanelGroup direction="vertical">
                <ResizablePanel defaultSize={65} minSize={30}>
                  <div className="h-full flex flex-col">
                    <div className="flex items-center gap-2 px-4 py-2 bg-muted/30 border-b border-border/30">
                      <Eye className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Preview</span>
                    </div>
                    <div className="flex-1 bg-background">
                      {previewHtml ? (
                        <iframe ref={iframeRef} srcDoc={previewHtml} className="w-full h-full border-0" sandbox="allow-scripts allow-modals" title="Preview" />
                      ) : (
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                          <p className="text-sm">Click "Run" to see preview</p>
                        </div>
                      )}
                    </div>
                  </div>
                </ResizablePanel>

                <ResizableHandle withHandle className="bg-border/30" />

                <ResizablePanel defaultSize={35} minSize={15}>
                  <div className="h-full flex flex-col">
                    <div className="flex items-center gap-2 px-4 py-2 bg-muted/30 border-b border-border/30">
                      <Terminal className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Console</span>
                      <span className="ml-auto text-xs text-muted-foreground">{consoleLogs.length} logs</span>
                    </div>
                    <div className="flex-1 overflow-auto p-3 font-mono text-xs space-y-1">
                      {consoleLogs.length === 0 && <p className="text-muted-foreground">No console output yet</p>}
                      {consoleLogs.map((log, i) => (
                        <div key={i} className={`px-2 py-1 rounded ${log.type === 'error' ? 'text-destructive bg-destructive/10' : log.type === 'warn' ? 'text-yellow-500 bg-yellow-500/10' : 'text-foreground/80'}`}>
                          {log.content}
                        </div>
                      ))}
                    </div>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        </motion.div>

        {/* Requirements & Hints below editor */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Collapsible open={reqsOpen} onOpenChange={setReqsOpen}>
            <CollapsibleTrigger asChild>
              <button className="flex items-center justify-between w-full p-4 rounded-xl border border-border bg-card hover:bg-muted/30 transition-colors">
                <span className="flex items-center gap-2 font-semibold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-accent" /> Requirements ({challenge.requirements.length})
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${reqsOpen ? 'rotate-180' : ''}`} />
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 border border-t-0 border-border rounded-b-xl bg-card">
              <ul className="space-y-2">
                {challenge.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary mt-0.5">•</span> {req}
                  </li>
                ))}
              </ul>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={hintsOpen} onOpenChange={setHintsOpen}>
            <CollapsibleTrigger asChild>
              <button className="flex items-center justify-between w-full p-4 rounded-xl border border-border bg-card hover:bg-muted/30 transition-colors">
                <span className="flex items-center gap-2 font-semibold text-sm">
                  <Lightbulb className="w-4 h-4 text-yellow-500" /> Hints ({showHint + 1}/{challenge.hints.length})
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${hintsOpen ? 'rotate-180' : ''}`} />
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 border border-t-0 border-border rounded-b-xl bg-card">
              {challenge.hints.slice(0, showHint + 1).map((hint, i) => (
                <p key={i} className="text-sm text-muted-foreground mb-2">
                  <span className="text-yellow-500 font-medium">💡 Hint {i + 1}:</span> {hint}
                </p>
              ))}
              {showHint < challenge.hints.length - 1 && (
                <Button variant="ghost" size="sm" onClick={() => setShowHint(p => p + 1)} className="text-xs">
                  Show next hint
                </Button>
              )}
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </div>
  );
};

export default InterviewSession;
