"use client";

import ProtectedRoute from "@/components/auth/protected-route";
import ProfileSettings from "@/components/profile/profile-settings";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfileSettingsPage() {
	const router = useRouter();

	const handleBack = () => {
		router.push("/profile");
	};

	return (
		<ProtectedRoute>
			<div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
				<div className="max-w-4xl mx-auto">
					<Button variant="ghost" className="mb-6 gap-2" onClick={handleBack}>
						<ArrowLeft className="w-4 h-4" />
						Profile Geri Dön
					</Button>

					<div className="mb-8">
						<h1 className="text-3xl font-bold mb-2">Profil Ayarları</h1>
						<p className="text-gray-600">
							Kişisel bilgilerinizi güncelleyin ve email adresinizi doğrulayın
						</p>
					</div>

					<ProfileSettings
						onSuccess={() => {
							// Optionally show a success message or redirect
							console.log("Profile updated successfully");
						}}
					/>
				</div>
			</div>
		</ProtectedRoute>
	);
}
