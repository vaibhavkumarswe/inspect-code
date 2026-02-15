import { useState, useCallback, useEffect } from 'react';
import { Music, Plus, Trash2, Play, Search, ExternalLink, Headphones, Radio } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

const DEFAULT_PLAYLISTS = [
  { id: '37i9dQZF1DX5trt9i14X7j', name: 'Coding Mode', category: 'Focus' },
  { id: '6KTkmUbzqDH9WhwzkxiqbA', name: 'Bollywood Hits', category: 'Bollywood' },
  { id: '37i9dQZF1DX0XUfTFmNBRM', name: 'Bollywood Butter', category: 'Bollywood' },
  { id: '37i9dQZF1DWZeKCadgRdKQ', name: 'Deep Focus', category: 'Focus' },
  { id: '37i9dQZF1DX1i3hvzHpcQV', name: 'Punjabi Pop', category: 'Punjabi' },
  { id: '37i9dQZF1DX4sWSpwq3LiO', name: 'Peaceful Piano', category: 'Focus' },
  { id: '37i9dQZF1DWWQRwui0ExPn', name: 'Lo-fi Beats', category: 'Focus' },
  { id: '37i9dQZF1DX8Uebhn9wzrS', name: 'Chill Lounge', category: 'Chill' },
];

const STORAGE_KEY = 'music-custom-playlists';
const CATEGORIES = ['All', 'Focus', 'Bollywood', 'Punjabi', 'Chill', 'Custom'];

type Playlist = { id: string; name: string; category: string };

