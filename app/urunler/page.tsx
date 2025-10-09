"use client";

import HeroHeader from "@/components/hero-header";
import { Button } from "@/components/ui/button";
import { useFooterColorSetter } from "@/hooks/use-footer-color";
import { useHeaderColor } from "@/hooks/use-header-color";
import { useNavigationTransparency } from "@/hooks/use-navigation-transparency";
import { apiClient } from "@/lib/api-client";
import { ArrowRight, Package, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo, useCallback, useEffect, useId, useMemo, useState } from "react";

interface Product {
	id: number;
	name: string;
	slug: string;
	description?: string;
	price: number;
	sale_price?: number;
	image?: string;
	images?: Array<{ url: string }>;
	category?: string;
	stock?: number;
	featured?: boolean;
}

/**
 * Product card component
 */
const ProductCard = memo(function ProductCard({
	product,
}: {
	product: Product;
}) {
	const router = useRouter();

	const handleProductClick = useCallback(() => {
		router.push(`/abonelik/${product.slug}`);
	}, [router, product.slug]);

	// Get the first available image
	const productImage = useMemo(() => {
		if (product.image) {
			return product.image.startsWith("http")
				? product.image
				: `${process.env.NEXT_PUBLIC_API_URL}${product.image}`;
		}
		if (product.images && product.images.length > 0) {
			const imageUrl = product.images[0].url;
			return imageUrl.startsWith("http")
				? imageUrl
				: `${process.env.NEXT_PUBLIC_API_URL}${imageUrl}`;
		}
		return "/placeholder.svg";
	}, [product.image, product.images]);

	// Format price
	const formatPrice = (price: number) => {
		return new Intl.NumberFormat("tr-TR", {
			style: "currency",
			currency: "TRY",
			minimumFractionDigits: 0,
			maximumFractionDigits: 2,
		}).format(price);
	};

	// Calculate discount
	const discountInfo = useMemo(() => {
		if (product.sale_price && product.sale_price < product.price) {
			const discountAmount = product.price - product.sale_price;
			const discountPercentage = Math.round(
				(discountAmount / product.price) * 100,
			);
			return { hasDiscount: true, discountPercentage };
		}
		return { hasDiscount: false, discountPercentage: 0 };
	}, [product.price, product.sale_price]);

	return (
		<div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer">
			<div className="relative overflow-hidden">
				<div className="relative w-full h-48 overflow-hidden">
					<Image
						src={productImage}
						alt={product.name}
						fill
						className="object-cover group-hover:scale-105 transition-transform duration-300"
						sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
					/>
				</div>
				{product.featured && (
					<div className="absolute top-3 left-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
						<Star className="w-3 h-3" />
						Öne Çıkan
					</div>
				)}
				{discountInfo.hasDiscount && (
					<div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
						-%{discountInfo.discountPercentage}
					</div>
				)}
			</div>
			<div className="p-6">
				<h3 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-gray-600 transition-colors line-clamp-2">
					{product.name}
				</h3>
				{product.description && (
					<p className="text-gray-600 text-sm mb-4 line-clamp-2">
						{product.description}
					</p>
				)}
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center gap-2">
						{discountInfo.hasDiscount ? (
							<>
								<span className="text-lg font-bold text-red-600">
									{formatPrice(product.sale_price || 0)}
								</span>
								<span className="text-sm text-gray-500 line-through">
									{formatPrice(product.price)}
								</span>
							</>
						) : (
							<span className="text-lg font-bold text-gray-800">
								{formatPrice(product.price)}
							</span>
						)}
					</div>
					{product.stock !== undefined && (
						<span
							className={`text-xs px-2 py-1 rounded-full ${
								product.stock > 0
									? "bg-green-100 text-green-800"
									: "bg-red-100 text-red-800"
							}`}
						>
							{product.stock > 0 ? "Stokta" : "Tükendi"}
						</span>
					)}
				</div>
				<Button
					onClick={handleProductClick}
					className="w-full bg-green-600 hover:bg-green-700 text-white"
				>
					<Package className="w-4 h-4 mr-2" />
					Ürünü İncele
					<ArrowRight className="w-4 h-4 ml-2" />
				</Button>
			</div>
		</div>
	);
});

ProductCard.displayName = "ProductCard";

/**
 * Products page component
 */
