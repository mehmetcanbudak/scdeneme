/**
 * NavbarLogo Component
 * Displays the SkyCrops logo with responsive styling
 * Left section of the 3-part navbar layout
 */

import Logo from "@/components/ui/logo";
import Link from "next/link";
import { memo } from "react";
import type { NavbarLogoProps } from "./navbar.types";

const NavbarLogo = memo(function NavbarLogo({
	shouldBeTransparent,
	className = "",
}: NavbarLogoProps) {
	return (
		<div className={`flex items-center ${className}`}>
			<Link
				href="/"
				className="transition-opacity hover:opacity-80 focus:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:ring-white/60 rounded"
				aria-label="SkyCrops ana sayfasına git"
			>
				<Logo shouldBeTransparent={shouldBeTransparent} />
			</Link>
		</div>
	);
});

export default NavbarLogo;
