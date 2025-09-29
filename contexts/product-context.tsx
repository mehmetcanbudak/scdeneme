"use client";

import {
	createContext,
	useContext,
	useState,
	useEffect,
	type ReactNode,
} from "react";
import { apiClient } from "@/lib/api-client";

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

export function ProductProvider({ children }: { children: ReactNode }) {
	const [products, setProducts] = useState<Product[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);
	const [tags, setTags] = useState<Tag[]>([]);
	const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const clearError = () => setError(null);

	const loadProducts = async (params?: {
		populate?: string;
		filters?: Record<string, any>;
		pagination?: { page: number; pageSize: number };
	}): Promise<void> => {
		try {
			setIsLoading(true);
			setError(null);

			const response = await apiClient.getProducts({
				populate: params?.populate || "*",
				filters: params?.filters,
				pagination: params?.pagination,
			});

			if (response.error) {
				throw new Error(response.error.message);
			}

			setProducts(response.data || []);
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : "Ürünler yüklenemedi";
			setError(errorMessage);
			console.error("Products load error:", err);
		} finally {
			setIsLoading(false);
		}
	};

	const loadProduct = async (id: string | number): Promise<Product | null> => {
		try {
			setIsLoading(true);
			setError(null);

			const response = await apiClient.getProduct(id, "*");

			if (response.error) {
				throw new Error(response.error.message);
			}

			return response.data || null;
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : "Ürün yüklenemedi";
			setError(errorMessage);
			console.error("Product load error:", err);
			return null;
		} finally {
			setIsLoading(false);
		}
	};

	const loadCategories = async (): Promise<void> => {
		try {
			setIsLoading(true);
			setError(null);

			const response = await apiClient.getCategories({
				populate: "image",
			});

			if (response.error) {
				throw new Error(response.error.message);
			}

			setCategories(response.data || []);
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : "Kategoriler yüklenemedi";
			setError(errorMessage);
			console.error("Categories load error:", err);
		} finally {
			setIsLoading(false);
		}
	};

	const loadTags = async (): Promise<void> => {
		try {
			setIsLoading(true);
			setError(null);

			const response = await apiClient.getTags();

			if (response.error) {
				throw new Error(response.error.message);
			}

			setTags(response.data || []);
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : "Etiketler yüklenemedi";
			setError(errorMessage);
			console.error("Tags load error:", err);
		} finally {
			setIsLoading(false);
		}
	};

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

			setProducts(response.data || []);
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

			setProducts(response.data || []);
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : "Filtreleme yapılamadı";
			setError(errorMessage);
			console.error("Product filter error:", err);
		} finally {
			setIsLoading(false);
		}
	};

	// Load initial data
	useEffect(() => {
		const initializeData = async () => {
			await Promise.all([
				loadProducts({ populate: "*", pagination: { page: 1, pageSize: 20 } }),
				loadCategories(),
				loadTags(),
			]);
		};

		initializeData();
	}, []);

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
