const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

interface ApiResponse<T = any> {
	data?: T;
	error?: {
		status: number;
		name: string;
		message: string;
	};
	message?: string;
}

class ApiClient {
	private baseURL: string;
	private token: string | null = null;
	private tokenPromise: Promise<string | null> | null = null;
	private isInitialized = false;
	private initializationCallbacks: Array<() => void> = [];
	// Dedupe concurrent GET requests for the same URL
	private inflight = new Map<string, Promise<ApiResponse<any>>>();

	constructor(baseURL: string) {
		this.baseURL = baseURL;

		// Try to initialize token immediately from localStorage if available
		if (typeof window !== "undefined") {
			const storedToken = localStorage.getItem("token");
			if (storedToken) {
				this.token = storedToken;
				this.isInitialized = true;
			} else {
				// Even if no token, mark as initialized to prevent hanging
				this.isInitialized = true;
			}
		}
	}

	setToken(token: string | null) {
		this.token = token;
		this.isInitialized = true;

		// Notify any waiting callbacks
		this.initializationCallbacks.forEach((callback) => {
			callback();
		});
		this.initializationCallbacks = [];
	}

	// Check if API client is ready
	isReady(): boolean {
		return this.isInitialized;
	}

	// Wait for API client to be ready
	onReady(callback: () => void): void {
		if (this.isInitialized) {
			callback();
		} else {
			this.initializationCallbacks.push(callback);
		}
	}

	// Wait for token to be initialized
	private async waitForToken(): Promise<string | null> {
		if (this.isInitialized) {
			return this.token;
		}

		// If we're already waiting for token, return the existing promise
		if (this.tokenPromise) {
			return this.tokenPromise;
		}

		// Create a promise that resolves when token is set or times out
		this.tokenPromise = new Promise((resolve) => {
			let attempts = 0;
			const maxAttempts = 100; // 5 seconds max wait (100 * 50ms)

			const checkToken = () => {
				if (this.isInitialized) {
					resolve(this.token);
				} else if (attempts >= maxAttempts) {
					// Timeout - resolve with null to continue without token
					console.warn(
						"Token initialization timeout, continuing without authentication",
					);
					resolve(null);
				} else {
					attempts++;
					// Check again in 50ms
					setTimeout(checkToken, 50);
				}
			};
			checkToken();
		});

		return this.tokenPromise;
	}

	// Determine if endpoint requires authentication
	private isAuthenticatedEndpoint(endpoint: string): boolean {
		const publicEndpoints = [
			"/api/products/public",
			"/api/categories/public",
			"/api/products/",
			"/api/categories",
			"/api/tags",
			"/api/subscription-plans",
			"/api/payment/create-session",
			"/api/payment/confirm",
		];

		// Check if it's a public endpoint
		const isPublic = publicEndpoints.some((publicEndpoint) =>
			endpoint.startsWith(publicEndpoint),
		);

		return !isPublic;
	}

