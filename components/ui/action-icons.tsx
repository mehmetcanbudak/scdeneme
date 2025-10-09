import AuthModal from "@/components/auth/auth-modal";
import { useAuth } from "@/contexts/auth-context";
import { useCart } from "@/contexts/cart-context";
import { ShoppingBag, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { memo, useEffect, useState } from "react";

interface ActionIconsProps {
	shouldBeTransparent: boolean;
	className?: string;
}

const ActionIcons = memo(function ActionIcons({
	shouldBeTransparent,
	className = "",
}: ActionIconsProps) {
	const { isAuthenticated, user } = useAuth();
	const { totalItems, items, formatCartItemDescription } = useCart();
	const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
	const [cartAnimation, setCartAnimation] = useState(false);
	const [prevTotalItems, setPrevTotalItems] = useState(totalItems);
	const pathname = usePathname();

	// Animate cart when items are added
	useEffect(() => {
		if (totalItems > prevTotalItems) {
			setCartAnimation(true);
			setTimeout(() => setCartAnimation(false), 600);
		}
		setPrevTotalItems(totalItems);
	}, [totalItems, prevTotalItems]);

	// Determine icon color based on page and transparency
	const isHomePage = pathname === "/";
	const iconColor =
		isHomePage && !shouldBeTransparent ? "text-black" : "text-white";
	const iconClass = `w-5 h-5 transition-colors cursor-pointer hover:opacity-70 ${iconColor}`;

	const handleUserClick = () => {
		setIsAuthModalOpen(true);
	};

	const handleCartClick = () => {
		// Navigate to cart page
		window.location.href = "/sepet";
	};

	return (
		<>
			<div className={`flex items-center space-x-4 ${className}`}>
				<div className="text-sm uppercase tracking-wide">
					<span className={`transition-colors ${iconColor}`}>🇹🇷</span>
				</div>
				{/* <Search className={iconClass} aria-label="Ara" /> */}
				<div className="relative">
					<button
						type="button"
						className="group flex h-6 w-6 items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:ring-white/60"
						onClick={handleUserClick}
						aria-label={isAuthenticated ? "Hesabım" : "Giriş Yap"}
					>
						<User
							className={`transition-colors group-hover:opacity-80 ${iconClass}`}
						/>
					</button>
					{isAuthenticated && (
						<div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></div>
					)}
				</div>
				<div className="relative">
					<button
						type="button"
						className="group flex h-6 w-6 items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:ring-white/60"
						onClick={() => {
							if (!isAuthenticated) {
								setIsAuthModalOpen(true);
							} else {
								handleCartClick();
							}
						}}
						aria-label="Sepet"
					>
						<ShoppingBag
							className={`transition-colors group-hover:opacity-80 ${iconClass} ${cartAnimation ? "animate-bounce" : ""}`}
						/>
					</button>
					{totalItems > 0 && (
						<div
							className={`absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center transition-all duration-300 ${
								cartAnimation ? "animate-pulse scale-125" : "scale-100"
							}`}
						>
							{totalItems > 99 ? "99+" : totalItems}
						</div>
					)}
				</div>
			</div>

			<AuthModal
				isOpen={isAuthModalOpen}
				onClose={() => setIsAuthModalOpen(false)}
			/>
		</>
	);
});

export default ActionIcons;
