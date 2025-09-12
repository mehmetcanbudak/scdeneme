# 🚀 SkyCrops Frontend - State Management & Authentication Setup

Bu dokümantasyon, SkyCrops frontend projesinde kurulan state management yapısını ve OTP tabanlı authentication sistemini açıklar.

## 📋 Kurulum

### 1. Environment Variables

Proje kök dizininde `.env.local` dosyası oluşturun:

```bash
# Strapi API Configuration
# Production URL (default fallback)
NEXT_PUBLIC_API_URL=https://dynamic-spirit-b1c4404b11.strapiapp.com

# Development/Production Environment
NODE_ENV=development
```

**Not:** Production ortamında `NEXT_PUBLIC_API_URL` environment variable'ı set edilmezse, sistem otomatik olarak production Strapi URL'ini kullanır.

### 2. Dependencies

Gerekli paketler zaten `package.json`'da mevcut. Eğer eksikse:

```bash
npm install
# veya
yarn install
# veya
pnpm install
```

### 3. Available Scripts

```bash
# Development
npm run dev          # Development server başlat
npm run build        # Production build oluştur
npm run start        # Production server başlat

# Code Quality
npm run lint         # ESLint kontrolü
npm run lint:fix     # ESLint hatalarını düzelt
npm run type-check   # TypeScript tip kontrolü
npm run format       # Prettier ile formatla

# Maintenance
npm run clean        # Build dosyalarını temizle
npm run analyze      # Bundle analyzer ile analiz et

# Git Helpers
npm run git:status   # Git status göster
npm run git:add      # Tüm dosyaları stage'e ekle
npm run git:commit   # Commit oluştur (interactive)
npm run git:push     # Main branch'e push et
```

## 🏗️ State Management Yapısı

### Context Providers Hierarchy

```tsx
<ThemeProvider attribute="class" defaultTheme="light" enableSystem>
  <AuthProvider>
    <ProductProvider>
      <CartProvider>
        <SubscriptionProvider>
          <NavigationProvider>
            {/* App Content */}
          </NavigationProvider>
        </SubscriptionProvider>
      </CartProvider>
    </ProductProvider>
  </AuthProvider>
</ThemeProvider>
```

**Not:** ThemeProvider en üst seviyede konumlandırılmıştır ve tüm uygulama için tema yönetimini sağlar.

### 1. AuthContext (`/contexts/auth-context.tsx`)

OTP tabanlı authentication yönetimi:

```tsx
import { useAuth } from '@/contexts/auth-context'

const { 
  user, 
  token, 
  isAuthenticated, 
  isLoading,
  login, 
  sendOTP, 
  resendOTP, 
  checkPhone, 
  logout, 
  error, 
  clearError 
} = useAuth()
```

**Özellikler:**
- JWT token yönetimi
- OTP gönderme/doğrulama
- Kullanıcı bilgileri
- Otomatik token yenileme
- localStorage entegrasyonu

### 2. ProductContext (`/contexts/product-context.tsx`)

Ürün yönetimi:

```tsx
import { useProducts } from '@/contexts/product-context'

const { 
  products, 
  categories, 
  tags, 
  featuredProducts,
  isLoading,
  loadProducts, 
  loadProduct, 
  searchProducts, 
  filterProducts 
} = useProducts()
```

**Özellikler:**
- Ürün listesi yönetimi
- Kategori ve etiket yönetimi
- Arama ve filtreleme
- Öne çıkan ürünler
- Otomatik veri yükleme

### 3. CartContext (`/contexts/cart-context.tsx`)

Sepet yönetimi:

```tsx
import { useCart } from '@/contexts/cart-context'

const { 
  items, 
  totalItems, 
  totalPrice,
  isLoading,
  addItem, 
  updateItem, 
  removeItem, 
  clearCart, 
  loadCart 
} = useCart()
```

**Özellikler:**
- Session tabanlı sepet
- Otomatik toplam hesaplama
- Ürün ekleme/çıkarma/güncelleme
- localStorage session yönetimi

