"use client";

import { apiClient } from "@/lib/api-client";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
	type ReactNode,
} from "react";

interface Product {
	id: number;
	name: string;
	description?: string;
	price: number;
	stock?: number;
	images?: Array<{
		id: number;
		url: string;
		alternativeText?: string;
		width?: number;
		height?: number;
	}>;
	category?: {
		id: number;
		name: string;
		slug: string;
	};
	tags?: Array<{
		id: number;
		name: string;
		slug: string;
	}>;
	createdAt: string;
	updatedAt: string;
}

interface Category {
	id: number;
	name: string;
	slug: string;
	description?: string;
	image?: {
		url: string;
		alternativeText?: string;
	};
	createdAt: string;
	updatedAt: string;
}

interface Tag {
	id: number;
	name: string;
	slug: string;
	createdAt: string;
	updatedAt: string;
}

interface ProductContextType {
	products: Product[];
	categories: Category[];
	tags: Tag[];
	featuredProducts: Product[];
	isLoading: boolean;
	error: string | null;
	loadProducts: (params?: {
		populate?: string;
		filters?: Record<string, any>;
		pagination?: { page: number; pageSize: number };
	}) => Promise<void>;
	loadProduct: (id: string | number) => Promise<Product | null>;
	loadCategories: () => Promise<void>;
	loadTags: () => Promise<void>;
	searchProducts: (query: string) => Promise<void>;
	filterProducts: (filters: Record<string, any>) => Promise<void>;
	clearError: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Simple cache implementation
const cache = new Map<string, { data: any; timestamp: number; ttl: number }>();

const getCachedData = (key: string) => {
	const cached = cache.get(key);
	if (cached && Date.now() - cached.timestamp < cached.ttl) {
		return cached.data;
	}
	cache.delete(key);
	return null;
};

const setCachedData = (key: string, data: any, ttl: number = 5 * 60 * 1000) => {
	cache.set(key, { data, timestamp: Date.now(), ttl });
};

export function ProductProvider({ children }: { children: ReactNode }) {
	const [products, setProducts] = useState<Product[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);
	const [tags, setTags] = useState<Tag[]>([]);
	const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const clearError = () => setError(null);

	const loadProducts = useCallback(
		async (params?: {
			populate?: string;
			filters?: Record<string, any>;
			pagination?: { page: number; pageSize: number };
		}): Promise<void> => {
			try {
				setIsLoading(true);
				setError(null);

				// Create cache key
				const cacheKey = `products-${JSON.stringify(params)}`;
				const cachedData = getCachedData(cacheKey);

				if (cachedData) {
					setProducts(cachedData);
					setIsLoading(false);
					return;
				}

				const controller = new AbortController();
				const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

				const response = await apiClient.getProducts({
					populate: params?.populate || "*",
					filters: params?.filters,
					pagination: params?.pagination,
				});

				clearTimeout(timeoutId);

				if (response.error) {
					// If it's an authentication error, log it but don't fail
					if (
						response.error.name === "AuthenticationRequired" ||
						response.error.status === 401 ||
						response.error.status === 403
					) {
						console.warn(
							"Products endpoint requires authentication, skipping products load:",
							response.error.message,
						);
						setProducts([]);
						return;
					}
					throw new Error(response.error.message);
				}

				const productsData = (response.data || []) as Product[];
				setProducts(productsData);
				setCachedData(cacheKey, productsData);
			} catch (err) {
				if (err instanceof Error && err.name === "AbortError") {
					console.warn("Products request timed out");
					setError("Ürünler yüklenirken zaman aşımı oluştu");
				} else {
					const errorMessage =
						err instanceof Error ? err.message : "Ürünler yüklenemedi";
					// Don't set error state for authentication issues
					if (
						errorMessage.includes("giriş yapmanız gerekiyor") ||
						errorMessage.includes("Authentication")
					) {
						console.warn(
							"Products load requires authentication, skipping:",
							err,
						);
						setProducts([]);
					} else {
						setError(errorMessage);
						console.error("Products load error:", err);
					}
				}
			} finally {
				setIsLoading(false);
			}
		},
		[],
	);

	const loadProduct = useCallback(
		async (id: string | number): Promise<Product | null> => {
			try {
				setIsLoading(true);
				setError(null);

				const response = await apiClient.getProduct(id, "*");

				if (response.error) {
					throw new Error(response.error.message);
				}

				return (response.data as Product) || null;
			} catch (err) {
				const errorMessage =
					err instanceof Error ? err.message : "Ürün yüklenemedi";
				setError(errorMessage);
				console.error("Product load error:", err);
				return null;
			} finally {
				setIsLoading(false);
			}
		},
		[],
	);

	const loadCategories = useCallback(async (): Promise<void> => {
		try {
			setIsLoading(true);
			setError(null);

			const response = await apiClient.getCategories({
				populate: "image",
			});

			if (response.error) {
				// If it's an authentication error, log it but don't fail
				if (
					response.error.name === "AuthenticationRequired" ||
					response.error.status === 401 ||
					response.error.status === 403
				) {
					console.warn(
						"Categories endpoint requires authentication, skipping categories load:",
						response.error.message,
					);
					setCategories([]);
					return;
				}
				throw new Error(response.error.message);
			}

			setCategories(
				(Array.isArray(response.data) ? response.data : []) as Category[],
			);
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : "Kategoriler yüklenemedi";
			// Don't set error state for authentication issues
			if (
				errorMessage.includes("giriş yapmanız gerekiyor") ||
				errorMessage.includes("Authentication")
			) {
				console.warn("Categories load requires authentication, skipping:", err);
				setCategories([]);
			} else {
				setError(errorMessage);
				console.error("Categories load error:", err);
			}
		} finally {
			setIsLoading(false);
		}
	}, []);

	const loadTags = useCallback(async (): Promise<void> => {
		try {
			setIsLoading(true);
			setError(null);

			const response = await apiClient.getTags();

			if (response.error) {
				// If it's an authentication error, log it but don't fail
				if (
					response.error.name === "AuthenticationRequired" ||
					response.error.status === 401 ||
					response.error.status === 403
				) {
					console.warn(
						"Tags endpoint requires authentication, skipping tags load:",
						response.error.message,
					);
					setTags([]);
					return;
				}
				throw new Error(response.error.message);
			}

			setTags((Array.isArray(response.data) ? response.data : []) as Tag[]);
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : "Etiketler yüklenemedi";
			// Don't set error state for authentication issues
			if (
				errorMessage.includes("giriş yapmanız gerekiyor") ||
				errorMessage.includes("Authentication")
			) {
				console.warn("Tags load requires authentication, skipping:", err);
				setTags([]);
			} else {
				setError(errorMessage);
				console.error("Tags load error:", err);
			}
		} finally {
			setIsLoading(false);
		}
	}, []);

	const searchProducts = async (query: string): Promise<void> => {
		if (!query.trim()) {
			await loadProducts();
			return;
		}

		try {
			setIsLoading(true);
			setError(null);

			const response = await apiClient.getProducts({
				populate: "*",
				filters: {
					name: { $containsi: query },
				},
			});

			if (response.error) {
				throw new Error(response.error.message);
			}

			setProducts(
				(Array.isArray(response.data) ? response.data : []) as Product[],
			);
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : "Arama yapılamadı";
			setError(errorMessage);
			console.error("Product search error:", err);
		} finally {
			setIsLoading(false);
		}
	};

	const filterProducts = async (
		filters: Record<string, any>,
	): Promise<void> => {
		try {
			setIsLoading(true);
			setError(null);

			const response = await apiClient.getProducts({
				populate: "*",
				filters,
			});

			if (response.error) {
				throw new Error(response.error.message);
			}

			setProducts(
				(Array.isArray(response.data) ? response.data : []) as Product[],
			);
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : "Filtreleme yapılamadı";
			setError(errorMessage);
			console.error("Product filter error:", err);
		} finally {
			setIsLoading(false);
		}
	};

	// Load initial data (once per mount)
	const didInitRef = useRef(false);
	useEffect(() => {
		if (didInitRef.current) return;
		didInitRef.current = true;
		const initializeData = async () => {
			await Promise.all([
				loadProducts({ populate: "*", pagination: { page: 1, pageSize: 10 } }),
				loadCategories(),
				loadTags(),
			]);
		};

		initializeData();
	}, [loadCategories, loadProducts, loadTags]);

	// Set featured products (first 6 products)
	useEffect(() => {
		if (products.length > 0) {
			setFeaturedProducts(products.slice(0, 6));
		}
	}, [products]);

	const value: ProductContextType = {
		products,
		categories,
		tags,
		featuredProducts,
		isLoading,
		error,
		loadProducts,
		loadProduct,
		loadCategories,
		loadTags,
		searchProducts,
		filterProducts,
		clearError,
	};

	return (
		<ProductContext.Provider value={value}>{children}</ProductContext.Provider>
	);
}

export function useProducts() {
	const context = useContext(ProductContext);
	if (context === undefined) {
		throw new Error("useProducts must be used within a ProductProvider");
	}
	return context;
}
