import { motion } from 'framer-motion';
import { 
  Monitor, Terminal, Palette, Package, Globe, Code2, 
  Headphones, Coffee, Keyboard, MousePointer2, 
  Laptop, Smartphone, ExternalLink, Bookmark, Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Tool {
  name: string;
  description: string;
  category: string;
  icon: typeof Monitor;
  link?: string;
  featured?: boolean;
}

interface SetupItem {
  name: string;
  description: string;
  icon: typeof Monitor;
}

const developmentTools: Tool[] = [
  { name: 'VS Code', description: 'Primary code editor with custom themes and extensions', category: 'Editor', icon: Code2, featured: true },
  { name: 'Warp', description: 'Modern terminal with AI-powered features', category: 'Terminal', icon: Terminal, featured: true },
  { name: 'Figma', description: 'UI/UX design and prototyping', category: 'Design', icon: Palette },
  { name: 'Arc Browser', description: 'Productivity-focused browser', category: 'Browser', icon: Globe },
  { name: 'Docker', description: 'Container management for dev environments', category: 'DevOps', icon: Package },
  { name: 'Postman', description: 'API testing and documentation', category: 'API', icon: Globe },
];

const vsCodeExtensions: string[] = [
  'GitHub Copilot',
  'ESLint',
  'Prettier',
  'GitLens',
  'Thunder Client',
  'Tailwind CSS IntelliSense',
  'Error Lens',
  'Auto Rename Tag',
];

const techStack: Tool[] = [
  { name: 'React', description: 'UI library for building interfaces', category: 'Frontend', icon: Code2, featured: true },
  { name: 'TypeScript', description: 'Type-safe JavaScript development', category: 'Language', icon: Code2, featured: true },
  { name: 'Next.js', description: 'React framework for production', category: 'Framework', icon: Globe },
  { name: 'Tailwind CSS', description: 'Utility-first CSS framework', category: 'Styling', icon: Palette },
  { name: 'Node.js', description: 'JavaScript runtime for backend', category: 'Backend', icon: Terminal },
  { name: 'PostgreSQL', description: 'Relational database', category: 'Database', icon: Package },
  { name: 'Supabase', description: 'Backend-as-a-Service platform', category: 'BaaS', icon: Globe },
  { name: 'Vercel', description: 'Deployment and hosting platform', category: 'Hosting', icon: Globe },
];

const hardwareSetup: SetupItem[] = [
  { name: 'MacBook Pro 16"', description: 'M3 Pro, 36GB RAM, 1TB SSD', icon: Laptop },
  { name: 'LG 32" 4K Monitor', description: 'Primary display for development', icon: Monitor },
  { name: 'Keychron K3 Pro', description: 'Low-profile mechanical keyboard', icon: Keyboard },
  { name: 'Logitech MX Master 3', description: 'Ergonomic wireless mouse', icon: MousePointer2 },
  { name: 'Sony WH-1000XM5', description: 'Noise-canceling headphones', icon: Headphones },
  { name: 'iPhone 15 Pro', description: 'Mobile testing device', icon: Smartphone },
];

const favoriteResources: { name: string; description: string; link: string }[] = [
  { name: 'React Documentation', description: 'Official React docs', link: 'https://react.dev' },
  { name: 'TypeScript Handbook', description: 'Complete TypeScript guide', link: 'https://www.typescriptlang.org/docs/' },
  { name: 'Tailwind CSS', description: 'Utility-first CSS framework', link: 'https://tailwindcss.com' },
  { name: 'Josh Comeau Blog', description: 'In-depth CSS and React tutorials', link: 'https://www.joshwcomeau.com' },
  { name: 'Kent C. Dodds', description: 'Testing and React patterns', link: 'https://kentcdodds.com' },
  { name: 'UI.dev', description: 'JavaScript and React courses', link: 'https://ui.dev' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const Resources = () => {
  return (
    <div className="min-h-screen py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <Coffee className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-accent">My Setup</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Tools & <span className="gradient-text">Resources</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A curated list of the tools, technologies, and resources I use daily
            to build amazing products.
          </p>
        </motion.div>

        {/* Development Tools */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <Code2 className="h-6 w-6 text-primary" />
            Development Tools
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {developmentTools.map((tool) => (
              <motion.div
                key={tool.name}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="bento-card group relative overflow-hidden"
              >
                {tool.featured && (
                  <div className="absolute top-3 right-3">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  </div>
                )}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <tool.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">{tool.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{tool.description}</p>
                    <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                      {tool.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* VS Code Extensions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <Package className="h-6 w-6 text-primary" />
            VS Code Extensions
          </h2>
          <div className="bento-card">
            <div className="flex flex-wrap gap-3">
              {vsCodeExtensions.map((ext, index) => (
                <motion.span
                  key={ext}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 text-sm font-medium cursor-default hover:border-primary/40 transition-colors"
                >
                  {ext}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Tech Stack */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <Globe className="h-6 w-6 text-primary" />
            Tech Stack
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {techStack.map((tech) => (
              <motion.div
                key={tech.name}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="bento-card text-center p-5 group"
              >
                <div className="p-3 rounded-xl bg-secondary inline-block mb-3 group-hover:bg-primary/10 transition-colors">
                  <tech.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold mb-1">{tech.name}</h3>
                <p className="text-xs text-muted-foreground">{tech.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Hardware Setup */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <Monitor className="h-6 w-6 text-primary" />
            Hardware Setup
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hardwareSetup.map((item) => (
              <motion.div
                key={item.name}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="bento-card flex items-center gap-4"
              >
                <div className="p-3 rounded-xl bg-accent/10">
                  <item.icon className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Favorite Resources */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <Bookmark className="h-6 w-6 text-primary" />
            Favorite Resources
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteResources.map((resource) => (
              <motion.a
                key={resource.name}
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="bento-card group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold group-hover:text-primary transition-colors">{resource.name}</h3>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <p className="text-sm text-muted-foreground">{resource.description}</p>
              </motion.a>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground mb-4">
            Have questions? Check out our AI assistant!
          </p>
          <Button asChild className="rounded-full">
            <a href="/ask-ai">Ask AI</a>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Resources;
