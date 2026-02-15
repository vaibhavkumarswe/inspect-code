import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Search, 
  Sparkles, 
  Zap, 
  Trophy,
  Filter,
  ChevronRight,
  Star
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  challenges,
  languageLabels,
  languageColors,
  difficultyLabels,
  difficultyColors,
  languageDescriptions,
  getChallengeCounts,
  type LanguageMode,
  type ChallengeDifficulty,
} from '@/data/challenges/index';

const CodingChallenges = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageMode | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<ChallengeDifficulty | 'all'>('all');
  
  const counts = getChallengeCounts();
  
  const filteredChallenges = useMemo(() => {
    return challenges.filter(challenge => {
      const matchesSearch = searchQuery === '' || 
        challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        challenge.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        challenge.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesLanguage = selectedLanguage === 'all' || challenge.language === selectedLanguage;
      const matchesDifficulty = selectedDifficulty === 'all' || challenge.difficulty === selectedDifficulty;
      
      return matchesSearch && matchesLanguage && matchesDifficulty;
    });
  }, [searchQuery, selectedLanguage, selectedDifficulty]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Code2 className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Practice Mode</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            FE Machine Coding
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Master frontend interview challenges with our interactive code editor. 
            Choose a challenge, write code, and see results instantly.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto"
        >
          {(Object.keys(languageLabels) as LanguageMode[]).map((lang, index) => (
            <motion.button
              key={lang}
              onClick={() => setSelectedLanguage(selectedLanguage === lang ? 'all' : lang)}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`relative p-4 rounded-2xl border transition-all overflow-hidden group ${
                selectedLanguage === lang 
                  ? 'border-primary bg-primary/10' 
                  : 'border-border/50 glass-card hover:border-primary/50'
              }`}
            >
              {/* Glow effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at center, ${languageColors[lang]}20 0%, transparent 70%)`,
                }}
              />
              <div className="relative">
                <div 
                  className="text-3xl font-bold mb-1"
                  style={{ color: languageColors[lang] }}
                >
                  {counts[lang]}
                </div>
                <div className="text-sm font-medium text-foreground">{languageLabels[lang]}</div>
                <div className="text-xs text-muted-foreground mt-1 line-clamp-1">
                  {languageDescriptions[lang].split(' ').slice(0, 3).join(' ')}...
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-8"
        >
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search challenges..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/50 border-border/50"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <div className="flex gap-1 p-1 glass-card rounded-lg border border-border/50">
              {(['all', 'beginner', 'intermediate', 'advanced', 'expert'] as const).map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    selectedDifficulty === diff
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  {diff === 'all' ? 'All Levels' : difficultyLabels[diff]}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Challenge Grid - Bento Style */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {filteredChallenges.map((challenge, index) => {
            // Bento sizing logic - some cards larger
            const isLarge = index % 7 === 0;
            const isMedium = index % 5 === 2;
            
            return (
              <motion.div
                key={challenge.id}
                variants={cardVariants}
                className={`${isLarge ? 'md:col-span-2 md:row-span-2' : ''} ${isMedium ? 'lg:col-span-2' : ''}`}
              >
                <Link
                  to={`/coding/${challenge.id}`}
                  className="group block h-full"
                >
                  <motion.div
                    whileHover={{ y: -4, scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`relative h-full glass-card rounded-2xl border border-border/50 overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 ${
                      isLarge ? 'p-8' : 'p-5'
                    }`}
                  >
                    {/* Animated gradient background */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(135deg, ${languageColors[challenge.language]}10 0%, transparent 50%, ${difficultyColors[challenge.difficulty]}10 100%)`,
                      }}
                    />
                    
                    {/* Floating particles on hover */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                      <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-primary/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700 delay-100" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col">
                      {/* Header badges */}
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span 
                          className="px-2.5 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1"
                          style={{ 
                            backgroundColor: `${languageColors[challenge.language]}20`,
                            color: languageColors[challenge.language],
                          }}
                        >
                          <Sparkles className="h-3 w-3" />
                          {languageLabels[challenge.language]}
                        </span>
                        <span 
                          className="px-2.5 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1"
                          style={{ 
                            backgroundColor: `${difficultyColors[challenge.difficulty]}20`,
                            color: difficultyColors[challenge.difficulty],
                          }}
                        >
                          <Zap className="h-3 w-3" />
                          {difficultyLabels[challenge.difficulty]}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className={`font-bold text-foreground mb-2 group-hover:text-primary transition-colors ${
                        isLarge ? 'text-2xl' : 'text-lg'
                      }`}>
                        {challenge.title}
                      </h3>

                      {/* Description */}
                      <p className={`text-muted-foreground flex-1 ${
                        isLarge ? 'text-base line-clamp-4' : 'text-sm line-clamp-2'
                      }`}>
                        {challenge.description}
                      </p>

                      {/* Tags */}
                      {challenge.tags && challenge.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {challenge.tags.slice(0, isLarge ? 5 : 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-full text-xs bg-muted/50 text-muted-foreground"
                            >
                              #{tag}
                            </span>
                          ))}
                          {challenge.tags.length > (isLarge ? 5 : 3) && (
                            <span className="px-2 py-0.5 rounded-full text-xs bg-muted/50 text-muted-foreground">
                              +{challenge.tags.length - (isLarge ? 5 : 3)}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Action indicator */}
                      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border/30">
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground group-hover:text-primary transition-colors">
                          <Code2 className="h-4 w-4" />
                          <span>Start Challenge</span>
                        </div>
                        <ChevronRight className="h-4 w-4 ml-auto text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>

                    {/* Corner decoration */}
                    <div 
                      className="absolute top-0 right-0 w-16 h-16 opacity-10"
                      style={{
                        background: `linear-gradient(135deg, ${languageColors[challenge.language]} 0%, transparent 100%)`,
                      }}
                    />
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Empty State */}
        {filteredChallenges.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted/50 mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No challenges found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters or search query
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setSelectedLanguage('all');
                setSelectedDifficulty('all');
              }}
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CodingChallenges;
