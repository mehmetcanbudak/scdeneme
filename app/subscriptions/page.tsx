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
import { ArrowLeft, CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";
import { memo, useCallback } from "react";

/**
 * Main subscriptions page component with protected route
 * @returns {JSX.Element} Subscriptions page with authentication protection
 */
export default function SubscriptionsPage() {
	return (
		<ProtectedRoute>
			<SubscriptionsContent />
		</ProtectedRoute>
	);
}

/**
 * Subscriptions content component displaying user's active subscriptions
 * @returns {JSX.Element} Subscriptions content UI
 */
const SubscriptionsContent = memo(() => {
	const router = useRouter();

	/**
	 * Navigates back to home page
	 */
	const handleNavigateHome = useCallback(() => {
		router.push("/");
	}, [router]);

	/**
	 * Navigates to subscription packages page
	 */
	const handleExploreSubscriptions = useCallback(() => {
		router.push("/abonelik");
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
							<div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
								<CreditCard className="w-6 h-6 text-purple-600" />
							</div>
							<div>
								<CardTitle className="text-xl sm:text-2xl">
									Aboneliklerim
								</CardTitle>
								<CardDescription>
									Aktif aboneliklerinizi yönetin
								</CardDescription>
							</div>
						</div>
					</CardHeader>
					<CardContent>
						<div className="text-center py-12">
							<CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
							<h3 className="text-lg font-semibold text-gray-700 mb-2">
								Henüz abonelik yok
							</h3>
							<p className="text-gray-600 mb-6">
								Düzenli teslimat için abonelik paketlerimize göz atın
							</p>
							<Button onClick={handleExploreSubscriptions}>
								Abonelik Paketlerini İncele
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
});

SubscriptionsContent.displayName = "SubscriptionsContent";
