import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { GitCommit, GitPullRequest, Star, GitFork, Activity } from 'lucide-react';

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

// Generate mock contribution data for the last year
const generateContributionData = (): ContributionDay[] => {
  const data: ContributionDay[] = [];
  const today = new Date();
  
  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Generate realistic-looking contribution patterns
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const baseChance = isWeekend ? 0.3 : 0.7;
    
    let count = 0;
    let level: 0 | 1 | 2 | 3 | 4 = 0;
    
    if (Math.random() < baseChance) {
      count = Math.floor(Math.random() * 15) + 1;
      if (count > 10) level = 4;
      else if (count > 6) level = 3;
      else if (count > 3) level = 2;
      else level = 1;
    }
    
    data.push({
      date: date.toISOString().split('T')[0],
      count,
      level,
    });
  }
  
  return data;
};

const stats = [
  { label: 'Commits', value: '1,247', icon: GitCommit, color: 'text-green-500' },
  { label: 'Pull Requests', value: '89', icon: GitPullRequest, color: 'text-purple-500' },
  { label: 'Stars Earned', value: '342', icon: Star, color: 'text-yellow-500' },
  { label: 'Repositories', value: '47', icon: GitFork, color: 'text-blue-500' },
];

export const GitHubStats = () => {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);
  const [animatedStats, setAnimatedStats] = useState<Record<string, number>>({});

  useEffect(() => {
    setContributions(generateContributionData());
    
    // Animate stats counting up
    stats.forEach((stat) => {
      const targetValue = parseInt(stat.value.replace(/,/g, ''));
      let current = 0;
      const increment = targetValue / 50;
      const interval = setInterval(() => {
        current += increment;
        if (current >= targetValue) {
          current = targetValue;
          clearInterval(interval);
        }
        setAnimatedStats((prev) => ({ ...prev, [stat.label]: Math.floor(current) }));
      }, 30);
    });
  }, []);

  const getLevelColor = (level: number) => {
    switch (level) {
      case 0: return 'bg-secondary';
      case 1: return 'bg-green-300 dark:bg-green-900';
      case 2: return 'bg-green-400 dark:bg-green-700';
      case 3: return 'bg-green-500 dark:bg-green-500';
      case 4: return 'bg-green-600 dark:bg-green-400';
      default: return 'bg-secondary';
    }
  };

  // Group contributions by weeks
  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }

  const totalContributions = contributions.reduce((sum, day) => sum + day.count, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bento-card"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10">
            <Activity className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-bold">GitHub Activity</h3>
            <p className="text-sm text-muted-foreground">
              {totalContributions.toLocaleString()} contributions in the last year
            </p>
          </div>
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
              {(animatedStats[stat.label] || 0).toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Contribution Graph */}
      <div className="relative overflow-x-auto pb-2">
        <div className="flex gap-1 min-w-max">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.map((day, dayIndex) => (
                <motion.div
                  key={day.date}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: (weekIndex * 7 + dayIndex) * 0.001 }}
                  className={`w-3 h-3 rounded-sm ${getLevelColor(day.level)} cursor-pointer transition-transform hover:scale-125`}
                  onMouseEnter={() => setHoveredDay(day)}
                  onMouseLeave={() => setHoveredDay(null)}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Tooltip */}
        {hoveredDay && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-2 px-3 py-2 bg-popover border border-border rounded-lg shadow-lg text-sm whitespace-nowrap z-10">
            <p className="font-medium">{hoveredDay.count} contributions</p>
            <p className="text-muted-foreground text-xs">{hoveredDay.date}</p>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-2 mt-4 text-xs text-muted-foreground">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={`w-3 h-3 rounded-sm ${getLevelColor(level)}`}
          />
        ))}
        <span>More</span>
      </div>
    </motion.div>
  );
};
