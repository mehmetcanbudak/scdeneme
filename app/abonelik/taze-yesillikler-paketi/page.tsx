"use client"

import { useEffect, useState, useCallback } from "react"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Minus, Plus, ShoppingCart, Heart, Star, Share2, ArrowLeft, Package, Clock, Shield, Truck, CheckCircle, X, Zap, Leaf, Award, Users, TrendingUp, Info } from "lucide-react"
import Link from "next/link"
import { useNavigationTransparency } from "@/hooks/use-navigation-transparency"
import { apiClient } from "@/lib/api-client"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"

interface SubscriptionInterval {
  key: string
  days: number
  name: string
  price: number
  name_en: string
  currency: string
  discount: number
  description: string
  description_en: string
}

interface Product {
  id: number
  documentId: string
  name: string
  slug: string
  product_id: string
  description?: string
  short_description?: string
  is_active: boolean
  in_stock: boolean
  stock_quantity: number
  price: number
  sale_price?: number
  currency: string
  vat_rate: number
  vat_included: boolean
  discount_percentage: number
  discount_amount: number
  product_type: string
  subscription_enabled: boolean
  one_time_purchase_enabled: boolean
  subscription_intervals: SubscriptionInterval[]
  sku?: string
  weight?: number
  dimensions?: string
  meta_title?: string
  meta_description?: string
  image?: any
  images?: any[]
  gallery?: any[]
  price_breakdown: {
    base_price: number
    sale_price: number
    discount_applied: number
    discount_active: boolean
    price_without_vat: number
    vat_amount: number
    vat_rate: number
    price_with_vat: number
    final_price: number
    currency: string
    original_currency: string
    formatted_price: string
    formatted_price_with_vat: string
    formatted_price_without_vat: string
  }
  purchase_options: {
    one_time_available: boolean
    subscription_available: boolean
    intervals: any[]
  }
  categories?: Array<{
    id: number
    name: string
    slug: string
  }>
  tags?: Array<{
    id: number
    name: string
    slug: string
  }>
}

type PurchaseType = 'one_time' | 'subscription'

