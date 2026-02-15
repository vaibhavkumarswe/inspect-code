import { javascriptPosts } from './posts/javascript-posts';
import { typescriptPosts } from './posts/typescript-posts';
import { reactPosts } from './posts/react-posts';
import { nodejsPosts } from './posts/nodejs-posts';
import { architecturePosts } from './posts/architecture-posts';
import { devopsPosts } from './posts/devops-posts';
import { cssPosts } from './posts/css-posts';
import { testingPosts } from './posts/testing-posts';
import { securityPosts } from './posts/security-posts';
import { careerPosts } from './posts/career-posts';
import type { BlogPost, BlogCategory } from './types';

export * from './types';

export const blogPosts: BlogPost[] = [
  ...javascriptPosts,
  ...typescriptPosts,
  ...reactPosts,
  ...nodejsPosts,
  ...architecturePosts,
  ...devopsPosts,
  ...cssPosts,
  ...testingPosts,
  ...securityPosts,
  ...careerPosts,
].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

export const getFeaturedPosts = () => blogPosts.filter(post => post.featured);
export const getPostBySlug = (slug: string) => blogPosts.find(post => post.slug === slug);
export const getPostsByCategory = (category: BlogCategory) => blogPosts.filter(post => post.category === category);
export const getPostsByTag = (tag: string) => blogPosts.filter(post => post.tags.includes(tag));
export const getAllTags = () => [...new Set(blogPosts.flatMap(post => post.tags))];
export const getAllCategories = () => [...new Set(blogPosts.map(post => post.category))] as BlogCategory[];
export const searchPosts = (query: string) => blogPosts.filter(post => 
  post.title.toLowerCase().includes(query.toLowerCase()) ||
  post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
  post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
);
