"use client";

import ProtectedRoute from "@/components/auth/protected-route";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Package } from "lucide-react";
import { useRouter } from "next/navigation";
import { memo, useCallback } from "react";

/**
 * Main orders page component with protected route
 * @returns {JSX.Element} Orders page with authentication protection
 */
export default function OrdersPage() {
	return (
		<ProtectedRoute>
			<OrdersContent />
		</ProtectedRoute>
	);
}

/**
 * Orders content component displaying user's order history
 * @returns {JSX.Element} Orders content UI
 */
const OrdersContent = memo(() => {
	const router = useRouter();

	/**
	 * Navigates back to home page
	 */
	const handleNavigateHome = useCallback(() => {
		router.push("/");
	}, [router]);

	/**
	 * Navigates to products/home page for browsing
	 */
	const handleExploreProducts = useCallback(() => {
		router.push("/");
	}, [router]);

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
			<div className="max-w-4xl mx-auto">
				<Button
					variant="ghost"
					className="mb-6 gap-2"
					onClick={handleNavigateHome}
				>
					<ArrowLeft className="w-4 h-4" />
					Ana Sayfaya Dön
				</Button>

				<Card>
					<CardHeader>
						<div className="flex items-center gap-3">
							<div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
								<Package className="w-6 h-6 text-green-600" />
							</div>
							<div>
								<CardTitle className="text-xl sm:text-2xl">
									Siparişlerim
								</CardTitle>
								<CardDescription>
									Geçmiş siparişlerinizi görüntüleyin
								</CardDescription>
							</div>
						</div>
					</CardHeader>
					<CardContent>
						<div className="text-center py-12">
							<Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
							<h3 className="text-lg font-semibold text-black mb-2">
								Henüz sipariş yok
							</h3>
							<p className="text-black mb-6">
								İlk siparişinizi oluşturmak için ürünlerimize göz atın
							</p>
							<Button onClick={handleExploreProducts}>Ürünleri Keşfet</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
});

OrdersContent.displayName = "OrdersContent";