export default function Urunler() {
	// Enable transparent navigation for hero section
	useNavigationTransparency(true);

	// Set header color for products page
	useHeaderColor("#9AB795");

	// Set footer color to match page background
	useFooterColorSetter("#9AB795");

	const mainContentId = useId();
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	/**
	 * Hero slides configuration
	 */
	const heroSlides = useMemo(
		() => [
			{
				title: "",
				subtitle: "",
				buttonText: "",
				image: "/urunler.png",
				mobileImage: "/urunler.png",
				mobileAlt: "Ürünler hero görseli",
			},
		],
		[],
	);

	/**
	 * Fetch products from API
	 */
	const fetchProducts = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);

			const response = await apiClient.getProducts({
				populate: "*",
				pagination: {
					page: 1,
					pageSize: 50, // Get more products
				},
			});

			if (response.error) {
				setError(response.error.message);
				return;
			}

			if (response.data) {
				// Handle different API response structures
				let productsData = response.data;

				// If response.data has a 'data' property (Strapi format), use that
				if (
					response.data &&
					typeof response.data === "object" &&
					"data" in response.data
				) {
					productsData = (response.data as any).data;
				}

				// Ensure we have an array
				if (Array.isArray(productsData)) {
					setProducts(productsData);
				} else {
					console.warn("Products data is not an array:", productsData);
					setProducts([]);
				}
			}
		} catch (err) {
			setError("Ürünler yüklenirken bir hata oluştu");
			console.error("Error fetching products:", err);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	// Error state
	if (error) {
		return (
			<div className="min-h-screen bg-[#9AB795] flex items-center justify-center pt-24">
				<div className="text-center">
					<div className="text-red-600 mb-4">
						<Package className="w-12 h-12 mx-auto" />
					</div>
					<h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight mb-4 md:mb-6 text-gray-800">
						Bir Hata Oluştu
					</h2>
					<p className="text-base leading-relaxed mb-6">{error}</p>
					<Button
						onClick={() => window.location.reload()}
						className="bg-gray-600 hover:bg-gray-700"
					>
						Tekrar Dene
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-[#9AB795] relative">
			{/* Hero Section */}
			<HeroHeader
				slides={heroSlides}
				singleImage={true}
				showDots={false}
				customHeight="100vh"
			/>

			{/* Main Content */}
			<main
				id={mainContentId}
				className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-8 relative z-10 bg-[#9AB795]"
			>
				<div className="mx-auto max-w-7xl">
					{/* Page Header */}
					<div className="text-center mb-12">
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-4 md:mb-6 text-gray-800">
							Ürünlerimiz
						</h1>
						<p className="text-lg leading-relaxed max-w-3xl mx-auto text-gray-700">
							Taze, sağlıklı ve lezzetli yeşilliklerimizi keşfedin. Her ürün,
							dikey tarım teknolojimizle özenle yetiştirilmiştir.
						</p>
					</div>

					{/* Products Grid */}
					{loading ? (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{Array.from({ length: 6 }).map((_, index) => (
								<div
									key={`loading-${index}`}
									className="bg-white rounded-2xl p-6 animate-pulse"
								>
									<div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
									<div className="h-4 bg-gray-200 rounded mb-2"></div>
									<div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
									<div className="h-8 bg-gray-200 rounded"></div>
								</div>
							))}
						</div>
					) : !Array.isArray(products) || products.length === 0 ? (
						<div className="text-center py-12">
							<div className="text-gray-400 mb-4">
								<Package className="w-16 h-16 mx-auto" />
							</div>
							<h3 className="text-xl font-semibold text-gray-600 mb-2">
								Henüz ürün bulunmuyor
							</h3>
							<p className="text-gray-500">Yakında yeni ürünler eklenecek.</p>
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{Array.isArray(products) &&
								products.map((product) => (
									<ProductCard key={product.id} product={product} />
								))}
						</div>
					)}

					{/* Call to Action */}
					{!loading && Array.isArray(products) && products.length > 0 && (
						<div className="text-center mt-16">
							<div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
								<h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800">
									Hangi Ürünü Tercih Edersiniz?
								</h2>
								<p className="text-gray-600 mb-6 max-w-2xl mx-auto">
									Ürünlerimizi inceleyin ve size en uygun olanı seçin. Abonelik
									sistemi ile düzenli olarak taze ürünler alabilirsiniz.
								</p>
								<div className="flex flex-col sm:flex-row gap-4 justify-center">
									<Button asChild className="bg-green-600 hover:bg-green-700">
										<Link href="/abonelik">
											Abonelik Paketleri
											<ArrowRight className="w-4 h-4 ml-2" />
										</Link>
									</Button>
									<Button variant="outline" asChild>
										<Link href="/iletisim">İletişime Geç</Link>
									</Button>
								</div>
							</div>
						</div>
					)}
				</div>
			</main>
		</div>
	);
}
