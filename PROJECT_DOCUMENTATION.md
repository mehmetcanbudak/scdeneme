# SkyCrops Frontend - Technical Documentation

This document provides comprehensive technical information for developers working on the SkyCrops Frontend project.

## 🏗️ Architecture Overview

### Technology Stack
- **Frontend Framework**: Next.js 15.2.4 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4.17
- **UI Library**: shadcn/ui with Radix UI primitives
- **State Management**: React Context + Custom Hooks
  - AuthContext: User authentication state
  - CartContext: Shopping cart state
  - ProductContext: Product data state
  - SubscriptionContext: Subscription management state
  - NavigationProvider: Navigation transparency state
- **Form Handling**: React Hook Form + Zod
- **Build Tool**: Next.js built-in bundler
- **Package Manager**: pnpm
- **Font**: Geist Sans & Geist Mono
- **Analytics**: Vercel Analytics

### Project Structure
```
skycrops-frontend/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Homepage
│   ├── globals.css        # Global styles
│   ├── login/             # Authentication pages
│   ├── abonelik/          # Subscription page
│   ├── blog/              # Blog pages
│   ├── ciftlik/           # Farm page
│   ├── ekibim/            # Team page
│   ├── hakkimizda/        # About page
│   ├── iletisim/          # Contact page
│   ├── saglik/            # Health page
│   ├── sertifikalar/      # Certificates page
│   ├── sorular/           # FAQ page
│   ├── tesisler/          # Facilities page
│   ├── uretim/            # Production page
│   └── urunler/           # Products page
├── components/             # Reusable components
│   ├── ui/                # Base UI components (shadcn/ui)
│   ├── auth/              # Authentication components
│   ├── footer.tsx         # Site footer
│   ├── hero-header.tsx    # Hero section
│   ├── navigation.tsx     # Main navigation
│   ├── scroll-to-top.tsx  # Scroll to top button
│   ├── theme-provider.tsx # Theme provider
│   ├── video-hero.tsx     # Video hero component
│   └── navigation-context.tsx # Navigation context
├── contexts/              # React contexts for state management
│   ├── auth-context.tsx   # User authentication state
│   ├── cart-context.tsx   # Shopping cart state
│   ├── product-context.tsx # Product data state
│   └── subscription-context.tsx # Subscription management state
├── hooks/                 # Custom React hooks
│   ├── use-mobile.ts      # Mobile detection hook
│   ├── use-navigation-transparency.ts # Navigation transparency
│   └── use-toast.ts       # Toast notifications
├── lib/                   # Utility functions and configurations
│   ├── api-client.ts      # API client configuration
│   └── utils.ts           # Utility functions
├── public/                # Static assets
└── types/                 # TypeScript type definitions
```

## 🔧 Configuration Files

### Next.js Configuration (`next.config.mjs`)
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['localhost', 'dynamic-spirit-b1c4404b11.strapiapp.com'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://dynamic-spirit-b1c4404b11.strapiapp.com',
  },
  experimental: {
    scrollRestoration: true,
  },
}

export default nextConfig
```

### TypeScript Configuration (`tsconfig.json`)
```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "target": "ES6",
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Tailwind Configuration (`tailwind.config.ts`)
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      animation: {
        'scroll': 'scroll 20s linear infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-in-from-left': 'slideInFromLeft 0.3s ease-out',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInFromLeft: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
```

## 🎨 Component Architecture

### Component Patterns

#### 1. Memoized Components
```typescript
import React from 'react'

interface ComponentProps {
  data: string[]
  onAction: (item: string) => void
}

const MemoizedComponent = React.memo<ComponentProps>(({ data, onAction }) => {
  // Component logic
  return <div>{/* JSX */}</div>
})

MemoizedComponent.displayName = 'MemoizedComponent'

export default MemoizedComponent
```

#### 2. Client Components
```typescript
"use client"

import { useState, useCallback } from 'react'

const ClientComponent = () => {
  const [state, setState] = useState('')
  
  const handleAction = useCallback(() => {
    // Action logic
  }, [])
  
  return <div>{/* JSX */}</div>
}
```

#### 3. Server Components
```typescript
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description',
}

