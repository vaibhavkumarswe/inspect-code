import { useParams, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { ArrowLeft, ExternalLink, BookOpen, Layers, Code2, Database, TrendingUp, Monitor, Server, Network } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getTopicById, categories } from '@/data/system-design';
import { FlowDiagram } from '@/components/system-design/FlowDiagram';
import { CodeSnippet } from '@/components/system-design/CodeSnippet';
import { difficultyColors } from '@/components/system-design/TopicComponents';
import { motion } from 'framer-motion';

const categoryIcons: Record<string, React.ElementType> = {
  BookOpen, Layers, Code2, Database, TrendingUp, Monitor, Server, Network,
};

const SystemDesignTopicPage = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();

  const topic = useMemo(() => topicId ? getTopicById(topicId) : undefined, [topicId]);
  const category = useMemo(() => topic ? categories.find(c => c.id === topic.category) : undefined, [topic]);
  const Icon = category ? categoryIcons[category.icon] || BookOpen : BookOpen;

  if (!topic) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Topic not found</h1>
          <Button variant="outline" onClick={() => navigate('/system-design')}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to System Design
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16">
      {/* Hero Section */}
      <section className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 py-8 sm:py-12">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Button variant="ghost" size="sm" onClick={() => navigate('/system-design')} className="mb-6 -ml-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to System Design
            </Button>

            <div className="flex items-start gap-4 sm:gap-6">
              {category && (
                <div className={`p-3 sm:p-4 rounded-xl ${category.color} flex-shrink-0`}>
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
              )}
              <div className="space-y-3">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">{topic.title}</h1>
                <p className="text-muted-foreground text-base sm:text-lg max-w-2xl">{topic.description}</p>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className={difficultyColors[topic.difficulty]}>
                    {topic.difficulty}
                  </Badge>
                  {category && <Badge variant="outline">{category.name}</Badge>}
                  {topic.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Diagram */}
            {topic.diagram && (
              <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-primary rounded-full" /> Architecture Diagram
                </h2>
                <div className="p-4 sm:p-6 rounded-xl border border-border bg-card">
                  <FlowDiagram diagram={topic.diagram} />
                </div>
              </motion.section>
            )}

            {/* Key Points */}
            {topic.keyPoints && topic.keyPoints.length > 0 && (
              <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-primary rounded-full" /> Key Concepts
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {topic.keyPoints.map((point, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-lg border border-border bg-card hover:border-primary/30 transition-colors">
                      <span className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold flex-shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-sm text-muted-foreground leading-relaxed">{point}</span>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Code Examples */}
            {topic.codeExamples && topic.codeExamples.length > 0 && (
              <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-primary rounded-full" /> Code Examples
                </h2>
                <div className="space-y-4">
                  {topic.codeExamples.map((example, i) => (
                    <CodeSnippet key={i} example={example} />
                  ))}
                </div>
              </motion.section>
            )}

            {/* Use Cases */}
            {topic.useCases && topic.useCases.length > 0 && (
              <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-primary rounded-full" /> Real-World Use Cases
                </h2>
                <div className="flex flex-wrap gap-2">
                  {topic.useCases.map(uc => (
                    <Badge key={uc} variant="outline" className="text-sm py-1.5 px-3">{uc}</Badge>
                  ))}
                </div>
              </motion.section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Interview Questions */}
            {topic.interviewQuestions && topic.interviewQuestions.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-5 rounded-xl border border-border bg-card sticky top-8">
                <h3 className="font-bold mb-4 text-lg">🎯 Interview Questions</h3>
                <ul className="space-y-3">
                  {topic.interviewQuestions.map((q, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <span className="text-primary font-bold flex-shrink-0">Q{i + 1}.</span>
                      <span className="text-muted-foreground leading-relaxed">{q}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* External Article Link */}
            {topic.articleUrl && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                <a
                  href={topic.articleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors group"
                >
                  <ExternalLink className="w-5 h-5 text-primary flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-sm group-hover:text-primary transition-colors">Read Full Article</span>
                    <p className="text-xs text-muted-foreground mt-0.5">Deep dive on an external resource</p>
                  </div>
                </a>
              </motion.div>
            )}

            {/* Related Topics */}
            {topic.relatedTopics && topic.relatedTopics.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="p-5 rounded-xl border border-border bg-card">
                <h3 className="font-bold mb-3">Related Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {topic.relatedTopics.map(rt => (
                    <Badge key={rt} variant="secondary" className="cursor-pointer hover:bg-primary/10" onClick={() => navigate(`/system-design/${rt}`)}>
                      {rt.replace(/-/g, ' ')}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemDesignTopicPage;
