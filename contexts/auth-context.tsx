"use client";

import {
	createContext,
	useContext,
	useState,
	useEffect,
	type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { initializeApiClient } from "@/lib/api-client";

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
	}, []);

	const clearError = () => setError(null);

	// Internal logout function without redirect
	const forceLogoutInternal = (reason?: string) => {
		setUser(null);
		setToken(null);
		if (reason) {
			setError(reason);
		}
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		initializeApiClient(null);
	};

	// Public force logout with redirect
	const forceLogout = (reason?: string) => {
		forceLogoutInternal(reason);
		router.push("/");
	};

	// Helper function to validate token with server
	const validateTokenWithServer = async (
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