const ServerComponent = async () => {
  // Server-side logic
  return <div>{/* JSX */}</div>
}
```

### Component Hierarchy

#### Layout Components
- `RootLayout`: App-wide layout with providers
- `Navigation`: Main navigation component
- `Footer`: Site footer
- `PageWrapper`: Page-specific wrapper

#### UI Components
- `Button`: Reusable button component
- `Input`: Form input component
- `Modal`: Dialog/modal component
- `Card`: Content card component

#### Authentication Components
- `AuthModal`: Authentication modal with login/signup
- `OtpLoginForm`: OTP-based login form
- `ProtectedRoute`: Route protection component

#### Business Components
- `HeroHeader`: Homepage hero section
- `VideoHero`: Video-based hero component
- `ProductGrid`: Product listing
- `BlogPost`: Blog post display
- `ContactForm`: Contact form
- `ScrollToTop`: Scroll to top button
- `ThemeProvider`: Dark/light theme provider

#### Navigation Components
- `Navigation`: Main navigation component
- `NavigationContext`: Navigation transparency context
- `MobileSidebar`: Mobile navigation sidebar
- `ActionIcons`: Mobile action icons

## 🔐 Authentication System

### Authentication Features
- **OTP-based Login**: Phone number verification using OTP
- **Protected Routes**: Route protection for authenticated users
- **Auth Modal**: Modal-based authentication flow
- **Auth Context**: Global authentication state management

### Authentication Flow
1. User enters phone number
2. OTP is sent to the phone number
3. User enters OTP for verification
4. User is authenticated and redirected

### Authentication Components
```typescript
// AuthModal - Main authentication modal
<AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

// OtpLoginForm - OTP login form
<OtpLoginForm onSuccess={handleAuthSuccess} />

// ProtectedRoute - Route protection
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>
```

## 🪝 Custom Hooks

### Navigation Transparency Hook
```typescript
// hooks/use-navigation-transparency.ts
import { useState, useEffect, useCallback } from 'react'

export const useNavigationTransparency = () => {
  const [isTransparent, setIsTransparent] = useState(true)
  
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY
    setIsTransparent(scrollY < 100)
  }, [])
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])
  
  return isTransparent
}
```

### Mobile Detection Hook
```typescript
// hooks/use-mobile.ts
import { useState, useEffect } from 'react'

export const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  return isMobile
}
```

## 🎯 Performance Optimizations

### React Optimizations

#### 1. Memoization
- Use `React.memo` for expensive components
- Implement `useCallback` for event handlers
- Use `useMemo` for expensive calculations

#### 2. Component Splitting
- Split large components into smaller ones
- Extract reusable logic into custom hooks
- Use dynamic imports for code splitting

#### 3. Event Handling
- Use passive event listeners for scroll events
- Debounce expensive operations
- Clean up event listeners properly

### Image Optimizations

#### 1. Next.js Image Component
```typescript
import Image from 'next/image'

<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  priority={true} // For above-the-fold images
  loading="lazy"  // For below-the-fold images
/>
```

#### 2. Image Loading Strategies
- `priority`: For hero images and above-the-fold content
- `loading="lazy"`: For below-the-fold content
- `placeholder="blur"`: For better loading experience

### Bundle Optimizations

#### 1. Tree Shaking
- Use ES6 modules
- Avoid side effects in modules
- Use named exports instead of default exports

#### 2. Code Splitting
- Use dynamic imports for routes
- Implement component-level code splitting
- Use Next.js automatic code splitting

## ♿ Accessibility Features

### ARIA Implementation

#### 1. Semantic HTML
```typescript
// Use proper semantic elements
<main role="main">
  <section aria-labelledby="section-title">
    <h2 id="section-title">Section Title</h2>
    {/* Content */}
  </section>
</main>
```

#### 2. Interactive Elements
```typescript
// Proper labeling for interactive elements
<button
  aria-label="Close modal"
  aria-expanded={isOpen}
  aria-controls="modal-content"
>
  Close
</button>
```

#### 3. Form Accessibility
```typescript
// Proper form labeling
<div>
  <label htmlFor="email">Email Address</label>
  <input
    id="email"
    type="email"
    aria-describedby="email-help"
    aria-required="true"
  />
  <div id="email-help">Enter your email address</div>
