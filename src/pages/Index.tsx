import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Code2, BookOpen, FileText, Gamepad2, Wrench, PlayCircle,
  ArrowRight, Terminal, Layers, Rocket
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { blogPosts, searchPosts } from '@/data/blog';
import { challenges, searchChallenges } from '@/data/challenges/index';

interface PlatformSection {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  path: string;
  stats?: string;
  tags?: string[];
}

const platformSections: PlatformSection[] = [
  { id: 'playground', title: 'Coding Playground', description: 'Write, run, and experiment with code in a full-featured IDE', icon: PlayCircle, path: '/playground', stats: 'React • TypeScript • JavaScript', tags: ['IDE', 'Live Preview', 'Console'] },
  { id: 'challenges', title: 'Coding Challenges', description: 'Practice and improve your coding skills with hands-on challenges', icon: Code2, path: '/coding', stats: `${challenges.length} challenges`, tags: ['JavaScript', 'TypeScript', 'React'] },
  { id: 'system-design', title: 'System Design', description: 'Master HLD, LLD, databases, scalability, and distributed systems', icon: Layers, path: '/system-design', stats: '50+ topics', tags: ['HLD', 'LLD', 'Databases'] },
  { id: 'blog', title: 'Tech Blog', description: 'In-depth articles on web development and best practices', icon: BookOpen, path: '/blog', stats: `${blogPosts.length} articles`, tags: ['Tutorials', 'Best Practices'] },
  { id: 'snippets', title: 'Code Snippets', description: 'Ready-to-use code snippets for common tasks', icon: FileText, path: '/snippets', tags: ['Copy & Paste', 'Reusable'] },
  { id: 'games', title: 'Dev Games', description: 'Fun interactive games to test your knowledge', icon: Gamepad2, path: '/games', tags: ['Interactive', 'Fun'] },
  { id: 'resources', title: 'Resources', description: 'Curated tools, libraries, and learning materials', icon: Wrench, path: '/resources', tags: ['Tools', 'Libraries'] },
  { id: 'coming-soon', title: 'Coming Soon', description: 'Upcoming features — AI code review, mock interviews, roadmaps & more', icon: Rocket, path: '/coming-soon', tags: ['Roadmap', 'New Features'] },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const query = searchQuery.toLowerCase();
    const matchedSections = platformSections.filter(
      section => section.title.toLowerCase().includes(query) || section.description.toLowerCase().includes(query) || section.tags?.some(tag => tag.toLowerCase().includes(query))
    );
    const matchedBlogs = searchPosts(query).slice(0, 5);
    const matchedChallenges = searchChallenges(query).slice(0, 5);
    return { sections: matchedSections, blogs: matchedBlogs, challenges: matchedChallenges, total: matchedSections.length + matchedBlogs.length + matchedChallenges.length };
  }, [searchQuery]);

  return (
    <div className="min-h-screen pb-16">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center relative">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-6">
          <Terminal className="w-4 h-4" />
          One-Stop Developer Platform
        </div>
        
        <h1 
          className="text-4xl md:text-6xl font-extrabold mb-4 glitch-text neon-text-blue"
          data-text="InspectCode"
        >
          InspectCode
        </h1>
        
        <p className="text-lg text-secondary-foreground max-w-xl mx-auto mb-2">
          Built for developers, by developers
        </p>
        
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          Everything you need to learn, practice, and build. Coding challenges, playground, 
          system design, blog, snippets, and more — all in one place.
        </p>

        {/* Search */}
        <div className="max-w-xl mx-auto relative">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search challenges, blogs, snippets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-6 text-lg rounded-xl border-primary/20 focus:border-primary bg-card"
            />
          </div>

          {searchResults && searchResults.total > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-card border border-border rounded-xl shadow-lg z-50 max-h-96 overflow-auto">
              {searchResults.sections.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs text-muted-foreground mb-2 px-2">Sections</p>
                  {searchResults.sections.map((section) => (
                    <Link key={section.id} to={section.path} onClick={() => setSearchQuery('')} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                      <section.icon className="w-5 h-5 text-primary" />
                      <div className="text-left">
                        <p className="font-medium">{section.title}</p>
                        <p className="text-sm text-muted-foreground">{section.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
              {searchResults.blogs.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs text-muted-foreground mb-2 px-2">Blog Posts</p>
                  {searchResults.blogs.map((post) => (
                    <Link key={post.slug} to={`/blog/${post.slug}`} onClick={() => setSearchQuery('')} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                      <BookOpen className="w-5 h-5 text-muted-foreground" />
                      <div className="text-left">
                        <p className="font-medium">{post.title}</p>
                        <p className="text-sm text-muted-foreground line-clamp-1">{post.excerpt}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
              {searchResults.challenges.length > 0 && (
                <div>
                  <p className="text-xs text-muted-foreground mb-2 px-2">Challenges</p>
                  {searchResults.challenges.map((challenge) => (
                    <Link key={challenge.id} to={`/coding/${challenge.id}`} onClick={() => setSearchQuery('')} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                      <Code2 className="w-5 h-5 text-muted-foreground" />
                      <div className="text-left">
                        <p className="font-medium">{challenge.title}</p>
                        <p className="text-sm text-muted-foreground">{challenge.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Platform Sections Grid */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {platformSections.map((section) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.id}
                to={section.path}
                className="group p-5 sm:p-6 rounded-xl border border-border bg-card hover:border-primary/40 hover-neon-blue transition-all"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold group-hover:text-primary transition-colors mb-1">
                      {section.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">{section.description}</p>
                    {section.stats && (
                      <p className="text-xs font-medium text-secondary-foreground mb-2">{section.stats}</p>
                    )}
                    {section.tags && (
                      <div className="flex flex-wrap gap-1.5">
                        {section.tags.map((tag) => (
                          <span key={tag} className="px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary border border-primary/20">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4 py-12">
        <div className="rounded-xl border border-primary/20 bg-card p-6 sm:p-8 neon-glow-blue">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-bold neon-text-cyan mb-1">{challenges.length}+</div>
              <p className="text-xs sm:text-sm text-muted-foreground">Coding Challenges</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold neon-text-blue mb-1">{blogPosts.length}+</div>
              <p className="text-xs sm:text-sm text-muted-foreground">Blog Articles</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold neon-text-cyan mb-1">50+</div>
              <p className="text-xs sm:text-sm text-muted-foreground">Code Snippets</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold neon-text-blue mb-1">3</div>
              <p className="text-xs sm:text-sm text-muted-foreground">Languages</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <Link to="/playground" className="flex-1 group p-5 sm:p-6 rounded-xl border border-primary/20 bg-primary/5 hover:bg-primary/10 hover-neon-blue transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-lg bg-primary/20">
                <PlayCircle className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold">Start Coding Now</h3>
                <p className="text-sm text-muted-foreground">Jump into the playground</p>
              </div>
            </div>
            <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/80">
              Open Playground <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>

          <Link to="/coding" className="flex-1 group p-5 sm:p-6 rounded-xl border border-border bg-card hover:border-accent/40 hover-neon-cyan transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-lg bg-accent/10">
                <Code2 className="w-7 h-7 sm:w-8 sm:h-8 text-accent" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold">Take a Challenge</h3>
                <p className="text-sm text-muted-foreground">Test your skills</p>
              </div>
            </div>
            <Button variant="outline" className="gap-2 border-accent/30 text-accent hover:bg-accent/10">
              Browse Challenges <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
