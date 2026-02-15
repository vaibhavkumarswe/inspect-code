/**
 * Social Links Configuration
 * All social media and contact links
 */

import { Github, Linkedin, Twitter, Mail, Youtube, Instagram, Globe } from 'lucide-react';
import type { SocialLink } from './types';

// ==========================================
// SOCIAL LINKS
// ==========================================

export const socialLinks: SocialLink[] = [
  { 
    icon: Github, 
    href: 'https://github.com', 
    label: 'GitHub',
    username: '@developer'
  },
  { 
    icon: Linkedin, 
    href: 'https://linkedin.com', 
    label: 'LinkedIn',
    username: 'developer'
  },
  { 
    icon: Twitter, 
    href: 'https://twitter.com', 
    label: 'Twitter',
    username: '@developer'
  },
  { 
    icon: Mail, 
    href: 'mailto:hello@example.com', 
    label: 'Email',
    username: 'hello@example.com'
  },
];

// ==========================================
// ALL AVAILABLE SOCIAL PLATFORMS
// Add more as needed
// ==========================================

export const allSocialPlatforms: SocialLink[] = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Mail, href: '#', label: 'Email' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Globe, href: '#', label: 'Website' },
];

// ==========================================
// CONTACT INFORMATION
// ==========================================

export const contactInfo = {
  email: 'hello@example.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  timezone: 'PST (UTC-8)',
  availability: 'Open to opportunities',
};
