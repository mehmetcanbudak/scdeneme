"use client"

import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { Loader2 } from 'lucide-react'

interface ProtectedRouteProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  redirectTo?: string
}

export default function ProtectedRoute({ 
  children, 
  fallback,
  redirectTo = '/'
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        setShouldRender(true)
      } else {
        // Redirect to home page or show login modal
        if (redirectTo) {
          window.location.href = redirectTo
        }
      }
    }
  }, [isAuthenticated, isLoading, redirectTo])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-green-600" />
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Giriş Gerekli</h2>
          <p className="text-gray-600 mb-4">Bu sayfaya erişmek için giriş yapmanız gerekiyor.</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Ana Sayfaya Dön
          </button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
