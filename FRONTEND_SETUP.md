# SkyCrops Frontend Setup

Modern Next.js application with TypeScript, Tailwind CSS, and comprehensive state management.

## Environment Setup

### Required Environment Variables

Create `.env.local` in project root:

```bash
# Strapi API Configuration
NEXT_PUBLIC_API_URL=https://dynamic-spirit-b1c4404b11.strapiapp.com

# Environment
NODE_ENV=development
```

**Note:** Production uses the default Strapi URL if no environment variable is set.

### Package Manager

Project uses **pnpm** as the primary package manager:

```bash
# Install dependencies
pnpm install

# Development server
pnpm run dev

# Production build
pnpm run build

# Start production server
pnpm run start
```

### Alternative Package Managers

```bash
# npm
npm install && npm run dev

# yarn
yarn install && yarn dev
```

## Available Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Create production build
pnpm start            # Start production server

# Code Quality
pnpm lint            # Biome check
pnpm lint:fix        # Fix Biome issues
pnpm type-check      # TypeScript type checking
pnpm format          # Format with Biome

# Maintenance
pnpm run clean        # Clean build artifacts
pnpm run analyze      # Bundle analysis

# Git Operations
pnpm run git:status   # Show git status
pnpm run git:add      # Stage all files
pnpm run git:commit   # Interactive commit
pnpm run git:push     # Push to main branch
```

## State Management

### Context Architecture

Provider hierarchy in `/app/layout.tsx`:

```tsx
<ThemeProvider>
  <AuthProvider>
    <ProductProvider>
      <CartProvider>
        <SubscriptionProvider>
          <NavigationProvider>{/* App Content */}</NavigationProvider>
        </SubscriptionProvider>
      </CartProvider>
    </ProductProvider>
  </AuthProvider>
</ThemeProvider>
```

### Core Contexts

#### Authentication (`/contexts/auth-context.tsx`)

- OTP-based phone verification
- JWT token management
- User session handling
- Auto token refresh

#### Products (`/contexts/product-context.tsx`)

- Product catalog management
- Category and tag filtering
- Search functionality
- Featured product curation

#### Shopping Cart (`/contexts/cart-context.tsx`)

- Session-based cart persistence
- Real-time total calculations
- Item management operations
- LocalStorage integration

#### Subscriptions (`/contexts/subscription-context.tsx`)

- Subscription plan management
- User subscription tracking
- Payment processing
- Billing cycle management

#### Navigation (`/components/navigation-context.tsx`)

- Scroll-based transparency
- Mobile sidebar state
- Responsive navigation controls

#### Theme (`/components/theme-provider.tsx`)

- Light/Dark/System themes
- System preference detection
- CSS custom property integration

## Authentication System

### Components

```tsx
// OTP Login Form
<OTPLoginForm onSuccess={handleSuccess} onCancel={handleCancel} />

// Authentication Modal
<AuthModal isOpen={isOpen} onClose={() => setIsOpen(false)} />

// Protected Route Wrapper
<ProtectedRoute>
  <ProtectedComponent />
</ProtectedRoute>
```

### Current Status

- **OTP-based authentication** via phone verification
- **Session management** with automatic token refresh
- **Authentication headers temporarily disabled** in API client
- **Public endpoints active** for core e-commerce functionality

## API Integration

### API Client (`/lib/api-client.ts`)

```tsx
import { apiClient } from '@/lib/api-client';

// Public Endpoints (Active)
const products = await apiClient.getPublicProducts();
const categories = await apiClient.getPublicCategories();
const cartItems = await apiClient.getCartItems(sessionId);

// Cart Operations
await apiClient.addToCart(productId, quantity);
await apiClient.updateCartItem(itemId, quantity);
await apiClient.removeCartItem(itemId);

// Authenticated Endpoints (Headers Disabled)
const orders = await apiClient.getMyOrders();
const subscriptions = await apiClient.getMySubscriptions();
```

### Backend Integration

- **Strapi CMS** as headless backend
- **Production URL**: `https://dynamic-spirit-b1c4404b11.strapiapp.com`
- **Session-based cart** persistence
- **Public API access** for core functionality

## E-commerce Features

### Cart Management

```tsx
import { useCart } from '@/contexts/cart-context';

const { addItem, totalItems, totalPrice } = useCart();

const handleAddToCart = async (productId: number) => {
  await addItem(productId, 1);
};
```

### Order Processing

```tsx
const orderData = {
  cartItems: [{ productId: 1, quantity: 2 }],
  billingAddress: {
    /* address data */
  },
  shippingAddress: {
    /* address data */
  },
  paymentMethod: 'credit_card',
};

const order = await apiClient.createOrder(orderData);
```

## UI Components

### Navigation Integration

- User authentication status display
- Cart item counter
- Authentication modal trigger
- User profile access

### Enhanced Features

- **ScrollToTop**: Automatic page scrolling on route changes
- **Vercel Analytics**: Page view tracking and performance monitoring
- **shadcn/ui v4**: Modern component library with full accessibility
- **Responsive Design**: Mobile-first approach with breakpoint optimization

## Data Flow

### Public Access (Active)

```
User → Context → API Client (Public) → Strapi
- ProductContext → Product endpoints
- CartContext → Cart operations
- NavigationContext → UI state
```

### Authenticated Access (Headers Disabled)

```
User → AuthContext → API Client (No Auth) → Strapi
- User sessions and subscriptions
- Order management
```

### Theme Management

```
User → ThemeProvider → next-themes → CSS Variables → UI
```

## Development

### Quick Start

```bash
# Install and start development
pnpm install && pnpm run dev

# Production build
pnpm run build && pnpm run start
```

### Backend Integration

- **Production**: Strapi CMS at `https://dynamic-spirit-b1c4404b11.strapiapp.com`
- **Development**: Local Strapi instance (optional)
- **Default**: Production URL used if no environment variable set

## Testing

### Development Testing

- OTP codes logged to console (no real SMS in development)
- API endpoints testable via Postman or similar tools
- Session-based cart testing available

## Current Status

**Active Features:**

- ✅ Public product catalog and cart operations
- ✅ Theme switching (Light/Dark/System)
- ✅ Responsive navigation and mobile UI
- ✅ Session-based shopping cart
- ✅ Strapi CMS integration

**Disabled Features:**

- ⚠️ Authentication headers in API client
- ⚠️ User-specific authenticated endpoints

The application provides full e-commerce functionality for public users with authentication system ready for activation.
