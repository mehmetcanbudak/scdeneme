import { memo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface NavigationMenuItem {
  href: string
  label: string
}

interface NavigationMenuProps {
  items: NavigationMenuItem[]
  shouldBeTransparent: boolean
  className?: string
}

const NavigationMenu = memo(function NavigationMenu({
  items,
  shouldBeTransparent,
  className = ""
}: NavigationMenuProps) {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  const getLinkClasses = (href: string) => {
    const active = isActive(href)
    const baseClasses = "relative px-3 py-2 transition-all duration-300 ease-out"
    const colorClasses = shouldBeTransparent
      ? "text-white/80 hover:text-white"
      : "text-gray-600 hover:text-gray-900"

    return `${baseClasses} ${colorClasses} ${active ? 'font-medium' : ''}`
  }

  return (
    <div className={`hidden md:flex items-center text-sm uppercase tracking-wide font-medium ${className}`}>
      {items.map((item) => {
        const active = isActive(item.href)
        return (
          <Link
            key={item.href}
            href={item.href}
            className={getLinkClasses(item.href)}
          >
            <span className="relative z-10">{item.label}</span>
            {/* Hover underline effect */}
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-current transform scale-x-0 transition-transform duration-300 ease-out hover:scale-x-100" />
            {/* Active underline */}
            {active && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-current transform scale-x-100 transition-transform duration-300 ease-out" />
            )}
          </Link>
        )
      })}
    </div>
  )
})

export default NavigationMenu
