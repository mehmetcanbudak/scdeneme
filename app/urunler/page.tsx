"use client";

import { Typography } from "@/components/ui/typography";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { useFooterColorSetter } from "@/hooks/use-footer-color";
import { useHeaderColor } from "@/hooks/use-header-color";
import { useNavigationTransparency } from "@/hooks/use-navigation-transparency";
import { apiClient } from "@/lib/api-client";
import {
	ArrowRight,
	Package,
	Star,
	Sparkles,
	TrendingUp,
	Filter,
	Grid3x3,
	LayoutGrid,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo, useCallback, useEffect, useMemo, useState } from "react";

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
 * Modern Product Card with sleek animations
 */
const ProductCard = memo(function ProductCard({
	product,
	index,
}: {
	product: Product;
	index: number;
}) {
	const router = useRouter();

	const handleProductClick = useCallback(() => {
		router.push(`/abonelik/${product.slug}`);
	}, [router, product.slug]);

	const productImage = useMemo(() => {
		if (product.image) {
			return product.image;
		}
		if (product.images && product.images.length > 0) {
			const imageUrl = product.images[0].url;
			return imageUrl;
		}
		return "/placeholder.svg";
	}, [product.image, product.images]);

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat("tr-TR", {
			style: "currency",
			currency: "TRY",
			minimumFractionDigits: 0,
			maximumFractionDigits: 2,
		}).format(price);
	};

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
		<div
			className="group relative bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer border border-black/5"
			style={{
				animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
			}}
			onClick={handleProductClick}
		>
			{/* Decorative gradient background */}
			<div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

			{/* Image Section */}
			<div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
				<div className="relative w-full h-72 overflow-hidden">
					<Image
						src={productImage}
						alt={product.name}
						fill
						className="object-cover group-hover:scale-110 group-hover:rotate-2 transition-all duration-700"
						sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
					/>
					{/* Overlay gradient on hover */}
					<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
				</div>

				{/* Badges */}
				<div className="absolute top-4 left-4 right-4 flex justify-between items-start">
					{product.featured && (
						<div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg animate-pulse">
							<Star className="w-3.5 h-3.5 fill-current" />
							<span>Öne Çıkan</span>
						</div>
					)}
					{discountInfo.hasDiscount && (
						<div className="ml-auto bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
							-%{discountInfo.discountPercentage}
						</div>
					)}
				</div>

				{/* Stock Badge */}
				{product.stock !== undefined && (
					<div className="absolute bottom-4 right-4">
						<span
							className={`px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md shadow-lg ${
								product.stock > 0
									? "bg-green-500/90 text-white"
									: "bg-red-500/90 text-white"
							}`}
						>
							{product.stock > 0 ? "✓ Stokta" : "✗ Tükendi"}
						</span>
					</div>
				)}
			</div>

			{/* Content Section */}
			<div className="relative p-6 space-y-4">
				{/* Product Name */}
				<Typography
					variant="h4"
					className="text-black group-hover:text-green-600 transition-colors duration-300 line-clamp-2 min-h-[3.5rem]"
				>
					{product.name}
				</Typography>

				{/* Description */}
				{product.description && (
					<Text
						variant="body-sm"
						className="text-black/70 line-clamp-2 min-h-[2.5rem]"
					>
						{product.description}
					</Text>
				)}

				{/* Price Section */}
				<div className="flex items-center gap-3 pt-2">
					{discountInfo.hasDiscount ? (
						<>
							<span className="text-2xl font-bold text-green-600">
								{formatPrice(product.sale_price || 0)}
							</span>
							<span className="text-sm text-black/40 line-through">
								{formatPrice(product.price)}
							</span>
						</>
					) : (
						<span className="text-2xl font-bold text-black">
							{formatPrice(product.price)}
						</span>
					)}
				</div>

				{/* CTA Button */}
				<Button
					className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
					size="lg"
				>
					<Sparkles className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform duration-300" />
					<span>İncele</span>
					<ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
				</Button>
			</div>

			{/* Hover shine effect */}
			<div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
		</div>
	);
});

ProductCard.displayName = "ProductCard";

/**
 * Sleek, Modern Products Page
 */
