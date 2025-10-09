/**
 * NavbarActions Component
 * Right section of the navbar containing language selector, user icon, and cart
 * Right section of the 3-part navbar layout
 */

import AuthModal from "@/components/auth/auth-modal";
import { useAuth } from "@/contexts/auth-context";
import { useCart } from "@/contexts/cart-context";
import { ShoppingBag, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { memo, useCallback, useEffect, useState } from "react";
import LanguageSelector from "./language-selector";
import type { NavbarActionsProps } from "./navbar.types";

const NavbarActions = memo(function NavbarActions({
	shouldBeTransparent,
	className = "",
}: NavbarActionsProps) {
	const { isAuthenticated } = useAuth();
	const { totalItems } = useCart();
	const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
	const [cartAnimation, setCartAnimation] = useState(false);
	const [prevTotalItems, setPrevTotalItems] = useState(totalItems);
	const pathname = usePathname();

	// Animate cart when items are added
	useEffect(() => {
		if (totalItems > prevTotalItems) {
			setCartAnimation(true);
			const timer = setTimeout(() => setCartAnimation(false), 600);
			return () => clearTimeout(timer);
		}
		setPrevTotalItems(totalItems);
	}, [totalItems, prevTotalItems]);

	// Determine icon color based on page and transparency
	const isHomePage = pathname === "/";
	const iconColor =
		isHomePage && !shouldBeTransparent ? "text-black" : "text-white";
	const iconClass = `w-5 h-5 transition-colors cursor-pointer hover:opacity-70 ${iconColor}`;

	const handleUserClick = useCallback(() => {
		setIsAuthModalOpen(true);
	}, []);

	const handleCartClick = useCallback(() => {
		if (!isAuthenticated) {
			setIsAuthModalOpen(true);
		} else {
			window.location.href = "/sepet";
		}
	}, [isAuthenticated]);

	const handleAuthModalClose = useCallback(() => {
		setIsAuthModalOpen(false);
	}, []);

	return (
		<>
			<div
				className={`flex items-center justify-end gap-4 ${className}`}
				role="group"
				aria-label="Kullanıcı işlemleri"
			>
				{/* Language Selector */}
				<LanguageSelector shouldBeTransparent={shouldBeTransparent} />

				{/* User Icon */}
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
						<div
							className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"
							aria-label="Oturum açık"
						/>
					)}
				</div>

				{/* Cart Icon */}
				<div className="relative">
					<button
						type="button"
						className="group flex h-6 w-6 items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:ring-white/60"
						onClick={handleCartClick}
						aria-label={`Sepet${totalItems > 0 ? ` - ${totalItems} ürün` : ""}`}
					>
						<ShoppingBag
							className={`transition-colors group-hover:opacity-80 ${iconClass} ${
								cartAnimation ? "animate-bounce" : ""
							}`}
						/>
					</button>
					{totalItems > 0 && (
						<div
							className={`absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center transition-all duration-300 ${
								cartAnimation ? "animate-pulse scale-125" : "scale-100"
							}`}
							aria-live="polite"
							aria-atomic="true"
						>
							{totalItems > 99 ? "99+" : totalItems}
						</div>
					)}
				</div>
			</div>

			{/* Auth Modal */}
			<AuthModal isOpen={isAuthModalOpen} onClose={handleAuthModalClose} />
		</>
	);
});

export default NavbarActions;
