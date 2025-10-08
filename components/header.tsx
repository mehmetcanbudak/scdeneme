"use client";

import { NAVIGATION_ITEMS } from "@/lib/navigation-config";
import Link from "next/link";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigation } from "./navigation-context";
import ActionIcons from "./ui/action-icons";
import HamburgerMenu from "./ui/hamburger-menu";
import Logo from "./ui/logo";
import MobileActionIcons from "./ui/mobile-action-icons";
import MobileSidebar from "./ui/mobile-sidebar";
import NavigationMenu from "./ui/navigation-menu";

/**
 * Throttle function to limit execution rate
 * @param func - Function to throttle
 * @param limit - Time limit in milliseconds
 */
function throttle<T extends (...args: any[]) => any>(
	func: T,
	limit: number,
): T {
	let inThrottle: boolean;
	return function (this: any, ...args: any[]) {
		if (!inThrottle) {
			func.apply(this, args);
			inThrottle = true;
			setTimeout(() => {
				inThrottle = false;
			}, limit);
		}
	} as T;
}

interface HeaderProps {
	className?: string;
}

/**
 * Header component with responsive navigation
 * Features:
 * - Transparent background when at top of page
 * - Responsive mobile menu with hamburger
 * - Desktop navigation with action icons
 * - Scroll-based transparency toggle
 * - Accessibility features (ARIA labels, keyboard navigation)
 */
const Header = memo(function Header({ className = "" }: HeaderProps) {
	const [isScrolled, setIsScrolled] = useState(false);
	const navigationContextValue = useNavigation();
	const throttledScrollRef = useRef<(() => void) | null>(null);

	if (!navigationContextValue) {
		throw new Error("Header must be used within a NavigationProvider");
	}

	const { isTransparent, isMobileSidebarOpen, setIsMobileSidebarOpen } =
		navigationContextValue;

	// Handle scroll events with throttling for performance
	const handleScroll = useCallback(() => {
		const scrollY = window.scrollY;
		setIsScrolled(scrollY > 50);
	}, []);

	// Set up scroll listener with throttling
	useEffect(() => {
		if (!throttledScrollRef.current) {
			throttledScrollRef.current = throttle(handleScroll, 16); // ~60fps
		}

		const throttledHandler = throttledScrollRef.current;
		window.addEventListener("scroll", throttledHandler, { passive: true });

		return () => {
			window.removeEventListener("scroll", throttledHandler);
		};
	}, [handleScroll]);

	// Determine if header should be transparent
	const shouldBeTransparent = useMemo(
		() => isTransparent && !isScrolled,
		[isTransparent, isScrolled],
	);

	// Mobile menu handlers
	const toggleMobileMenu = useCallback(() => {
		setIsMobileSidebarOpen(!isMobileSidebarOpen);
	}, [setIsMobileSidebarOpen, isMobileSidebarOpen]);

	const closeMobileMenu = useCallback(() => {
		setIsMobileSidebarOpen(false);
	}, [setIsMobileSidebarOpen]);

	return (
		<header
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 overflow-x-hidden ${
				shouldBeTransparent ? "bg-transparent" : "bg-[#B2A79D] shadow-sm"
			} ${className}`}
			aria-label="Ana navigasyon"
		>
			<nav
				className="flex items-center justify-between px-4 sm:px-6 py-4 relative"
				aria-label="Ana menü"
			>
				{/* Mobile hamburger menu */}
				<div className="md:hidden">
					<HamburgerMenu
						onClick={toggleMobileMenu}
						shouldBeTransparent={shouldBeTransparent}
						aria-expanded={isMobileSidebarOpen}
						aria-controls="mobile-sidebar"
						aria-label={isMobileSidebarOpen ? "Menüyü kapat" : "Menüyü aç"}
					/>
				</div>

				{/* Desktop Logo (left side) */}
				<div className="hidden md:flex items-center gap-2 sm:gap-4">
					<Link
						href="/"
						className="transition-opacity hover:opacity-80 focus:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:ring-white/60 rounded"
						aria-label="SkyCrops ana sayfasına git"
					>
						<Logo shouldBeTransparent={shouldBeTransparent} />
					</Link>
				</div>

				{/* Mobile Logo (centered) */}
				<div className="md:hidden absolute left-1/2 transform -translate-x-1/2">
					<Link
						href="/"
						className="transition-opacity hover:opacity-80 focus:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:ring-white/60 rounded"
						aria-label="SkyCrops ana sayfasına git"
					>
						<Logo shouldBeTransparent={shouldBeTransparent} />
					</Link>
				</div>

				{/* Desktop Navigation Menu - Centered */}
				<div className="hidden md:flex items-center absolute left-1/2 transform -translate-x-1/2">
					<NavigationMenu
						items={NAVIGATION_ITEMS}
						shouldBeTransparent={shouldBeTransparent}
					/>
				</div>

				{/* Action icons - Desktop and Mobile */}
				<div className="flex items-center space-x-2 sm:space-x-4">
					{/* Desktop action icons */}
					<div className="hidden md:block">
						<ActionIcons shouldBeTransparent={shouldBeTransparent} />
					</div>

					{/* Mobile action icons */}
					<div className="md:hidden">
						<MobileActionIcons shouldBeTransparent={shouldBeTransparent} />
					</div>
				</div>
			</nav>

			{/* Mobile sidebar */}
			<MobileSidebar
				isOpen={isMobileSidebarOpen}
				onClose={closeMobileMenu}
				items={NAVIGATION_ITEMS}
				shouldBeTransparent={shouldBeTransparent}
			/>
		</header>
	);
});

export default Header;
