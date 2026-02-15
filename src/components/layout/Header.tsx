import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Code2, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

const mainNavItems = [
  { name: 'Playground', path: '/playground' },
  { name: 'Challenges', path: '/coding' },
  { name: 'Interview Prep', path: '/interview' },
  { name: 'System Design', path: '/system-design' },
  { name: 'Blog', path: '/blog' },
];

const moreItems = [
  { name: 'Snippets', path: '/snippets' },
  { name: 'Resources', path: '/resources' },
  { name: 'Games', path: '/games' },
  { name: 'Music', path: '/music' },
  { name: 'Ask AI', path: '/ask-ai' },
  { name: 'Contact', path: '/contact' },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          isScrolled ? 'bg-background/95 backdrop-blur-md border-b border-primary/10 shadow-lg shadow-primary/5' : 'bg-background'
        }`}
      >
        <nav className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center group-hover:neon-glow-blue transition-all">
                <Code2 className="w-4 h-4 text-primary" />
              </div>
              <span className="text-lg font-bold neon-text-blue">InspectCode</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {mainNavItems.map((item) => {
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      active
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}

              {/* More dropdown */}
              <div ref={moreRef} className="relative">
                <button
                  onClick={() => setIsMoreOpen(!isMoreOpen)}
                  className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors text-muted-foreground hover:text-primary hover:bg-primary/5 ${
                    moreItems.some(i => isActive(i.path)) ? 'text-primary bg-primary/10' : ''
                  }`}
                >
                  More <ChevronDown className="w-3 h-3" />
                </button>
                {isMoreOpen && (
                  <div className="absolute top-full right-0 mt-1 w-44 rounded-lg border border-primary/20 bg-card p-1 shadow-lg shadow-primary/10">
                    {moreItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsMoreOpen(false)}
                        className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                          isActive(item.path)
                            ? 'text-primary bg-primary/10'
                            : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-2">
              <div className="hidden md:block">
                <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/80 hover-neon-blue">
                  <Link to="/playground">Start Coding</Link>
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-muted-foreground hover:text-primary"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-background/90 backdrop-blur-md" onClick={() => setIsMenuOpen(false)} />
          <div className="fixed top-16 left-0 right-0 bg-card border-b border-primary/20 p-4">
            <div className="flex flex-col gap-1">
              {[...mainNavItems, ...moreItems].map((item) => {
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                      active ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <div className="pt-4 mt-2 border-t border-border">
                <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/80">
                  <Link to="/playground" onClick={() => setIsMenuOpen(false)}>Start Coding</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
