"use client";

import { initializeApiClient } from "@/lib/api-client";
import { useRouter } from "next/navigation";
import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";

interface User {
	id: number;
	username: string;
	email: string;
	phone: string;
	phoneVerified: boolean;
	confirmed: boolean;
	blocked: boolean;
	firstName?: string;
	lastName?: string;
	name?: string; // Full name from Google
	picture?: string; // Profile picture URL from Google
	createdAt: string;
	updatedAt: string;
}

interface AuthContextType {
	user: User | null;
	token: string | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	login: (
		phone: string,
		otpCode: string,
	) => Promise<{ success: boolean; message?: string }>;
	loginWithGoogle: (
		googleToken: string,
	) => Promise<{ success: boolean; message?: string }>;
	sendOTP: (phone: string) => Promise<{ success: boolean; message?: string }>;
	resendOTP: (phone: string) => Promise<{ success: boolean; message?: string }>;
	checkPhone: (
		phone: string,
	) => Promise<{ exists: boolean; verified: boolean }>;
	validateToken: () => Promise<{ valid: boolean; user?: User }>;
	refreshUserInfo: () => Promise<{ success: boolean; message?: string }>;
	logout: (redirect?: boolean) => void;
	forceLogout: (reason?: string) => void;
	error: string | null;
	clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

export function AuthProvider({ children }: { children: ReactNode }) {
	const router = useRouter();
	const [user, setUser] = useState<User | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Internal logout function without redirect
	const forceLogoutInternal = useCallback((reason?: string) => {
		setUser(null);
		setToken(null);
		if (reason) {
			setError(reason);
		}
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		initializeApiClient(null);
	}, []);

	// Helper function to validate token with server
	const validateTokenWithServer = useCallback(
		async (
			tokenToValidate: string,
		): Promise<{ valid: boolean; user?: User }> => {
			try {
				const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
					method: "GET",
					headers: {
						Authorization: `Bearer ${tokenToValidate}`,
						"Content-Type": "application/json",
					},
				});

				if (!response.ok) {
					if (response.status === 401) {
						// Token is invalid
						return { valid: false };
					}
					throw new Error("Token validation failed");
				}

				const data = await response.json();
				return { valid: true, user: data.user || data };
			} catch (error) {
				console.error("Error validating token:", error);
				return { valid: false };
			}
		},
		[],
	);

	// Initialize auth state from localStorage
	useEffect(() => {
		const initializeAuth = async () => {
			try {
				const storedToken = localStorage.getItem("token");
				const storedUser = localStorage.getItem("user");

				if (storedToken && storedUser) {
					setToken(storedToken);
					setUser(JSON.parse(storedUser));
					// Initialize API client with token
					initializeApiClient(storedToken);

					// Validate token with server
					const validation = await validateTokenWithServer(storedToken);
					if (!validation.valid) {
						// Token is invalid, logout user
						console.warn("Stored token is invalid, logging out");
						forceLogoutInternal("Token geçersiz");
					} else if (validation.user) {
						// Update user info if returned from server
						setUser(validation.user);
						localStorage.setItem("user", JSON.stringify(validation.user));
					}
				} else {
					// Initialize API client without token
					initializeApiClient(null);
				}
			} catch (error) {
				console.error("Error initializing auth:", error);
				// Clear invalid data
				forceLogoutInternal("Başlangıç hatası oluştu");
			} finally {
				setIsLoading(false);
			}
		};

		initializeAuth();
	}, [
		// Clear invalid data
		forceLogoutInternal,
		validateTokenWithServer,
	]);

	const clearError = () => setError(null);

	// Public force logout with redirect
	const forceLogout = (reason?: string) => {
		forceLogoutInternal(reason);
		router.push("/");
	};

	const validateToken = async (): Promise<{ valid: boolean; user?: User }> => {
		if (!token) {
			return { valid: false };
		}
		return validateTokenWithServer(token);
	};

	const refreshUserInfo = async (): Promise<{
		success: boolean;
		message?: string;
	}> => {
		try {
			setError(null);

			if (!token) {
				throw new Error("No token available");
			}

			const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) {
				if (response.status === 401) {
					// Token is invalid, logout user
					// forceLogout('Oturum süreniz dolmuş, lütfen tekrar giriş yapın')
					throw new Error("Oturum süreniz dolmuş, lütfen tekrar giriş yapın");
				}
				throw new Error("Kullanıcı bilgileri alınamadı");
			}

			const data = await response.json();
			const userData = data.user || data;

			setUser(userData);
			localStorage.setItem("user", JSON.stringify(userData));

			return { success: true, message: "Kullanıcı bilgileri güncellendi" };
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : "Beklenmeyen bir hata oluştu";
			setError(errorMessage);
			return { success: false, message: errorMessage };
		}
	};

	const sendOTP = async (
		phone: string,
	): Promise<{ success: boolean; message?: string }> => {
		try {
			setError(null);
			const response = await fetch(`${API_BASE_URL}/api/auth/send-otp`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ phone }),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error?.message || "OTP gönderilemedi");
			}

			return { success: true, message: data.message };
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : "Beklenmeyen bir hata oluştu";
			setError(errorMessage);
			return { success: false, message: errorMessage };
		}
	};

	const verifyOTP = async (
		phone: string,
		otpCode: string,
	): Promise<{ success: boolean; message?: string }> => {
		try {
			setError(null);
			const response = await fetch(`${API_BASE_URL}/api/auth/verify-otp`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ phone, otpCode }),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error?.message || "OTP doğrulanamadı");
			}

			// Store token and user data
			setToken(data.jwt);
			setUser(data.user);
			localStorage.setItem("token", data.jwt);
			localStorage.setItem("user", JSON.stringify(data.user));

			// Initialize API client with new token
			initializeApiClient(data.jwt);

			return { success: true, message: data.message };
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : "Beklenmeyen bir hata oluştu";
			setError(errorMessage);
			return { success: false, message: errorMessage };
		}
	};

	const resendOTP = async (
		phone: string,
	): Promise<{ success: boolean; message?: string }> => {
		try {
			setError(null);
			const response = await fetch(`${API_BASE_URL}/api/auth/resend-otp`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ phone }),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error?.message || "OTP yeniden gönderilemedi");
			}

			return { success: true, message: data.message };
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : "Beklenmeyen bir hata oluştu";
			setError(errorMessage);
			return { success: false, message: errorMessage };
		}
	};

	const checkPhone = async (
		phone: string,
	): Promise<{ exists: boolean; verified: boolean }> => {
		try {
			setError(null);
			const response = await fetch(
				`${API_BASE_URL}/api/auth/check-phone?phone=${encodeURIComponent(phone)}`,
			);

			if (!response.ok) {
				throw new Error("Telefon numarası kontrol edilemedi");
			}

			const data = await response.json();
			return { exists: data.exists, verified: data.verified };
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : "Beklenmeyen bir hata oluştu";
			setError(errorMessage);
			return { exists: false, verified: false };
		}
	};

	const loginWithGoogle = async (
		googleToken: string,
	): Promise<{ success: boolean; message?: string }> => {
		try {
			setError(null);

			// Decode JWT to get user info from Google
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

			const googleUserInfo = decodeJWT(googleToken);

			const response = await fetch(`${API_BASE_URL}/api/auth/google`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ idToken: googleToken }),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error?.message || "Google ile giriş başarısız");
			}

			// Merge Google user info with backend response
			const enrichedUser = {
				...data.user,
				name: data.user.name || googleUserInfo.name,
				email: data.user.email || googleUserInfo.email,
				picture: data.user.picture || googleUserInfo.picture,
			};

			// Store token and user data
			console.log("Storing user and token:", {
				user: enrichedUser,
				hasToken: !!data.jwt,
			});
			setToken(data.jwt);
			setUser(enrichedUser);
			localStorage.setItem("token", data.jwt);
			localStorage.setItem("user", JSON.stringify(enrichedUser));

			// Initialize API client with new token
			initializeApiClient(data.jwt);

			console.log("Google login completed successfully");
			return {
				success: true,
				message: data.message || "Google ile giriş başarılı",
			};
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : "Beklenmeyen bir hata oluştu";
			setError(errorMessage);
			return { success: false, message: errorMessage };
		}
	};

	const login = verifyOTP;

	const logout = (redirect: boolean = true) => {
		setUser(null);
		setToken(null);
		setError(null);
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		// Clear API client token
		initializeApiClient(null);

		if (redirect) {
			router.push("/");
		}
	};

	const value: AuthContextType = {
		user,
		token,
		isAuthenticated: !!token && !!user,
		isLoading,
		login,
		loginWithGoogle,
		sendOTP,
		resendOTP,
		checkPhone,
		validateToken,
		refreshUserInfo,
		logout,
		forceLogout,
		error,
		clearError,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
