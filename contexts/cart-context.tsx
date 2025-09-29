"use client";

import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import {
	apiClient,
	isApiClientReady,
	onApiClientReady,
} from "@/lib/api-client";

interface SubscriptionInterval {
	key: string;
	days: number;
	name: string;
	price: number;
	name_en: string;
	currency: string;
	discount: number;
	description: string;
	description_en: string;
}

interface CartProduct {
	id: number;
	documentId: string;
	name: string;
	slug: string;
	product_id: string;
	description: string;
	short_description: string | null;
	is_active: boolean;
	in_stock: boolean;
	stock_quantity: number;
	price: number;
	sale_price: number;
	currency: string;
	vat_rate: number;
	vat_included: boolean;
	discount_percentage: number;
	discount_amount: number;
	discount_start_date: string | null;
	discount_end_date: string | null;
	product_type: string;
	subscription_enabled: boolean;
	one_time_purchase_enabled: boolean;
	subscription_intervals: SubscriptionInterval[];
	images?: Array<{
		id: number;
		url: string;
		alternativeText?: string;
		formats?: {
			thumbnail?: { url: string };
			small?: { url: string };
			medium?: { url: string };
			large?: { url: string };
		};
	}>;
	categories?: Array<{
		id: number;
		name: string;
		slug: string;
	}>;
}

interface CartItem {
	id: number;
	documentId: string;
	session_id: string;
	quantity: number;
	purchase_type: "one_time" | "subscription";
	subscription_interval: string;
	subscription_interval_count: number;
	unit_price: number;
	total_price: number;
	currency: string;
	notes: string | null;
	is_active: boolean;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	locale: string | null;
	user?: any;
	product: CartProduct;
	formatted_unit_price: string;
	formatted_total_price: string;
}

interface CartSummary {
	item_count: number;
	subtotal: number;
	formatted_subtotal: string;
}

interface CartContextType {
	items: CartItem[];
	summary: CartSummary | null;
	totalItems: number;
	totalPrice: number;
	isLoading: boolean;
	error: string | null;
	addItem: (
		productId: number,
		quantity?: number,
		purchaseType?: "one_time" | "subscription",
		subscriptionInterval?: SubscriptionInterval,
		deliveryDay?: number,
	) => Promise<{ success: boolean; message?: string }>;
	updateItem: (
		itemId: string,
		quantity: number,
	) => Promise<{ success: boolean; message?: string }>;
	removeItem: (
		itemId: string,
	) => Promise<{ success: boolean; message?: string }>;
	clearCart: () => Promise<{ success: boolean; message?: string }>;
	loadCart: () => Promise<void>;
	getSessionId: () => string;
	clearError: () => void;
	getDeliveryDayName: (dayId: number) => string;
	formatCartItemDescription: (item: CartItem) => string;
	getProductImage: (product: CartProduct) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
	const [items, setItems] = useState<CartItem[]>([]);
	const [summary, setSummary] = useState<CartSummary | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Generate or get session ID
	const getSessionId = useCallback((): string => {
		if (typeof window === "undefined") return "";

		let sessionId = localStorage.getItem("cart_session_id");
		if (!sessionId) {
			sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
			localStorage.setItem("cart_session_id", sessionId);
		}
		return sessionId;
	}, []);

	// Calculate totals
	const totalItems =
		summary?.item_count || items.reduce((sum, item) => sum + item.quantity, 0);
	const totalPrice =
		summary?.subtotal || items.reduce((sum, item) => sum + item.total_price, 0);

	const clearError = () => setError(null);

	// Helper function to get delivery day name
	const getDeliveryDayName = (dayId: number): string => {
		const days = [
			{ id: 1, name: "Pazartesi" },
			{ id: 2, name: "Salı" },
			{ id: 3, name: "Çarşamba" },
			{ id: 4, name: "Perşembe" },
			{ id: 5, name: "Cuma" },
			{ id: 6, name: "Cumartesi" },
			{ id: 7, name: "Pazar" },
		];
		return days.find((d) => d.id === dayId)?.name || "Belirtilmemiş";
	};

	// Helper function to format cart item description
	const formatCartItemDescription = (item: CartItem): string => {
		if (item.purchase_type === "subscription") {
			const interval = item.product.subscription_intervals.find(
				(interval) => interval.key === item.subscription_interval,
			);
			return `${interval?.name || item.subscription_interval} abonelik`;
		}
		return "Tek seferlik satın alma";
	};

	// Helper function to get product image
	const getProductImage = (product: CartProduct): string => {
		if (!product.images || product.images.length === 0) {
			return "/placeholder.svg";
		}

		const image = product.images[0];
		// Use medium size if available, otherwise fallback to original
		if (image.url) {
			return `${process.env.NEXT_PUBLIC_API_URL}${image.url}`;
		}
		if (image.formats?.medium?.url) {
			return `${process.env.NEXT_PUBLIC_API_URL}${image.formats.medium.url}`;
		}
		if (image.formats?.small?.url) {
			return `${process.env.NEXT_PUBLIC_API_URL}${image.formats.small.url}`;
		}
		return "/placeholder.svg";
	};

