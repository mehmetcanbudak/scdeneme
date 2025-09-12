
import { memo, useState, useEffect } from "react"
import { Search, User, ShoppingBag } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"
import AuthModal from "@/components/auth/auth-modal"

interface ActionIconsProps {
  shouldBeTransparent: boolean
  className?: string
}

const ActionIcons = memo(function ActionIcons({ 
  shouldBeTransparent, 
  className = "" 
}: ActionIconsProps) {
  const { isAuthenticated, user } = useAuth()
  const { totalItems, items, formatCartItemDescription } = useCart()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [cartAnimation, setCartAnimation] = useState(false)
  const [prevTotalItems, setPrevTotalItems] = useState(totalItems)

  // Animate cart when items are added
  useEffect(() => {
    if (totalItems > prevTotalItems) {
      setCartAnimation(true)
      setTimeout(() => setCartAnimation(false), 600)
    }
    setPrevTotalItems(totalItems)
  }, [totalItems, prevTotalItems])

  const iconClass = `w-5 h-5 transition-colors cursor-pointer hover:opacity-70 ${
    shouldBeTransparent ? "text-white" : "text-gray-600"
  }`

  const handleUserClick = () => {
    setIsAuthModalOpen(true)
  }

  const handleCartClick = () => {
    // Navigate to cart page
    window.location.href = '/sepet'
  }

  return (
    <>
      <div className={`flex items-center space-x-4 ${className}`}>
        <div className="text-sm uppercase tracking-wide">
          <span
            className={`transition-colors ${
              shouldBeTransparent ? "text-white" : "text-gray-600"
            }`}
          >
            🇹🇷
          </span>
        </div>
        {/* <Search className={iconClass} aria-label="Ara" /> */}
        <div className="relative">
          <User 
            className={iconClass} 
            aria-label={isAuthenticated ? "Hesabım" : "Giriş Yap"}
            onClick={handleUserClick}
          />
          {isAuthenticated && (
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></div>
          )}
        </div>
        <div className="relative">
          <ShoppingBag 
            className={`${iconClass} ${cartAnimation ? 'animate-bounce' : ''}`} 
            aria-label="Sepet"
            onClick={() => {
              if (!isAuthenticated) {
                setIsAuthModalOpen(true)
              } else {
                handleCartClick()
              }
            }}
          />
          {totalItems > 0 && (
            <div className={`absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center transition-all duration-300 ${
              cartAnimation ? 'animate-pulse scale-125' : 'scale-100'
            }`}>
              {totalItems > 99 ? '99+' : totalItems}
            </div>
          )}
        </div>
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  )
})

export default ActionIcons
