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

export default function SubscriptionsPage() {
	return (
		<ProtectedRoute>
			<SubscriptionsContent />
		</ProtectedRoute>
	);
}

function SubscriptionsContent() {
	const router = useRouter();

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-32 pb-20 px-4">
			<div className="max-w-4xl mx-auto">
				<Button
					variant="ghost"
					className="mb-6 gap-2"
					onClick={() => router.push("/")}
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
								<CardTitle className="text-2xl">Aboneliklerim</CardTitle>
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
							<Button onClick={() => router.push("/abonelik")}>
								Abonelik Paketlerini İncele
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
