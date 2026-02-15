import { Search, Filter, TrendingUp, X, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { categories } from '@/data/system-design';
import type { SystemDesignCategory, DifficultyLevel } from '@/data/system-design/types';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: SystemDesignCategory | 'all';
  onCategoryChange: (cat: SystemDesignCategory | 'all') => void;
  selectedDifficulty: DifficultyLevel | 'all';
  onDifficultyChange: (diff: DifficultyLevel | 'all') => void;
  resultCount: number;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

export const FilterBar = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedDifficulty,
  onDifficultyChange,
  resultCount,
  hasActiveFilters,
  onClearFilters,
}: FilterBarProps) => {
  return (
    <>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4" />
          System Design Mastery
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">System Design</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
          Master system design concepts from fundamentals to advanced distributed systems. 
          HLD, LLD, databases, scalability, and more.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search topics... (e.g., sharding, bloom filter, microservices)"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-5 sm:py-6 text-base sm:text-lg rounded-xl"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Filter className="w-4 h-4 hidden sm:block" />
            <span className="text-xs sm:text-sm">Category:</span>
          </div>
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onCategoryChange('all')}
            className="rounded-full text-xs sm:text-sm"
          >
            All
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => onCategoryChange(cat.id)}
              className="rounded-full text-xs sm:text-sm"
            >
              {cat.name}
            </Button>
          ))}
        </div>

        {/* Difficulty Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <TrendingUp className="w-4 h-4 hidden sm:block" />
            <span className="text-xs sm:text-sm">Difficulty:</span>
          </div>
          {(['all', 'beginner', 'intermediate', 'advanced', 'expert'] as const).map((level) => (
            <Button
              key={level}
              variant={selectedDifficulty === level ? 'default' : 'outline'}
              size="sm"
              onClick={() => onDifficultyChange(level)}
              className="rounded-full capitalize text-xs sm:text-sm"
            >
              {level}
            </Button>
          ))}
        </div>

        {hasActiveFilters && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {resultCount} topics found
            </span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4 mr-1" />
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
