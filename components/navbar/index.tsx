/**
 * Navbar Component (Main Orchestrator)
 * Responsive navigation bar with 3-part layout
 * Desktop: [Logo | Links | Actions]
 * Mobile: [Hamburger | Logo | Cart]
 */

"use client";

import { useNavigation } from "@/components/navigation-context";
import { NAVIGATION_ITEMS } from "@/lib/navigation-config";
import { memo, useCallback } from "react";
import NavbarDesktop from "./navbar-desktop";
import NavbarMobile from "./navbar-mobile";
import type { NavbarProps } from "./navbar.types";
import { useNavbarScroll } from "./use-navbar-scroll";

const Navbar = memo(function Navbar({ className = "" }: NavbarProps) {
	const navigationContext = useNavigation();
	const { shouldBeTransparent } = useNavbarScroll();

	if (!navigationContext) {
		throw new Error("Navbar must be used within a NavigationProvider");
	}

	const { isMobileSidebarOpen, setIsMobileSidebarOpen, headerBgColor } =
		navigationContext;

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
				shouldBeTransparent ? "bg-transparent" : "shadow-sm"
			} ${className}`}
			style={{
				backgroundColor: shouldBeTransparent
					? "transparent"
					: `${headerBgColor}CC`, // CC for ~80% opacity
				borderBottom: shouldBeTransparent
					? "none"
					: `1px solid ${headerBgColor}`,
			}}
			aria-label="Ana navigasyon"
		>
			{/* Desktop Navigation */}
			<NavbarDesktop
				items={NAVIGATION_ITEMS}
				shouldBeTransparent={shouldBeTransparent}
				headerBgColor={headerBgColor}
			/>

			{/* Mobile Navigation */}
			<NavbarMobile
				isOpen={isMobileSidebarOpen}
				onToggle={toggleMobileMenu}
				onClose={closeMobileMenu}
				shouldBeTransparent={shouldBeTransparent}
				items={NAVIGATION_ITEMS}
			/>
		</header>
	);
});

export default Navbar;