export default function Urunler() {
	useNavigationTransparency(true);
	useHeaderColor("#9AB795");
	useFooterColorSetter("#9AB795");

	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [viewMode, setViewMode] = useState<"grid" | "large">("grid");

	const fetchProducts = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);

			const response = await apiClient.getProducts({
				populate: "*",
				pagination: {
					page: 1,
					pageSize: 50,
				},
			});

			if (response.error) {
				setError(response.error.message);
				return;
			}

			if (response.data) {
				let productsData = response.data;

				if (
					response.data &&
					typeof response.data === "object" &&
					"data" in response.data
				) {
					productsData = (response.data as any).data;
				}

				if (Array.isArray(productsData)) {
					setProducts(productsData);
				} else {
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
			<div className="min-h-screen bg-gradient-to-br from-green-50 via-[#9AB795] to-emerald-50 flex items-center justify-center pt-24 px-4">
				<div className="text-center max-w-md bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
					<div className="text-red-500 mb-4">
						<Package className="w-16 h-16 mx-auto" />
					</div>
					<Typography variant="h2" className="mb-4">
						Bir Hata Oluştu
					</Typography>
					<Text variant="body" className="mb-6 text-black/70">
						{error}
					</Text>
					<Button
						onClick={() => window.location.reload()}
						className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800"
					>
						Tekrar Dene
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-green-50 via-[#9AB795] to-emerald-50 relative overflow-hidden">
			{/* Decorative background elements */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute -top-40 -right-40 w-80 h-80 bg-green-300/20 rounded-full blur-3xl" />
				<div className="absolute top-1/2 -left-40 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl" />
				<div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl" />
			</div>

			{/* Hero Section */}
			<section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto text-center">
					{/* Floating badge */}
					<div
						className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg mb-6 animate-fade-in"
						style={{ animation: "fadeInUp 0.6s ease-out" }}
					>
						<TrendingUp className="w-4 h-4 text-green-600" />
						<Text variant="caption" className="font-semibold text-green-600">
							En Taze Ürünler
						</Text>
					</div>

					{/* Main heading */}
					<div
						style={{ animation: "fadeInUp 0.6s ease-out 0.1s both" }}
						className="mb-6"
					>
						<Typography
							variant="display-1"
							className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 bg-clip-text text-transparent mb-4"
						>
							Ürünlerimiz
						</Typography>
						<Text variant="body-lg" className="max-w-3xl mx-auto text-black/80">
							Taze, sağlıklı ve lezzetli yeşilliklerimizi keşfedin. Her ürün,
							dikey tarım teknolojimizle özenle yetiştirilmiştir.
						</Text>
					</div>

					{/* View mode toggle */}
					<div
						className="flex justify-center gap-2 mt-8"
						style={{ animation: "fadeInUp 0.6s ease-out 0.2s both" }}
					>
						<Button
							variant={viewMode === "grid" ? "primary" : "outline"}
							size="sm"
							onClick={() => setViewMode("grid")}
							className="gap-2"
						>
							<Grid3x3 className="w-4 h-4" />
							<span className="hidden sm:inline">Grid</span>
						</Button>
						<Button
							variant={viewMode === "large" ? "primary" : "outline"}
							size="sm"
							onClick={() => setViewMode("large")}
							className="gap-2"
						>
							<LayoutGrid className="w-4 h-4" />
							<span className="hidden sm:inline">Large</span>
						</Button>
					</div>
				</div>
			</section>

			{/* Products Grid */}
			<main className="relative z-10 pb-20 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto">
					{loading ? (
						<div
							className={`grid ${
								viewMode === "grid"
									? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
									: "grid-cols-1 md:grid-cols-2"
							} gap-8`}
						>
							{Array.from({ length: 6 }).map((_, index) => (
								<div
									key={`loading-${index}`}
									className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 animate-pulse"
								>
									<div className="w-full h-72 bg-gray-200 rounded-2xl mb-4" />
									<div className="h-6 bg-gray-200 rounded-lg mb-3" />
									<div className="h-4 bg-gray-200 rounded-lg w-3/4 mb-4" />
									<div className="h-12 bg-gray-200 rounded-full" />
								</div>
							))}
						</div>
					) : !Array.isArray(products) || products.length === 0 ? (
						<div className="text-center py-20 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg">
							<div className="text-gray-400 mb-6">
								<Package className="w-20 h-20 mx-auto" />
							</div>
							<Typography variant="h3" className="mb-3">
								Henüz ürün bulunmuyor
							</Typography>
							<Text variant="body" className="text-black/60">
								Yakında yeni ürünler eklenecek.
							</Text>
						</div>
					) : (
						<div
							className={`grid ${
								viewMode === "grid"
									? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
									: "grid-cols-1 md:grid-cols-2"
							} gap-8`}
						>
							{products.map((product, index) => (
								<ProductCard key={product.id} product={product} index={index} />
							))}
						</div>
					)}

					{/* CTA Section */}
					{!loading && Array.isArray(products) && products.length > 0 && (
						<div className="mt-20">
							<div className="relative bg-gradient-to-br from-white via-white to-green-50 rounded-3xl p-8 md:p-12 shadow-2xl border border-black/5 overflow-hidden">
								{/* Decorative elements */}
								<div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-200/30 to-emerald-200/30 rounded-full blur-3xl -z-10" />
								<div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-200/30 to-green-200/30 rounded-full blur-3xl -z-10" />

								<div className="relative text-center max-w-3xl mx-auto">
									<div className="inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full mb-6">
										<Sparkles className="w-4 h-4 text-green-600" />
										<Text
											variant="caption"
											className="font-semibold text-green-600"
										>
											Abonelik Avantajları
										</Text>
									</div>

									<Typography variant="h2" className="mb-4">
										Hangi Ürünü Tercih Edersiniz?
									</Typography>
									<Text variant="body-lg" className="mb-8 text-black/70">
										Ürünlerimizi inceleyin ve size en uygun olanı seçin.
										Abonelik sistemi ile düzenli olarak taze ürünler
										alabilirsiniz.
									</Text>

									<div className="flex flex-col sm:flex-row gap-4 justify-center">
										<Button
											asChild
											size="lg"
											className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl group"
										>
											<Link href="/abonelik" className="gap-2">
												<Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
												<span>Abonelik Paketleri</span>
												<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
											</Link>
										</Button>
										<Button variant="outline" size="lg" asChild>
											<Link href="/iletisim">İletişime Geç</Link>
										</Button>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</main>

			{/* Add keyframe animations to globals.css if not already present */}
			<style jsx global>{`
				@keyframes fadeInUp {
					from {
						opacity: 0;
						transform: translateY(30px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
			`}</style>
		</div>
	);
}
