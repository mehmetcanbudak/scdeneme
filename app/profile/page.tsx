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
import { useAuth } from "@/contexts/auth-context";
import { ArrowLeft, Mail, Phone, User as UserIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
	return (
		<ProtectedRoute>
			<ProfileContent />
		</ProtectedRoute>
	);
}

function ProfileContent() {
	const { user, logout } = useAuth();
	const router = useRouter();

	const handleLogout = () => {
		logout();
		router.push("/");
	};

	const handleBack = () => {
		router.push("/");
	};

	if (!user) {
		return null;
	}

	// Determine if user logged in with Google
	const isGoogleUser = !!user.picture;

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-32 pb-20 px-4">
			<div className="max-w-2xl mx-auto">
				<Button variant="ghost" className="mb-6 gap-2" onClick={handleBack}>
					<ArrowLeft className="w-4 h-4" />
					Ana Sayfaya Dön
				</Button>

				<Card className="shadow-lg">
					<CardHeader className="text-center pb-8">
						{user.picture ? (
							<div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-green-500/20">
								<Image
									src={user.picture}
									alt={user.name || user.firstName || "User"}
									width={96}
									height={96}
									className="w-full h-full object-cover"
								/>
							</div>
						) : (
							<div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
								<UserIcon className="w-12 h-12 text-green-600" />
							</div>
						)}
						<CardTitle className="text-2xl mb-2">
							{user.name || user.firstName || "Kullanıcı"}
						</CardTitle>
						<CardDescription>
							{isGoogleUser
								? "Google ile giriş yapıldı"
								: "Telefon ile giriş yapıldı"}
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="space-y-4">
							<h3 className="font-semibold text-lg text-gray-700 border-b pb-2">
								Hesap Bilgileri
							</h3>

							{/* Email */}
							{user.email && (
								<div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
									<div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
										<Mail className="w-5 h-5 text-green-600" />
									</div>
									<div className="flex-1">
										<p className="text-sm text-gray-600 mb-1">E-posta</p>
										<p className="font-medium text-gray-900">{user.email}</p>
									</div>
								</div>
							)}

							{/* Phone */}
							{user.phone && (
								<div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
									<div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
										<Phone className="w-5 h-5 text-blue-600" />
									</div>
									<div className="flex-1">
										<p className="text-sm text-gray-600 mb-1">Telefon</p>
										<p className="font-medium text-gray-900">{user.phone}</p>
									</div>
								</div>
							)}

							{/* Username */}
							{user.username && (
								<div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
									<div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
										<UserIcon className="w-5 h-5 text-purple-600" />
									</div>
									<div className="flex-1">
										<p className="text-sm text-gray-600 mb-1">Kullanıcı Adı</p>
										<p className="font-medium text-gray-900">{user.username}</p>
									</div>
								</div>
							)}
						</div>

						{/* Account Status */}
						<div className="space-y-4">
							<h3 className="font-semibold text-lg text-gray-700 border-b pb-2">
								Hesap Durumu
							</h3>
							<div className="grid grid-cols-2 gap-4">
								<div className="p-4 bg-gray-50 rounded-lg text-center">
									<p className="text-sm text-gray-600 mb-1">
										Telefon Doğrulama
									</p>
									<p
										className={`font-semibold ${user.phoneVerified ? "text-green-600" : "text-orange-600"}`}
									>
										{user.phoneVerified ? "Doğrulandı" : "Bekliyor"}
									</p>
								</div>
								<div className="p-4 bg-gray-50 rounded-lg text-center">
									<p className="text-sm text-gray-600 mb-1">Hesap Durumu</p>
									<p
										className={`font-semibold ${user.confirmed ? "text-green-600" : "text-orange-600"}`}
									>
										{user.confirmed ? "Aktif" : "Beklemede"}
									</p>
								</div>
							</div>
						</div>

						{/* Actions */}
						<div className="pt-6 border-t space-y-3">
							<Button
								variant="outline"
								className="w-full"
								onClick={() => router.push("/orders")}
							>
								Siparişlerim
							</Button>
							<Button
								variant="outline"
								className="w-full"
								onClick={() => router.push("/subscriptions")}
							>
								Aboneliklerim
							</Button>
							<Button
								variant="destructive"
								className="w-full"
								onClick={handleLogout}
							>
								Çıkış Yap
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
