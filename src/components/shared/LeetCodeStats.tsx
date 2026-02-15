import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Code2, Trophy, Target, Flame, Zap, TrendingUp } from 'lucide-react';

interface ProblemStats {
  difficulty: 'Easy' | 'Medium' | 'Hard';
  solved: number;
  total: number;
  color: string;
  bgColor: string;
}

interface RecentSubmission {
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timestamp: string;
  status: 'Accepted' | 'Wrong Answer';
}

const problemStats: ProblemStats[] = [
  { difficulty: 'Easy', solved: 187, total: 800, color: 'text-green-500', bgColor: 'bg-green-500' },
  { difficulty: 'Medium', solved: 243, total: 1700, color: 'text-yellow-500', bgColor: 'bg-yellow-500' },
  { difficulty: 'Hard', solved: 78, total: 750, color: 'text-red-500', bgColor: 'bg-red-500' },
];

const stats = [
  { label: 'Total Solved', value: '508', icon: Code2, color: 'text-primary' },
  { label: 'Ranking', value: '42,156', icon: Trophy, color: 'text-yellow-500' },
  { label: 'Acceptance', value: '67.3%', icon: Target, color: 'text-green-500' },
  { label: 'Streak', value: '23 days', icon: Flame, color: 'text-orange-500' },
];

const recentSubmissions: RecentSubmission[] = [
  { title: 'Two Sum', difficulty: 'Easy', timestamp: '2 hours ago', status: 'Accepted' },
  { title: 'Merge Intervals', difficulty: 'Medium', timestamp: '5 hours ago', status: 'Accepted' },
  { title: 'LRU Cache', difficulty: 'Medium', timestamp: 'Yesterday', status: 'Accepted' },
  { title: 'Trapping Rain Water', difficulty: 'Hard', timestamp: '2 days ago', status: 'Accepted' },
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Easy': return 'text-green-500 bg-green-500/10';
    case 'Medium': return 'text-yellow-500 bg-yellow-500/10';
    case 'Hard': return 'text-red-500 bg-red-500/10';
    default: return 'text-muted-foreground bg-secondary';
  }
};

export const LeetCodeStats = () => {
  const [animatedStats, setAnimatedStats] = useState<Record<string, number>>({});
  const [animatedProblems, setAnimatedProblems] = useState<Record<string, number>>({});

  useEffect(() => {
    // Animate main stats
    stats.forEach((stat) => {
      const numericValue = parseFloat(stat.value.replace(/[^0-9.]/g, ''));
      let current = 0;
      const increment = numericValue / 40;
      const interval = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          current = numericValue;
          clearInterval(interval);
        }
        setAnimatedStats((prev) => ({ ...prev, [stat.label]: Math.floor(current) }));
      }, 30);
    });

    // Animate problem counts
    problemStats.forEach((stat) => {
      let current = 0;
      const increment = stat.solved / 40;
      const interval = setInterval(() => {
        current += increment;
        if (current >= stat.solved) {
          current = stat.solved;
          clearInterval(interval);
        }
        setAnimatedProblems((prev) => ({ ...prev, [stat.difficulty]: Math.floor(current) }));
      }, 30);
    });
  }, []);

  const totalSolved = problemStats.reduce((sum, s) => sum + s.solved, 0);
  const totalProblems = problemStats.reduce((sum, s) => sum + s.total, 0);
  const overallPercentage = (totalSolved / totalProblems) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bento-card"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-yellow-500/10">
            <Zap className="h-5 w-5 text-yellow-500" />
          </div>
          <div>
            <h3 className="font-bold">LeetCode Activity</h3>
            <p className="text-sm text-muted-foreground">
              {totalSolved} problems solved
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <TrendingUp className="h-4 w-4 text-green-500" />
          <span className="text-green-500 font-medium">+15 this week</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="p-4 rounded-xl bg-secondary/50 text-center"
          >
            <stat.icon className={`h-5 w-5 ${stat.color} mx-auto mb-2`} />
            <p className="text-2xl font-bold">
              {stat.label === 'Acceptance' 
                ? `${animatedStats[stat.label] || 0}%`
                : stat.label === 'Streak'
                ? `${animatedStats[stat.label] || 0}`
                : (animatedStats[stat.label] || 0).toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Problem Breakdown */}
      <div className="space-y-4 mb-6">
        <h4 className="text-sm font-semibold text-muted-foreground">Problem Breakdown</h4>
        
        {/* Circular Progress */}
        <div className="flex items-center gap-6">
          <div className="relative w-24 h-24">
            <svg className="w-24 h-24 transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-secondary"
              />
              <motion.circle
                cx="48"
                cy="48"
                r="40"
                stroke="url(#leetcode-gradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                initial={{ strokeDasharray: '0 251.2' }}
                whileInView={{ strokeDasharray: `${overallPercentage * 2.512} 251.2` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              />
              <defs>
                <linearGradient id="leetcode-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="hsl(var(--accent))" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold">{Math.round(overallPercentage)}%</span>
            </div>
          </div>

          <div className="flex-1 space-y-3">
            {problemStats.map((stat) => (
              <div key={stat.difficulty} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className={stat.color}>{stat.difficulty}</span>
                  <span className="text-muted-foreground">
                    {animatedProblems[stat.difficulty] || 0}/{stat.total}
                  </span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full ${stat.bgColor}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(stat.solved / stat.total) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Submissions */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-muted-foreground">Recent Submissions</h4>
        <div className="space-y-2">
          {recentSubmissions.map((submission, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${getDifficultyColor(submission.difficulty)}`}>
                  {submission.difficulty}
                </span>
                <span className="text-sm font-medium truncate max-w-[150px] md:max-w-none">
                  {submission.title}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="text-green-500">✓</span>
                <span>{submission.timestamp}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