	private async request<T>(
		endpoint: string,
		options: RequestInit = {},
	): Promise<ApiResponse<T>> {
		const url = `${this.baseURL}${endpoint}`;
		const method = (options.method || "GET").toString().toUpperCase();

		// Wait for token to be initialized for authenticated endpoints
		const needsAuth = this.isAuthenticatedEndpoint(endpoint);
		if (needsAuth) {
			await this.waitForToken();
		}

		const headers: HeadersInit = {
			"Content-Type": "application/json",
			...options.headers,
		};

		// Only add Authorization header for authenticated endpoints
		if (needsAuth && this.token && this.token.length > 0) {
			(headers as any).Authorization = `Bearer ${this.token}`;
		}

		// For GET requests, dedupe concurrent calls for the same URL
		if (method === "GET") {
			const existing = this.inflight.get(url);
			if (existing) {
				return existing as Promise<ApiResponse<T>>;
			}
			const p = (async (): Promise<ApiResponse<T>> => {
				try {
					const response = await fetch(url, {
						...options,
						headers,
					});
					const data = await response.json();
					if (!response.ok) {
						// Handle authorization errors more gracefully
						if (response.status === 401 || response.status === 403) {
							const errorMessage = data.error?.message || data.message || "";
							if (endpoint.startsWith("/api/cart")) {
								return {
									error: {
										status: response.status,
										name: "AuthenticationRequired",
										message: "Authorization header missing or invalid",
									},
								};
							}
							if (
								errorMessage.includes("Authorization header missing") &&
								!this.isAuthenticatedEndpoint(endpoint)
							) {
								console.warn(
									`Authorization error on public endpoint ${endpoint}, continuing...`,
								);
							} else if (
								errorMessage.includes("Authorization header missing") ||
								errorMessage.includes("invalid") ||
								response.status === 403
							) {
								return {
									error: {
										status: response.status,
										name: "AuthenticationRequired",
										message: "Bu işlem için giriş yapmanız gerekiyor",
									},
								};
							}
						}
						return {
							error: {
								status: response.status,
								name: data.error?.name || "ApiError",
								message:
									data.error?.message || data.message || "API request failed",
							},
						};
					}
					return { data, message: data.message };
				} catch (error) {
					return {
						error: {
							status: 0,
							name: "NetworkError",
							message:
								error instanceof Error
									? error.message
									: "Network error occurred",
						},
					};
				} finally {
					this.inflight.delete(url);
				}
			})();
			this.inflight.set(url, p as Promise<ApiResponse<any>>);
			return p as Promise<ApiResponse<T>>;
		}

		try {
			const response = await fetch(url, {
				...options,
				headers,
			});

			const data = await response.json();

			if (!response.ok) {
				// Handle authorization errors more gracefully
				if (response.status === 401 || response.status === 403) {
					const errorMessage = data.error?.message || data.message || "";

					// For cart endpoints, handle auth errors gracefully
					if (endpoint.startsWith("/api/cart")) {
						return {
							error: {
								status: response.status,
								name: "AuthenticationRequired",
								message: "Authorization header missing or invalid",
							},
						};
					}

					// If it's an authorization header missing error and it's a public endpoint, ignore it
					if (
						errorMessage.includes("Authorization header missing") &&
						!this.isAuthenticatedEndpoint(endpoint)
					) {
						// For public endpoints, continue without token
						console.warn(
							`Authorization error on public endpoint ${endpoint}, continuing...`,
						);
					} else if (
						errorMessage.includes("Authorization header missing") ||
						errorMessage.includes("invalid") ||
						response.status === 403
					) {
						// For authenticated endpoints, this is expected if user is not logged in
						// Also handle 403 Forbidden errors
						return {
							error: {
								status: response.status,
								name: "AuthenticationRequired",
								message: "Bu işlem için giriş yapmanız gerekiyor",
							},
						};
					}
				}

				return {
					error: {
						status: response.status,
						name: data.error?.name || "ApiError",
						message:
							data.error?.message || data.message || "API request failed",
					},
				};
			}

			return { data, message: data.message };
		} catch (error) {
			return {
				error: {
					status: 0,
					name: "NetworkError",
					message:
						error instanceof Error ? error.message : "Network error occurred",
				},
			};
		}
	}

	// Public endpoints (no authentication required)
	async getProducts(params?: {
		populate?: string;
		filters?: Record<string, any>;
		pagination?: { page: number; pageSize: number };
		locale?: string;
	}) {
		const searchParams = new URLSearchParams();

		if (params?.populate) searchParams.append("populate", params.populate);
		if (params?.locale) searchParams.append("locale", params.locale);
		if (params?.pagination) {
			searchParams.append(
				"pagination[page]",
				params.pagination.page.toString(),
			);
			searchParams.append(
				"pagination[pageSize]",
				params.pagination.pageSize.toString(),
			);
		}
		if (params?.filters) {
			Object.entries(params.filters).forEach(([key, value]) => {
				// Strapi expects filters in format: filters[field][$eq]=value for exact match
				searchParams.append(`filters[${key}][$eq]`, value.toString());
			});
		}

		const queryString = searchParams.toString();
		return this.request(`/api/products${queryString ? `?${queryString}` : ""}`);
	}

	// Public product endpoints (no authentication required)
	async getPublicProducts(params?: {
		locale?: string;
		page?: number;
		pageSize?: number;
		category?: string;
	}) {
		const searchParams = new URLSearchParams();

		if (params?.locale) searchParams.append("locale", params.locale);
		if (params?.page) searchParams.append("page", params.page.toString());
		if (params?.pageSize)
			searchParams.append("pageSize", params.pageSize.toString());
		if (params?.category) searchParams.append("category", params.category);

		const queryString = searchParams.toString();
		return this.request(
			`/api/products/public${queryString ? `?${queryString}` : ""}`,
		);
	}

	async getPublicProduct(
		id: string | number,
		params?: {
			locale?: string;
		},
	) {
		const searchParams = new URLSearchParams();

		if (params?.locale) searchParams.append("locale", params.locale);

		const queryString = searchParams.toString();
		return this.request(
			`/api/products/public/${id}${queryString ? `?${queryString}` : ""}`,
		);
	}

	async getProduct(id: string | number, populate?: string) {
		const searchParams = new URLSearchParams();
		if (populate) searchParams.append("populate", populate);

		const queryString = searchParams.toString();
		return this.request(
			`/api/products/${id}${queryString ? `?${queryString}` : ""}`,
		);
	}

