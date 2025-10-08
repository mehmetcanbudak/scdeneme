"use client";

import OTPLoginForm from "@/components/auth/otp-login-form";
import { useAuth } from "@/contexts/auth-context";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { memo, useCallback, useEffect } from "react";

/**
 * Loading spinner component displayed during authentication checks
 * @returns {JSX.Element} Loading state UI
 */
const LoadingState = memo(() => {
	return (
		<div className="min-h-screen relative flex items-center justify-center">
			<div className="absolute inset-0">
				<Image
					src="/agricultural-figures-with-plants-and-sun.png"
					alt="Skycrops Background"
					fill
					className="object-cover"
				/>
				<div className="absolute inset-0 bg-black/50" />
			</div>
			<div className="relative z-10 text-center text-white">
				<div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
				<p className="text-white">Yükleniyor...</p>
			</div>
		</div>
	);
});

LoadingState.displayName = "LoadingState";

/**
 * Login page component with OTP authentication
 * Handles user authentication, redirects authenticated users to profile
 * @returns {JSX.Element | null} Login page UI or null if redirecting
 */
function LoginPage() {
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

	/**
	 * Handles successful login completion
	 * Redirect is handled by useEffect when isAuthenticated updates
	 */
	const handleLoginSuccess = useCallback(() => {
		// Redirect will be handled automatically by the useEffect
		// when isAuthenticated becomes true
	}, []);

	if (isLoading) {
		return <LoadingState />;
	}

	if (isAuthenticated) {
		return null; // Will redirect
	}

	return (
		<div className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 md:p-8">
			<div className="absolute inset-0">
				<Image
					src="/agricultural-figures-with-plants-and-sun.png"
					alt="Skycrops Background"
					fill
					className="object-cover"
				/>
				<div className="absolute inset-0 bg-black/50" />
			</div>
			<div className="relative z-10 w-full max-w-md">
				{/* Login Form */}
				<OTPLoginForm onSuccess={handleLoginSuccess} />
			</div>
		</div>
	);
}

export default memo(LoginPage);
