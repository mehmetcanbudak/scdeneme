# SkyCrops Frontend

A modern, responsive Next.js frontend application for SkyCrops, featuring an optimized component architecture and Turkish language support.

## 🚀 Features

- **Modern React**: Built with React 19 and Next.js 15
- **TypeScript**: Full TypeScript support for type safety
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Component Library**: Comprehensive UI components using shadcn/ui
- **Performance Optimized**: Memoized components and optimized rendering
- **Accessibility**: ARIA labels and semantic HTML structure
- **Turkish Localization**: Full Turkish language support

## 🛠️ Tech Stack

- **Framework**: Next.js 15.2.4
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4.17
- **UI Components**: shadcn/ui with Radix UI primitives
- **State Management**: React Context (Auth, Cart, Product, Subscription)
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Charts**: Recharts
- **Carousel**: Embla Carousel
- **Fonts**: Geist Sans & Geist Mono
- **Analytics**: Vercel Analytics
- **Notifications**: Sonner
- **API**: Strapi CMS Integration

## 📁 Project Structure

```
skycrops-frontend/
├── app/                    # Next.js App Router pages
│   ├── abonelik/          # Subscription page
│   ├── blog/              # Blog pages
│   ├── ciftlik/           # Farm page
│   ├── ekibim/            # Team page
│   ├── hakkimizda/        # About us page
│   ├── iletisim/          # Contact page
│   ├── login/             # Authentication page
│   ├── saglik/            # Health page
│   ├── sertifikalar/      # Certificates page
│   ├── sorular/           # FAQ page
│   ├── tesisler/          # Facilities page
│   ├── uretim/            # Production page
│   ├── urunler/           # Products page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/             # Reusable components
│   ├── ui/                # Base UI components (shadcn/ui)
│   ├── auth/              # Authentication components
│   ├── footer.tsx         # Footer component
│   ├── hero-header.tsx    # Hero section
│   ├── navigation.tsx     # Navigation component
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

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm/yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd skycrops-final-fe
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   pnpm run dev
   # or
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

### Development
- `pnpm dev` / `npm run dev` - Start development server
- `pnpm build` / `npm run build` - Build for production
- `pnpm start` / `npm run start` - Start production server

### Code Quality
- `pnpm lint` / `npm run lint` - Run ESLint
- `pnpm lint:fix` / `npm run lint:fix` - Run ESLint with auto-fix
- `pnpm type-check` / `npm run type-check` - Run TypeScript type checking
- `pnpm format` / `npm run format` - Format code with Prettier
- `pnpm format:check` / `npm run format:check` - Check code formatting

### Testing
- `pnpm test` / `npm run test` - Run tests
- `pnpm test:watch` / `npm run test:watch` - Run tests in watch mode
- `pnpm test:coverage` / `npm run test:coverage` - Run tests with coverage

### Maintenance
- `pnpm clean` / `npm run clean` - Clean build artifacts
- `pnpm clean:all` / `npm run clean:all` - Clean all artifacts including node_modules
- `pnpm analyze` / `npm run analyze` - Analyze bundle size

### Git Helpers
- `pnpm git:status` / `npm run git:status` - Show git status
- `pnpm git:add` / `npm run git:add` - Stage all changes
- `pnpm git:commit` / `npm run git:commit` - Commit with message
- `pnpm git:push` / `npm run git:push` - Push to main branch
- `pnpm git:pull` / `npm run git:pull` - Pull from main branch
- `pnpm git:log` / `npm run git:log` - Show recent commits
- `pnpm git:diff` / `npm run git:diff` - Show staged changes

## 🎨 Component Architecture

### Core Components

- **Navigation**: Responsive navigation with transparency effects
- **Hero Header**: Dynamic hero section with scroll animations
- **Video Hero**: Video-based hero component
- **Footer**: Comprehensive footer with logo and links
- **Scroll to Top**: Scroll to top functionality
- **Theme Provider**: Dark/light theme support

### Authentication Components

- **Auth Modal**: Modal-based authentication flow
- **OTP Login Form**: Phone number verification with OTP
- **Protected Route**: Route protection for authenticated users

### UI Components

Built with shadcn/ui, providing:
- Buttons, inputs, and form elements
- Modals, dialogs, and overlays
- Navigation menus and dropdowns
- Charts and data visualization
- Toast notifications (Sonner)
- Responsive layouts and grids

## 🔧 Configuration

### Tailwind CSS
Custom configuration in `tailwind.config.ts` with:
- Custom color palette
- Responsive breakpoints
- Animation utilities
- Component-specific styles

### Next.js
Configuration in `next.config.mjs`:
- Image optimization and domain configuration
- Strapi CMS integration
- Performance optimizations with scroll restoration
- Build configurations with error handling

### API Integration
- **Strapi CMS**: Headless CMS integration
- **API Client**: Centralized API client configuration
- **Environment Variables**: Secure API endpoint management

## 🔌 API Reference

### Base Configuration
- **Base URL**: `process.env.NEXT_PUBLIC_API_URL` (falls back to `http://localhost:1337`)
- **Authentication**: Bearer JWT token stored in `localStorage` as `token`
- **Client**: Centralized `apiClient` wrapper in `lib/api-client.ts`
- **Response Format**: All endpoints return `{ data?, error?, message? }`

