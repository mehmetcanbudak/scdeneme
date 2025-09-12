import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { NavigationProvider } from '@/components/navigation-context'
import { AuthProvider } from '@/contexts/auth-context'
import { CartProvider } from '@/contexts/cart-context'
import { ProductProvider } from '@/contexts/product-context'
import { SubscriptionProvider } from '@/contexts/subscription-context'
import ScrollToTop from '../components/scroll-to-top'
import './globals.css'

export const metadata: Metadata = {
  title: 'SkyCrops - Taze ve Yaşayan Sebzeler',
  description: 'Skycrops ile taze, organik ve sağlıklı sebze paketlerine abone olun. Dikey tarım teknolojisi ile üretilen kaliteli sebzeler.',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" className="overflow-x-hidden">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} overflow-x-hidden`}>
        <AuthProvider>
          <ProductProvider>
            <CartProvider>
              <SubscriptionProvider>
                <NavigationProvider>
                  <ScrollToTop />
                  <Navigation />
                  {children}
                  <Footer />
                </NavigationProvider>
              </SubscriptionProvider>
            </CartProvider>
          </ProductProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
