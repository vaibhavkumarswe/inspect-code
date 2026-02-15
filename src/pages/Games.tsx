import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, RotateCcw, Trophy, Timer, Keyboard, Shuffle } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Memory Card Game
const cardEmojis = ['🚀', '⚡', '🎮', '💎', '🔥', '🌟', '🎯', '💫'];

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryGame = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const initializeGame = useCallback(() => {
    const shuffled = [...cardEmojis, ...cardEmojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({ id: index, emoji, isFlipped: false, isMatched: false }));
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setIsComplete(false);
    setTimer(0);
    setIsPlaying(true);
  }, []);

  useEffect(() => { initializeGame(); }, [initializeGame]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && !isComplete) {
      interval = setInterval(() => setTimer(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isComplete]);

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2 || cards[id].isFlipped || cards[id].isMatched) return;
    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);
    setFlippedCards([...flippedCards, id]);

    if (flippedCards.length === 1) {
      setMoves(m => m + 1);
      if (cards[flippedCards[0]].emoji === newCards[id].emoji) {
        setTimeout(() => {
          const matched = [...cards];
          matched[flippedCards[0]].isMatched = true;
          matched[id].isMatched = true;
          setCards(matched);
          setFlippedCards([]);
          if (matched.every(c => c.isMatched)) { setIsComplete(true); setIsPlaying(false); }
        }, 500);
      } else {
        setTimeout(() => {
          const reset = [...cards];
          reset[flippedCards[0]].isFlipped = false;
          reset[id].isFlipped = false;
          setCards(reset);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="glass-card rounded-3xl p-6 border border-border/50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold flex items-center gap-2">🧠 Memory Match</h3>
        <Button variant="ghost" size="sm" onClick={initializeGame} className="rounded-full"><RotateCcw className="h-4 w-4" /></Button>
      </div>
      <div className="flex justify-center gap-6 mb-4 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground"><Timer className="h-4 w-4" />{timer}s</div>
        <div className="flex items-center gap-2 text-muted-foreground"><Trophy className="h-4 w-4" />{moves} moves</div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {cards.map((card) => (
          <motion.button key={card.id} onClick={() => handleCardClick(card.id)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className={`aspect-square rounded-xl text-2xl flex items-center justify-center transition-all ${card.isFlipped || card.isMatched ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'}`}>
            {(card.isFlipped || card.isMatched) && <span>{card.emoji}</span>}
          </motion.button>
        ))}
      </div>
      {isComplete && <div className="mt-4 p-3 rounded-xl bg-primary/10 text-center"><p className="font-bold text-primary">🎉 Done in {moves} moves!</p></div>}
    </div>
  );
};

// Reaction Time Game
const ReactionGame = () => {
  const [gameState, setGameState] = useState<'waiting' | 'ready' | 'go' | 'result' | 'early'>('waiting');
  const [startTime, setStartTime] = useState(0);
  const [reactionTime, setReactionTime] = useState(0);
  const [bestTime, setBestTime] = useState<number | null>(null);

  const startGame = () => {
    setGameState('ready');
    setTimeout(() => { setGameState('go'); setStartTime(Date.now()); }, Math.random() * 3000 + 2000);
  };

  const handleClick = () => {
    if (gameState === 'waiting') startGame();
    else if (gameState === 'ready') setGameState('early');
    else if (gameState === 'go') {
      const time = Date.now() - startTime;
      setReactionTime(time);
      setGameState('result');
      if (!bestTime || time < bestTime) setBestTime(time);
    } else setGameState('waiting');
  };

  const config = { waiting: { bg: 'bg-secondary', text: 'Click to Start' }, ready: { bg: 'bg-destructive', text: 'Wait...' }, go: { bg: 'bg-green-500', text: 'CLICK!' }, result: { bg: 'bg-primary', text: `${reactionTime}ms` }, early: { bg: 'bg-destructive', text: 'Too early!' } };
  const { bg, text } = config[gameState];

  return (
    <div className="glass-card rounded-3xl p-6 border border-border/50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">⚡ Reaction Time</h3>
        {bestTime && <span className="text-primary text-sm font-mono">Best: {bestTime}ms</span>}
      </div>
      <motion.button onClick={handleClick} whileTap={{ scale: 0.98 }} className={`w-full h-32 rounded-2xl ${bg} text-white font-bold text-xl`}>{text}</motion.button>
    </div>
  );
};

// Typing Speed Test
const TypingGame = () => {
  const sentences = ["The quick brown fox jumps over the lazy dog", "Code is poetry written in logic", "React makes UI development a breeze"];
  const [text, setText] = useState(sentences[0]);
  const [input, setInput] = useState('');
  const [started, setStarted] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [wpm, setWpm] = useState(0);

  const reset = () => { setText(sentences[Math.floor(Math.random() * sentences.length)]); setInput(''); setStarted(false); setWpm(0); };

  const handleInput = (val: string) => {
    if (!started) { setStarted(true); setStartTime(Date.now()); }
    setInput(val);
    if (val === text) {
      const mins = (Date.now() - startTime) / 60000;
      setWpm(Math.round((text.split(' ').length) / mins));
    }
  };

  return (
    <div className="glass-card rounded-3xl p-6 border border-border/50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold flex items-center gap-2"><Keyboard className="h-5 w-5" /> Typing Speed</h3>
        <Button variant="ghost" size="sm" onClick={reset} className="rounded-full"><RotateCcw className="h-4 w-4" /></Button>
      </div>
      <p className="text-muted-foreground mb-3 font-mono text-sm leading-relaxed">{text}</p>
      <input value={input} onChange={e => handleInput(e.target.value)} placeholder="Start typing..." disabled={wpm > 0}
        className="w-full p-3 rounded-xl bg-muted/50 border border-border/50 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
      {wpm > 0 && <div className="mt-3 text-center text-primary font-bold">🏆 {wpm} WPM</div>}
    </div>
  );
};

// Word Scramble
const WordScramble = () => {
  const words = ['REACT', 'TYPESCRIPT', 'JAVASCRIPT', 'DEVELOPER', 'FRONTEND'];
  const [word, setWord] = useState('');
  const [scrambled, setScrambled] = useState('');
  const [guess, setGuess] = useState('');
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');

  const newWord = useCallback(() => {
    const w = words[Math.floor(Math.random() * words.length)];
    setWord(w);
    setScrambled(w.split('').sort(() => Math.random() - 0.5).join(''));
    setGuess('');
    setMessage('');
  }, []);

  useEffect(() => { newWord(); }, [newWord]);

  const check = () => {
    if (guess.toUpperCase() === word) { setScore(s => s + 1); setMessage('✅ Correct!'); setTimeout(newWord, 1000); }
    else setMessage('❌ Try again');
  };

  return (
    <div className="glass-card rounded-3xl p-6 border border-border/50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold flex items-center gap-2"><Shuffle className="h-5 w-5" /> Word Scramble</h3>
        <span className="text-primary font-mono">Score: {score}</span>
      </div>
      <div className="text-3xl font-bold text-center mb-4 tracking-widest text-primary">{scrambled}</div>
      <div className="flex gap-2">
        <input value={guess} onChange={e => setGuess(e.target.value)} onKeyDown={e => e.key === 'Enter' && check()}
          className="flex-1 p-3 rounded-xl bg-muted/50 border border-border/50 uppercase font-mono focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Your guess..." />
        <Button onClick={check} className="rounded-xl">Check</Button>
      </div>
      {message && <p className="text-center mt-3 font-medium">{message}</p>}
    </div>
  );
};

const Games = () => {
  return (
    <div className="min-h-screen py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-4">
            <Gamepad2 className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-accent">Interactive Playground</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Fun & <span className="gradient-text">Games</span></h1>
          <p className="text-muted-foreground max-w-xl mx-auto">Mini-games built for fun. Test your skills!</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}><MemoryGame /></motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}><ReactionGame /></motion.div>
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}><TypingGame /></motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}><WordScramble /></motion.div>
        </div>
      </div>
    </div>
  );
};

export default Games;