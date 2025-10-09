/**
 * NavbarLinks Component
 * Navigation links displayed in the center of the navbar
 * Center section of the 3-part navbar layout
 */

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo } from "react";
import type { NavbarLinksProps } from "./navbar.types";

const NavbarLinks = memo(function NavbarLinks({
	items,
	shouldBeTransparent,
	headerBgColor,
	className = "",
}: NavbarLinksProps) {
	const pathname = usePathname();

	const isActive = (href: string) => {
		if (href === "/") {
			return pathname === "/";
		}
		return pathname.startsWith(href);
	};

	return (
		<nav
			className={`flex items-center justify-center gap-6 ${className}`}
			aria-label="Ana menü"
		>
			{items.map((item) => {
				const active = isActive(item.href);
				return (
					<Button
						key={item.href}
						variant={
							active
								? shouldBeTransparent
									? "inverseOutline"
									: "primaryActive"
								: shouldBeTransparent
									? "inverseOutline"
									: "primary"
						}
						offset
						className={`px-8 py-3 text-xs tracking-[0.2em] transition-all ${
							active && !shouldBeTransparent
								? "translate-x-[5px] -translate-y-[5px] shadow-[-5px_5px_0_0_#010101]"
								: ""
						}`}
						style={
							active && !shouldBeTransparent
								? { backgroundColor: headerBgColor }
								: undefined
						}
						asChild
					>
						<Link
							href={item.href}
							aria-current={active ? "page" : undefined}
							aria-label={item.ariaLabel || item.label}
						>
							{item.label}
						</Link>
					</Button>
				);
			})}
		</nav>
	);
});

export default NavbarLinks;
