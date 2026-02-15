/**
 * Skills and Technologies Data
 * Centralized skill definitions for the portfolio
 */

import type { Skill, TechnologyTag, SkillCategory } from "./types";

// ==========================================
// MAIN SKILLS (with proficiency levels)
// ==========================================

export const skills: Skill[] = [
  { name: "React", level: 95, category: "frontend" },
  { name: "TypeScript", level: 92, category: "frontend" },
  { name: "Next.js", level: 88, category: "frontend" },
  { name: "Vue.js", level: 85, category: "frontend" },
  { name: "Node.js", level: 80, category: "backend" },
  { name: "GraphQL", level: 82, category: "backend" },
  { name: "Tailwind CSS", level: 95, category: "frontend" },
  { name: "GSAP", level: 88, category: "frontend" },
];

// ==========================================
// TECHNOLOGY TAGS (for display)
// ==========================================

export const technologies: TechnologyTag[] = [
  // Frontend Core
  { name: "JavaScript", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "React", category: "frontend" },
  { name: "Vue.js", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "Nuxt.js", category: "frontend" },

  // State Management
  { name: "Redux", category: "frontend" },
  { name: "Zustand", category: "frontend" },
  { name: "TanStack Query", category: "frontend" },
  { name: "GraphQL", category: "frontend" },
  { name: "REST APIs", category: "frontend" },

  // Backend
  { name: "Node.js", category: "backend" },
  { name: "Express", category: "backend" },
  { name: "PostgreSQL", category: "database" },
  { name: "MongoDB", category: "database" },
  { name: "Prisma", category: "database" },

  // Styling
  { name: "Tailwind CSS", category: "frontend" },
  { name: "Styled Components", category: "frontend" },
  { name: "SASS", category: "frontend" },
  { name: "CSS Modules", category: "frontend" },

  // Animation
  { name: "GSAP", category: "frontend" },
  { name: "Framer Motion", category: "frontend" },
  { name: "Three.js", category: "frontend" },
  { name: "WebGL", category: "frontend" },

  // Testing
  { name: "Jest", category: "testing" },
  { name: "Cypress", category: "testing" },
  { name: "Playwright", category: "testing" },
  { name: "Vitest", category: "testing" },

  // DevOps & Tools
  { name: "Git", category: "tools" },
  { name: "Docker", category: "devops" },
  { name: "AWS", category: "devops" },
  { name: "Vercel", category: "devops" },
  { name: "Netlify", category: "devops" },
];

// ==========================================
// SKILLS BY CATEGORY
// ==========================================

export const skillsByCategory: Record<SkillCategory, string[]> = {
  frontend: [
    "JavaScript",
    "TypeScript",
    "React",
    "Vue.js",
    "Next.js",
    "Nuxt.js",
    "Redux",
    "Zustand",
    "Tailwind CSS",
    "GSAP",
    "Framer Motion",
  ],
  backend: ["Node.js", "Express", "GraphQL", "REST APIs", "Prisma"],
  database: ["PostgreSQL", "MongoDB", "Redis", "Supabase", "Firebase"],
  testing: ["Jest", "Cypress", "Playwright", "Vitest", "React Testing Library"],
  devops: ["Docker", "AWS", "Vercel", "Netlify", "CI/CD", "GitHub Actions"],
  tools: ["Git", "VS Code", "Figma", "Postman", "Chrome DevTools"],
  design: ["Figma", "UI/UX", "Responsive Design", "Design Systems"],
};

// ==========================================
// RADAR CHART DATA (for skills visualization)
// ==========================================

export const radarSkillsData = [
  { skill: "Frontend", value: 95 },
  { skill: "Backend", value: 75 },
  { skill: "DevOps", value: 70 },
  { skill: "UI/UX", value: 80 },
  { skill: "Testing", value: 85 },
  { skill: "Performance", value: 90 },
];

// ==========================================
// HELPER FUNCTIONS
// ==========================================

export const getSkillsByCategory = (category: SkillCategory): Skill[] => {
  return skills.filter((skill) => skill.category === category);
};

export const getTechnologiesByCategory = (
  category: SkillCategory
): TechnologyTag[] => {
  return technologies.filter((tech) => tech.category === category);
};

export const getAllTechnologyNames = (): string[] => {
  return technologies.map((tech) => tech.name);
};

