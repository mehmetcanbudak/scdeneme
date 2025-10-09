import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo } from "react";

import { Button } from "@/components/ui/button";

interface NavigationMenuItem {
	href: string;
	label: string;
}

interface NavigationMenuProps {
	items: NavigationMenuItem[];
	shouldBeTransparent: boolean;
	headerBgColor?: string;
	className?: string;
}

const NavigationMenu = memo(function NavigationMenu({
	items,
	shouldBeTransparent,
	headerBgColor = "#B2A79D",
	className = "",
}: NavigationMenuProps) {
	const pathname = usePathname();

	const isActive = (href: string) => {
		if (href === "/") {
			return pathname === "/";
		}
		return pathname.startsWith(href);
	};

	return (
		<div
			className={`flex items-center gap-6 text-sm uppercase tracking-wide font-medium ${className}`}
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
						className={`px-8 py-3 text-xs tracking-[0.2em] ${
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
						<Link href={item.href} aria-current={active ? "page" : undefined}>
							{item.label}
						</Link>
					</Button>
				);
			})}
		</div>
	);
});

export default NavigationMenu;
