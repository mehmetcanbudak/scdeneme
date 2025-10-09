/**
 * NavbarDesktop Component
 * Desktop navigation layout with 3-column grid structure
 * Grid structure: [Logo | Links | Actions]
 */

import { memo } from "react";
import NavbarActions from "./navbar-actions";
import NavbarLinks from "./navbar-links";
import NavbarLogo from "./navbar-logo";
import type { NavbarBaseProps, NavigationItem } from "./navbar.types";

interface NavbarDesktopProps extends NavbarBaseProps {
	items: NavigationItem[];
}

const NavbarDesktop = memo(function NavbarDesktop({
	items,
	shouldBeTransparent,
	headerBgColor,
	className = "",
}: NavbarDesktopProps) {
	return (
		<nav
			className={`hidden nav:grid grid-cols-[auto_1fr_auto] items-center gap-8 px-6 py-2 ${className}`}
			aria-label="Desktop navigation"
		>
			{/* Left: Logo */}
			<NavbarLogo shouldBeTransparent={shouldBeTransparent} />

			{/* Center: Navigation Links */}
			<div className="flex items-center justify-center">
				<NavbarLinks
					items={items}
					shouldBeTransparent={shouldBeTransparent}
					headerBgColor={headerBgColor}
				/>
			</div>

			{/* Right: Actions (Language/User/Cart) */}
			<NavbarActions shouldBeTransparent={shouldBeTransparent} />
		</nav>
	);
});

export default NavbarDesktop;
