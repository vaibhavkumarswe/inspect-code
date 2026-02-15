import { useState, useCallback, useEffect } from 'react';
import { Music, X, ChevronDown, ChevronUp, Plus, Trash2, ExternalLink, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const DEFAULT_PLAYLISTS = [
  { id: '37i9dQZF1DX5trt9i14X7j', name: 'Coding Mode' },
  { id: '6KTkmUbzqDH9WhwzkxiqbA', name: 'Bollywood Hits' },
  { id: '37i9dQZF1DX0XUfTFmNBRM', name: 'Bollywood Butter' },
  { id: '37i9dQZF1DWZeKCadgRdKQ', name: 'Deep Focus' },
  { id: '37i9dQZF1DX1i3hvzHpcQV', name: 'Punjabi Pop' },
];

const WIDGET_STORAGE_KEY = 'widget-custom-playlists';

type WidgetPlaylist = { id: string; name: string };

function loadCustom(): WidgetPlaylist[] {
  try {
    const stored = localStorage.getItem(WIDGET_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveCustom(items: WidgetPlaylist[]) {
  localStorage.setItem(WIDGET_STORAGE_KEY, JSON.stringify(items));
}

function extractPlaylistId(input: string): string | null {
  const urlMatch = input.match(/playlist\/([a-zA-Z0-9]+)/);
  if (urlMatch) return urlMatch[1];
  const embedMatch = input.match(/embed\/playlist\/([a-zA-Z0-9]+)/);
  if (embedMatch) return embedMatch[1];
  if (/^[a-zA-Z0-9]{22}$/.test(input.trim())) return input.trim();
  return null;
}

export const SpotifyWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [customPlaylists, setCustomPlaylists] = useState<WidgetPlaylist[]>(loadCustom);
  const playlists = [...DEFAULT_PLAYLISTS, ...customPlaylists];
  const [activePlaylist, setActivePlaylist] = useState(DEFAULT_PLAYLISTS[0]);
  const [showAdd, setShowAdd] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [newName, setNewName] = useState('');

  useEffect(() => {
    saveCustom(customPlaylists);
  }, [customPlaylists]);

  const handleAdd = useCallback(() => {
    const id = extractPlaylistId(newUrl);
    if (!id) return;
    const name = newName.trim().slice(0, 80) || `Playlist ${playlists.length + 1}`;
    const newPl = { id, name };
    setCustomPlaylists((prev) => [...prev, newPl]);
    setActivePlaylist(newPl);
    setNewUrl('');
    setNewName('');
    setShowAdd(false);
  }, [newUrl, newName, playlists.length]);

  const handleRemove = useCallback((id: string) => {
    setCustomPlaylists((prev) => {
      const next = prev.filter((p) => p.id !== id);
      if (activePlaylist.id === id) {
        setActivePlaylist(DEFAULT_PLAYLISTS[0]);
      }
      return next;
    });
  }, [activePlaylist.id]);

  if (!isOpen) {
    return (
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 group"
        aria-label="Open music player"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      >
        <div className="relative p-3.5 rounded-full glass-card-enhanced hover-neon-cyan transition-all duration-300">
          <span className="absolute inset-0 rounded-full animate-ping bg-accent/20" />
          <Music className="w-5 h-5 text-accent relative z-10" />
        </div>
      </motion.button>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
        className="fixed bottom-6 right-6 z-40 w-[340px] sm:w-[370px] rounded-2xl overflow-hidden glass-card-enhanced"
        role="region"
        aria-label="Music player widget"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-gradient-to-r from-primary/10 via-accent/5 to-transparent">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-accent/15">
              <Volume2 className="w-4 h-4 text-accent" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-foreground tracking-tight">Study Music</h2>
              <p className="text-[10px] text-muted-foreground">{activePlaylist.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-0.5">
            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-accent" onClick={() => setShowAdd(!showAdd)} aria-label="Add playlist" aria-expanded={showAdd}>
              <Plus className="w-4 h-4" />
            </Button>
            <Link to="/music">
              <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-accent" aria-label="Open full music page">
                <ExternalLink className="w-3.5 h-3.5" />
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground" onClick={() => setIsMinimized(!isMinimized)} aria-label={isMinimized ? 'Expand player' : 'Minimize player'}>
              {isMinimized ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive" onClick={() => setIsOpen(false)} aria-label="Close music player">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {!isMinimized && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
              {/* Add form */}
              <AnimatePresence>
                {showAdd && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-b border-border/50">
                    <div className="p-3 space-y-2 bg-muted/20">
                      <label htmlFor="spotify-url" className="text-[11px] font-medium text-muted-foreground">Add Spotify Playlist</label>
                      <Input id="spotify-url" placeholder="Paste Spotify playlist URL..." value={newUrl} onChange={(e) => setNewUrl(e.target.value)} className="text-xs h-8 bg-background/50 border-border/50 focus:border-accent/50" />
                      <div className="flex gap-2">
                        <Input placeholder="Name (optional)" value={newName} onChange={(e) => setNewName(e.target.value)} className="text-xs h-8 bg-background/50 border-border/50" aria-label="Playlist name" maxLength={80} />
                        <Button size="sm" className="h-8 text-xs px-4 bg-accent text-accent-foreground hover:bg-accent/80 font-semibold" onClick={handleAdd} disabled={!newUrl.trim()}>Add</Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Playlist tabs */}
              <div className="flex gap-1.5 p-2.5 overflow-x-auto scrollbar-none" role="tablist" aria-label="Playlist selection">
                {playlists.map((pl) => (
                  <button key={pl.id} onClick={() => setActivePlaylist(pl)} role="tab" aria-selected={activePlaylist.id === pl.id} aria-label={`Play ${pl.name}`} className={`group relative flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${activePlaylist.id === pl.id ? 'bg-accent/15 text-accent border border-accent/30 shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent'}`}>
                    {pl.name}
                    {!DEFAULT_PLAYLISTS.some((d) => d.id === pl.id) && (
                      <span onClick={(e) => { e.stopPropagation(); handleRemove(pl.id); }} role="button" aria-label={`Remove ${pl.name}`} className="absolute -top-1.5 -right-1.5 hidden group-hover:flex w-4 h-4 items-center justify-center rounded-full bg-destructive text-destructive-foreground cursor-pointer transition-transform hover:scale-110">
                        <Trash2 className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Spotify Embed */}
              <div className="px-2.5 pb-2.5">
                <div className="rounded-xl overflow-hidden border border-border/30">
                  <iframe src={`https://open.spotify.com/embed/playlist/${activePlaylist.id}?utm_source=generator&theme=0`} width="100%" height="352" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" title={`Spotify playlist: ${activePlaylist.name}`} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};
