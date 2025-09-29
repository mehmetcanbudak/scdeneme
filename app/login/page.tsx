"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import OTPLoginForm from "@/components/auth/otp-login-form";

export default function LoginPage() {
	const { isAuthenticated, isLoading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (isAuthenticated && !isLoading) {
			// Redirect to home page if already authenticated
			router.push("/");
		}
	}, [isAuthenticated, isLoading, router]);

	if (isLoading) {
		return (
			<div className="min-h-screen relative flex items-center justify-center">
				<div className="absolute inset-0">
					<img
						src="/agricultural-figures-with-plants-and-sun.png"
						alt="Skycrops Background"
						className="w-full h-full object-cover"
					/>
					<div className="absolute inset-0 bg-black/50"></div>
				</div>
				<div className="relative z-10 text-center text-white">
					<div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
					<p className="text-white">Yükleniyor...</p>
				</div>
			</div>
		);
	}

	if (isAuthenticated) {
		return null; // Will redirect
	}

	const handleLoginSuccess = () => {
		router.push("/");
	};

	return (
		<div className="min-h-screen relative flex items-center justify-center p-4">
			<div className="absolute inset-0">
				<img
					src="/agricultural-figures-with-plants-and-sun.png"
					alt="Skycrops Background"
					className="w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-black/50"></div>
			</div>
			<div className="relative z-10 w-full max-w-md">
				{/* Login Form */}
				<OTPLoginForm onSuccess={handleLoginSuccess} />
			</div>
		</div>
	);
}
