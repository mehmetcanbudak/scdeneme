"use client";

import OTPLoginForm from "@/components/auth/otp-login-form";
import { useAuth } from "@/contexts/auth-context";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
	const { isAuthenticated, isLoading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		console.log("Login page useEffect:", { isAuthenticated, isLoading });
		if (isAuthenticated && !isLoading) {
			// Redirect to profile page if already authenticated
			console.log("Redirecting to /profile");
			router.push("/profile");
		}
	}, [isAuthenticated, isLoading, router]);

	if (isLoading) {
		return (
			<div className="min-h-screen relative flex items-center justify-center">
				<div className="absolute inset-0">
					<Image
						src="/agricultural-figures-with-plants-and-sun.png"
						alt="Skycrops Background"
						fill
						className="object-cover"
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
		// Redirect will be handled automatically by the useEffect
		// when isAuthenticated becomes true
	};

	return (
		<div className="min-h-screen relative flex items-center justify-center p-4">
			<div className="absolute inset-0">
				<Image
					src="/agricultural-figures-with-plants-and-sun.png"
					alt="Skycrops Background"
					fill
					className="object-cover"
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
