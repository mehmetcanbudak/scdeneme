import { memo } from "react"
import { Menu } from "lucide-react"
import { Button } from "./button"

interface HamburgerMenuProps {
  onClick: () => void
  shouldBeTransparent: boolean
  className?: string
}

const HamburgerMenu = memo(function HamburgerMenu({
  onClick,
  shouldBeTransparent,
  className = ""
}: HamburgerMenuProps) {
  const iconClass = `w-5 h-5 transition-colors ${
    shouldBeTransparent ? "text-white" : "text-gray-600"
  }`

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className={`h-8 w-8 md:hidden ${className}`}
      aria-label="Open menu"
    >
      <Menu className={iconClass} />
    </Button>
  )
})

export default HamburgerMenu