### 4. SubscriptionContext (`/contexts/subscription-context.tsx`)

Abonelik yönetimi:

```tsx
import { useSubscriptions } from '@/contexts/subscription-context'

const {
  plans,
  subscriptions,
  activeSubscription,
  isLoading,
  loadPlans,
  loadSubscriptions,
  createSubscription,
  cancelSubscription,
  retryPayment
} = useSubscriptions()
```

**Özellikler:**
- Abonelik planları
- Kullanıcı abonelikleri
- Aktif abonelik takibi
- Ödeme işlemleri

### 5. NavigationContext (`/components/navigation-context.tsx`)

Navigation ve UI state yönetimi:

```tsx
import { useNavigation } from '@/components/navigation-context'

const {
  isTransparent,
  setIsTransparent,
  isMobileSidebarOpen,
  setIsMobileSidebarOpen
} = useNavigation()
```

**Özellikler:**
- Navigation bar transparency kontrolü
- Mobile sidebar aç/kapa durumu
- Responsive navigation yönetimi

### 6. ThemeProvider (`/components/theme-provider.tsx`)

Tema yönetimi (next-themes entegrasyonu):

```tsx
import { ThemeProvider } from '@/components/theme-provider'

// Kullanım örneği
<ThemeProvider attribute="class" defaultTheme="light" enableSystem>
  {/* App Content */}
</ThemeProvider>
```

**Özellikler:**
- Light/Dark/System tema desteği
- Otomatik sistem tema algılama
- CSS class-based tema geçişi

## 🔐 Authentication Flow

### 1. OTP Login Form

```tsx
import OTPLoginForm from '@/components/auth/otp-login-form'

<OTPLoginForm 
  onSuccess={() => console.log('Login successful')}
  onCancel={() => console.log('Login cancelled')}
/>
```

### 2. Auth Modal

```tsx
import AuthModal from '@/components/auth/auth-modal'

<AuthModal 
  isOpen={isOpen} 
  onClose={() => setIsOpen(false)} 
/>
```

### 3. Protected Routes

```tsx
import ProtectedRoute from '@/components/auth/protected-route'

<ProtectedRoute>
  <YourProtectedComponent />
</ProtectedRoute>
```

## 🌐 API Client

### Kullanım

```tsx
import { apiClient } from '@/lib/api-client'

// Public endpoints (authentication gerekmez)
const products = await apiClient.getPublicProducts()
const product = await apiClient.getPublicProduct(1)
const categories = await apiClient.getPublicCategories()

// Authenticated endpoints (şu anda devre dışı)
const orders = await apiClient.getMyOrders()
const newOrder = await apiClient.createOrder(orderData)
```

### Mevcut Durum

**⚠️ Authentication Devre Dışı:** API client'ta authentication header'ları geçici olarak yorum satırı yapılmıştır.

```tsx
// Şu anda yorum satırında (lib/api-client.ts:36-38)
// if (this.token) {
//   (headers as any).Authorization = `Bearer ${this.token}`
// }
```

### Endpoint Türleri

1. **Public Endpoints** (Authentication gerektirmez):
   - `getPublicProducts()` - Ürün listesi
   - `getPublicProduct(id)` - Tek ürün detayı
   - `getPublicCategories()` - Kategori listesi
   - `getCartItems(sessionId)` - Sepet öğeleri
   - `addToCart()`, `updateCartItem()`, `removeCartItem()` - Sepet işlemleri

2. **Authenticated Endpoints** (Authentication gerekli, şu anda devre dışı):
   - `getMyOrders()`, `createOrder()` - Sipariş işlemleri
   - `getMySubscriptions()`, `createSubscription()` - Abonelik işlemleri

## 🛒 E-commerce Integration

### Sepete Ürün Ekleme

```tsx
import { useCart } from '@/contexts/cart-context'

const { addItem } = useCart()

const handleAddToCart = async (productId: number) => {
  const result = await addItem(productId, 1)
  if (result.success) {
    // Başarılı
  }
}
```

