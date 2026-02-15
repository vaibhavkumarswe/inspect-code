import { Link } from 'react-router-dom';
import { 
  Rocket, ArrowLeft, Bell, 
  Cpu, MessageSquare, Users, GitBranch, 
  BarChart3, Shield, Zap, Globe, BookMarked,
  PenTool, Video, Mic, FileCode2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface UpcomingFeature {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  status: 'planned' | 'in-progress' | 'coming-soon';
  eta?: string;
}

const upcomingFeatures: UpcomingFeature[] = [
  {
    id: 'ai-code-review',
    title: 'AI Code Review',
    description: 'Get instant AI-powered code reviews with suggestions for performance, security, and best practices.',
    icon: Cpu,
    status: 'in-progress',
    eta: 'Q2 2026',
  },
  {
    id: 'community-forum',
    title: 'Community Forum',
    description: 'A developer community to discuss topics, share solutions, and collaborate on projects.',
    icon: Users,
    status: 'planned',
    eta: 'Q2 2026',
  },
  {
    id: 'live-collaboration',
    title: 'Live Collaboration',
    description: 'Real-time collaborative coding with shared playgrounds and pair programming.',
    icon: GitBranch,
    status: 'planned',
    eta: 'Q3 2026',
  },
  {
    id: 'progress-dashboard',
    title: 'Progress Dashboard',
    description: 'Track your learning journey with streaks, badges, and detailed progress analytics.',
    icon: BarChart3,
    status: 'coming-soon',
    eta: 'Q1 2026',
  },
  {
    id: 'mock-interviews',
    title: 'Mock Interviews',
    description: 'Practice technical interviews with AI-driven mock sessions and instant feedback.',
    icon: MessageSquare,
    status: 'planned',
    eta: 'Q3 2026',
  },
  {
    id: 'api-playground',
    title: 'API Playground',
    description: 'Test and explore REST & GraphQL APIs with an interactive request builder.',
    icon: Zap,
    status: 'planned',
    eta: 'Q2 2026',
  },
  {
    id: 'roadmaps',
    title: 'Developer Roadmaps',
    description: 'Curated learning paths for frontend, backend, DevOps, and full-stack development.',
    icon: Globe,
    status: 'in-progress',
    eta: 'Q1 2026',
  },
  {
    id: 'cheat-sheets',
    title: 'Cheat Sheets',
    description: 'Quick-reference cheat sheets for languages, frameworks, and tools.',
    icon: BookMarked,
    status: 'coming-soon',
    eta: 'Q1 2026',
  },
  {
    id: 'design-patterns',
    title: 'Design Patterns Library',
    description: 'Interactive examples of Gang of Four and modern design patterns with real-world use cases.',
    icon: PenTool,
    status: 'planned',
    eta: 'Q3 2026',
  },
  {
    id: 'video-tutorials',
    title: 'Video Tutorials',
    description: 'Short, focused video tutorials on complex topics with code walkthroughs.',
    icon: Video,
    status: 'planned',
    eta: 'Q4 2026',
  },
  {
    id: 'podcast',
    title: 'InspectCode Podcast',
    description: 'Weekly podcast covering tech trends, interview tips, and developer stories.',
    icon: Mic,
    status: 'planned',
    eta: 'Q4 2026',
  },
  {
    id: 'project-templates',
    title: 'Project Templates',
    description: 'Production-ready starter templates for React, Next.js, Node.js, and more.',
    icon: FileCode2,
    status: 'coming-soon',
    eta: 'Q1 2026',
  },
  {
    id: 'security-challenges',
    title: 'Security Challenges',
    description: 'Learn web security through CTF-style challenges covering XSS, CSRF, injection, and more.',
    icon: Shield,
    status: 'planned',
    eta: 'Q3 2026',
  },
];

const statusConfig = {
  'coming-soon': { label: 'Coming Soon', className: 'bg-foreground/10 text-foreground' },
  'in-progress': { label: 'In Progress', className: 'bg-foreground/10 text-foreground' },
  'planned': { label: 'Planned', className: 'bg-muted text-muted-foreground' },
};

const ComingSoon = () => {
  return (
    <div className="min-h-screen pb-16">
      {/* Header */}
      <section className="container mx-auto px-4 py-12 sm:py-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
          <Rocket className="w-4 h-4" />
          Roadmap
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          What's Coming Next
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-sm sm:text-base">
          We're building the ultimate one-stop platform for developers. Here's what's on our roadmap — 
          features designed to make InspectCode your go-to for everything dev.
        </p>
        <Button variant="outline" asChild>
          <Link to="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {upcomingFeatures.map((feature) => {
            const Icon = feature.icon;
            const status = statusConfig[feature.status];
            return (
              <div
                key={feature.id}
                className="group p-5 sm:p-6 rounded-xl border border-border bg-card hover:border-foreground/20 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2.5 rounded-lg bg-primary/10">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <Badge variant="secondary" className={status.className}>
                    {status.label}
                  </Badge>
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{feature.description}</p>
                {feature.eta && (
                  <p className="text-xs text-muted-foreground">
                    ETA: {feature.eta}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center p-8 sm:p-12 rounded-2xl border border-border bg-card">
          <Bell className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="text-xl sm:text-2xl font-bold mb-3">Stay Updated</h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-6 text-sm sm:text-base">
            Follow us to get notified when new features drop. We ship fast.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild>
              <Link to="/playground">Start Coding Now</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/coding">Browse Challenges</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ComingSoon;
