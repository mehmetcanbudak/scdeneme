"use client"

import { useEffect, useState } from "react"
import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Minus, Plus, X, ShoppingBag, ArrowLeft, Package, Clock, Truck, CreditCard } from "lucide-react"
import Link from "next/link"
import { useNavigationTransparency } from "@/hooks/use-navigation-transparency"
import { useAuth } from "@/contexts/auth-context"

export default function CartPage() {
  useNavigationTransparency()
  
  const { 
    items, 
    summary, 
    isLoading, 
    error, 
    updateItem, 
    removeItem, 
    formatCartItemDescription, 
    getProductImage,
    loadCart 
  } = useCart()
  
  const { user } = useAuth()
  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set())

  useEffect(() => {
    loadCart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleQuantityUpdate = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return
    
    setUpdatingItems(prev => new Set(prev).add(itemId))
    
    try {
      await updateItem(itemId, newQuantity)
      await loadCart() // Reload to get updated summary
    } catch (error) {
      console.error('Error updating quantity:', error)
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev)
        newSet.delete(itemId)
        return newSet
      })
    }
  }

  const handleRemoveItem = async (itemId: string) => {
    setUpdatingItems(prev => new Set(prev).add(itemId))
    
    try {
      await removeItem(itemId)
      await loadCart() // Reload to get updated summary
    } catch (error) {
      console.error('Error removing item:', error)
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev)
        newSet.delete(itemId)
        return newSet
      })
    }
  }

  const formatPrice = (price: number, currency = 'TRY') => {
    return `${price.toFixed(2)} ${currency}`
  }

  const getIntervalInfo = (item: any) => {
    if (item.purchase_type !== 'subscription') return null
    
    const interval = item.product.subscription_intervals.find(
      (int: any) => int.key === item.subscription_interval
    )
    
    return interval
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="pt-24 pb-8 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-32 mb-8"></div>
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg p-6">
                    <div className="flex space-x-4">
                      <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pt-32 pb-8 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Link href="/abonelik" className="flex items-center text-gray-600 hover:text-gray-800">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Alışverişe Devam Et
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <ShoppingBag className="w-8 h-8 mr-3" />
                Sepetim
              </h1>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {items.length === 0 ? (
            // Empty Cart
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-600 mb-2">Sepetiniz Boş</h2>
              <p className="text-gray-500 mb-6">Henüz sepetinizde ürün bulunmuyor</p>
              <Link href="/abonelik">
                <Button size="lg" className="bg-gray-600 hover:bg-gray-700">
                  Alışverişe Başla
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Sepet Öğeleri ({summary?.item_count || items.length})
                    </h2>
                  </div>
                  
                  <div className="divide-y divide-gray-200">
                    {items.map((item) => {
                      const intervalInfo = getIntervalInfo(item)
                      const isUpdating = updatingItems.has(item.documentId)
                      
                      return (
                        <div key={item.id} className={`p-6 ${isUpdating ? 'opacity-50' : ''}`}>
                          <div className="flex space-x-4">
                            {/* Product Image */}
                            <div className="flex-shrink-0">
                              <img
                                src={getProductImage(item.product)}
                                alt={item.product.name}
                                className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = "/placeholder.svg";
                                }}
                              />
                            </div>
                            
                            {/* Product Details */}
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <h3 className="text-lg font-medium text-gray-900 truncate">
                                    {item.product.name}
                                  </h3>
                                  
                                  {/* Purchase Type Badge */}
                                  <div className="flex items-center space-x-2 mt-2">
                                    {item.purchase_type === 'subscription' ? (
                                      <div className="flex items-center space-x-2">
                                        <div className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                          <Clock className="w-4 h-4 mr-1" />
                                          Abonelik
                                        </div>
                                        {intervalInfo && (
                                          <span className="text-sm text-gray-600">
                                            {intervalInfo.name}
                                          </span>
                                        )}
                                      </div>
                                    ) : (
                                      <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                                        <Package className="w-4 h-4 mr-1" />
                                        Tek Seferlik
                                      </div>
                                    )}
                                  </div>
                                  
                                  {/* Price Information */}
                                  <div className="mt-3">
                                    <div className="flex items-center space-x-2">
                                      <span className="text-lg font-semibold text-gray-900">
                                        {item.formatted_unit_price}
                                      </span>
                                      {item.purchase_type === 'subscription' && intervalInfo && intervalInfo.discount > 0 && (
                                        <span className="text-sm text-gray-500 line-through">
                                          {formatPrice(item.product.price)}
                                        </span>
                                      )}
                                    </div>
                                    {item.purchase_type === 'subscription' && intervalInfo && intervalInfo.discount > 0 && (
                                      <span className="text-sm text-green-600">
                                        %{intervalInfo.discount.toFixed(1)} indirim
                                      </span>
                                    )}
                                  </div>
                                </div>
                                
                                {/* Remove Button */}
                                <button
                                  onClick={() => handleRemoveItem(item.documentId)}
                                  disabled={isUpdating}
                                  className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                  aria-label="Ürünü kaldır"
                                >
                                  <X className="w-5 h-5" />
                                </button>
                              </div>
                              
                              {/* Quantity Controls */}
                              <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center space-x-3">
                                  <span className="text-sm text-gray-600">Adet:</span>
                                  <div className="flex items-center border border-gray-300 rounded-lg">
                                    <button
                                      onClick={() => handleQuantityUpdate(item.documentId, item.quantity - 1)}
                                      disabled={item.quantity <= 1 || isUpdating}
                                      className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                      <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="px-4 py-2 min-w-[3rem] text-center font-medium">
                                      {item.quantity}
                                    </span>
                                    <button
                                      onClick={() => handleQuantityUpdate(item.documentId, item.quantity + 1)}
                                      disabled={isUpdating}
                                      className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                      <Plus className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                                
                                {/* Total Price for this item */}
                                <div className="text-right">
                                  <div className="text-lg font-semibold text-gray-900">
                                    {item.formatted_total_price}
                                  </div>
                                  {item.quantity > 1 && (
                                    <div className="text-sm text-gray-500">
                                      {item.quantity} × {item.formatted_unit_price}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-8">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Sipariş Özeti</h2>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between text-gray-600">
                      <span>Ara Toplam</span>
                      <span>{summary?.formatted_subtotal || formatPrice(summary?.subtotal || 0)}</span>
                    </div>
                    
                    <div className="flex justify-between text-gray-600">
                      <span>Kargo</span>
                      <span className="text-green-600">Ücretsiz</span>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between text-lg font-semibold text-gray-900">
                        <span>Toplam</span>
                        <span>{summary?.formatted_subtotal || formatPrice(summary?.subtotal || 0)}</span>
                      </div>
                    </div>
                    
                    {/* Delivery Info */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center text-gray-800 mb-2">
                        <Truck className="w-4 h-4 mr-2" />
                        <span className="font-medium">Ücretsiz Kargo</span>
                      </div>
                      <p className="text-sm text-gray-700">
                        100 TL ve üzeri siparişlerde kargo bedava!
                      </p>
                    </div>
                    
                    {/* Checkout Button */}
                    <div className="space-y-3 pt-4">
                      {user ? (
                        <Button 
                          size="lg" 
                          className="w-full bg-gray-600 hover:bg-gray-700"
                          onClick={() => {
                            // Navigate to checkout
                            window.location.href = '/odeme'
                          }}
                        >
                          <CreditCard className="w-5 h-5 mr-2" />
                          Ödemeye Geç
                        </Button>
                      ) : (
                        <div className="space-y-2">
                          <Button 
                            size="lg" 
                            className="w-full bg-gray-600 hover:bg-gray-700"
                            onClick={() => {
                              // Show login modal or redirect
                              alert('Ödeme yapmak için giriş yapmanız gerekiyor.')
                            }}
                          >
                            Giriş Yap ve Ödeme Yap
                          </Button>
                          <p className="text-xs text-gray-500 text-center">
                            Ödeme yapmak için hesabınıza giriş yapın
                          </p>
                        </div>
                      )}
                      
                      <Link href="/abonelik">
                        <Button variant="outline" size="lg" className="w-full">
                          Alışverişe Devam Et
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
