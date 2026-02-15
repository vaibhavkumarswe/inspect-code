import { BookOpen, Layers, Code2, Database, TrendingUp, Monitor, Server, Network, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight, X } from 'lucide-react';
import { FlowDiagram } from './FlowDiagram';
import { CodeSnippet } from './CodeSnippet';
import { categories } from '@/data/system-design';
import type { SystemDesignTopic, DifficultyLevel } from '@/data/system-design/types';

const categoryIcons: Record<string, React.ElementType> = {
  BookOpen, Layers, Code2, Database, TrendingUp, Monitor, Server, Network,
};

export const difficultyColors: Record<DifficultyLevel, string> = {
  beginner: 'bg-muted text-foreground',
  intermediate: 'bg-primary/10 text-primary',
  advanced: 'bg-foreground/10 text-foreground',
  expert: 'bg-foreground/20 text-foreground',
};

/** Topics with diagram or code examples get a full page */
const hasFullPage = (topic: SystemDesignTopic) =>
  !!(topic.diagram || (topic.codeExamples && topic.codeExamples.length > 0));

// ==========================================
// Topic Card
// ==========================================

interface TopicCardProps {
  topic: SystemDesignTopic;
  onClick: () => void;
}

export const TopicCard = ({ topic, onClick }: TopicCardProps) => {
  const navigate = useNavigate();
  const category = categories.find(c => c.id === topic.category);
  const isFullPage = hasFullPage(topic);

  const handleClick = () => {
    if (isFullPage) {
      navigate(`/system-design/${topic.id}`);
    } else {
      onClick();
    }
  };

  return (
    <Card
      className="group cursor-pointer hover:border-primary/50 hover:shadow-sm transition-all"
      onClick={handleClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base sm:text-lg group-hover:text-primary transition-colors line-clamp-2">
            {topic.title}
          </CardTitle>
          <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" />
        </div>
        <CardDescription className="line-clamp-2 text-xs sm:text-sm">
          {topic.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className={difficultyColors[topic.difficulty]}>
            {topic.difficulty}
          </Badge>
          {category && (
            <Badge variant="outline" className="text-xs">
              {category.name}
            </Badge>
          )}
          {isFullPage && (
            <Badge variant="outline" className="text-xs bg-primary/5">
              📄 Full Page
            </Badge>
          )}
          {!isFullPage && (
            <Badge variant="outline" className="text-xs bg-muted">
              💬 Quick View
            </Badge>
          )}
          {topic.diagram && (
            <Badge variant="outline" className="text-xs bg-primary/5">
              📊 Diagram
            </Badge>
          )}
          {topic.codeExamples && topic.codeExamples.length > 0 && (
            <Badge variant="outline" className="text-xs bg-primary/5">
              💻 Code
            </Badge>
          )}
        </div>
        {topic.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {topic.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// ==========================================
// Topic Detail Modal (for lightweight topics)
// ==========================================

interface TopicDetailModalProps {
  topic: SystemDesignTopic;
  onClose: () => void;
}

export const TopicDetailModal = ({ topic, onClose }: TopicDetailModalProps) => {
  const category = categories.find(c => c.id === topic.category);
  const Icon = category ? categoryIcons[category.icon] || BookOpen : BookOpen;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-background/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-auto bg-card border border-border rounded-2xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-card border-b border-border p-4 sm:p-6 flex items-start justify-between gap-4 z-10">
          <div className="flex items-start gap-3 sm:gap-4">
            {category && (
              <div className={`p-2 sm:p-3 rounded-lg ${category.color}`}>
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            )}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">{topic.title}</h2>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <Badge variant="secondary" className={difficultyColors[topic.difficulty]}>
                  {topic.difficulty}
                </Badge>
                {category && <Badge variant="outline">{category.name}</Badge>}
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="flex-shrink-0">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-4 sm:p-6 space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Overview</h3>
            <p className="text-muted-foreground text-sm sm:text-base">{topic.description}</p>
          </div>

          {/* Key Points */}
          {topic.keyPoints && topic.keyPoints.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3">Key Points</h3>
              <ul className="space-y-2">
                {topic.keyPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm flex-shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-muted-foreground text-sm sm:text-base">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Interview Questions */}
          {topic.interviewQuestions && topic.interviewQuestions.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3">Interview Questions</h3>
              <ul className="space-y-2">
                {topic.interviewQuestions.map((q, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm sm:text-base">
                    <span className="text-primary font-bold">Q{i + 1}.</span>
                    <span className="text-muted-foreground">{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Use Cases */}
          {topic.useCases && topic.useCases.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3">Use Cases</h3>
              <div className="flex flex-wrap gap-2">
                {topic.useCases.map((useCase) => (
                  <Badge key={useCase} variant="outline">{useCase}</Badge>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div>
            <h3 className="font-semibold mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {topic.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm">{tag}</span>
              ))}
            </div>
          </div>

          {/* Article Link CTA */}
          {topic.articleUrl && (
            <a
              href={topic.articleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors group"
            >
              <ExternalLink className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <span className="font-semibold text-sm group-hover:text-primary transition-colors">
                  Read Full Article →
                </span>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Deep dive with comprehensive examples and explanations
                </p>
              </div>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// Category Overview Cards
// ==========================================

interface CategoryOverviewProps {
  onCategorySelect: (category: string) => void;
  topicCounts: Record<string, number>;
}

export const CategoryOverview = ({ onCategorySelect, topicCounts }: CategoryOverviewProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
      {categories.map((cat) => {
        const Icon = categoryIcons[cat.icon] || BookOpen;
        const count = topicCounts[cat.id] || 0;
        return (
          <button
            key={cat.id}
            onClick={() => onCategorySelect(cat.id)}
            className="p-3 sm:p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-sm transition-all text-left group"
          >
            <div className={`inline-flex p-2 rounded-lg ${cat.color} mb-2 sm:mb-3`}>
              <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <h3 className="font-semibold text-sm sm:text-base group-hover:text-primary transition-colors">
              {cat.name}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              {count} topics
            </p>
          </button>
        );
      })}
    </div>
  );
};
