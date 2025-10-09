import { useCart } from "@/contexts/cart-context";
import { ShoppingBag } from "lucide-react";
import { usePathname } from "next/navigation";
import { memo } from "react";

interface MobileActionIconsProps {
	shouldBeTransparent: boolean;
	className?: string;
}

const MobileActionIcons = memo(function MobileActionIcons({
	shouldBeTransparent,
	className = "",
}: MobileActionIconsProps) {
	const { totalItems } = useCart();
	const pathname = usePathname();

	// Determine icon color based on page and transparency
	const isHomePage = pathname === "/";
	const iconColor =
		isHomePage && !shouldBeTransparent ? "text-gray-800" : "text-white";
	const iconClass = `w-5 h-5 transition-colors cursor-pointer hover:opacity-70 ${iconColor}`;

	const handleCartClick = () => {
		// Navigate to cart page or open cart sidebar
		window.location.href = "/cart";
	};

	return (
		<div className={`flex items-center ${className}`}>
			<div className="relative">
				<button
					type="button"
					className="group flex h-6 w-6 items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:ring-white/60"
					onClick={handleCartClick}
					aria-label="Sepet"
				>
					<ShoppingBag
						className={`transition-colors group-hover:opacity-80 ${iconClass}`}
					/>
				</button>
				{totalItems > 0 && (
					<div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
						{totalItems > 99 ? "99+" : totalItems}
					</div>
				)}
			</div>
		</div>
	);
});

export default MobileActionIcons;
