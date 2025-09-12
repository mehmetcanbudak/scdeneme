"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { apiClient } from '@/lib/api-client'

interface SubscriptionPlan {
  id: number
  name: string
  description?: string
  price: number
  currency: string
  billingCycle: 'monthly' | 'weekly' | 'daily'
  features: string[]
  isActive: boolean
  createdAt: string
  updatedAt: string
}

interface Subscription {
  id: number
  user: number
  plan: SubscriptionPlan
  status: 'active' | 'cancelled' | 'paused' | 'failed'
  startDate: string
  endDate?: string
  nextBillingDate?: string
  paymentMethod: string
  billingAddress: {
    first_name: string
    last_name: string
    email: string
    phone: string
    address_line_1: string
    city: string
    state: string
    postal_code: string
    country: string
  }
  shippingAddress: {
    first_name: string
    last_name: string
    email: string
    phone: string
    address_line_1: string
    city: string
    state: string
    postal_code: string
    country: string
  }
  createdAt: string
  updatedAt: string
}

interface SubscriptionContextType {
  plans: SubscriptionPlan[]
  subscriptions: Subscription[]
  activeSubscription: Subscription | null
  isLoading: boolean
  error: string | null
  loadPlans: () => Promise<void>
  loadSubscriptions: () => Promise<void>
  createSubscription: (data: {
    planId: number
    paymentCard: {
      cardHolderName: string
      cardNumber: string
      expireMonth: string
      expireYear: string
      cvc: string
    }
    billingAddress: {
      first_name: string
      last_name: string
      email: string
      phone: string
      address_line_1: string
      city: string
      state: string
      postal_code: string
      country: string
    }
    shippingAddress: {
      first_name: string
      last_name: string
      email: string
      phone: string
      address_line_1: string
      city: string
      state: string
      postal_code: string
      country: string
    }
  }) => Promise<{ success: boolean; message?: string; subscription?: Subscription }>
  cancelSubscription: (id: number, reason?: string) => Promise<{ success: boolean; message?: string }>
  retryPayment: (id: number) => Promise<{ success: boolean; message?: string }>
  clearError: () => void
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined)

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([])
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [activeSubscription, setActiveSubscription] = useState<Subscription | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const clearError = () => setError(null)

  const loadPlans = async (): Promise<void> => {
    try {
      setIsLoading(true)
      setError(null)

      // First try without filters since the API seems to have issues with filter syntax
      const response = await apiClient.getSubscriptionPlans({
        populate: '*',
        // filters: { isActive: true }, // Commented out due to API filter issues
      })

      if (response.error) {
        throw new Error(response.error.message)
      }

      // Filter active plans on the client side instead
      const allPlans = response.data || []
      const activePlans = allPlans.filter((plan: SubscriptionPlan) => plan.isActive === true)

      setPlans(activePlans)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Abonelik planları yüklenemedi'
      setError(errorMessage)
      console.error('Subscription plans load error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const loadSubscriptions = async (): Promise<void> => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await apiClient.getMySubscriptions()
      
      if (response.error) {
        throw new Error(response.error.message)
      }
      
      const userSubscriptions = response.data || []
      setSubscriptions(userSubscriptions)
      
      // Find active subscription
      const active = userSubscriptions.find((sub: Subscription) => sub.status === 'active')
      setActiveSubscription(active || null)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Abonelikler yüklenemedi'
      setError(errorMessage)
      console.error('Subscriptions load error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const createSubscription = async (data: {
    planId: number
    paymentCard: {
      cardHolderName: string
      cardNumber: string
      expireMonth: string
      expireYear: string
      cvc: string
    }
    billingAddress: {
      first_name: string
      last_name: string
      email: string
      phone: string
      address_line_1: string
      city: string
      state: string
      postal_code: string
      country: string
    }
    shippingAddress: {
      first_name: string
      last_name: string
      email: string
      phone: string
      address_line_1: string
      city: string
      state: string
      postal_code: string
      country: string
    }
  }): Promise<{ success: boolean; message?: string; subscription?: Subscription }> => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await apiClient.createSubscription(data)
      
      if (response.error) {
        throw new Error(response.error.message)
      }
      
      // Reload subscriptions to get updated data
      await loadSubscriptions()
      
      return { 
        success: true, 
        message: 'Abonelik başarıyla oluşturuldu',
        subscription: response.data
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Abonelik oluşturulamadı'
      setError(errorMessage)
      return { success: false, message: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }

  const cancelSubscription = async (
    id: number, 
    reason?: string
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await apiClient.cancelSubscription(id, reason)
      
      if (response.error) {
        throw new Error(response.error.message)
      }
      
      // Reload subscriptions to get updated data
      await loadSubscriptions()
      
      return { success: true, message: 'Abonelik iptal edildi' }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Abonelik iptal edilemedi'
      setError(errorMessage)
      return { success: false, message: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }

  const retryPayment = async (id: number): Promise<{ success: boolean; message?: string }> => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await apiClient.retrySubscriptionPayment(id)
      
      if (response.error) {
        throw new Error(response.error.message)
      }
      
      // Reload subscriptions to get updated data
      await loadSubscriptions()
      
      return { success: true, message: 'Ödeme tekrar denendi' }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ödeme tekrar denenemedi'
      setError(errorMessage)
      return { success: false, message: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }

  // Load plans on mount
  useEffect(() => {
    loadPlans()
  }, [])

  const value: SubscriptionContextType = {
    plans,
    subscriptions,
    activeSubscription,
    isLoading,
    error,
    loadPlans,
    loadSubscriptions,
    createSubscription,
    cancelSubscription,
    retryPayment,
    clearError,
  }

  return <SubscriptionContext.Provider value={value}>{children}</SubscriptionContext.Provider>
}

export function useSubscriptions() {
  const context = useContext(SubscriptionContext)
  if (context === undefined) {
    throw new Error('useSubscriptions must be used within a SubscriptionProvider')
  }
  return context
}