	async getProductBySlug(
		slug: string,
		params?: {
			populate?: string;
			locale?: string;
		},
	) {
		const searchParams = new URLSearchParams();

		if (params?.populate) searchParams.append("populate", params.populate);
		if (params?.locale) searchParams.append("locale", params.locale);

		const queryString = searchParams.toString();
		const endpoint = `/api/products/${slug}${queryString ? `?${queryString}` : ""}`;

		const response = await this.request(endpoint);

		// If response.data is an object and has a "data" field, return response.data.data directly
		if (
			response.data &&
			typeof response.data === "object" &&
			"data" in response.data
		) {
			// If data is null or undefined, treat as not found
			if ((response.data as any).data == null) {
				return {
					error: {
						status: 404,
						name: "NotFound",
						message: "Product not found",
					},
				};
			}
			// If data is an array (legacy), return first item
			if (
				Array.isArray((response.data as any).data) &&
				(response.data as any).data.length > 0
			) {
				return {
					...response,
					data: (response.data as any).data[0],
				};
			}
			// If data is a single object, return it
			if (typeof (response.data as any).data === "object") {
				return {
					...response,
					data: (response.data as any).data,
				};
			}
		}

		// If no product found, return error
		if (
			response.data &&
			typeof response.data === "object" &&
			"data" in response.data &&
			Array.isArray((response.data as any).data) &&
			(response.data as any).data.length === 0
		) {
			return {
				error: {
					status: 404,
					name: "NotFound",
					message: "Product not found",
				},
			};
		}

		return response;
	}

	async getCategories(params?: {
		populate?: string;
		filters?: Record<string, any>;
	}) {
		const searchParams = new URLSearchParams();

		if (params?.populate) searchParams.append("populate", params.populate);
		if (params?.filters) {
			Object.entries(params.filters).forEach(([key, value]) => {
				// Strapi expects filters in format: filters[field][$eq]=value for exact match
				searchParams.append(`filters[${key}][$eq]`, value.toString());
			});
		}

		const queryString = searchParams.toString();
		return this.request(
			`/api/categories${queryString ? `?${queryString}` : ""}`,
		);
	}

	// Public category endpoint
	async getPublicCategories(params?: { locale?: string }) {
		const searchParams = new URLSearchParams();

		if (params?.locale) searchParams.append("locale", params.locale);

		const queryString = searchParams.toString();
		return this.request(
			`/api/categories/public${queryString ? `?${queryString}` : ""}`,
		);
	}

	async getTags(params?: { populate?: string; filters?: Record<string, any> }) {
		const searchParams = new URLSearchParams();

		if (params?.populate) searchParams.append("populate", params.populate);
		if (params?.filters) {
			Object.entries(params.filters).forEach(([key, value]) => {
				// Strapi expects filters in format: filters[field][$eq]=value for exact match
				searchParams.append(`filters[${key}][$eq]`, value.toString());
			});
		}

		const queryString = searchParams.toString();
		return this.request(`/api/tags${queryString ? `?${queryString}` : ""}`);
	}

	async getSubscriptionPlans(params?: {
		populate?: string;
		filters?: Record<string, any>;
	}) {
		const searchParams = new URLSearchParams();

		if (params?.populate) searchParams.append("populate", params.populate);
		if (params?.filters) {
			Object.entries(params.filters).forEach(([key, value]) => {
				// Strapi expects filters in format: filters[field][$eq]=value for exact match
				searchParams.append(`filters[${key}][$eq]`, value.toString());
			});
		}

		const queryString = searchParams.toString();
		return this.request(
			`/api/subscription-plans${queryString ? `?${queryString}` : ""}`,
		);
	}

	// Cart endpoints (require authentication)
	async getCartItems(sessionId: string) {
		return this.request(`/api/cart?sessionId=${sessionId}`);
	}

	async addToCart(data: {
		productId: number;
		quantity: number;
		sessionId: string;
		purchaseType?: "one_time" | "subscription";
		subscriptionInterval?: any;
		deliveryDay?: number;
		finalPrice?: number;
	}) {
		return this.request("/api/cart/add", {
			method: "POST",
			body: JSON.stringify(data),
		});
	}

	async updateCartItem(id: string, data: { quantity: number }) {
		return this.request(`/api/cart/items/${id}`, {
			method: "PUT",
			body: JSON.stringify(data),
		});
	}

	async removeCartItem(id: string) {
		return this.request(`/api/cart/items/${id}`, {
			method: "DELETE",
		});
	}

