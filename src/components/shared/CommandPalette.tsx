import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Home,
  Play,
  Code,
  BookOpen,
  FileText,
  Wrench,
  Gamepad2,
  Sun,
  Moon,
  Layers,
  Music,
  Bot,
  Mail,
  GraduationCap,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleTheme } from '@/store/themeSlice';

export const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.mode);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  const pages = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Playground', path: '/playground', icon: Play },
    { name: 'Challenges', path: '/coding', icon: Code },
    { name: 'Interview Prep', path: '/interview', icon: GraduationCap },
    { name: 'System Design', path: '/system-design', icon: Layers },
    { name: 'Blog', path: '/blog', icon: BookOpen },
    { name: 'Snippets', path: '/snippets', icon: FileText },
    { name: 'Resources', path: '/resources', icon: Wrench },
    { name: 'Games', path: '/games', icon: Gamepad2 },
    { name: 'Music', path: '/music', icon: Music },
    { name: 'Ask AI', path: '/ask-ai', icon: Bot },
    { name: 'Contact', path: '/contact', icon: Mail },
  ];

  const actions = [
    {
      name: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`,
      icon: theme === 'dark' ? Sun : Moon,
      action: () => dispatch(toggleTheme()),
    },
  ];

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 p-4">
        <Command className="rounded-lg border border-border shadow-lg bg-background">
          <CommandInput placeholder="Search pages or actions..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            
            <CommandGroup heading="Pages">
              {pages.map((page) => {
                const Icon = page.icon;
                return (
                  <CommandItem
                    key={page.path}
                    value={page.name}
                    onSelect={() => runCommand(() => navigate(page.path))}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {page.name}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            
            <CommandSeparator />
            
            <CommandGroup heading="Actions">
              {actions.map((action) => {
                const Icon = action.icon;
                return (
                  <CommandItem
                    key={action.name}
                    value={action.name}
                    onSelect={() => runCommand(action.action)}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {action.name}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
        <p className="text-xs text-muted-foreground text-center mt-2">
          Press <kbd className="px-1.5 py-0.5 rounded bg-muted text-xs">Esc</kbd> to close
        </p>
      </div>
    </>
  );
};