export default function TazeYesilliklerPaketi() {
  const { addItem } = useCart()
  const { user } = useAuth()
  
  // Delivery days configuration
  const deliveryDays = [
    { id: 1, name: 'Pazartesi', shortName: 'Pzt' },
    { id: 2, name: 'Salı', shortName: 'Sal' },
    { id: 3, name: 'Çarşamba', shortName: 'Çar' },
    { id: 4, name: 'Perşembe', shortName: 'Per' },
    { id: 5, name: 'Cuma', shortName: 'Cum' },
    { id: 6, name: 'Cumartesi', shortName: 'Cmt' },
    { id: 7, name: 'Pazar', shortName: 'Paz' }
  ]
  
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [purchaseType, setPurchaseType] = useState<PurchaseType>('subscription')
  const [selectedInterval, setSelectedInterval] = useState<SubscriptionInterval | null>(null)
  const [selectedDeliveryDay, setSelectedDeliveryDay] = useState<number>(1) // 1 = Pazartesi
  const [addingToCart, setAddingToCart] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  // Enable navigation transparency
  useNavigationTransparency(false)

  // Fetch Taze Yeşillikler Paketi product by slug
  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await apiClient.getProductBySlug('taze-yesillikler-paketi', {
        populate: '*'
      })

      if (response.error) {
        setError(response.error.message)
        return
      }

      if (response.data) {
        const productData = response.data as Product
        setProduct(productData)

        // Set default subscription interval if subscription is enabled
        if (productData.subscription_enabled && productData.subscription_intervals.length > 0) {
          setSelectedInterval(productData.subscription_intervals[0])
        }

        // Default to subscription for this product since it's moved to abonelik
        if (productData.is_active) {
          if (productData.subscription_enabled && productData.subscription_intervals.length > 0) {
            setPurchaseType('subscription')
          } else {
            setPurchaseType('one_time')
          }
        }
      }
    } catch (err) {
      setError('Ürün bilgileri yüklenirken bir hata oluştu')
      console.error('Error fetching product:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProduct()
  }, [fetchProduct])

  // Get product images
  const getProductImages = () => {
    if (!product) return []
    
    const images: string[] = []
    
    // Add single image if exists
    if (product.image) {
      const imageUrl = typeof product.image === 'string' 
        ? product.image 
        : product.image.url || product.image.formats?.large?.url || product.image.formats?.medium?.url || product.image.formats?.small?.url
      
      if (imageUrl) {
        images.push(imageUrl.startsWith('http') ? imageUrl : `${process.env.NEXT_PUBLIC_API_URL}${imageUrl}`)
      }
    }
    
    // Add multiple images if exists
    if (product.images && Array.isArray(product.images)) {
      product.images.forEach(img => {
        const imageUrl = typeof img === 'string' 
          ? img 
          : img.url || img.formats?.large?.url || img.formats?.medium?.url || img.formats?.small?.url
        
        if (imageUrl) {
          images.push(imageUrl.startsWith('http') ? imageUrl : `${process.env.NEXT_PUBLIC_API_URL}${imageUrl}`)
        }
      })
    }
    
    // Add gallery images if exists
    if (product.gallery && Array.isArray(product.gallery)) {
      product.gallery.forEach(img => {
        const imageUrl = typeof img === 'string' 
          ? img 
          : img.url || img.formats?.large?.url || img.formats?.medium?.url || img.formats?.small?.url
        
        if (imageUrl) {
          images.push(imageUrl.startsWith('http') ? imageUrl : `${process.env.NEXT_PUBLIC_API_URL}${imageUrl}`)
        }
      })
    }
    
    return images.length > 0 ? images : ["/placeholder.svg"]
  }

  // Format price
  const formatPrice = (price: number, currency: string = 'TRY') => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(price)
  }

  // Get current price based on selection
  const getCurrentPrice = () => {
    if (!product) return 0
    
    if (purchaseType === 'subscription' && selectedInterval) {
      return selectedInterval.price
    }
    
    return product.sale_price || product.price
  }

  // Get discount information
  const getDiscountInfo = () => {
    if (!product) return null
    
    if (purchaseType === 'subscription' && selectedInterval) {
      const originalPrice = product.price
      const discountedPrice = selectedInterval.price
      const discountAmount = originalPrice - discountedPrice
      const discountPercentage = (discountAmount / originalPrice) * 100
      
      return {
        hasDiscount: discountAmount > 0,
        originalPrice,
        discountedPrice,
        discountAmount,
        discountPercentage: Math.round(discountPercentage)
      }
    }
    
    if (product.sale_price && product.sale_price < product.price) {
      const discountAmount = product.price - product.sale_price
      const discountPercentage = (discountAmount / product.price) * 100
      
      return {
        hasDiscount: true,
        originalPrice: product.price,
        discountedPrice: product.sale_price,
        discountAmount,
        discountPercentage: Math.round(discountPercentage)
      }
    }
    
    return {
      hasDiscount: false,
      originalPrice: product.price,
      discountedPrice: product.price,
      discountAmount: 0,
      discountPercentage: 0
    }
  }

  // Handle add to cart
  const handleAddToCart = async () => {
    if (!product || addingToCart) return
    
    setAddingToCart(true)
    
    try {
      const cartItem = {
        productId: product.id,
        quantity,
        purchaseType,
        subscriptionInterval: purchaseType === 'subscription' ? selectedInterval : undefined,
        deliveryDay: purchaseType === 'subscription' ? selectedDeliveryDay : undefined,
        price: getCurrentPrice()
      }
      
      await addItem(cartItem.productId, cartItem.quantity, cartItem.purchaseType, cartItem.subscriptionInterval || undefined, cartItem.deliveryDay)
      
      // Show success message
      setShowSuccessMessage(true)
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccessMessage(false)
      }, 3000)
    } catch (err) {
      console.error('Error adding to cart:', err)
    } finally {
      setAddingToCart(false)
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center pt-24">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Ürün yükleniyor...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !product) {
    notFound()
  }

  const images = getProductImages()
  const discountInfo = getDiscountInfo()

  return (
    <div className="min-h-screen bg-white">
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-top-4 duration-300">
          <div className="bg-gray-600 text-white px-6 py-4 rounded-lg shadow-lg max-w-sm">
            <div className="flex items-start space-x-3 mb-3">
              <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium">Sepete Eklendi!</p>
                <p className="text-sm text-green-100">
                  {quantity} adet {product?.name} sepetinize eklendi
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowSuccessMessage(false)}
                className="text-green-100 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => {
                  setShowSuccessMessage(false)
                  window.location.href = '/sepet'
                }}
                className="flex-1 bg-white text-green-600 px-3 py-2 rounded text-sm font-medium hover:bg-green-50 transition-colors"
              >
                Sepete Git
              </button>
              <button
                type="button"
                onClick={() => setShowSuccessMessage(false)}
                className="flex-1 bg-green-700 text-white px-3 py-2 rounded text-sm font-medium hover:bg-green-800 transition-colors"
              >
                Alışverişe Devam
              </button>
            </div>
          </div>
        </div>
      )}
      
      <main className="pt-32 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link href="/abonelik" className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Abonelik Sayfasına Dön
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-50">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg";
                  }}
                />
              </div>

              {/* Thumbnail Images */}
              {images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {images.map((image, index) => (
                    <button
                      key={`${product.id}-thumbnail-${index}-${image.slice(-20)}`}
                      type="button"
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index ? 'border-gray-600' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder.svg";
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Product Title and Price */}
              <div>
                <h1 className="text-3xl font-light mb-4 text-gray-800">{product.name}</h1>
                
                {/* Stock Status */}
                <div className="mb-4 space-y-2">
                  {!product.is_active ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-red-100 text-red-800">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                      Pasif Ürün
                    </span>
                  ) : product.in_stock ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      Stokta var ({product.stock_quantity} adet)
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                      Stokta yok
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="text-3xl font-light text-gray-800">
                  {discountInfo?.hasDiscount ? (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <span className="text-red-600">{formatPrice(getCurrentPrice(), product.currency)}</span>
                        <span className="text-lg text-gray-500 line-through">
                          {formatPrice(discountInfo.originalPrice, product.currency)}
                        </span>
                        <span className="bg-red-100 text-red-800 text-sm px-2 py-1 rounded-full">
                          %{discountInfo.discountPercentage} indirim
                        </span>
                      </div>
                    </div>
                  ) : (
                    <span>{formatPrice(getCurrentPrice(), product.currency)}</span>
                  )}
                </div>

                {/* VAT Info */}
                {product.vat_included && (
                  <p className="text-sm text-gray-600 mt-2">
                    KDV dahil (KDV oranı: %{product.vat_rate})
                  </p>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <div>
                  <h3 className="font-medium mb-2 text-gray-800">Ürün Açıklaması</h3>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>
              )}

              {/* Purchase Type Selection - Focus on Subscription */}
              <div>
                <h3 className="font-medium mb-4 text-gray-800">Abonelik Seçenekleri</h3>
                {!product.is_active && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 text-sm">
                      Bu ürün şu anda pasif durumda ve satın alınamaz.
                    </p>
                  </div>
                )}
                <div className="grid grid-cols-1 gap-3">
                  {/* Subscription - Primary Option */}
                  {product.subscription_enabled && product.subscription_intervals.length > 0 && (
                    <div
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        !product.is_active
                          ? 'border-gray-200 bg-gray-50 opacity-60'
                          : purchaseType === 'subscription'
                          ? 'border-gray-600 bg-gray-50'
                          : 'border-gray-200'
                      }`}
                    >
                      <button
                        onClick={() => product.is_active && setPurchaseType('subscription')}
                        className={`w-full text-left ${!product.is_active ? 'cursor-not-allowed' : ''}`}
                        disabled={!product.is_active}
                        type="button"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <div className="font-medium text-gray-800">Abonelik</div>
                            <div className="text-sm text-gray-600">Düzenli teslimat ile %{Math.round(((product.price - product.subscription_intervals[0].price) / product.price) * 100)} tasarruf et</div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-medium text-red-600">
                              {selectedInterval && formatPrice(selectedInterval.price, selectedInterval.currency)}
                            </div>
                            <div className="text-sm text-gray-500 line-through">
                              {formatPrice(product.price, product.currency)}
                            </div>
                          </div>
                        </div>
                      </button>

                      {/* Subscription Intervals */}
                      {purchaseType === 'subscription' && product.is_active && (
                        <div className="space-y-3 mt-3 pt-3 border-t border-gray-200">
                          {product.subscription_intervals.map((interval) => (
                            <div
                              key={interval.key}
                              className={`p-3 rounded-lg border transition-colors ${
                                selectedInterval?.key === interval.key
                                  ? 'border-gray-600 bg-white'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <button
                                type="button"
                                onClick={() => setSelectedInterval(interval)}
                                className="w-full text-left"
                              >
                                <div className="flex items-center justify-between mb-3">
                                  <div>
                                    <div className="font-medium text-gray-800">{interval.name}</div>
                                    <div className="text-sm text-gray-600">{interval.description}</div>
                                  </div>
                                  <div className="text-right">
                                    <div className="font-medium text-gray-800">
                                      {formatPrice(interval.price, interval.currency)}
                                    </div>
                                    <div className="text-sm text-green-600">
                                      %{selectedInterval?.key === interval.key && getDiscountInfo()?.discountPercentage ? 
                                        getDiscountInfo()?.discountPercentage : 
                                        Math.round(interval.discount)
                                      } indirim
                                    </div>
                                  </div>
                                </div>
                              </button>

                              {/* Subscription-specific controls */}
                              {selectedInterval?.key === interval.key && product.is_active && (
                                <div className="space-y-3 pt-3 border-t border-gray-200">
                                  {/* Quantity Selector for this interval */}
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-700">Adet:</span>
                                    <div className="flex items-center space-x-3">
                                      <button
                                        type="button"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                                        disabled={quantity <= 1}
                                      >
                                        <Minus className="w-3 h-3" />
                                      </button>
                                      <span className="w-12 text-center font-medium">{quantity}</span>
                                      <button
                                        type="button"
                                        onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                                        className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                                        disabled={quantity >= product.stock_quantity}
                                      >
                                        <Plus className="w-3 h-3" />
                                      </button>
                                    </div>
                                  </div>

                                  {/* Delivery Day Selector */}
                                  <div>
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="text-sm font-medium text-gray-700">Teslimat Günü:</span>
                                      <span className="text-xs text-gray-500">{deliveryDays.find(d => d.id === selectedDeliveryDay)?.name}</span>
                                    </div>
                                    <div className="grid grid-cols-7 gap-1">
                                      {deliveryDays.map((day) => (
                                        <button
                                          key={day.id}
                                          type="button"
                                          onClick={() => setSelectedDeliveryDay(day.id)}
                                          className={`p-2 text-xs rounded border transition-colors ${
                                            selectedDeliveryDay === day.id
                                              ? 'border-gray-600 bg-gray-600 text-white'
                                              : 'border-gray-200 hover:border-gray-300 text-gray-700'
                                          }`}
                                        >
                                          {day.shortName}
                                        </button>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Summary */}
                                  <div className="bg-gray-50 p-3 rounded text-sm">
                                    <p className="text-gray-700">
                                      <strong>{quantity} adet</strong> ürün, <strong>{interval.name.toLowerCase()}</strong> <strong>{deliveryDays.find(d => d.id === selectedDeliveryDay)?.name}</strong> günleri teslimat edilecek.
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* One-time Purchase - Secondary Option */}
                  {product.is_active && product.one_time_purchase_enabled && (
                    <div
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        purchaseType === 'one_time'
                          ? 'border-gray-600 bg-gray-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <button
                        onClick={() => setPurchaseType('one_time')}
                        className="w-full text-left"
                        type="button"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <div className="font-medium text-gray-800">Tek Seferlik Satın Al</div>
                            <div className="text-sm text-gray-600">Şimdi satın al, istediğin zaman tekrar sipariş ver</div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-medium text-gray-800">
                              {formatPrice(product.sale_price || product.price, product.currency)}
                            </div>
                          </div>
                        </div>
                      </button>

                      {/* One-time Quantity Selector */}
                      {purchaseType === 'one_time' && (
                        <div className="pt-3 border-t border-gray-200">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Adet:</span>
                            <div className="flex items-center space-x-3">
                              <button
                                type="button"
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                                disabled={quantity <= 1}
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-12 text-center font-medium">{quantity}</span>
                              <button
                                type="button"
                                onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                                className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                                disabled={quantity >= product.stock_quantity}
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Price Breakdown - Discount Information */}
              {discountInfo?.hasDiscount && (
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <h3 className="font-medium text-gray-800 text-sm">Fiyat Detayı</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Normal Fiyat:</span>
                      <span className="font-medium">
                        {formatPrice(discountInfo.originalPrice, product.currency)}
                      </span>
                    </div>
                    <div className="flex justify-between text-red-600">
                      <span>İndirim (%{discountInfo.discountPercentage}):</span>
                      <span className="font-medium">
                        -{formatPrice(discountInfo.discountAmount, product.currency)}
                      </span>
                    </div>
                    <hr className="border-gray-200" />
                    <div className="flex justify-between font-medium text-lg">
                      <span>Toplam:</span>
                      <span>
                        {formatPrice(getCurrentPrice() * quantity, product.currency)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Add to Cart Button */}
              <div className="space-y-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.in_stock || !product.is_active || addingToCart || quantity <= 0}
                  className={`w-full py-4 text-lg font-medium ${
                    !product.is_active
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300'
                      : 'bg-gray-600 hover:bg-gray-700 text-white'
                  }`}
                >
                  {addingToCart ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                      Sepete Ekleniyor...
                    </div>
                  ) : !product.is_active ? (
                    <div className="flex items-center justify-center">
                      <X className="w-5 h-5 mr-2" />
                      Pasif Ürün - Satın Alınamaz
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      {purchaseType === 'subscription' ? 'Aboneliğe Başla' : 'Sepete Ekle'}
                    </div>
                  )}
                </Button>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Button variant="outline" className="flex-1">
                    <Heart className="w-4 h-4 mr-2" />
                    Favorilere Ekle
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Share2 className="w-4 h-4 mr-2" />
                    Paylaş
                  </Button>
                </div>
              </div>

              {/* Product Features */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Package className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Taze Ürün</div>
                    <div className="text-sm text-gray-600">Dalından taze</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Organik</div>
                    <div className="text-sm text-gray-600">Pestisitsiz</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Truck className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Hızlı Teslimat</div>
                    <div className="text-sm text-gray-600">24-48 saat</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Güvenli Ödeme</div>
                    <div className="text-sm text-gray-600">SSL korumalı</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Product Information */}
          <div className="mt-16 space-y-8">
            {/* Product Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-3">
                    <Zap className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800 mb-1">95%</div>
                  <div className="text-sm text-gray-600">Doğal İçerik</div>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-3">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800 mb-1">4.8</div>
                  <div className="text-sm text-gray-600">Müşteri Puanı</div>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mx-auto mb-3">
                    <Award className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800 mb-1">A+</div>
                  <div className="text-sm text-gray-600">Kalite Sınıfı</div>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800 mb-1">2.5k</div>
                  <div className="text-sm text-gray-600">Mutlu Müşteri</div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Information Accordions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-light text-gray-800 mb-6">Ürün Bilgileri</h2>
                
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="nutritional">
                    <AccordionTrigger>
                      <div className="flex items-center space-x-2">
                        <Leaf className="w-4 h-4 text-green-600" />
                        <span>Besin Değerleri</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Kalori:</span>
                            <span className="font-medium">95 kcal</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Protein:</span>
                            <span className="font-medium">2.1g</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Karbonhidrat:</span>
                            <span className="font-medium">19.8g</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Yağ:</span>
                            <span className="font-medium">0.6g</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Lif:</span>
                            <span className="font-medium">2.4g</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Şeker:</span>
                            <span className="font-medium">16.2g</span>
                          </div>
                        </div>
                        <div className="pt-3 border-t border-gray-200">
                          <p className="text-xs text-gray-500">
                            * 100 gram ürün için besin değerleri
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="specifications">
                    <AccordionTrigger>
                      <div className="flex items-center space-x-2">
                        <Package className="w-4 h-4 text-blue-600" />
                        <span>Ürün Özellikleri</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <div className="grid gap-3 text-sm">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Menşei:</span>
                            <Badge variant="outline">Türkiye</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Sertifika:</span>
                            <Badge variant="outline" className="text-green-600 border-green-200">Organik</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Saklama:</span>
                            <span className="font-medium">2-8°C</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Raf Ömrü:</span>
                            <span className="font-medium">7-10 gün</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Ambalaj:</span>
                            <span className="font-medium">Geri dönüştürülebilir</span>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="benefits">
                    <AccordionTrigger>
                      <div className="flex items-center space-x-2">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span>Sağlık Faydaları</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Antioksidan açısından zengin</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Vitamin C içeriği ile bağışıklık sistemini destekler</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Lif içeriği ile sindirim sağlığına katkı sağlar</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Düşük kalori içeriği ile diyet dostudur</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Doğal şeker içeriği ile enerji verir</span>
                          </li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="storage">
                    <AccordionTrigger>
                      <div className="flex items-center space-x-2">
                        <Info className="w-4 h-4 text-blue-600" />
                        <span>Saklama ve Kullanım Önerileri</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 text-sm text-gray-700">
                        <div>
                          <h4 className="font-medium text-gray-800 mb-2">Saklama:</h4>
                          <ul className="space-y-1 ml-4">
                            <li>• Buzdolabının sebze bölümünde saklayın</li>
                            <li>• Nem oranı yüksek yerde muhafaza edin</li>
                            <li>• Direkt güneş ışığından koruyun</li>
                            <li>• Havalandırmalı torbalarda saklayın</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800 mb-2">Kullanım Önerileri:</h4>
                          <ul className="space-y-1 ml-4">
                            <li>• Tüketimden önce soğuk su ile yıkayın</li>
                            <li>• Çiğ olarak tüketebilir veya pişirebilirsiniz</li>
                            <li>• Salatalarda, smootie'lerde kullanabilirsiniz</li>
                            <li>• Günlük 1-2 porsiyon tüketimi önerilir</li>
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <div>
                <h2 className="text-2xl font-light text-gray-800 mb-6">Müşteri Deneyimi</h2>
                
                {/* Customer Reviews Summary */}
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Müşteri Değerlendirmeleri</span>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="text-lg font-medium ml-2">4.8</span>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">5 yıldız</span>
                        <div className="flex-1 mx-3">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '85%' }}></div>
                          </div>
                        </div>
                        <span className="font-medium">85%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">4 yıldız</span>
                        <div className="flex-1 mx-3">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '10%' }}></div>
                          </div>
                        </div>
                        <span className="font-medium">10%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">3 yıldız</span>
                        <div className="flex-1 mx-3">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '3%' }}></div>
                          </div>
                        </div>
                        <span className="font-medium">3%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">2 yıldız</span>
                        <div className="flex-1 mx-3">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '1%' }}></div>
                          </div>
                        </div>
                        <span className="font-medium">1%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">1 yıldız</span>
                        <div className="flex-1 mx-3">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '1%' }}></div>
                          </div>
                        </div>
                        <span className="font-medium">1%</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-600">
                        <strong>2,547</strong> müşteri bu ürünü değerlendirdi
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Sample Reviews */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-800">Son Yorumlar</h3>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">AK</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-medium text-gray-800">Ayşe K.</span>
                            <div className="flex items-center space-x-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className="w-3 h-3 fill-yellow-400 text-yellow-400"
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-500">2 gün önce</span>
                          </div>
                          <p className="text-sm text-gray-700">
                            Çok taze ve lezzetli! Kalitesi gerçekten çok iyi. Tekrar sipariş vereceğim kesinlikle.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-green-600">MT</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-medium text-gray-800">Mehmet T.</span>
                            <div className="flex items-center space-x-1">
                              {[1, 2, 3, 4].map((star) => (
                                <Star
                                  key={star}
                                  className="w-3 h-3 fill-yellow-400 text-yellow-400"
                                />
                              ))}
                              <Star className="w-3 h-3 text-gray-300" />
                            </div>
                            <span className="text-xs text-gray-500">5 gün önce</span>
                          </div>
                          <p className="text-sm text-gray-700">
                            Organik olması çok güzel. Ambalaj da gayet başarılı. Sadece biraz daha büyük olabilirdi.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-purple-600">FS</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-medium text-gray-800">Fatma S.</span>
                            <div className="flex items-center space-x-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className="w-3 h-3 fill-yellow-400 text-yellow-400"
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-500">1 hafta önce</span>
                          </div>
                          <p className="text-sm text-gray-700">
                            Abonelik sistemi çok praktik. Her hafta düzenli olarak geliyor ve hep taze oluyor.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="text-center mt-6">
                    <Button variant="outline">
                      Tüm Yorumları Gör (2,547)
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Facts */}
            <Card className="bg-gray-50 border-gray-200">
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4 text-center">Neden Bu Ürünü Tercih Etmelisiniz?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Leaf className="w-6 h-6 text-green-600" />
                    </div>
                    <h4 className="font-medium text-gray-800 mb-2">100% Organik</h4>
                    <p className="text-sm text-gray-600">Hiçbir kimyasal madde kullanılmadan üretilmiştir</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Shield className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="font-medium text-gray-800 mb-2">Sertifikalı Kalite</h4>
                    <p className="text-sm text-gray-600">Uluslararası kalite standartlarına uygun üretim</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Truck className="w-6 h-6 text-yellow-600" />
                    </div>
                    <h4 className="font-medium text-gray-800 mb-2">Hızlı Teslimat</h4>
                    <p className="text-sm text-gray-600">24 saat içinde kapınızda, soğuk zincirle korunarak</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
