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
import { useHeaderColor } from "@/hooks/use-header-color";
import { ArrowLeft, Mail, Phone, User as UserIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { memo, useCallback } from "react";

/**
 * Props for ProfileHeader component
 */
interface ProfileHeaderProps {
	user: {
		picture?: string;
		name?: string;
		firstName?: string;
	};
	isGoogleUser: boolean;
}

/**
 * User profile header with avatar and login method
 * @param {ProfileHeaderProps} props - Component props
 * @returns {JSX.Element} Profile header UI
 */
const ProfileHeader = memo(({ user, isGoogleUser }: ProfileHeaderProps) => {
	return (
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
	);
});

ProfileHeader.displayName = "ProfileHeader";

/**
 * Props for AccountInfoItem component
 */
interface AccountInfoItemProps {
	icon: React.ReactNode;
	label: string;
	value: string;
	iconBgColor: string;
	iconColor: string;
}

/**
 * Display a single account information item (email, phone, username)
 * @param {AccountInfoItemProps} props - Component props
 * @returns {JSX.Element} Account info item UI
 */
const AccountInfoItem = memo(
	({ icon, label, value, iconBgColor, iconColor }: AccountInfoItemProps) => {
		return (
			<div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
				<div
					className={`w-10 h-10 ${iconBgColor} rounded-full flex items-center justify-center flex-shrink-0`}
				>
					<div className={iconColor}>{icon}</div>
				</div>
				<div className="flex-1">
					<p className="text-sm text-black mb-1">{label}</p>
					<p className="font-medium text-black">{value}</p>
				</div>
			</div>
		);
	},
);

AccountInfoItem.displayName = "AccountInfoItem";

/**
 * Props for StatusCard component
 */
interface StatusCardProps {
	label: string;
	value: string;
	isVerified: boolean;
}

/**
 * Display a status card (phone verification, account status)
 * @param {StatusCardProps} props - Component props
 * @returns {JSX.Element} Status card UI
 */
const StatusCard = memo(({ label, value, isVerified }: StatusCardProps) => {
	return (
		<div className="p-4 bg-gray-50 rounded-lg text-center">
			<p className="text-sm text-black mb-1">{label}</p>
			<p
				className={`font-semibold ${isVerified ? "text-green-600" : "text-orange-600"}`}
			>
				{value}
			</p>
		</div>
	);
});

StatusCard.displayName = "StatusCard";

/**
 * Main profile page component
 * @returns {JSX.Element} Profile page with protected route
 */
export default function ProfilePage() {
	return (
		<ProtectedRoute>
			<ProfileContent />
		</ProtectedRoute>
	);
}

/**
 * Profile content component displaying user information and actions
 * @returns {JSX.Element | null} Profile content UI
 */
const ProfileContent = memo(() => {
	const { user, logout } = useAuth();
	const router = useRouter();

	// Set header color for profile page
	useHeaderColor("#B2A79D");

	/**
	 * Handles user logout and navigation to home
	 */
	const handleLogout = useCallback(() => {
		logout();
		router.push("/");
	}, [logout, router]);

	/**
	 * Navigates back to home page
	 */
	const handleBack = useCallback(() => {
		router.push("/");
	}, [router]);

	/**
	 * Navigates to orders page
	 */
	const handleNavigateToOrders = useCallback(() => {
		router.push("/orders");
	}, [router]);

	/**
	 * Navigates to subscriptions page
	 */
	const handleNavigateToSubscriptions = useCallback(() => {
		router.push("/subscriptions");
	}, [router]);

	/**
	 * Navigates to profile settings page
	 */
	const handleNavigateToProfileSettings = useCallback(() => {
		router.push("/profile/settings");
	}, [router]);

	if (!user) {
		return null;
	}

	// Determine if user logged in with Google
	const isGoogleUser = !!user.picture;

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
			<div className="max-w-2xl mx-auto">
				<Button variant="ghost" className="mb-6 gap-2" onClick={handleBack}>
					<ArrowLeft className="w-4 h-4" />
					Ana Sayfaya Dön
				</Button>

				<Card className="shadow-lg">
					<ProfileHeader user={user} isGoogleUser={isGoogleUser} />
					<CardContent className="space-y-6">
						<div className="space-y-4">
							<h3 className="font-semibold text-lg text-black border-b pb-2">
								Hesap Bilgileri
							</h3>

							{/* Email */}
							{user.email && (
								<AccountInfoItem
									icon={<Mail className="w-5 h-5" />}
									label="E-posta"
									value={user.email}
									iconBgColor="bg-green-100"
									iconColor="text-green-600"
								/>
							)}

							{/* Phone */}
							{user.phone && (
								<AccountInfoItem
									icon={<Phone className="w-5 h-5" />}
									label="Telefon"
									value={user.phone}
									iconBgColor="bg-blue-100"
									iconColor="text-blue-600"
								/>
							)}

							{/* Username */}
							{user.username && (
								<AccountInfoItem
									icon={<UserIcon className="w-5 h-5" />}
									label="Kullanıcı Adı"
									value={user.username}
									iconBgColor="bg-purple-100"
									iconColor="text-purple-600"
								/>
							)}
						</div>

						{/* Account Status */}
						<div className="space-y-4">
							<h3 className="font-semibold text-lg text-black border-b pb-2">
								Hesap Durumu
							</h3>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<StatusCard
									label="Telefon Doğrulama"
									value={user.phoneVerified ? "Doğrulandı" : "Bekliyor"}
									isVerified={!!user.phoneVerified}
								/>
								<StatusCard
									label="Hesap Durumu"
									value={user.confirmed ? "Aktif" : "Beklemede"}
									isVerified={!!user.confirmed}
								/>
							</div>
						</div>

						{/* Actions */}
						<div className="pt-6 border-t space-y-3">
							<Button
								variant="primary"
								className="w-full bg-blue-600 hover:bg-blue-700 text-white"
								onClick={handleNavigateToProfileSettings}
							>
								Profil Ayarları
							</Button>
							<Button
								variant="outline"
								className="w-full"
								onClick={handleNavigateToOrders}
							>
								Siparişlerim
							</Button>
							<Button
								variant="outline"
								className="w-full"
								onClick={handleNavigateToSubscriptions}
							>
								Aboneliklerim
							</Button>
							<Button variant="dark" className="w-full" onClick={handleLogout}>
								Çıkış Yap
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
});

ProfileContent.displayName = "ProfileContent";