</div>
```

### Keyboard Navigation
- Ensure all interactive elements are keyboard accessible
- Implement proper focus management
- Use logical tab order
- Provide skip links for main content

## 🌐 Internationalization

### Turkish Language Support

#### 1. Text Content
- All user-facing text in Turkish
- Proper Turkish grammar and spelling
- Cultural considerations for Turkish users

#### 2. Date and Number Formatting
```typescript
// Turkish date formatting
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}
```

#### 3. RTL Support
- Support for right-to-left text if needed
- Proper text alignment for Turkish content
- Cultural layout considerations

## 🔒 Security Considerations

### Client-Side Security

#### 1. Input Validation
- Use Zod for form validation
- Sanitize user inputs
- Implement proper error handling

#### 2. XSS Prevention
- Use React's built-in XSS protection
- Avoid `dangerouslySetInnerHTML`
- Sanitize dynamic content

#### 3. CSRF Protection
- Implement proper CSRF tokens
- Use secure HTTP headers
- Validate request origins

### Environment Variables
```typescript
// .env.local
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id

# Never expose sensitive data to the client
API_SECRET_KEY=your-secret-key
DATABASE_URL=your-database-url
```

## 🧪 Testing Strategy

### Testing Tools

#### 1. Unit Testing
- Jest for test runner
- React Testing Library for component testing
- MSW for API mocking

#### 2. E2E Testing
- Playwright for end-to-end testing
- Cross-browser testing
- Mobile device testing

#### 3. Performance Testing
- Lighthouse CI for performance monitoring
- Core Web Vitals tracking
- Bundle size analysis

### Testing Guidelines

#### 1. Component Testing
```typescript
import { render, screen } from '@testing-library/react'
import Component from './Component'

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
```

#### 2. Hook Testing
```typescript
import { renderHook } from '@testing-library/react'
import { useCustomHook } from './useCustomHook'

describe('useCustomHook', () => {
  it('returns expected value', () => {
    const { result } = renderHook(() => useCustomHook())
    expect(result.current.value).toBe('expected')
  })
})
```

## 📊 Monitoring and Analytics

### Performance Monitoring

#### 1. Core Web Vitals
- Largest Contentful Paint (LCP)
- First Input Delay (FID)
- Cumulative Layout Shift (CLS)

#### 2. Custom Metrics
- Component render times
- API response times
- User interaction metrics

#### 3. Error Tracking
- JavaScript error monitoring
- API error tracking
- User experience monitoring

### Analytics Integration

#### 1. Vercel Analytics
```typescript
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

#### 2. Custom Event Tracking
```typescript
// Track custom events
const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  // Implementation for analytics tracking
}
```

## 🚀 Deployment

### Build Process

#### 1. Development Build
```bash
pnpm run dev
# Starts development server on localhost:3000
```

#### 2. Production Build
```bash
pnpm run build
# Creates optimized production build
pnpm run start
# Starts production server
```

#### 3. Build Optimization
- Automatic code splitting
- Tree shaking
- Image optimization
- CSS minification

### Deployment Platforms

#### 1. Vercel (Recommended)
- Automatic deployments from Git
- Edge functions support
- Global CDN
- Built-in analytics

#### 2. Other Platforms
- Netlify
- AWS Amplify
- Docker containers
- Traditional hosting

## 🔄 Development Workflow

### Git Workflow

#### 1. Branch Strategy
- `main`: Production-ready code
- `develop`: Development branch
- `feature/*`: Feature development
- `hotfix/*`: Critical fixes

#### 2. Commit Convention
```
type(scope): description

feat(navigation): add mobile menu
fix(auth): resolve login validation
docs(readme): update installation
```

#### 3. Pull Request Process
- Create feature branch
- Implement changes
- Write tests
- Update documentation
- Create PR
- Code review
- Merge to main

### Code Quality

#### 1. Linting
- ESLint for JavaScript/TypeScript (`pnpm run lint`)
- Prettier for code formatting (`pnpm run format`)
- Husky for pre-commit hooks

#### 2. Type Checking
- TypeScript strict mode
- Type coverage reporting
- Interface validation

#### 3. Performance Budgets
- Bundle size limits
- Performance budgets
- Lighthouse score requirements

## 📚 Additional Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Tools and Libraries
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Radix UI Primitives](https://www.radix-ui.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)

### Best Practices
- [React Best Practices](https://react.dev/learn)
- [Next.js Best Practices](https://nextjs.org/docs/app/building-your-application)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

This documentation should be updated regularly as the project evolves. For questions or clarifications, please refer to the contributing guidelines or contact the development team.
