import { memo } from "react"
import Link from "next/link"
import Logo from "./ui/logo"
import { FOOTER_SECTIONS, FOOTER_POLICY_LINKS } from "@/lib/navigation-config"
import type { FooterSection } from "@/lib/navigation-config"

interface FooterProps {
  className?: string
  showLogo?: boolean
  logoClassName?: string
  copyrightText?: string
}

const Footer = memo(function Footer({ 
  className = "", 
  showLogo = true,
  logoClassName = "h-8 w-auto",
  copyrightText = "© 2025 Skycrops. Tüm hakları saklıdır."
}: FooterProps) {
  const renderFooterSection = (section: FooterSection, index: number) => (
    <div key={section.title} className="space-y-4">
      <h3 className="font-medium text-gray-800 text-sm uppercase tracking-wide">
        {section.title}
      </h3>
      <nav className="space-y-2" aria-label={`${section.title} menüsü`}>
        {section.links.map((link, linkIndex) => {
          const isExternal = link.external || link.href.startsWith('http')
          const isSpecialType = link.type === 'email' || link.type === 'tel'
          
          const linkProps = {
            href: link.href,
            className: "block text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200 focus:text-gray-800 focus:outline-none focus:underline",
            'aria-label': link.ariaLabel,
            ...(isExternal && !isSpecialType && {
              target: "_blank",
              rel: "noopener noreferrer"
            })
          }
          
          const uniqueKey = `${section.title}-${link.href}-${linkIndex}`
          
          if (section.title === "Adres") {
            return (
              <a key={uniqueKey} {...linkProps}>
                <div className="space-y-1">
                  <div>Çorlu 1 OSB</div>
                  <div>Bülent Ecevit Caddesi No:13/1</div>
                  <div>PK: 59860 – Tekirdağ, Türkiye</div>
                </div>
              </a>
            )
          }
          
          return isExternal && !isSpecialType ? (
            <a key={uniqueKey} {...linkProps}>{link.label}</a>
          ) : (
            <Link key={uniqueKey} {...linkProps}>{link.label}</Link>
          )
        })}
      </nav>
    </div>
  )

  return (
    <footer 
      className={`bg-white py-8 px-6 border-t overflow-x-hidden ${className}`} 
      role="contentinfo"
      aria-label="Site alt bilgisi"
    >
      <div className="max-w-6xl mx-auto">
        {/* Main footer content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          {/* Logo section */}
          {showLogo && (
            <div className="md:col-span-1">
              <div className="mb-4">
                <Link 
                  href="/" 
                  aria-label="SkyCrops ana sayfasına git"
                  className="inline-block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded"
                >
                  <Logo className={logoClassName} />
                </Link>
              </div>
            </div>
          )}
          
          {/* Footer sections */}
          {FOOTER_SECTIONS.map((section, index) => renderFooterSection(section, index))}
        </div>

        {/* Bottom section with copyright and policies */}
        <div className="border-t pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <p className="text-sm text-gray-600">
              {copyrightText}
            </p>
            
            {/* Policy links */}
            <nav className="flex flex-wrap justify-center md:justify-end space-x-6" aria-label="Politika menüsü">
              {FOOTER_POLICY_LINKS.map((link, index) => (
                <Link
                  key={`${link.href}-${index}`}
                  href={link.href}
                  className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200 focus:text-gray-800 focus:outline-none focus:underline"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
})

export default Footer
