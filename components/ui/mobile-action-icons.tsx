import { memo } from "react"
import { ShoppingBag } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

interface MobileActionIconsProps {
  shouldBeTransparent: boolean
  className?: string
}

const MobileActionIcons = memo(function MobileActionIcons({ 
  shouldBeTransparent, 
  className = "" 
}: MobileActionIconsProps) {
  const { totalItems } = useCart()
  
  const iconClass = `w-5 h-5 transition-colors cursor-pointer hover:opacity-70 ${
    shouldBeTransparent ? "text-white" : "text-gray-600"
  }`

  const handleCartClick = () => {
    // Navigate to cart page or open cart sidebar
    window.location.href = '/cart'
  }

  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative">
        <ShoppingBag 
          className={iconClass} 
          aria-label="Sepet"
          onClick={handleCartClick}
        />
        {totalItems > 0 && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {totalItems > 99 ? '99+' : totalItems}
          </div>
        )}
      </div>
    </div>
  )
})

export default MobileActionIcons