### Public Endpoints (No Authentication Required)
The following endpoints are whitelisted and don't require JWT tokens:
- `/api/products/public`, `/api/categories/public`, `/api/products/`, `/api/categories`, `/api/tags`, `/api/subscription-plans`, `/api/cart`, `/api/payment/create-session`, `/api/payment/confirm`

### Authentication APIs
```typescript
// Send OTP to phone number
POST /api/auth/send-otp
Body: { phone: string }

// Verify OTP and login
POST /api/auth/verify-otp
Body: { phone: string, otpCode: string }
Returns: { jwt: string, user: object }

// Resend OTP
POST /api/auth/resend-otp
Body: { phone: string }

// Check phone number status
GET /api/auth/check-phone?phone=...
Returns: { exists: boolean, verified: boolean }

// Validate current token
GET /api/auth/me
Headers: Authorization: Bearer <jwt>
```

### Product APIs
```typescript
// List products with filters and pagination
GET /api/products?populate=*&filters[name][$containsi]=roka&pagination[page]=1&pagination[pageSize]=20

// Public product listing
GET /api/products/public?locale=tr&page=1&pageSize=20&category=sebze

// Get product by ID
GET /api/products/:id

// Get product by slug
GET /api/products/:slug
```

### Category & Tag APIs
```typescript
// List categories
GET /api/categories?populate=image&filters[is_active][$eq]=true

// Public categories
GET /api/categories/public?locale=tr

// List tags
GET /api/tags?populate=*
```

### Cart APIs (Session-based)
```typescript
// Get cart items
GET /api/cart?sessionId=<session_id>
Returns: { success: boolean, cart_items: CartItem[], summary: CartSummary }

// Add item to cart
POST /api/cart/add
Body: {
  productId: number,
  quantity: number,
  sessionId: string,
  purchaseType?: 'one_time' | 'subscription',
  subscriptionInterval?: object,
  deliveryDay?: number,
  finalPrice?: number
}

// Update cart item quantity
PUT /api/cart/items/:id
Body: { quantity: number }

// Remove cart item
DELETE /api/cart/items/:id
```

### Payment APIs
```typescript
// Create payment session
POST /api/payment/create-session
Body: {
  cartItems: any[],
  addressId: number,
  paymentMethod: string
}

// Confirm payment
POST /api/payment/confirm
Body: { sessionId: string, ...paymentData }
```

### Order APIs (Requires Authentication)
```typescript
// Get user's orders
GET /api/orders/my-orders

// Create new order
POST /api/orders
Body: {
  cartItems: [{ productId: number, quantity: number }],
  billingAddress: AddressObject,
  shippingAddress: AddressObject,
  paymentMethod: string,
  notes?: string
}

// Get order details
GET /api/orders/:id
```

### Subscription APIs
```typescript
// Get subscription plans (public)
GET /api/subscription-plans

// Get user's subscriptions (requires auth)
GET /api/subscribers/my-subscriptions

// Create subscription (requires auth)
POST /api/subscribers/subscribe
Body: {
  planId: number,
  paymentCard: { cardHolderName, cardNumber, expireMonth, expireYear, cvc },
  billingAddress: AddressObject,
  shippingAddress: AddressObject
}

// Cancel subscription (requires auth)
POST /api/subscribers/:id/cancel
Body: { reason?: string }

// Retry failed payment (requires auth)
POST /api/subscribers/:id/retry-payment
```

