# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

Development workflow:
- `pnpm dev` - Start development server on port 3000
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run Biome linting
- `pnpm lint:fix` - Run Biome linting with auto-fixes
- `pnpm type-check` - Run TypeScript type checking
- `pnpm format` - Format code with Biome
- `pnpm format:check` - Check Biome formatting
- `pnpm test` - Run Jest tests
- `pnpm test:watch` - Run Jest tests in watch mode
- `pnpm test:coverage` - Run Jest tests with coverage

Build analysis and maintenance:
- `pnpm analyze` - Analyze bundle size with ANALYZE=true
- `pnpm clean` - Clean build artifacts (.next, out, dist, .turbo)
- `pnpm clean:all` - Clean all artifacts including node_modules

Git shortcuts:
- `pnpm git:status` - Show git status
- `pnpm git:add` - Add all files to git
- `pnpm git:commit` - Commit with message (use: pnpm git:commit "message")
- `pnpm git:push` - Push to main branch
- `pnpm git:pull` - Pull from main branch
- `pnpm git:log` - Show recent commit history
- `pnpm git:diff` - Show staged changes

## Architecture Overview

**Framework**: Next.js 15 with App Router architecture
**Language**: TypeScript with strict mode enabled
**Styling**: Tailwind CSS with shadcn/ui components
**State Management**: React hooks and context patterns

### Project Structure

```
app/                     # Next.js App Router pages
├── [page-name]/        # Route-based page directories
│   ├── page.tsx        # Page component
│   └── loading.tsx     # Loading UI
├── login/              # OTP-based authentication page
├── layout.tsx          # Root layout with global providers
└── globals.css         # Global styles and CSS variables

components/             # Reusable components
├── ui/                 # shadcn/ui base components (60+ components)
│   ├── mobile-action-icons.tsx  # Mobile-specific action buttons
│   ├── mobile-sidebar.tsx       # Mobile navigation sidebar
│   ├── hamburger-menu.tsx       # Hamburger menu component
│   ├── input-otp.tsx           # OTP input component
│   └── [other shadcn components]
├── auth/               # Authentication-related components
│   ├── auth-modal.tsx          # Authentication modal
│   ├── otp-login-form.tsx      # OTP login form
│   └── protected-route.tsx     # Route protection component
├── navigation.tsx      # Main navigation with transparency logic
├── hero-header.tsx     # Main hero section
├── footer.tsx          # Site footer
├── scroll-to-top.tsx   # Auto-scroll to top on route changes
└── video-hero.tsx      # Video hero component

contexts/               # React context providers
├── auth-context.tsx    # Authentication state management
├── cart-context.tsx    # Shopping cart state
├── product-context.tsx # Product data management
└── subscription-context.tsx # Subscription management

lib/                    # Utilities and configurations
├── utils.ts            # Tailwind class merging utilities
└── api-client.ts       # API client configuration

hooks/                  # Custom React hooks
├── use-mobile.ts       # Mobile breakpoint detection
├── use-toast.ts        # Toast notification system
└── use-navigation-transparency.ts  # Navigation scroll effects
```

## Key Technical Details

**API Integration**:
- Base URL: `https://dynamic-spirit-b1c4404b11.strapiapp.com`
- Configured in `next.config.mjs` and environment variables
- Custom API client with authentication headers

**Authentication System**:
- OTP-based phone number authentication
- JWT token storage in localStorage
- Automatic token refresh and validation
- Protected routes with authentication guards

**TypeScript Configuration**:
- Path mapping with `@/*` for root-level imports
- Strict mode enabled with incremental compilation
- Biome and build errors ignored in config (development setting)

**Tailwind Configuration**:
- Custom CSS variables for theming system
- Custom animations: `scroll`, `fade-in`, `slide-in-from-left`
- shadcn/ui integration with HSL color system
- Mobile-first responsive design utilities

**Form Management**:
- React Hook Form for form state management
- Zod schema validation for type-safe forms
- Input OTP component for secure code entry
- Real-time validation feedback

**Component Patterns**:
- All components use TypeScript interfaces
- Memoization with React.memo for performance
- Responsive design with mobile-first approach
- shadcn/ui components for consistent UI patterns
- Custom hooks for reusable logic

## Development Notes

**Authentication**: OTP-based authentication system with phone verification, JWT tokens, and protected routes
**Navigation**: Context-based navigation with scroll transparency effects and mobile-responsive design
**State Management**: Multiple context providers for auth, cart, products, and subscriptions
**Performance**: Images optimized with Next.js Image component, lazy loading, and component memoization
**Mobile Experience**: Dedicated mobile components (sidebar, action icons, hamburger menu) for responsive design
**Styling**: Tailwind utility classes with shadcn/ui components and custom CSS variables
**Forms**: React Hook Form with Zod validation, OTP inputs, and real-time validation feedback
**UX Enhancements**: Auto-scroll-to-top on route changes, loading states, and toast notifications

The codebase follows modern React patterns with TypeScript, emphasizing component reusability, performance optimization, and mobile-first responsive design.