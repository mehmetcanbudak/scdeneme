"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/auth-context";
import {
	CheckCircle2,
	Eye,
	EyeOff,
	Key,
	Loader2,
	Mail,
	User,
} from "lucide-react";
import { useEffect, useState } from "react";

interface ProfileSettingsProps {
	onSuccess?: () => void;
}

export default function ProfileSettings({ onSuccess }: ProfileSettingsProps) {
	const {
		user,
		updateProfile,
		updateUsername,
		changePassword,
		sendEmailVerification,
		verifyEmail,
		error,
		clearError,
		isLoading,
	} = useAuth();

	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
	});
	const [emailVerificationStep, setEmailVerificationStep] = useState<
		"none" | "send" | "verify"
	>("none");
	const [verificationCode, setVerificationCode] = useState("");
	const [localError, setLocalError] = useState<string | null>(null);
	const [localLoading, setLocalLoading] = useState(false);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	// Username form state
	const [newUsername, setNewUsername] = useState("");
	const [usernameLoading, setUsernameLoading] = useState(false);

	// Password form state
	const [passwordForm, setPasswordForm] = useState({
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
	});
	const [passwordLoading, setPasswordLoading] = useState(false);
	const [showPasswords, setShowPasswords] = useState({
		current: false,
		new: false,
		confirm: false,
	});

	// Initialize form data with user info
	useEffect(() => {
		if (user) {
			setFormData({
				firstName: user.firstName || "",
				lastName: user.lastName || "",
				email:
					user.email && !user.email.includes("@temp.skycrops.com")
						? user.email
						: "",
			});
			setNewUsername(user.username || "");
		}
	}, [user]);

	const clearMessages = () => {
		clearError();
		setLocalError(null);
		setSuccessMessage(null);
	};

	const handleFormSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		clearMessages();

		if (!formData.firstName.trim() || !formData.lastName.trim()) {
			setLocalError("Ad ve soyad alanları zorunludur");
			return;
		}

		try {
			const result = await updateProfile({
				firstName: formData.firstName.trim(),
				lastName: formData.lastName.trim(),
			});

			if (result.success) {
				setSuccessMessage("Profil bilgileriniz güncellendi");
				onSuccess?.();
			} else {
				setLocalError(result.message || "Profil güncellenemedi");
			}
		} catch (err) {
			setLocalError("Beklenmeyen bir hata oluştu");
		}
	};

	const handleSendEmailVerification = async () => {
		clearMessages();

		if (!formData.email.trim()) {
			setLocalError("Email adresi gereklidir");
			return;
		}

		// Basic email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(formData.email)) {
			setLocalError("Geçerli bir email adresi girin");
			return;
		}

		setLocalLoading(true);
		try {
			const result = await sendEmailVerification(formData.email.trim());

			if (result.success) {
				setEmailVerificationStep("verify");
				setSuccessMessage("Doğrulama kodu email adresinize gönderildi");
			} else {
				setLocalError(result.message || "Doğrulama kodu gönderilemedi");
			}
		} catch (err) {
			setLocalError("Beklenmeyen bir hata oluştu");
		} finally {
			setLocalLoading(false);
		}
	};

	const handleVerifyEmail = async () => {
		clearMessages();

		if (!verificationCode.trim() || verificationCode.length !== 6) {
			setLocalError("6 haneli doğrulama kodunu girin");
			return;
		}

		setLocalLoading(true);
		try {
			const result = await verifyEmail(formData.email.trim(), verificationCode);

			if (result.success) {
				setEmailVerificationStep("none");
				setVerificationCode("");
				setSuccessMessage("Email adresiniz doğrulandı");
				onSuccess?.();
			} else {
				setLocalError(result.message || "Email doğrulama başarısız");
			}
		} catch (err) {
			setLocalError("Beklenmeyen bir hata oluştu");
		} finally {
			setLocalLoading(false);
		}
	};

	const handleUsernameUpdate = async (e: React.FormEvent) => {
		e.preventDefault();
		clearMessages();

		if (!newUsername.trim()) {
			setLocalError("Kullanıcı adı gereklidir");
			return;
		}

		if (newUsername.trim() === user?.username) {
			setLocalError("Yeni kullanıcı adı mevcut kullanıcı adınızla aynı");
			return;
		}

		setUsernameLoading(true);
		try {
			const result = await updateUsername(newUsername.trim());

			if (result.success) {
				setSuccessMessage("Kullanıcı adınız başarıyla güncellendi");
				onSuccess?.();
			} else {
				setLocalError(result.message || "Kullanıcı adı güncellenemedi");
			}
		} catch (err) {
			setLocalError("Beklenmeyen bir hata oluştu");
		} finally {
			setUsernameLoading(false);
		}
	};

	const handlePasswordChange = async (e: React.FormEvent) => {
		e.preventDefault();
		clearMessages();

		if (
			!passwordForm.currentPassword ||
			!passwordForm.newPassword ||
			!passwordForm.confirmPassword
		) {
			setLocalError("Tüm şifre alanları gereklidir");
			return;
		}

		if (passwordForm.newPassword !== passwordForm.confirmPassword) {
			setLocalError("Yeni şifreler eşleşmiyor");
			return;
		}

		if (passwordForm.newPassword.length < 6) {
			setLocalError("Yeni şifre en az 6 karakter olmalıdır");
			return;
		}

		setPasswordLoading(true);
		try {
			const result = await changePassword(
				passwordForm.currentPassword,
				passwordForm.newPassword,
			);

			if (result.success) {
				setSuccessMessage("Şifreniz başarıyla değiştirildi");
				setPasswordForm({
					currentPassword: "",
					newPassword: "",
					confirmPassword: "",
				});
				onSuccess?.();
			} else {
				setLocalError(result.message || "Şifre değiştirilemedi");
			}
		} catch (err) {
			setLocalError("Beklenmeyen bir hata oluştu");
		} finally {
			setPasswordLoading(false);
		}
	};

	const getCurrentError = () => {
		return localError || error;
	};

	const isEmailVerified = () => {
		return user?.emailVerified && !user.email?.includes("@temp.skycrops.com");
	};

	const hasValidEmail = () => {
		return (
			user?.email &&
			user.email.trim() !== "" &&
			!user.email.includes("@temp.skycrops.com")
		);
	};

	if (emailVerificationStep === "verify") {
		return (
			<Card className="w-full max-w-md mx-auto">
				<CardHeader className="text-center">
					<div className="mx-auto mb-4 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
						<Mail className="w-6 h-6 text-blue-600" />
					</div>
					<CardTitle className="text-2xl">Email Doğrulama</CardTitle>
					<CardDescription>
						<span className="font-medium">{formData.email}</span> adresine
						gönderilen 6 haneli kodu girin
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							handleVerifyEmail();
						}}
						className="space-y-4"
					>
						<div className="space-y-2">
							<Label htmlFor="verificationCode">Doğrulama Kodu</Label>
							<Input
								id="verificationCode"
								type="text"
								placeholder="123456"
								value={verificationCode}
								onChange={(e) =>
									setVerificationCode(
										e.target.value.replace(/\D/g, "").slice(0, 6),
									)
								}
								required
								className="text-center text-lg tracking-widest"
								maxLength={6}
							/>
						</div>

						{getCurrentError() && (
							<Alert variant="destructive">
								<AlertDescription>{getCurrentError()}</AlertDescription>
							</Alert>
						)}

						{successMessage && (
							<Alert>
								<CheckCircle2 className="h-4 w-4" />
								<AlertDescription>{successMessage}</AlertDescription>
							</Alert>
						)}

						<Button
							type="submit"
							className="w-full bg-blue-600 hover:bg-blue-700 text-white"
							disabled={localLoading || verificationCode.length !== 6}
						>
							{localLoading ? (
								<>
									<Loader2 className="w-4 h-4 mr-2 animate-spin" />
									Doğrulanıyor...
								</>
							) : (
								"Email'i Doğrula"
							)}
						</Button>

						<Button
							type="button"
							variant="ghost"
							className="w-full"
							onClick={() => {
								setEmailVerificationStep("send");
								setVerificationCode("");
								clearMessages();
							}}
						>
							Geri Dön
						</Button>
					</form>
				</CardContent>
			</Card>
		);
	}

	return (
		<div className="space-y-6 max-w-2xl mx-auto">
			{/* Profile Information */}
			<Card>
				<CardHeader>
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
							<User className="w-5 h-5 text-gray-600" />
						</div>
						<div>
							<CardTitle>Profil Bilgilerim</CardTitle>
							<CardDescription>
								Ad, soyad ve diğer temel bilgilerinizi güncelleyin
							</CardDescription>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleFormSubmit} className="space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="firstName">Ad *</Label>
								<Input
									id="firstName"
									type="text"
									value={formData.firstName}
									onChange={(e) =>
										setFormData({ ...formData, firstName: e.target.value })
									}
									required
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="lastName">Soyad *</Label>
								<Input
									id="lastName"
									type="text"
									value={formData.lastName}
									onChange={(e) =>
										setFormData({ ...formData, lastName: e.target.value })
									}
									required
								/>
							</div>
						</div>

						{getCurrentError() && (
							<Alert variant="destructive">
								<AlertDescription>{getCurrentError()}</AlertDescription>
							</Alert>
						)}

						{successMessage && (
							<Alert>
								<CheckCircle2 className="h-4 w-4" />
								<AlertDescription>{successMessage}</AlertDescription>
							</Alert>
						)}

						<Button
							type="submit"
							className="w-full bg-gray-600 hover:bg-gray-700 text-white"
							disabled={isLoading}
						>
							{isLoading ? (
								<>
									<Loader2 className="w-4 h-4 mr-2 animate-spin" />
									Güncelleniyor...
								</>
							) : (
								"Profil Bilgilerini Güncelle"
							)}
						</Button>
					</form>
				</CardContent>
			</Card>

			{/* Email Verification */}
			<Card>
				<CardHeader>
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
							<Mail className="w-5 h-5 text-blue-600" />
						</div>
						<div>
							<CardTitle className="flex items-center gap-2">
								Email Adresi
								{isEmailVerified() && (
									<CheckCircle2 className="w-5 h-5 text-green-500" />
								)}
							</CardTitle>
							<CardDescription>
								{hasValidEmail()
									? isEmailVerified()
										? "Email adresiniz doğrulanmış"
										: "Email adresinizi doğrulayın"
									: "Email adresinizi ekleyin ve doğrulayın"}
							</CardDescription>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="email">Email Adresi</Label>
							<Input
								id="email"
								type="email"
								value={formData.email}
								onChange={(e) =>
									setFormData({ ...formData, email: e.target.value })
								}
								placeholder="ornek@email.com"
								disabled={isEmailVerified()}
							/>
						</div>

						{!isEmailVerified() && (
							<Button
								type="button"
								variant="outline"
								className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
								onClick={handleSendEmailVerification}
								disabled={localLoading || !formData.email.trim()}
							>
								{localLoading ? (
									<>
										<Loader2 className="w-4 h-4 mr-2 animate-spin" />
										Gönderiliyor...
									</>
								) : (
									"Doğrulama Kodu Gönder"
								)}
							</Button>
						)}

						{isEmailVerified() && (
							<div className="text-sm text-green-600 flex items-center gap-2">
								<CheckCircle2 className="w-4 h-4" />
								Email adresiniz doğrulanmış
							</div>
						)}
					</div>
				</CardContent>
			</Card>

			{/* Username Change */}
			<Card>
				<CardHeader>
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
							<User className="w-5 h-5 text-purple-600" />
						</div>
						<div>
							<CardTitle>Kullanıcı Adı</CardTitle>
							<CardDescription>
								Mevcut kullanıcı adınızı değiştirin
							</CardDescription>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleUsernameUpdate} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="currentUsername">Mevcut Kullanıcı Adı</Label>
							<Input
								id="currentUsername"
								type="text"
								value={user?.username || ""}
								disabled
								className="bg-gray-50"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="newUsername">Yeni Kullanıcı Adı</Label>
							<Input
								id="newUsername"
								type="text"
								value={newUsername}
								onChange={(e) => setNewUsername(e.target.value)}
								placeholder="yeni_kullanici_adi"
								required
							/>
							<p className="text-sm text-gray-500">
								3-30 karakter, sadece harf, rakam, alt çizgi ve tire
								kullanabilirsiniz
							</p>
						</div>

						{getCurrentError() && (
							<Alert variant="destructive">
								<AlertDescription>{getCurrentError()}</AlertDescription>
							</Alert>
						)}

						{successMessage && (
							<Alert>
								<CheckCircle2 className="h-4 w-4" />
								<AlertDescription>{successMessage}</AlertDescription>
							</Alert>
						)}

						<Button
							type="submit"
							className="w-full bg-purple-600 hover:bg-purple-700 text-white"
							disabled={
								usernameLoading || newUsername.trim() === user?.username
							}
						>
							{usernameLoading ? (
								<>
									<Loader2 className="w-4 h-4 mr-2 animate-spin" />
									Güncelleniyor...
								</>
							) : (
								"Kullanıcı Adını Güncelle"
							)}
						</Button>
					</form>
				</CardContent>
			</Card>

			{/* Password Change */}
			<Card>
				<CardHeader>
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
							<Key className="w-5 h-5 text-red-600" />
						</div>
						<div>
							<CardTitle>Şifre Değiştir</CardTitle>
							<CardDescription>
								Hesabınızın güvenliği için şifrenizi değiştirin
							</CardDescription>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<form onSubmit={handlePasswordChange} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="currentPassword">Mevcut Şifre</Label>
							<div className="relative">
								<Input
									id="currentPassword"
									type={showPasswords.current ? "text" : "password"}
									value={passwordForm.currentPassword}
									onChange={(e) =>
										setPasswordForm({
											...passwordForm,
											currentPassword: e.target.value,
										})
									}
									placeholder="Mevcut şifrenizi girin"
									required
									className="pr-10"
								/>
								<Button
									type="button"
									variant="ghost"
									size="sm"
									className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
									onClick={() =>
										setShowPasswords({
											...showPasswords,
											current: !showPasswords.current,
										})
									}
								>
									{showPasswords.current ? (
										<EyeOff className="h-4 w-4 text-gray-400" />
									) : (
										<Eye className="h-4 w-4 text-gray-400" />
									)}
								</Button>
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="newPassword">Yeni Şifre</Label>
							<div className="relative">
								<Input
									id="newPassword"
									type={showPasswords.new ? "text" : "password"}
									value={passwordForm.newPassword}
									onChange={(e) =>
										setPasswordForm({
											...passwordForm,
											newPassword: e.target.value,
										})
									}
									placeholder="Yeni şifrenizi girin"
									required
									className="pr-10"
								/>
								<Button
									type="button"
									variant="ghost"
									size="sm"
									className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
									onClick={() =>
										setShowPasswords({
											...showPasswords,
											new: !showPasswords.new,
										})
									}
								>
									{showPasswords.new ? (
										<EyeOff className="h-4 w-4 text-gray-400" />
									) : (
										<Eye className="h-4 w-4 text-gray-400" />
									)}
								</Button>
							</div>
							<p className="text-sm text-gray-500">
								En az 6 karakter olmalıdır
							</p>
						</div>

						<div className="space-y-2">
							<Label htmlFor="confirmPassword">Yeni Şifre (Tekrar)</Label>
							<div className="relative">
								<Input
									id="confirmPassword"
									type={showPasswords.confirm ? "text" : "password"}
									value={passwordForm.confirmPassword}
									onChange={(e) =>
										setPasswordForm({
											...passwordForm,
											confirmPassword: e.target.value,
										})
									}
									placeholder="Yeni şifrenizi tekrar girin"
									required
									className="pr-10"
								/>
								<Button
									type="button"
									variant="ghost"
									size="sm"
									className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
									onClick={() =>
										setShowPasswords({
											...showPasswords,
											confirm: !showPasswords.confirm,
										})
									}
								>
									{showPasswords.confirm ? (
										<EyeOff className="h-4 w-4 text-gray-400" />
									) : (
										<Eye className="h-4 w-4 text-gray-400" />
									)}
								</Button>
							</div>
						</div>

						{getCurrentError() && (
							<Alert variant="destructive">
								<AlertDescription>{getCurrentError()}</AlertDescription>
							</Alert>
						)}

						{successMessage && (
							<Alert>
								<CheckCircle2 className="h-4 w-4" />
								<AlertDescription>{successMessage}</AlertDescription>
							</Alert>
						)}

						<Button
							type="submit"
							className="w-full bg-red-600 hover:bg-red-700 text-white"
							disabled={passwordLoading}
						>
							{passwordLoading ? (
								<>
									<Loader2 className="w-4 h-4 mr-2 animate-spin" />
									Değiştiriliyor...
								</>
							) : (
								"Şifreyi Değiştir"
							)}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
