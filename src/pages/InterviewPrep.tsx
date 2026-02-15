import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search, Clock, ArrowRight, Filter, Code2,
  Timer, Lightbulb, Target, Zap,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  interviewChallenges,
  categoryLabels,
  difficultyConfig,
  type InterviewCategory,
  type InterviewDifficulty,
} from '@/data/interview';

const allCategories: (InterviewCategory | 'all')[] = [
  'all', 'react-hooks', 'dom-manipulation', 'state-management',
  'css-layout', 'async-patterns', 'component-design', 'performance',
];

const allDifficulties: (InterviewDifficulty | 'all')[] = ['all', 'easy', 'medium', 'hard'];

const InterviewPrep = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<InterviewCategory | 'all'>('all');
  const [difficulty, setDifficulty] = useState<InterviewDifficulty | 'all'>('all');

  const filtered = useMemo(() => {
    return interviewChallenges.filter(c => {
      const matchSearch = !search ||
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase()) ||
        c.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
      const matchCat = category === 'all' || c.category === category;
      const matchDiff = difficulty === 'all' || c.difficulty === difficulty;
      return matchSearch && matchCat && matchDiff;
    });
  }, [search, category, difficulty]);

  const counts = useMemo(() => ({
    easy: interviewChallenges.filter(c => c.difficulty === 'easy').length,
    medium: interviewChallenges.filter(c => c.difficulty === 'medium').length,
    hard: interviewChallenges.filter(c => c.difficulty === 'hard').length,
  }), []);

  return (
    <div className="min-h-screen pb-16">
      {/* Hero */}
      <section className="container mx-auto px-4 py-12 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-6">
            <Target className="w-4 h-4" />
            Interview Prep Suite
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Ace Your Frontend <span className="gradient-text">Interview</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Timed mock coding sessions focused on real frontend interview questions.
            Build components, manage state, and solve problems under pressure.
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-6 mb-8">
            {(['easy', 'medium', 'hard'] as InterviewDifficulty[]).map(d => (
              <div key={d} className="text-center">
                <div className="text-2xl font-bold" style={{ color: difficultyConfig[d].color }}>
                  {counts[d]}
                </div>
                <p className="text-xs text-muted-foreground">{difficultyConfig[d].label}</p>
              </div>
            ))}
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{interviewChallenges.length}</div>
              <p className="text-xs text-muted-foreground">Total</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Filters */}
      <section className="container mx-auto px-4 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search challenges..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {allDifficulties.map(d => (
              <Button
                key={d}
                size="sm"
                variant={difficulty === d ? 'default' : 'outline'}
                onClick={() => setDifficulty(d)}
                className="rounded-full"
              >
                {d === 'all' ? 'All Levels' : difficultyConfig[d].label}
              </Button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {allCategories.map(c => (
              <Badge
                key={c}
                variant={category === c ? 'default' : 'secondary'}
                className="cursor-pointer"
                onClick={() => setCategory(c)}
              >
                {c === 'all' ? 'All Categories' : categoryLabels[c]}
              </Badge>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Challenge Cards */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((challenge, i) => {
            const diffConf = difficultyConfig[challenge.difficulty];
            return (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={`/interview/${challenge.id}`}
                  className="group block p-5 rounded-xl border border-border bg-card hover:border-primary/40 hover-neon-blue transition-all h-full"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                      <Code2 className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className="px-2 py-0.5 rounded-full text-xs font-semibold"
                        style={{
                          backgroundColor: `${diffConf.color}20`,
                          color: diffConf.color,
                          border: `1px solid ${diffConf.color}30`,
                        }}
                      >
                        {diffConf.label}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {challenge.timeLimit}m
                      </span>
                    </div>
                  </div>

                  <h3 className="text-base font-semibold group-hover:text-primary transition-colors mb-2">
                    {challenge.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {challenge.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {challenge.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary border border-primary/20">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all" />
                  </div>

                  <div className="mt-3 pt-3 border-t border-border/50 flex items-center gap-2 text-xs text-muted-foreground">
                    <Lightbulb className="w-3 h-3" />
                    {challenge.requirements.length} requirements · {challenge.hints.length} hints
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No challenges found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your filters</p>
            <Button variant="outline" onClick={() => { setSearch(''); setCategory('all'); setDifficulty('all'); }}>
              Clear filters
            </Button>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center p-8 rounded-xl border border-primary/20 bg-card neon-glow-blue">
          <Zap className="w-8 h-8 text-primary mx-auto mb-3" />
          <h2 className="text-xl font-bold mb-2">Ready to practice?</h2>
          <p className="text-muted-foreground mb-4 text-sm">Pick a challenge and start your timed session</p>
          <div className="flex gap-3 justify-center">
            <Button asChild>
              <Link to="/coding">Browse All Challenges</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/system-design">System Design</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InterviewPrep;
