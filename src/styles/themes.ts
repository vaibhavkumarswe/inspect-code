/**
 * Centralized Theme Configuration
 * All colors and design tokens should be defined here and used throughout the app.
 * These values correspond to CSS variables defined in index.css
 */

// ==========================================
// COLOR PALETTE - HSL Values
// ==========================================

export const colors = {
  // Primary Colors
  primary: {
    light: '187 85% 43%',
    dark: '187 85% 53%',
  },
  
  // Accent Colors
  accent: {
    light: '262 83% 58%',
    dark: '262 83% 68%',
  },
  
  // Background Colors
  background: {
    light: '210 20% 98%',
    dark: '222 47% 6%',
  },
  
  // Foreground/Text Colors
  foreground: {
    light: '222 47% 11%',
    dark: '210 40% 98%',
  },
  
  // Card Colors
  card: {
    light: '0 0% 100%',
    dark: '222 47% 9%',
  },
  
  // Secondary Colors
  secondary: {
    light: '220 14% 96%',
    dark: '222 30% 14%',
  },
  
  // Muted Colors
  muted: {
    light: '220 14% 96%',
    dark: '222 30% 14%',
  },
  mutedForeground: {
    light: '220 9% 46%',
    dark: '215 20% 65%',
  },
  
  // Destructive
  destructive: {
    light: '0 84% 60%',
    dark: '0 62% 30%',
  },
  
  // Border Colors
  border: {
    light: '220 13% 91%',
    dark: '222 30% 18%',
  },

  // Process Step Colors (gradients)
  processSteps: {
    discovery: 'from-primary to-primary/50',
    strategy: 'from-accent to-accent/50',
    development: 'from-pink-500 to-pink-500/50',
    launch: 'from-orange-500 to-orange-500/50',
  },

  // Coding Challenge Language Colors
  languageColors: {
    javascript: '#f7df1e',
    typescript: '#3178c6',
    react: '#61dafb',
  },
} as const;

// ==========================================
// GRADIENTS
// ==========================================

export const gradients = {
  primary: {
    light: 'linear-gradient(135deg, hsl(187 85% 43%), hsl(262 83% 58%))',
    dark: 'linear-gradient(135deg, hsl(187 85% 53%), hsl(262 83% 68%))',
  },
  accent: {
    light: 'linear-gradient(135deg, hsl(262 83% 58%), hsl(330 80% 60%))',
    dark: 'linear-gradient(135deg, hsl(262 83% 68%), hsl(330 80% 65%))',
  },
  hero: {
    light: 'linear-gradient(180deg, hsl(220 20% 98%) 0%, hsl(220 14% 96%) 100%)',
    dark: 'linear-gradient(180deg, hsl(222 47% 6%) 0%, hsl(222 47% 8%) 100%)',
  },
  process: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)), hsl(330 80% 60%), hsl(30 90% 55%))',
} as const;

// ==========================================
// SHADOWS
// ==========================================

export const shadows = {
  glow: {
    light: '0 0 60px hsla(187, 85%, 43%, 0.15)',
    dark: '0 0 80px hsla(187, 85%, 53%, 0.2)',
  },
  card: {
    light: '0 4px 24px hsla(222, 47%, 11%, 0.06)',
    dark: '0 4px 24px hsla(0, 0%, 0%, 0.3)',
  },
  cardHover: {
    light: '0 12px 40px hsla(222, 47%, 11%, 0.12)',
    dark: '0 16px 48px hsla(0, 0%, 0%, 0.4)',
  },
} as const;

// ==========================================
// ANIMATION DURATIONS
// ==========================================

export const animations = {
  fast: '150ms',
  normal: '300ms',
  slow: '500ms',
  verySlow: '800ms',
} as const;

// ==========================================
// TYPOGRAPHY
// ==========================================

export const typography = {
  fontFamily: {
    sans: "'Outfit', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
} as const;

// ==========================================
// SPACING
// ==========================================

export const spacing = {
  section: {
    paddingY: 'py-24',
    paddingX: 'px-6',
  },
  container: 'container mx-auto',
} as const;

// ==========================================
// BORDER RADIUS
// ==========================================

export const borderRadius = {
  sm: 'calc(var(--radius) - 4px)',
  md: 'calc(var(--radius) - 2px)',
  lg: 'var(--radius)',
  xl: '1rem',
  '2xl': '1.5rem',
  full: '9999px',
} as const;

// ==========================================
// Z-INDEX LAYERS
// ==========================================

export const zIndex = {
  background: 0,
  content: 10,
  sticky: 20,
  dropdown: 30,
  overlay: 40,
  modal: 50,
  tooltip: 60,
} as const;

// ==========================================
// BREAKPOINTS
// ==========================================

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1400px',
} as const;

export type ThemeColors = typeof colors;
export type ThemeGradients = typeof gradients;
export type ThemeShadows = typeof shadows;
