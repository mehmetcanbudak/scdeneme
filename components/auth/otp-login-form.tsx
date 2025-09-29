"use client";

import { ArrowLeft, Loader2, Phone } from "lucide-react";
import { useEffect, useState } from "react";
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
import GoogleLoginButton from "./google-login-button";

interface OTPLoginFormProps {
	onSuccess?: () => void;
	onCancel?: () => void;
}

export default function OTPLoginForm({
	onSuccess,
	onCancel,
}: OTPLoginFormProps) {
	const { sendOTP, login, resendOTP, error, clearError, isLoading } = useAuth();
	const [step, setStep] = useState<"phone" | "otp">("phone");
	const [phone, setPhone] = useState("");
	const [otpCode, setOtpCode] = useState("");
	const [countdown, setCountdown] = useState(0);
	const [isResending, setIsResending] = useState(false);

	// Format phone number for display
	const formatPhone = (phone: string) => {
		const cleaned = phone.replace(/\D/g, "");
		if (cleaned.length <= 10) {
			return cleaned;
		}
		if (cleaned.startsWith("90")) {
			return `+${cleaned}`;
		}
		if (cleaned.startsWith("0")) {
			return `+9${cleaned}`;
		}
		return `+90${cleaned}`;
	};

	// Countdown timer for resend OTP
	useEffect(() => {
		if (countdown > 0) {
			const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
			return () => clearTimeout(timer);
		}
	}, [countdown]);

	const handlePhoneSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		clearError();

		const formattedPhone = formatPhone(phone);
		const result = await sendOTP(formattedPhone);

		if (result.success) {
			setStep("otp");
			setCountdown(60); // 60 seconds countdown
		}
	};

	const handleOTPSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		clearError();

		const formattedPhone = formatPhone(phone);
		const result = await login(formattedPhone, otpCode);

		if (result.success) {
			onSuccess?.();
		}
	};

	const handleResendOTP = async () => {
		if (countdown > 0) return;

		setIsResending(true);
		clearError();

		const formattedPhone = formatPhone(phone);
		const result = await resendOTP(formattedPhone);

		if (result.success) {
			setCountdown(60);
		}

		setIsResending(false);
	};

	const handleBackToPhone = () => {
		setStep("phone");
		setOtpCode("");
		clearError();
	};

	if (step === "phone") {
		return (
			<div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow w-full max-w-md mx-auto">
				<div className="text-center mb-6">
					<div className="mx-auto mb-4 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
						<Phone className="w-6 h-6 text-gray-600" />
					</div>
					<h2 className="text-2xl font-medium text-gray-700 mb-2">Giriş Yap</h2>
					<p className="text-gray-600">
						Telefon numaranızı girin, size OTP kodu gönderelim
					</p>
				</div>

				<form onSubmit={handlePhoneSubmit} className="space-y-6">
					<div className="space-y-2">
						<Label
							htmlFor="phone"
							className="block text-sm font-medium text-gray-700"
						>
							Telefon Numarası
						</Label>
						<Input
							id="phone"
							type="tel"
							placeholder="0555 123 45 67"
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
							required
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-white placeholder:text-gray-500 text-gray-800 text-center text-lg"
						/>
						<p className="text-xs text-gray-600 text-center">
							Türkiye telefon numarası girin
						</p>
					</div>

					{error && (
						<Alert variant="destructive">
							<AlertDescription>{error}</AlertDescription>
						</Alert>
					)}

					<Button
						type="submit"
						className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 font-medium transition-all duration-300"
						disabled={isLoading || !phone.trim()}
					>
						{isLoading ? (
							<>
								<Loader2 className="w-4 h-4 mr-2 animate-spin" />
								Gönderiliyor...
							</>
						) : (
							"OTP Gönder"
						)}
					</Button>

					{onCancel && (
						<Button
							type="button"
							variant="outline"
							className="w-full bg-transparent border-gray-300 text-gray-600 hover:bg-gray-50 transition-all duration-300"
							onClick={onCancel}
						>
							İptal
						</Button>
					)}
				</form>

				{/* Divider */}
				<div className="relative my-6">
					<div className="absolute inset-0 flex items-center">
						<div className="w-full border-t border-gray-300"></div>
					</div>
					<div className="relative flex justify-center text-sm">
						<span className="px-2 bg-white text-gray-500">veya</span>
					</div>
				</div>

				{/* Google Sign-In */}
				<GoogleLoginButton
					onSuccess={onSuccess}
					onError={(errorMsg) => {
						// Display error using auth context's error
						// The error will be shown through the error state from useAuth
						console.error("Google login error:", errorMsg);
					}}
				/>
			</div>
		);
	}

	return (
		<Card className="w-full max-w-md mx-auto">
			<CardHeader className="text-center">
				<div className="mx-auto mb-4 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
					<Phone className="w-6 h-6 text-gray-600" />
				</div>
				<CardTitle className="text-2xl">OTP Doğrulama</CardTitle>
				<CardDescription>
					<span className="font-medium">{formatPhone(phone)}</span> numarasına
					gönderilen 6 haneli kodu girin
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleOTPSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="otp">OTP Kodu</Label>
						<Input
							id="otp"
							type="text"
							placeholder="123456"
							value={otpCode}
							onChange={(e) =>
								setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))
							}
							required
							className="text-center text-lg tracking-widest"
							maxLength={6}
						/>
					</div>

					{error && (
						<Alert variant="destructive">
							<AlertDescription>{error}</AlertDescription>
						</Alert>
					)}

					<Button
						type="submit"
						className="w-full bg-gray-600 hover:bg-gray-700 text-white"
						disabled={isLoading || otpCode.length !== 6}
					>
						{isLoading ? (
							<>
								<Loader2 className="w-4 h-4 mr-2 animate-spin" />
								Doğrulanıyor...
							</>
						) : (
							"Giriş Yap"
						)}
					</Button>

					<div className="flex flex-col space-y-2">
						<Button
							type="button"
							variant="outline"
							className="w-full"
							onClick={handleResendOTP}
							disabled={countdown > 0 || isResending}
						>
							{isResending ? (
								<>
									<Loader2 className="w-4 h-4 mr-2 animate-spin" />
									Gönderiliyor...
								</>
							) : countdown > 0 ? (
								`Yeniden gönder (${countdown}s)`
							) : (
								"OTP Yeniden Gönder"
							)}
						</Button>

						<Button
							type="button"
							variant="ghost"
							className="w-full"
							onClick={handleBackToPhone}
						>
							<ArrowLeft className="w-4 h-4 mr-2" />
							Telefon Numarasını Değiştir
						</Button>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}
