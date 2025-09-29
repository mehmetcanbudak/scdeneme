"use client";

import Image from "next/image";
import Link from "next/link";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { NAVIGATION_ITEMS } from "@/lib/navigation-config";
import { useNavigation } from "./navigation-context";
import ActionIcons from "./ui/action-icons";
import HamburgerMenu from "./ui/hamburger-menu";
import Logo from "./ui/logo";
import MobileActionIcons from "./ui/mobile-action-icons";
import MobileSidebar from "./ui/mobile-sidebar";
import NavigationMenu from "./ui/navigation-menu";

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

interface NavigationProps {
	className?: string;
}

const Navigation = memo(function Navigation({
	className = "",
}: NavigationProps) {
	const [isScrolled, setIsScrolled] = useState(false);
	const navigationContextValue = useNavigation();
	const throttledScrollRef = useRef<(() => void) | null>(null);

	if (!navigationContextValue) {
		throw new Error("Navigation must be used within a NavigationProvider");
	}

	const { isTransparent, isMobileSidebarOpen, setIsMobileSidebarOpen } =
		navigationContextValue;

	const handleScroll = useCallback(() => {
		const scrollY = window.scrollY;
		setIsScrolled(scrollY > 50);
	}, []);

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

	const shouldBeTransparent = isTransparent && !isScrolled;

	const toggleMobileMenu = useCallback(() => {
		setIsMobileSidebarOpen(!isMobileSidebarOpen);
	}, [setIsMobileSidebarOpen, isMobileSidebarOpen]);

	const closeMobileMenu = useCallback(() => {
		setIsMobileSidebarOpen(false);
	}, [setIsMobileSidebarOpen]);

	return (
		<header
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 overflow-x-hidden ${
				shouldBeTransparent ? "bg-transparent" : "bg-[#E7EBDE] shadow-sm"
			} ${className}`}
			aria-label="Ana navigasyon"
		>
			<nav
				className="flex items-center justify-between px-6 py-4"
				aria-label="Ana menü"
			>
				{/* Mobile hamburger menu */}
				<HamburgerMenu
					onClick={toggleMobileMenu}
					shouldBeTransparent={shouldBeTransparent}
					aria-expanded={isMobileSidebarOpen}
					aria-controls="mobile-sidebar"
					aria-label={isMobileSidebarOpen ? "Menüyü kapat" : "Menüyü aç"}
				/>

				{/* Logo and desktop navigation */}
				<div className="flex items-center">
					<Link
						href="/"
						className="transition-opacity hover:opacity-80 focus:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:ring-white/60 rounded"
						aria-label="SkyCrops ana sayfasına git"
					>
						<Logo shouldBeTransparent={shouldBeTransparent} />
					</Link>

					{/* Desktop Navigation Menu */}
					<div className="hidden md:flex items-center ml-8">
						<NavigationMenu
							items={NAVIGATION_ITEMS}
							shouldBeTransparent={shouldBeTransparent}
						/>
					</div>
				</div>

				{/* Action icons */}
				<div className="flex items-center space-x-4">
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

			{!shouldBeTransparent && (
				<div className="w-full">
					<Image
						src="/celenk.svg"
						alt="SkyCrops dekoratif ayracı"
						width={1440}
						height={120}
						className="w-full h-auto select-none"
						aria-hidden="true"
						priority
					/>
				</div>
			)}

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

export default Navigation;
