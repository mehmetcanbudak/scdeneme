"use client";

import { useAuth } from "@/contexts/auth-context";
import { useEffect, useRef } from "react";

type GoogleCredentialResponse = {
	credential: string;
	select_by?: string;
};

type GoogleLoginButtonProps = {
	onSuccess?: () => void;
	onError?: (error: string) => void;
};

/**
 * Decodes a Google JWT token to extract user information.
 */
const decodeJWT = (token: string) => {
	const base64Url = token.split(".")[1];
	const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
	const jsonPayload = decodeURIComponent(
		atob(base64)
			.split("")
			.map((c) => {
				return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
			})
			.join(""),
	);
	return JSON.parse(jsonPayload);
};

export default function GoogleLoginButton({
	onSuccess,
	onError,
}: GoogleLoginButtonProps) {
	const { loginWithGoogle, isLoading } = useAuth();
	const buttonRef = useRef<HTMLDivElement>(null);
	const callbackRef = useRef<
		((response: GoogleCredentialResponse) => void) | null
	>(null);

	useEffect(() => {
		// Define the callback function
		const handleCredentialResponse = async (
			response: GoogleCredentialResponse,
		) => {
			try {
				console.log("Google Sign-In successful");

				// Decode JWT to get user info (for debugging)
				const responsePayload = decodeJWT(response.credential);
				console.log("User info:", {
					name: responsePayload.name,
					email: responsePayload.email,
					picture: responsePayload.picture,
				});

				// Send credential to backend for verification
				const result = await loginWithGoogle(response.credential);

				console.log("Backend verification result:", result);

				if (result.success) {
					console.log("Login successful, calling onSuccess callback");
					onSuccess?.();
				} else {
					console.error("Login failed:", result.message);
					onError?.(result.message || "Google ile giriş başarısız");
				}
			} catch (error) {
				console.error("Error handling Google Sign-In:", error);
				onError?.("Google ile giriş sırasında bir hata oluştu");
			}
		};

		// Store callback in ref
		callbackRef.current = handleCredentialResponse;

		// Make callback available globally for Google to call
		// biome-ignore lint/suspicious/noExplicitAny: Google API requires global callback
		(window as any).handleGoogleCredentialResponse = (
			response: GoogleCredentialResponse,
		) => {
			callbackRef.current?.(response);
		};

		// Initialize Google Sign-In button when script is loaded
		const initializeGoogleButton = () => {
			// biome-ignore lint/suspicious/noExplicitAny: Google API types not available
			if (
				typeof window !== "undefined" &&
				(window as any).google &&
				buttonRef.current
			) {
				const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

				if (!clientId) {
					console.error("Google Client ID not configured");
					onError?.("Google giriş yapılandırması eksik");
					return;
				}

				try {
					// Initialize the button
					// biome-ignore lint/suspicious/noExplicitAny: Google API types not available
					(window as any).google.accounts.id.initialize({
						client_id: clientId,
						// biome-ignore lint/suspicious/noExplicitAny: Google API requires global callback
						callback: (window as any).handleGoogleCredentialResponse,
						auto_select: false,
					});

					// Render the button
					// biome-ignore lint/suspicious/noExplicitAny: Google API types not available
					(window as any).google.accounts.id.renderButton(buttonRef.current, {
						theme: "outline",
						size: "large",
						text: "continue_with",
						width: buttonRef.current.offsetWidth || 300,
						locale: "tr",
					});
				} catch (error) {
					console.error("Error initializing Google Sign-In:", error);
					onError?.("Google giriş başlatılamadı");
				}
			}
		};

		// Check if Google script is already loaded
		// biome-ignore lint/suspicious/noExplicitAny: Google API types not available
		if ((window as any).google) {
			initializeGoogleButton();
		} else {
			// Wait for script to load
			const checkGoogleLoaded = setInterval(() => {
				// biome-ignore lint/suspicious/noExplicitAny: Google API types not available
				if ((window as any).google) {
					clearInterval(checkGoogleLoaded);
					initializeGoogleButton();
				}
			}, 100);

			// Cleanup interval after 10 seconds
			setTimeout(() => clearInterval(checkGoogleLoaded), 10000);

			return () => clearInterval(checkGoogleLoaded);
		}

		// Cleanup
		return () => {
			// biome-ignore lint/suspicious/noExplicitAny: Global cleanup
			if ((window as any).handleGoogleCredentialResponse) {
				// biome-ignore lint/suspicious/noExplicitAny: Global cleanup
				delete (window as any).handleGoogleCredentialResponse;
			}
		};
	}, [loginWithGoogle, onSuccess, onError]);

	return (
		<div className="w-full">
			<div
				ref={buttonRef}
				className="w-full flex justify-center"
				style={{ minHeight: "44px" }}
			/>
		</div>
	);
}
