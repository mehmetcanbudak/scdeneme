"use client";

import ShoppingCart from "@/components/cart/shopping-cart";
import { useHeaderColor } from "@/hooks/use-header-color";
import { useNavigationTransparency } from "@/hooks/use-navigation-transparency";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

/**
 * Main cart page component
 * Displays cart items, summary, and checkout functionality using ShoppingCart component
 * @returns {JSX.Element} Cart page UI
 */
export default function CartPage() {
	useNavigationTransparency();
	// Set header color for cart page
	useHeaderColor("#B2A79D");

	return (
		<div className="min-h-screen bg-gray-50">
			<main className="pt-24 sm:pt-28 md:pt-32 pb-8 px-4 sm:px-6">
				{/* Header */}
				<div className="flex items-center space-x-4 mb-8 max-w-4xl mx-auto">
					<Link
						href="/abonelik"
						className="flex items-center text-black hover:text-black"
					>
						<ArrowLeft className="w-5 h-5 mr-2" />
						<span className="hidden sm:inline">Alışverişe Devam Et</span>
						<span className="sm:hidden">Geri</span>
					</Link>
				</div>

				{/* Shopping Cart Component */}
				<ShoppingCart compact={false} />
			</main>
		</div>
	);
}
