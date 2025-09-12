// Shared types for components across the application

export interface BaseComponentProps {
  className?: string
  id?: string
}

export interface NavigationItem {
  href: string
  label: string
  ariaLabel?: string
  external?: boolean
}

export interface HeroSlide {
  id?: string
  title: string
  subtitle: string
  buttonText?: string
  buttonAction?: () => void
  image?: string
  video?: string
  alt?: string
}

export interface FooterSection {
  title: string
  links: Array<{
    href: string
    label: string
    external?: boolean
    ariaLabel?: string
    type?: 'link' | 'email' | 'tel'
  }>
}

export interface NavigationContextType {
  isTransparent: boolean
  setIsTransparent: (transparent: boolean) => void
  isMobileSidebarOpen: boolean
  setIsMobileSidebarOpen: (open: boolean) => void
}

// Event handler types
export type ClickHandler = (event: React.MouseEvent) => void
export type KeyboardHandler = (event: React.KeyboardEvent) => void
export type ScrollHandler = (event: Event) => void

// Component state types
export interface SlideState {
  currentSlide: number
  progress: number
  isPlaying: boolean
}

export interface NavigationState {
  isScrolled: boolean
  isTransparent: boolean
  isMobileSidebarOpen: boolean
}