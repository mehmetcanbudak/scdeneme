import { Menu } from "lucide-react";
import { type ButtonHTMLAttributes, memo } from "react";
import { Button } from "./button";

interface HamburgerMenuProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	onClick: () => void;
	shouldBeTransparent: boolean;
}

const HamburgerMenu = memo(function HamburgerMenu({
	onClick,
	shouldBeTransparent,
	className = "",
	...buttonProps
}: HamburgerMenuProps) {
	const iconClass = `w-5 h-5 transition-colors ${
		shouldBeTransparent ? "text-white" : "text-gray-600"
	}`;

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={onClick}
			className={`h-8 w-8 md:hidden ${className}`}
			aria-label="Open menu"
			{...buttonProps}
		>
			<Menu className={iconClass} />
		</Button>
	);
});

export default HamburgerMenu;