	// Payment endpoints
	async createPaymentSession(data: {
		cartItems: any[];
		addressId: number;
		paymentMethod: string;
	}) {
		return this.request("/api/payment/create-session", {
			method: "POST",
			body: JSON.stringify(data),
		});
	}

	async confirmPayment(sessionId: string, paymentData: any) {
		return this.request("/api/payment/confirm", {
			method: "POST",
			body: JSON.stringify({
				sessionId,
				...paymentData,
			}),
		});
	}

	// Email verification endpoints
	async sendEmailVerification(email: string) {
		return this.request("/api/auth/send-email-verification", {
			method: "POST",
			body: JSON.stringify({ email }),
		});
	}

	async verifyEmail(email: string, verificationCode: string) {
		return this.request("/api/auth/verify-email", {
			method: "POST",
			body: JSON.stringify({ email, verificationCode }),
		});
	}

	async updateProfile(data: {
		firstName?: string;
		lastName?: string;
		email?: string;
	}) {
		return this.request("/api/auth/update-profile", {
			method: "PUT",
			body: JSON.stringify(data),
		});
	}

	async updateUsername(username: string) {
		return this.request("/api/auth/update-username", {
			method: "PUT",
			body: JSON.stringify({ username }),
		});
	}

	async changePassword(currentPassword: string, newPassword: string) {
		return this.request("/api/auth/change-password", {
			method: "PUT",
			body: JSON.stringify({ currentPassword, newPassword }),
		});
	}

	// Authenticated endpoints
	async getMyOrders() {
		return this.request("/api/orders/my-orders");
	}

	async createOrder(data: {
		cartItems: Array<{
			productId: number;
			quantity: number;
		}>;
		billingAddress: {
			first_name: string;
			last_name: string;
			email: string;
			phone: string;
			address_line_1: string;
			city: string;
			state: string;
			postal_code: string;
			country: string;
		};
		shippingAddress: {
			first_name: string;
			last_name: string;
			email: string;
			phone: string;
			address_line_1: string;
			city: string;
			state: string;
			postal_code: string;
			country: string;
		};
		paymentMethod: string;
		notes?: string;
	}) {
		return this.request("/api/orders", {
			method: "POST",
			body: JSON.stringify(data),
		});
	}

	async getOrder(id: string | number) {
		return this.request(`/api/orders/${id}`);
	}

	async getMySubscriptions() {
		return this.request("/api/subscribers/my-subscriptions");
	}

	async createSubscription(data: {
		planId: number;
		paymentCard: {
			cardHolderName: string;
			cardNumber: string;
			expireMonth: string;
			expireYear: string;
			cvc: string;
		};
		billingAddress: {
			first_name: string;
			last_name: string;
			email: string;
			phone: string;
			address_line_1: string;
			city: string;
			state: string;
			postal_code: string;
			country: string;
		};
		shippingAddress: {
			first_name: string;
			last_name: string;
			email: string;
			phone: string;
			address_line_1: string;
			city: string;
			state: string;
			postal_code: string;
			country: string;
		};
	}) {
		return this.request("/api/subscribers/subscribe", {
			method: "POST",
			body: JSON.stringify(data),
		});
	}

	async cancelSubscription(id: number, reason?: string) {
		return this.request(`/api/subscribers/${id}/cancel`, {
			method: "POST",
			body: JSON.stringify({ reason }),
		});
	}

	async retrySubscriptionPayment(id: number) {
		return this.request(`/api/subscribers/${id}/retry-payment`, {
			method: "POST",
		});
	}

	// Delivery Stock endpoints
	async getDeliveryDayStock(_productId?: number) {
		// For now, return mock data. Can be connected to backend API later
		// When connecting to real API, uncomment the line below and remove the mock data
		// return this.request(`/api/delivery-stock${_productId ? `?productId=${_productId}` : ''}`);

		// Mock data - replace with actual API call
		return Promise.resolve({
			data: {
				1: 0, // Pazartesi - disabled by default
				2: 15, // Salı
				3: 8, // Çarşamba
				4: 20, // Perşembe
				5: 0, // Cuma - no stock
				6: 12, // Cumartesi
				7: 0, // Pazar - disabled by default
			},
		});
	}
}

// Create singleton instance
export const apiClient = new ApiClient(API_BASE_URL);

// Helper function to initialize API client with token
export const initializeApiClient = (token: string | null) => {
	apiClient.setToken(token);
};

// Helper function to check if API client is ready
export const isApiClientReady = () => {
	return apiClient.isReady();
};

// Helper function to wait for API client to be ready
export const onApiClientReady = (callback: () => void) => {
	apiClient.onReady(callback);
};
