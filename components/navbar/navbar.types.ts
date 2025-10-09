/**
 * Navbar TypeScript Types and Interfaces
 * Central type definitions for all navbar-related components
 */

export interface NavbarProps {
	className?: string;
}

export interface NavigationItem {
	href: string;
	label: string;
	ariaLabel?: string;
}

export interface NavbarBaseProps {
	shouldBeTransparent: boolean;
	headerBgColor: string;
	className?: string;
}

export interface NavbarLogoProps {
	shouldBeTransparent: boolean;
	className?: string;
}

export interface NavbarLinksProps {
	items: NavigationItem[];
	shouldBeTransparent: boolean;
	headerBgColor: string;
	className?: string;
}

export interface NavbarActionsProps {
	shouldBeTransparent: boolean;
	className?: string;
}

export interface LanguageSelectorProps {
	shouldBeTransparent: boolean;
	className?: string;
}

export interface NavbarMobileProps {
	isOpen: boolean;
	onToggle: () => void;
	onClose: () => void;
	shouldBeTransparent: boolean;
	items: NavigationItem[];
}

export interface UseNavbarScrollReturn {
	isScrolled: boolean;
	shouldBeTransparent: boolean;
}

export interface Language {
	code: string;
	name: string;
	flag: string;
}
