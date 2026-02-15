import { useState, useMemo } from 'react';
import { Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  systemDesignTopics, 
  categories, 
  searchTopics,
  type SystemDesignTopic,
  type SystemDesignCategory,
  type DifficultyLevel 
} from '@/data/system-design';
import { FilterBar } from '@/components/system-design/FilterBar';
import { TopicCard, TopicDetailModal, CategoryOverview } from '@/components/system-design/TopicComponents';
import { 
  BookOpen, Layers, Code2, Database as DatabaseIcon, 
  TrendingUp, Monitor, Server, Network 
} from 'lucide-react';

const categoryIcons: Record<string, React.ElementType> = {
  BookOpen, Layers, Code2, Database: DatabaseIcon, TrendingUp, Monitor, Server, Network,
};

const SystemDesign = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SystemDesignCategory | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'all'>('all');
  const [selectedTopic, setSelectedTopic] = useState<SystemDesignTopic | null>(null);

  const filteredTopics = useMemo(() => {
    let results = searchQuery ? searchTopics(searchQuery) : systemDesignTopics;
    if (selectedCategory !== 'all') {
      results = results.filter(topic => topic.category === selectedCategory);
    }
    if (selectedDifficulty !== 'all') {
      results = results.filter(topic => topic.difficulty === selectedDifficulty);
    }
    return results;
  }, [searchQuery, selectedCategory, selectedDifficulty]);

  const topicsByCategory = useMemo(() => {
    const grouped: Record<string, SystemDesignTopic[]> = {};
    filteredTopics.forEach(topic => {
      if (!grouped[topic.category]) grouped[topic.category] = [];
      grouped[topic.category].push(topic);
    });
    return grouped;
  }, [filteredTopics]);

  const topicCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    systemDesignTopics.forEach(t => {
      counts[t.category] = (counts[t.category] || 0) + 1;
    });
    return counts;
  }, []);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedDifficulty('all');
  };

  const hasActiveFilters = !!searchQuery || selectedCategory !== 'all' || selectedDifficulty !== 'all';

  return (
    <div className="min-h-screen pb-16">
      {/* Header + Filters */}
      <section className="container mx-auto px-4 py-8 sm:py-12">
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedDifficulty={selectedDifficulty}
          onDifficultyChange={setSelectedDifficulty}
          resultCount={filteredTopics.length}
          hasActiveFilters={hasActiveFilters}
          onClearFilters={clearFilters}
        />
      </section>

      {/* Category Overview Cards */}
      {!hasActiveFilters && (
        <section className="container mx-auto px-4 pb-8">
          <CategoryOverview 
            onCategorySelect={(id) => setSelectedCategory(id as SystemDesignCategory)} 
            topicCounts={topicCounts}
          />
        </section>
      )}

      {/* Topics List */}
      <section className="container mx-auto px-4 py-8">
        {selectedCategory === 'all' && !searchQuery ? (
          <div className="space-y-12">
            {categories.map((cat) => {
              const topics = topicsByCategory[cat.id];
              if (!topics || topics.length === 0) return null;
              const Icon = categoryIcons[cat.icon] || BookOpen;
              return (
                <div key={cat.id}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-2 rounded-lg ${cat.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold">{cat.name}</h2>
                      <p className="text-xs sm:text-sm text-muted-foreground">{cat.description}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {topics.map((topic) => (
                      <TopicCard 
                        key={topic.id} 
                        topic={topic} 
                        onClick={() => setSelectedTopic(topic)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTopics.map((topic) => (
              <TopicCard 
                key={topic.id} 
                topic={topic}
                onClick={() => setSelectedTopic(topic)}
              />
            ))}
          </div>
        )}

        {filteredTopics.length === 0 && (
          <div className="text-center py-16">
            <Database className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No topics found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
            <Button variant="outline" onClick={clearFilters}>Clear all filters</Button>
          </div>
        )}
      </section>

      {/* Topic Detail Modal */}
      {selectedTopic && (
        <TopicDetailModal 
          topic={selectedTopic} 
          onClose={() => setSelectedTopic(null)} 
        />
      )}
    </div>
  );
};

export default SystemDesign;