### Sipariş Oluşturma

```tsx
import { apiClient } from '@/lib/api-client'

const orderData = {
  cartItems: [{ productId: 1, quantity: 2 }],
  billingAddress: { /* address data */ },
  shippingAddress: { /* address data */ },
  paymentMethod: "credit_card"
}

const order = await apiClient.createOrder(orderData)
```

## 📱 Navigation Integration

Navigation bileşenleri otomatik olarak:
- Kullanıcı giriş durumunu gösterir
- Sepet item sayısını gösterir
- Auth modal'ı açar
- Kullanıcı profil linklerini sağlar

## 🆕 Yeni Bileşenler ve Özellikler

### 1. ScrollToTop Component (`/components/scroll-to-top.tsx`)

Otomatik sayfa başı kaydırma:

```tsx
// Route değiştiğinde otomatik olarak sayfa başına kaydırır
// Initial page load'da da çalışır
<ScrollToTop />
```

### 2. Analytics Integration

Vercel Analytics entegrasyonu aktif:
- Sayfa görüntüleme takibi
- User interaction analizi
- Performance monitoring

### 3. Enhanced UI Components

Güncel shadcn/ui v4 bileşenleri:
- Modern design system
- Accessibility uyumlu
- TypeScript desteği
- Responsive tasarım

## 🔄 Data Flow

### 1. Public Access (Mevcut Aktif Sistem)
```
User → ProductContext → API Client (Public Endpoints) → Strapi
User → CartContext → API Client (Public Endpoints) → Strapi
User → NavigationContext → UI State Management
```

### 2. Authenticated Access (Şu Anda Devre Dışı)
```
User → AuthContext → API Client (Token Disabled) → Strapi
User → SubscriptionContext → API Client (Token Disabled) → Strapi
```

### 3. Theme Management
```
User → ThemeProvider → next-themes → CSS Classes → UI
```

## 🚀 Development

### 1. Start Development Server

```bash
npm run dev
# veya
yarn dev
```

### 2. Build for Production

```bash
npm run build
# veya
yarn build
```

### 3. Environment Setup

Strapi backend bağlantısı:
- Production Backend: `https://dynamic-spirit-b1c4404b11.strapiapp.com`
- Development: `http://localhost:3000`

**Not:** Sistem production Strapi URL'ini varsayılan olarak kullanır. Development için local Strapi backend kurabilirsiniz.

## 🧪 Testing

### OTP Test (Development)

Development modunda gerçek SMS gönderilmez, console'da OTP kodu görüntülenir.

### API Test

Postman veya benzeri araçlarla API endpoint'lerini test edebilirsiniz:

```bash
# OTP gönder
POST http://localhost:1337/api/auth/send-otp
{
  "phone": "+905551234567"
}

# OTP doğrula
POST http://localhost:1337/api/auth/verify-otp
{
  "phone": "+905551234567",
  "otpCode": "123456"
}
```

## 📝 Notes

- Tüm state management CSR (Client-Side Rendering) tabanlıdır
- SSR gerekmez, Next.js App Router kullanılır
- JWT token sistemi mevcut ancak geçici olarak devre dışı
- Session tabanlı sepet yönetimi aktif
- Public API endpoints authentication gerektirmez
- next-themes ile tema desteği aktif
- NavigationContext ile responsive UI yönetimi
- ScrollToTop component ile otomatik sayfa başı kaydırma
- TypeScript ile tip güvenliği
- Production Strapi backend entegrasyonu aktif

**Mevcut Durum Özeti:**
- ✅ Public ürün görüntüleme ve sepet işlemleri
- ✅ Tema değişimi (Light/Dark/System)
- ✅ Responsive navigation
- ⚠️ Authentication sistemi devre dışı (yorum satırında)
- ⚠️ Authenticated endpoints erişilemez durumda

Bu yapı ile SkyCrops frontend'i public e-commerce özellikleri ile çalışır durumda. Authentication sistemi aktifleştirildiğinde tam e-commerce deneyimi sağlanacaktır.