function loadCustomPlaylists(): Playlist[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveCustomPlaylists(custom: Playlist[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(custom));
}

function extractPlaylistId(input: string): string | null {
  const urlMatch = input.match(/playlist\/([a-zA-Z0-9]+)/);
  if (urlMatch) return urlMatch[1];
  const embedMatch = input.match(/embed\/playlist\/([a-zA-Z0-9]+)/);
  if (embedMatch) return embedMatch[1];
  if (/^[a-zA-Z0-9]{22}$/.test(input.trim())) return input.trim();
  return null;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Music_Page = () => {
  const [customPlaylists, setCustomPlaylists] = useState<Playlist[]>(loadCustomPlaylists);
  const playlists = [...DEFAULT_PLAYLISTS, ...customPlaylists];
  const [activePlaylist, setActivePlaylist] = useState(DEFAULT_PLAYLISTS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [newUrl, setNewUrl] = useState('');
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState('Custom');

  useEffect(() => {
    saveCustomPlaylists(customPlaylists);
  }, [customPlaylists]);

  const handleAdd = useCallback(() => {
    const id = extractPlaylistId(newUrl);
    if (!id) return;
    const name = newName.trim().slice(0, 80) || `Playlist ${playlists.length + 1}`;
    const newPl = { id, name, category: newCategory };
    setCustomPlaylists((prev) => [...prev, newPl]);
    setActivePlaylist(newPl);
    setNewUrl('');
    setNewName('');
  }, [newUrl, newName, newCategory, playlists.length]);

  const handleRemove = useCallback((id: string) => {
    setCustomPlaylists((prev) => {
      const next = prev.filter((p) => p.id !== id);
      if (activePlaylist.id === id) {
        setActivePlaylist(DEFAULT_PLAYLISTS[0]);
      }
      return next;
    });
  }, [activePlaylist.id]);

  const filteredPlaylists = playlists.filter((pl) => {
    const matchesSearch = pl.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || pl.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const isDefault = (id: string) => DEFAULT_PLAYLISTS.some((d) => d.id === id);

  return (
    <section className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-6">
          <Headphones className="w-4 h-4 text-accent" />
          <span className="text-xs font-semibold text-accent tracking-wide uppercase">Music Hub</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground mb-4">
          Code with <span className="gradient-text">Music</span>
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto text-base">
          Curate your perfect coding soundtrack. Browse playlists, add your own Spotify collections, and stay in the zone.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-[1fr,420px] gap-8">
        {/* Left: Playlist Grid */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search playlists..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 h-10 bg-card border-border/50 focus:border-accent/50" aria-label="Search playlists" />
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1" role="tablist" aria-label="Filter by category">
            {CATEGORIES.map((cat) => (
              <button key={cat} role="tab" aria-selected={activeCategory === cat} onClick={() => setActiveCategory(cat)} className={`flex-shrink-0 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 border ${activeCategory === cat ? 'bg-accent/15 text-accent border-accent/30' : 'text-muted-foreground border-transparent hover:bg-muted/50 hover:text-foreground'}`}>
                {cat}
              </button>
            ))}
          </div>

          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid sm:grid-cols-2 gap-3">
            {filteredPlaylists.map((pl) => (
              <motion.div key={pl.id} variants={itemVariants}>
                <Card className={`group cursor-pointer transition-all duration-300 border ${activePlaylist.id === pl.id ? 'border-accent/40 bg-accent/5 shadow-md' : 'border-border/50 hover:border-accent/20 hover:bg-card/80'}`} onClick={() => setActivePlaylist(pl)}>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl transition-colors ${activePlaylist.id === pl.id ? 'bg-accent/20' : 'bg-muted/50 group-hover:bg-accent/10'}`}>
                      {activePlaylist.id === pl.id ? <Radio className="w-4 h-4 text-accent" /> : <Play className="w-4 h-4 text-muted-foreground group-hover:text-accent" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{pl.name}</p>
                      <p className="text-[11px] text-muted-foreground">{pl.category}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <a href={`https://open.spotify.com/playlist/${pl.id}`} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="p-1.5 rounded-md text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors" aria-label={`Open ${pl.name} on Spotify`}>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      {!isDefault(pl.id) && (
                        <button onClick={(e) => { e.stopPropagation(); handleRemove(pl.id); }} className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors" aria-label={`Remove ${pl.name}`}>
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
            {filteredPlaylists.length === 0 && (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                <Music className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm">No playlists found</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Right: Player + Add Form */}
        <div className="space-y-5">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-card-enhanced rounded-2xl overflow-hidden sticky top-24">
            <div className="px-4 py-3 border-b border-border/30 flex items-center gap-2">
              <Radio className="w-4 h-4 text-accent animate-pulse" />
              <span className="text-sm font-bold text-foreground">Now Playing</span>
              <span className="text-xs text-muted-foreground ml-auto">{activePlaylist.name}</span>
            </div>
            <div className="p-3">
              <div className="rounded-xl overflow-hidden border border-border/20">
                <iframe src={`https://open.spotify.com/embed/playlist/${activePlaylist.id}?utm_source=generator&theme=0`} width="100%" height="380" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" title={`Spotify playlist: ${activePlaylist.name}`} />
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="glass-card-enhanced rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2">
              <Plus className="w-4 h-4 text-accent" />
              <h2 className="text-sm font-bold text-foreground">Add Your Playlist</h2>
            </div>
            <div className="space-y-3">
              <div>
                <label htmlFor="music-url" className="text-[11px] font-medium text-muted-foreground mb-1 block">Spotify Playlist URL</label>
                <Input id="music-url" placeholder="https://open.spotify.com/playlist/..." value={newUrl} onChange={(e) => setNewUrl(e.target.value)} className="h-9 text-xs bg-background/50 border-border/50 focus:border-accent/50" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="music-name" className="text-[11px] font-medium text-muted-foreground mb-1 block">Name</label>
                  <Input id="music-name" placeholder="My Playlist" value={newName} onChange={(e) => setNewName(e.target.value)} className="h-9 text-xs bg-background/50 border-border/50" maxLength={80} />
                </div>
                <div>
                  <label htmlFor="music-category" className="text-[11px] font-medium text-muted-foreground mb-1 block">Category</label>
                  <select id="music-category" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="h-9 w-full rounded-md border border-border/50 bg-background/50 px-3 text-xs text-foreground focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-ring" aria-label="Playlist category">
                    {CATEGORIES.filter((c) => c !== 'All').map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <Button onClick={handleAdd} disabled={!newUrl.trim()} className="w-full h-9 text-xs font-semibold bg-accent text-accent-foreground hover:bg-accent/80">
                <Plus className="w-3.5 h-3.5 mr-1" /> Add Playlist
              </Button>
              <p className="text-[10px] text-muted-foreground/60 text-center">Supports Spotify URLs, embed codes, or raw playlist IDs</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Music_Page;
