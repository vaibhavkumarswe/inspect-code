import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Tag, Share2, Bookmark, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getPostBySlug, categoryLabels, categoryColors, blogPosts } from '@/data/blog';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

function CodeBlock({ code, language, filename }: { code: string; language: string; filename?: string }) {
  const [copied, setCopied] = useState(false);
  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: 'Copied to clipboard!' });
  };
  return (
    <div className="relative group rounded-lg overflow-hidden my-6 bg-secondary/50 border">
      {filename && <div className="bg-muted px-4 py-2 text-xs text-muted-foreground font-mono border-b">{filename}</div>}
      <Button size="icon" variant="ghost" className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity" onClick={copyCode}>
        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
      </Button>
      <pre className="p-4 overflow-x-auto text-sm"><code className={`language-${language}`}>{code}</code></pre>
    </div>
  );
}

function Callout({ type, content }: { type: string; content: string }) {
  const styles = {
    info: 'bg-blue-500/10 border-blue-500/50 text-blue-700 dark:text-blue-300',
    tip: 'bg-green-500/10 border-green-500/50 text-green-700 dark:text-green-300',
    warning: 'bg-yellow-500/10 border-yellow-500/50 text-yellow-700 dark:text-yellow-300',
    danger: 'bg-red-500/10 border-red-500/50 text-red-700 dark:text-red-300',
  };
  return <div className={`p-4 rounded-lg border-l-4 my-6 ${styles[type as keyof typeof styles] || styles.info}`}>{content}</div>;
}

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = getPostBySlug(slug || '');
  
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Post not found</h1>
          <Button onClick={() => navigate('/blog')}>Back to Blog</Button>
        </div>
      </div>
    );
  }

  const relatedPosts = post.relatedPosts?.map(id => blogPosts.find(p => p.id === id)).filter(Boolean).slice(0, 3);

  return (
    <div className="min-h-screen py-20 px-4">
      <article className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Button variant="ghost" onClick={() => navigate('/blog')} className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Blog
          </Button>

          <Badge className={categoryColors[post.category]}>{categoryLabels[post.category]}</Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">{post.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 mb-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src={post.author.avatar} />
                <AvatarFallback>{post.author.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-foreground">{post.author.name}</p>
                <p className="text-xs">{post.author.role}</p>
              </div>
            </div>
            <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{new Date(post.publishedAt).toLocaleDateString()}</span>
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{post.readingTime} min read</span>
          </div>

          <img src={post.coverImage} alt={post.title} className="w-full aspect-video object-cover rounded-xl mb-8" />

          {/* Table of Contents */}
          <div className="bg-secondary/30 rounded-lg p-6 mb-8">
            <h3 className="font-bold mb-3">Table of Contents</h3>
            <ul className="space-y-2">
              {post.tableOfContents.map(item => (
                <li key={item.id} className={`text-sm text-muted-foreground hover:text-primary transition-colors ${item.level === 2 ? 'ml-4' : ''}`}>
                  <a href={`#${item.id}`}>{item.title}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {post.content.map((section, i) => {
              if (section.type === 'text') return <div key={i} className="mb-6 whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: section.content.replace(/^# (.+)$/gm, '<h1 id="$1" class="text-3xl font-bold mt-8 mb-4">$1</h1>').replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold mt-6 mb-3">$1</h2>').replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold mt-4 mb-2">$1</h3>') }} />;
              if (section.type === 'code' && section.codeBlock) return <CodeBlock key={i} code={section.codeBlock.code} language={section.codeBlock.language} filename={section.codeBlock.filename} />;
              if (section.type === 'callout') return <Callout key={i} type={section.calloutType || 'info'} content={section.content} />;
              if (section.type === 'list') return <ul key={i} className="list-disc pl-6 my-4 space-y-2">{section.listItems?.map((item, j) => <li key={j}>{item}</li>)}</ul>;
              if (section.type === 'image') return <img key={i} src={section.imageUrl} alt={section.imageAlt} className="rounded-lg my-6" />;
              return null;
            })}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t">
            {post.tags.map(tag => <Badge key={tag} variant="secondary"><Tag className="h-3 w-3 mr-1" />{tag}</Badge>)}
          </div>

          {/* Related Posts */}
          {relatedPosts && relatedPosts.length > 0 && (
            <div className="mt-12 pt-8 border-t">
              <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {relatedPosts.map(p => p && (
                  <Link key={p.id} to={`/blog/${p.slug}`} className="group">
                    <div className="aspect-video rounded-lg overflow-hidden mb-3">
                      <img src={p.coverImage} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <h4 className="font-medium group-hover:text-primary transition-colors line-clamp-2">{p.title}</h4>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </article>
    </div>
  );
}
