import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { CommandPalette } from '@/components/shared/CommandPalette';
import { SpotifyWidget } from '@/components/shared/SpotifyWidget';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  // Force dark mode always (cyberpunk theme)
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <>
      <CommandPalette />
      
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
      </div>

      <SpotifyWidget />
    </>
  );
};
