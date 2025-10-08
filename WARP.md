# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Common Commands

### Development Workflow
- `pnpm dev` - Start development server on port 3000
- `pnpm build` - Build for production
- `pnpm start` - Start production server

### Code Quality & Checks
- `pnpm lint` - Run Biome linting
- `pnpm lint:fix` - Run Biome linting with auto-fixes
- `pnpm type-check` - Run TypeScript type checking without emitting files
- `pnpm format` - Format code with Biome
- `pnpm format:check` - Check code formatting without applying changes

### Testing
- `pnpm test` - Run Jest tests
- `pnpm test:watch` - Run Jest tests in watch mode
- `pnpm test:coverage` - Run Jest tests with coverage reports

### Build Analysis & Maintenance
- `pnpm analyze` - Analyze bundle size with ANALYZE=true flag
- `pnpm clean` - Clean build artifacts (.next, out, dist, .turbo)
- `pnpm clean:all` - Clean all artifacts including node_modules and pnpm-lock.yaml

### Git Workflow Shortcuts
- `pnpm git:status` - Show git status
- `pnpm git:add` - Stage all changes
- `pnpm git:commit "message"` - Commit with message
- `pnpm git:push` - Push to main branch
- `pnpm git:pull` - Pull from main branch
- `pnpm git:log` - Show recent commit history (last 10)
- `pnpm git:diff` - Show staged changes

## Architecture Overview

**Framework**: Next.js 15 with App Router architecture  
**Language**: TypeScript with strict mode enabled  
**Styling**: Tailwind CSS with shadcn/ui component system  
**Package Manager**: pnpm (required)  
**Code Quality**: Biome v2.2.4 for linting and formatting  

### Project Structure

```
app/                     # Next.js App Router pages
├── [page-directories]/  # Route-based page directories (Turkish paths)
│   ├── page.tsx        # Page component
│   └── loading.tsx     # Loading UI (where applicable)
├── layout.tsx          # Root layout with global providers
├── page.tsx            # Homepage
└── globals.css         # Global styles with CSS variables

components/             # Reusable components
├── ui/                 # shadcn/ui base components (60+ components)
│   ├── action-icons.tsx       # Mobile-specific action buttons
│   ├── accordion.tsx          # Collapsible content sections
│   ├── alert-dialog.tsx       # Modal confirmations
│   ├── avatar.tsx             # User profile images
│   ├── button.tsx             # Primary UI buttons
│   └── [50+ other components] # Complete shadcn/ui component set
├── auth/               # Authentication-related components
├── navigation.tsx      # Main navigation with transparency logic
├── hero-header.tsx     # Main hero section
├── footer.tsx          # Site footer
├── scroll-to-top.tsx   # Auto-scroll to top on route changes
└── video-hero.tsx      # Video hero component

contexts/               # React context providers
├── auth-context.tsx            # Authentication state management
├── cart-context.tsx            # Shopping cart state
├── product-context.tsx         # Product data management
└── subscription-context.tsx    # Subscription management

hooks/                  # Custom React hooks
├── use-mobile.ts       # Mobile breakpoint detection
├── use-toast.ts        # Toast notification system
└── use-navigation-transparency.ts # Navigation scroll effects

lib/                    # Utilities and configurations
├── utils.ts            # Tailwind class merging utilities
├── api-client.ts       # API client configuration
├── strapi.ts           # Strapi CMS integration
└── navigation-config.ts # Navigation menu configuration
```

### Key Technical Details

**API Integration**:
- Base URL: `https://dynamic-spirit-b1c4404b11.strapiapp.com`
- Strapi headless CMS integration
- Custom API client with authentication headers
- OTP-based phone authentication system
- Session-based cart management

**Authentication System**:
- Phone number + OTP verification
- JWT token storage in localStorage
- Protected routes with authentication guards
- Context-based auth state management

**TypeScript Configuration**:
- Path mapping with `@/*` for root-level imports
- Strict mode enabled with incremental compilation
- Target ES6 with bundler module resolution

**Tailwind Configuration**:
- Custom CSS variables for comprehensive theming
- shadcn/ui integration with HSL color system
- Custom animations: scroll, fade-in, slide-in-from-left
- Mobile-first responsive design utilities

**Biome Configuration**:
- Tab indentation with double quotes
- Recommended linting rules enabled
- Import organization on save
- Source code assistance enabled

**Form Management**:
- React Hook Form for form state
- Zod schema validation for type-safe forms
- OTP input components for secure authentication
- Real-time validation feedback

## Development Patterns

**Component Architecture**:
- All components use TypeScript interfaces
- Memoization with React.memo for performance optimization
- Mobile-first responsive design approach
- shadcn/ui components for consistent UI patterns
- Custom hooks for reusable logic abstraction

**State Management**:
- Multiple React context providers:
  - AuthContext: User authentication and session
  - CartContext: Shopping cart functionality
  - ProductContext: Product catalog management
  - SubscriptionContext: Subscription management
  - PageBackgroundContext: Dynamic page theming

**Performance Optimizations**:
- Next.js Image component with domain allowlist
- Component memoization and callback optimization
- Lazy loading for below-the-fold content
- Bundle size analysis with built-in analyzer

**Mobile Experience**:
- Dedicated mobile components and interactions
- Touch-optimized UI elements
- Responsive breakpoint detection hook
- Mobile-specific navigation patterns

## API Architecture

**Base Configuration**: 
- Strapi headless CMS at `https://dynamic-spirit-b1c4404b11.strapiapp.com`
- Centralized API client in `lib/api-client.ts`
- JWT authentication with localStorage persistence

**Key Endpoints**:
- Authentication: `/api/auth/send-otp`, `/api/auth/verify-otp`
- Products: `/api/products`, `/api/products/public`
- Cart: `/api/cart` (session-based)
- Orders: `/api/orders` (authenticated)
- Subscriptions: `/api/subscription-plans`

## Turkish Language Support

This application is primarily designed for Turkish users:
- All page routes use Turkish names (`/hakkimizda`, `/iletisim`, `/urunler`)
- UI text and error messages in Turkish
- Cultural considerations for Turkish market
- Phone number authentication common in Turkish e-commerce

## Important Notes

**Development Environment**:
- Node.js 18+ required
- pnpm package manager required (not npm/yarn)
- TypeScript strict mode enforced
- Biome handles all linting and formatting

**Build Configuration**:
- TypeScript and ESLint errors ignored during builds (development setting)
- Image optimization disabled for flexibility
- Scroll restoration enabled for better UX

**Code Quality Standards**:
- Use `type` over `interface` for TypeScript definitions
- Keep JSDoc comments concise following Hemingway principles
- Run `pnpm type-check` and `pnpm format` after coding tasks
- Avoid sharing environment variables or secrets in code

**shadcn/ui Integration**:
- "New York" style variant configured
- Complete component library with 60+ components
- Lucide React icons as the icon library
- CSS variables for theming system