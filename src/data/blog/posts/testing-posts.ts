import type { BlogPost } from '../types';

export const testingPosts: BlogPost[] = [
  {
    id: 'testing-strategy-guide',
    slug: 'frontend-testing-strategy-2024',
    title: 'Frontend Testing Strategy: Unit, Integration, and E2E',
    excerpt: 'Build confidence in your code with a balanced testing strategy covering unit tests, integration tests, and end-to-end testing.',
    coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
    author: { name: 'Chris Walker', avatar: 'https://i.pravatar.cc/150?u=chris', role: 'QA Architect' },
    publishedAt: '2024-03-08',
    category: 'testing',
    tags: ['testing', 'jest', 'vitest', 'playwright', 'quality'],
    readingTime: 15,
    featured: true,
    tableOfContents: [
      { id: 'pyramid', title: 'The Testing Pyramid', level: 1 },
      { id: 'unit', title: 'Unit Testing', level: 1 },
      { id: 'integration', title: 'Integration Testing', level: 1 },
      { id: 'e2e', title: 'E2E Testing', level: 1 },
    ],
    content: [
      { type: 'text', content: '# The Testing Pyramid\n\nA balanced testing strategy has more unit tests at the base, fewer integration tests in the middle, and even fewer E2E tests at the top.' },
      { type: 'diagram', content: 'flowchart TB\n    subgraph Pyramid\n        A[E2E Tests - Few]\n        B[Integration Tests - Some]\n        C[Unit Tests - Many]\n    end\n    A --> |Slower, Expensive| B\n    B --> |Faster, Cheaper| C', diagramType: 'flowchart' },
      { type: 'text', content: '# Unit Testing\n\nUnit tests verify individual functions and components in isolation.' },
      { type: 'code', content: '', codeBlock: { language: 'typescript', filename: 'utils.test.ts', code: `import { describe, it, expect, vi } from 'vitest';
import { formatCurrency, debounce, validateEmail } from './utils';

describe('formatCurrency', () => {
  it('formats positive numbers correctly', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56');
  });

  it('handles zero', () => {
    expect(formatCurrency(0)).toBe('$0.00');
  });

  it('formats negative numbers', () => {
    expect(formatCurrency(-50)).toBe('-$50.00');
  });
});

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('delays function execution', () => {
    const fn = vi.fn();
    const debouncedFn = debounce(fn, 300);

    debouncedFn();
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(300);
    expect(fn).toHaveBeenCalledOnce();
  });
});`, highlightLines: [1, 5, 20, 28, 29, 32, 35] }},
      { type: 'text', content: '# Integration Testing\n\nIntegration tests verify that components work together correctly.' },
      { type: 'code', content: '', codeBlock: { language: 'typescript', filename: 'LoginForm.test.tsx', code: `import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from './LoginForm';
import { authService } from '@/services/auth';

vi.mock('@/services/auth');

describe('LoginForm', () => {
  it('submits form with valid credentials', async () => {
    const user = userEvent.setup();
    const mockLogin = vi.mocked(authService.login);
    mockLogin.mockResolvedValueOnce({ user: { id: '1', email: 'test@example.com' } });

    render(<LoginForm onSuccess={vi.fn()} />);

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  it('displays validation errors', async () => {
    const user = userEvent.setup();
    render(<LoginForm onSuccess={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
  });
});` }},
      { type: 'callout', content: 'Test behavior, not implementation. Focus on what users see and do, not internal state.', calloutType: 'tip' },
      { type: 'text', content: '# E2E Testing\n\nE2E tests verify complete user flows in a real browser environment.' },
      { type: 'code', content: '', codeBlock: { language: 'typescript', filename: 'checkout.spec.ts', code: `import { test, expect } from '@playwright/test';

test.describe('Checkout Flow', () => {
  test('completes purchase successfully', async ({ page }) => {
    // Navigate and add item to cart
    await page.goto('/products');
    await page.click('[data-testid="product-1"] button');
    
    // Go to cart
    await page.click('[data-testid="cart-icon"]');
    await expect(page.locator('[data-testid="cart-count"]')).toHaveText('1');
    
    // Proceed to checkout
    await page.click('button:has-text("Checkout")');
    
    // Fill shipping info
    await page.fill('[name="address"]', '123 Main St');
    await page.fill('[name="city"]', 'New York');
    await page.selectOption('[name="state"]', 'NY');
    
    // Complete order
    await page.click('button:has-text("Place Order")');
    
    // Verify success
    await expect(page.locator('h1')).toHaveText('Order Confirmed!');
  });
});` }},
    ],
    relatedPosts: ['react-hooks-patterns', 'devops-cicd-github'],
  },
];
