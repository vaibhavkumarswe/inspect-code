import { Github, Twitter, Mail, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Mail, href: '#', label: 'Email' },
];

const footerLinks = [
  {
    title: 'Platform',
    links: [
      { name: 'Home', path: '/' },
      { name: 'Playground', path: '/playground' },
      { name: 'Challenges', path: '/coding' },
      { name: 'System Design', path: '/system-design' },
      { name: 'Interview Prep', path: '/interview' },
      { name: 'Blog', path: '/blog' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Snippets', path: '/snippets' },
      { name: 'Tools', path: '/resources' },
      { name: 'Games', path: '/games' },
      { name: 'Music', path: '/music' },
      { name: 'Ask AI', path: '/ask-ai' },
      { name: 'Contact', path: '/contact' },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Code2 className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">InspectCode</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-md mb-6">
              Built for developers, by developers. Learn, practice, and build with our coding challenges, 
              playground, and resources.
            </p>
            
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-2 rounded-md bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="font-semibold text-foreground mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} InspectCode. Built for developers, by developers.
          </p>
        </div>
      </div>
    </footer>
  );
};
