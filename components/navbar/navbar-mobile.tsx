/**
 * NavbarMobile Component
 * Mobile navigation layout with hamburger menu and centered logo
 * Grid structure: [Hamburger | Logo | Cart]
 */

import HamburgerMenu from "@/components/ui/hamburger-menu";
import MobileActionIcons from "@/components/ui/mobile-action-icons";
import MobileSidebar from "@/components/ui/mobile-sidebar";
import { memo } from "react";
import NavbarLogo from "./navbar-logo";
import type { NavbarMobileProps } from "./navbar.types";

const NavbarMobile = memo(function NavbarMobile({
	isOpen,
	onToggle,
	onClose,
	shouldBeTransparent,
	items,
}: NavbarMobileProps) {
	return (
		<>
			<nav
				className="nav:hidden grid grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-2"
				aria-label="Mobile navigation"
			>
				{/* Left: Hamburger Menu */}
				<HamburgerMenu
					onClick={onToggle}
					shouldBeTransparent={shouldBeTransparent}
					aria-expanded={isOpen}
					aria-controls="mobile-sidebar"
					aria-label={isOpen ? "Menüyü kapat" : "Menüyü aç"}
				/>

				{/* Center: Logo */}
				<div className="flex items-center justify-center">
					<NavbarLogo shouldBeTransparent={shouldBeTransparent} />
				</div>

				{/* Right: Cart Icon */}
				<MobileActionIcons shouldBeTransparent={shouldBeTransparent} />
			</nav>

			{/* Mobile Sidebar */}
			<MobileSidebar
				isOpen={isOpen}
				onClose={onClose}
				items={items}
				shouldBeTransparent={shouldBeTransparent}
			/>
		</>
	);
});

export default NavbarMobile;