	const loadCart = useCallback(async (): Promise<void> => {
		try {
			setIsLoading(true);
			setError(null);

			const sessionId = getSessionId();
			const response = await apiClient.getCartItems(sessionId);

			if (response.error) {
				// Handle authentication errors gracefully
				if (
					response.error.status === 401 ||
					response.error.message.includes("Authorization header missing") ||
					response.error.message.includes("invalid") ||
					response.error.name === "AuthenticationRequired"
				) {
					console.log(
						"Cart requires authentication, user not logged in - this is expected",
					);
					setItems([]);
					setSummary(null);
					return;
				}
				throw new Error(response.error.message);
			}

			// Handle the new API response structure
			const data = response.data as {
				success: boolean;
				cart_items: CartItem[];
				summary: CartSummary | null;
			};
			if (data.success && data.cart_items) {
				setItems(data.cart_items);
				setSummary(data.summary || null);
			} else {
				setItems([]);
				setSummary(null);
			}
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : "Sepet yüklenemedi";

			// Don't show authentication errors to user for cart loading
			if (
				!errorMessage.includes("giriş yapmanız gerekiyor") &&
				!errorMessage.includes("AuthenticationRequired") &&
				!errorMessage.includes("Authorization header missing")
			) {
				setError(errorMessage);
			}

			console.error("Cart load error:", err);
			setItems([]);
			setSummary(null);
		} finally {
			setIsLoading(false);
		}
	}, [getSessionId]);

	const addItem = async (
		productId: number,
		quantity: number = 1,
		purchaseType: "one_time" | "subscription" = "one_time",
		subscriptionInterval?: SubscriptionInterval,
		deliveryDay?: number,
	): Promise<{ success: boolean; message?: string }> => {
		try {
			setIsLoading(true);
			setError(null);

			const sessionId = getSessionId();

			// For now, we'll add items separately (existing items logic can be added later)
			// const existingItem = items.find(item =>
			//   item.product.id === productId &&
			//   item.purchase_type === purchaseType &&
			//   item.subscription_interval === subscriptionInterval?.key
			// )

			// if (existingItem) {
			//   // Update existing item quantity
			//   return await updateItem(existingItem.id, existingItem.quantity + quantity)
			// }

			const finalPrice = subscriptionInterval?.price || undefined;

			const response = await apiClient.addToCart({
				productId,
				quantity,
				sessionId,
				purchaseType,
				subscriptionInterval,
				deliveryDay,
				finalPrice,
			});

			if (response.error) {
				throw new Error(response.error.message);
			}

			// Reload cart to get updated data
			await loadCart();

			const message =
				purchaseType === "subscription"
					? "Abonelik sepete eklendi"
					: "Ürün sepete eklendi";

			return { success: true, message };
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : "Ürün sepete eklenemedi";
			setError(errorMessage);
			return { success: false, message: errorMessage };
		} finally {
			setIsLoading(false);
		}
	};

	const updateItem = async (
		itemId: string,
		quantity: number,
	): Promise<{ success: boolean; message?: string }> => {
		try {
			setIsLoading(true);
			setError(null);

			if (quantity <= 0) {
				return await removeItem(itemId);
			}

			const response = await apiClient.updateCartItem(itemId, { quantity });

			if (response.error) {
				throw new Error(response.error.message);
			}

			// Update local state
			setItems((prevItems) =>
				prevItems.map((item) =>
					item.documentId === itemId ? { ...item, quantity } : item,
				),
			);

			return { success: true, message: "Sepet güncellendi" };
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : "Sepet güncellenemedi";
			setError(errorMessage);
			return { success: false, message: errorMessage };
		} finally {
			setIsLoading(false);
		}
	};

	const removeItem = async (
		itemId: string,
	): Promise<{ success: boolean; message?: string }> => {
		try {
			setIsLoading(true);
			setError(null);

			const response = await apiClient.removeCartItem(itemId);

			if (response.error) {
				throw new Error(response.error.message);
			}

			// Update local state
			setItems((prevItems) =>
				prevItems.filter((item) => item.documentId !== itemId),
			);

			return { success: true, message: "Ürün sepetten çıkarıldı" };
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : "Ürün sepetten çıkarılamadı";
			setError(errorMessage);
			return { success: false, message: errorMessage };
		} finally {
			setIsLoading(false);
		}
	};

	const clearCart = async (): Promise<{
		success: boolean;
		message?: string;
	}> => {
		try {
			setIsLoading(true);
			setError(null);

			// Remove all items one by one
			const removePromises = items.map((item) =>
				apiClient.removeCartItem(item.documentId),
			);
			await Promise.all(removePromises);

			setItems([]);

			return { success: true, message: "Sepet temizlendi" };
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : "Sepet temizlenemedi";
			setError(errorMessage);
			return { success: false, message: errorMessage };
		} finally {
			setIsLoading(false);
		}
	};

	// Load cart on mount, but wait for API client to be ready
	useEffect(() => {
		if (isApiClientReady()) {
			// API client is already ready, load cart immediately
			loadCart();
		} else {
			// Wait for API client to be ready
			onApiClientReady(() => {
				loadCart();
			});
		}
	}, [loadCart]);

	const value: CartContextType = {
		items,
		summary,
		totalItems,
		totalPrice,
		isLoading,
		error,
		addItem,
		updateItem,
		removeItem,
		clearCart,
		loadCart,
		getSessionId,
		clearError,
		getDeliveryDayName,
		formatCartItemDescription,
		getProductImage,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
	const context = useContext(CartContext);
	if (context === undefined) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return context;
}