### Usage Examples
```typescript
import { apiClient } from '@/lib/api-client'

// Public product listing
const products = await apiClient.getPublicProducts({ page: 1, pageSize: 20 })

// Authenticated order history
const orders = await apiClient.getMyOrders()

// Add to cart
await apiClient.addToCart({
  productId: 1,
  quantity: 2,
  sessionId: 'session_123',
  purchaseType: 'one_time'
})
```

### Error Handling
- All API calls return standardized error format: `{ error: { status, name, message } }`
- 401 errors on public endpoints are tolerated
- 401 errors on protected endpoints return user-friendly Turkish message: "Bu işlem için giriş yapmanız gerekiyor"

## 📱 Responsive Design

- **Mobile-first approach**: Designed for mobile devices first
- **Breakpoints**: Tailwind CSS responsive utilities
- **Touch-friendly**: Optimized for touch interactions
- **Performance**: Optimized for mobile performance

## ♿ Accessibility

- **ARIA labels**: Proper labeling for screen readers
- **Semantic HTML**: Meaningful HTML structure
- **Keyboard navigation**: Full keyboard support
- **Color contrast**: WCAG compliant color schemes
- **Screen reader support**: Optimized for assistive technologies

## 🚀 Performance Optimizations

### React Optimizations
- **Memoization**: Components wrapped with `React.memo`
- **useCallback**: Event handlers memoized
- **Component splitting**: Smaller, focused components

### Image Optimization
- **Lazy loading**: Below-the-fold images
- **Eager loading**: Above-the-fold hero images
- **Optimized formats**: WebP and modern image formats

### Bundle Optimization
- **Tree shaking**: Unused code elimination
- **Code splitting**: Route-based code splitting
- **Component sharing**: Common functionality centralized

## 🔄 State Management

### React Context System
- **AuthContext**: User authentication state management
- **CartContext**: Shopping cart functionality
- **ProductContext**: Product data and catalog management
- **SubscriptionContext**: Subscription management
- **NavigationContext**: Navigation transparency and mobile menu state

### Custom Hooks
- **useMobile**: Mobile device detection
- **useNavigationTransparency**: Navigation background transparency effects
- **useToast**: Toast notification management

## 🌐 Localization

- **Turkish language**: Primary language support
- **RTL support**: Right-to-left text support
- **Cultural considerations**: Turkish-specific content and formatting

## 🔐 Authentication System

### Features
- **OTP-based Login**: Phone number verification with SMS OTP
- **Protected Routes**: Route protection for authenticated users
- **Auth Modal**: Seamless authentication flow
- **Session Management**: Persistent authentication state

### Authentication Flow
1. User enters phone number
2. OTP is sent via SMS
3. User enters OTP for verification
4. User is authenticated and redirected
5. Protected routes become accessible

## 📊 Analytics & Monitoring

### Vercel Analytics
- **Performance Tracking**: Core Web Vitals monitoring
- **User Behavior**: Page views and interaction tracking
- **Real-time Data**: Live analytics dashboard

### Performance Metrics
- **LCP (Largest Contentful Paint)**
- **FID (First Input Delay)**
- **CLS (Cumulative Layout Shift)**
- **Bundle Size Analysis**

## 🧪 Testing

### Recommended Testing
- **Performance testing**: Core Web Vitals
- **Accessibility testing**: Screen reader compatibility
- **Cross-browser testing**: Multiple browser support
- **Mobile testing**: Touch device optimization

## 📊 Monitoring

### Performance Metrics
- **Core Web Vitals**: LCP, FID, CLS
- **Bundle analysis**: Regular size monitoring
- **User experience**: Performance tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Code Style
- Follow TypeScript best practices
- Use Prettier for formatting
- Follow ESLint rules
- Write meaningful commit messages

## 📄 License

This project is private and proprietary.

## 📞 Support

For questions and support, please contact the development team.

---
Memo branch for memo.



**Built with ❤️ using Next.js and modern web technologies**
