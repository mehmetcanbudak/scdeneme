"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { useCart } from "@/contexts/cart-context";
import { useNavigationTransparency } from "@/hooks/use-navigation-transparency";
import { apiClient } from "@/lib/api-client";
import {
	ArrowLeft,
	Award,
	CheckCircle,
	ChevronLeft,
	ChevronRight,
	Clock,
	Heart,
	HelpCircle,
	Leaf,
	Minus,
	Package,
	Play,
	Plus,
	Share2,
	Shield,
	ShoppingCart,
	Truck,
	Users,
	X,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

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

interface Product {
	id: number;
	documentId: string;
	name: string;
	slug: string;
	product_id: string;
	description?: string;
	short_description?: string;
	is_active: boolean;
	in_stock: boolean;
	stock_quantity: number;
	price: number;
	sale_price?: number;
	currency: string;
	vat_rate: number;
	vat_included: boolean;
	discount_percentage: number;
	discount_amount: number;
	product_type: string;
	subscription_enabled: boolean;
	one_time_purchase_enabled: boolean;
	subscription_intervals: SubscriptionInterval[];
	sku?: string;
	weight?: number;
	dimensions?: string;
	meta_title?: string;
	meta_description?: string;
	image?: any;
	images?: any[];
	gallery?: any[];
	price_breakdown: {
		base_price: number;
		sale_price: number;
		discount_applied: number;
		discount_active: boolean;
		price_without_vat: number;
		vat_amount: number;
		vat_rate: number;
		price_with_vat: number;
		final_price: number;
		currency: string;
		original_currency: string;
		formatted_price: string;
		formatted_price_with_vat: string;
		formatted_price_without_vat: string;
	};
	purchase_options: {
		one_time_available: boolean;
		subscription_available: boolean;
		intervals: any[];
	};
	categories?: Array<{
		id: number;
		name: string;
		slug: string;
	}>;
	tags?: Array<{
		id: number;
		name: string;
		slug: string;
	}>;
}

type PurchaseType = "one_time" | "subscription";

export default function TazeYesilliklerPaketi() {
	const { addItem } = useCart();
	useAuth(); // Auth context is available if needed

	// Delivery days configuration
	const deliveryDays = [
		{ id: 1, name: "Pazartesi", shortName: "Pzt" },
		{ id: 2, name: "Salı", shortName: "Sal" },
		{ id: 3, name: "Çarşamba", shortName: "Çar" },
		{ id: 4, name: "Perşembe", shortName: "Per" },
		{ id: 5, name: "Cuma", shortName: "Cum" },
		{ id: 6, name: "Cumartesi", shortName: "Cmt" },
		{ id: 7, name: "Pazar", shortName: "Paz" },
	];

	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [selectedImage, setSelectedImage] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const [purchaseType, setPurchaseType] =
		useState<PurchaseType>("subscription");
	const [selectedInterval, setSelectedInterval] =
		useState<SubscriptionInterval | null>(null);
	const [selectedDeliveryDay, setSelectedDeliveryDay] = useState<number>(1); // 1 = Pazartesi
	const [addingToCart, setAddingToCart] = useState(false);
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);

	// Refs for scrolling functionality
	const galleryScrollRef = useRef<HTMLDivElement>(null);
	const [showGalleryLeftButton, setShowGalleryLeftButton] = useState(false);
	const [showGalleryRightButton, setShowGalleryRightButton] = useState(true);

	// Enable navigation transparency
	useNavigationTransparency(false);

	// Fetch Taze Yeşillikler Paketi product by slug
	const fetchProduct = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);

			const response = await apiClient.getProductBySlug(
				"taze-yesillikler-paketi",
				{
					populate: "*",
				},
			);

			if (response.error) {
				setError(response.error.message);
				return;
			}

			if (response.data) {
				const productData = response.data as Product;
				setProduct(productData);

				// Set default subscription interval if subscription is enabled
				if (
					productData.subscription_enabled &&
					productData.subscription_intervals.length > 0
				) {
					setSelectedInterval(productData.subscription_intervals[0]);
				}

				// Default to subscription for this product since it's moved to abonelik
				if (productData.is_active) {
					if (
						productData.subscription_enabled &&
						productData.subscription_intervals.length > 0
					) {
						setPurchaseType("subscription");
					} else {
						setPurchaseType("one_time");
					}
				}
			}
		} catch (err) {
			setError("Ürün bilgileri yüklenirken bir hata oluştu");
			console.error("Error fetching product:", err);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchProduct();
	}, [fetchProduct]);

	// Get product images
	const getProductImages = () => {
		if (!product) return [];

		const images: string[] = [];

		// Add single image if exists
		if (product.image) {
			const imageUrl =
				typeof product.image === "string"
					? product.image
					: product.image.url ||
						product.image.formats?.large?.url ||
						product.image.formats?.medium?.url ||
						product.image.formats?.small?.url;

			if (imageUrl) {
				images.push(
					imageUrl.startsWith("http")
						? imageUrl
						: `${process.env.NEXT_PUBLIC_API_URL}${imageUrl}`,
				);
			}
		}

		// Add multiple images if exists
		if (product.images && Array.isArray(product.images)) {
			product.images.forEach((img) => {
				const imageUrl =
					typeof img === "string"
						? img
						: img.url ||
							img.formats?.large?.url ||
							img.formats?.medium?.url ||
							img.formats?.small?.url;

				if (imageUrl) {
					images.push(
						imageUrl.startsWith("http")
							? imageUrl
							: `${process.env.NEXT_PUBLIC_API_URL}${imageUrl}`,
					);
				}
			});
		}

		// Add gallery images if exists
		if (product.gallery && Array.isArray(product.gallery)) {
			product.gallery.forEach((img) => {
				const imageUrl =
					typeof img === "string"
						? img
						: img.url ||
							img.formats?.large?.url ||
							img.formats?.medium?.url ||
							img.formats?.small?.url;

				if (imageUrl) {
					images.push(
						imageUrl.startsWith("http")
							? imageUrl
							: `${process.env.NEXT_PUBLIC_API_URL}${imageUrl}`,
					);
				}
			});
		}

		return images.length > 0 ? images : ["/placeholder.svg"];
	};

	// Format price
	const formatPrice = (price: number, currency: string = "TRY") => {
		return new Intl.NumberFormat("tr-TR", {
			style: "currency",
			currency: currency,
			minimumFractionDigits: 0,
			maximumFractionDigits: 2,
		}).format(price);
	};

	// Get current price based on selection
	const getCurrentPrice = () => {
		if (!product) return 0;

		if (purchaseType === "subscription" && selectedInterval) {
			return selectedInterval.price;
		}

		return product.sale_price || product.price;
	};

	// Get discount information
	const getDiscountInfo = () => {
		if (!product) return null;

		if (purchaseType === "subscription" && selectedInterval) {
			const originalPrice = product.price;
			const discountedPrice = selectedInterval.price;
			const discountAmount = originalPrice - discountedPrice;
			const discountPercentage = (discountAmount / originalPrice) * 100;

			return {
				hasDiscount: discountAmount > 0,
				originalPrice,
				discountedPrice,
				discountAmount,
				discountPercentage: Math.round(discountPercentage),
			};
		}

		if (product.sale_price && product.sale_price < product.price) {
			const discountAmount = product.price - product.sale_price;
			const discountPercentage = (discountAmount / product.price) * 100;

			return {
				hasDiscount: true,
				originalPrice: product.price,
				discountedPrice: product.sale_price,
				discountAmount,
				discountPercentage: Math.round(discountPercentage),
			};
		}

		return {
			hasDiscount: false,
			originalPrice: product.price,
			discountedPrice: product.price,
			discountAmount: 0,
			discountPercentage: 0,
		};
	};

	// Gallery scroll functions
	const scrollGalleryLeft = () => {
		const galleryContainer = galleryScrollRef.current;
		if (galleryContainer) {
			galleryContainer.scrollBy({
				left: -320,
				behavior: "smooth",
			});
		}
	};

	const scrollGalleryRight = () => {
		const galleryContainer = galleryScrollRef.current;
		if (galleryContainer) {
			galleryContainer.scrollBy({
				left: 320,
				behavior: "smooth",
			});
		}
	};

	const handleGalleryScroll = () => {
		const galleryContainer = galleryScrollRef.current;
		if (galleryContainer) {
			const { scrollLeft, scrollWidth, clientWidth } = galleryContainer;
			setShowGalleryLeftButton(scrollLeft > 0);
			setShowGalleryRightButton(scrollLeft < scrollWidth - clientWidth - 10);
		}
	};

	// Handle add to cart
	const handleAddToCart = async () => {
		if (!product || addingToCart) return;

		setAddingToCart(true);

		try {
			const cartItem = {
				productId: product.id,
				quantity,
				purchaseType,
				subscriptionInterval:
					purchaseType === "subscription" ? selectedInterval : undefined,
				deliveryDay:
					purchaseType === "subscription" ? selectedDeliveryDay : undefined,
				price: getCurrentPrice(),
			};

			await addItem(
				cartItem.productId,
				cartItem.quantity,
				cartItem.purchaseType,
				cartItem.subscriptionInterval || undefined,
				cartItem.deliveryDay,
			);

			// Show success message
			setShowSuccessMessage(true);

			// Hide success message after 3 seconds
			setTimeout(() => {
				setShowSuccessMessage(false);
			}, 3000);
		} catch (err) {
			console.error("Error adding to cart:", err);
		} finally {
			setAddingToCart(false);
		}
	};

	// Static data for gallery section
	const galleryItems = [
		{
			image: "/feslegen.png",
			title: "Fesleğen",
			description: "Taze ve aromalı fesleğen yaprağı",
			benefits: ["Antioksidan", "Anti-bakteriyel", "Vitamin K"],
		},
		{
			image: "/roka.png",
			title: "Roka",
			description: "Acımsı lezzeti ile bilinen roka",
			benefits: ["Vitamin C", "Folat", "Kalsiyum"],
		},
		{
			image: "/maydanoz.png",
			title: "Maydanoz",
			description: "Her yemeğin vazgeçilmezi",
			benefits: ["Vitamin A", "Demir", "Potasyum"],
		},
		{
			image: "/kivircik.png",
			title: "Kıvırcık Marul",
			description: "Çıtır çıtır taze marul yaprakları",
			benefits: ["Lif", "Vitamin K", "Folat"],
		},
		{
			image: "/reyhan.png",
			title: "Reyhan",
			description: "Nane ailesinden aromatik bitki",
			benefits: ["Antioksidan", "Omega-3", "Magnezyum"],
		},
		{
			image: "/kekik.png",
			title: "Kekik",
			description: "Doğal antiseptik özellikli",
			benefits: ["Timol", "Vitamin C", "Antimikrobiyal"],
		},
	];

	// FAQ data
	const faqData = [
		{
			question: "Taze Yeşillikler Paketi neler içeriyor?",
			answer:
				"Paketimizde mevsime göre değişen 6-8 çeşit taze yeşillik bulunmaktadır. Roka, marul, maydanoz, fesleğen, reyhan ve kekik gibi organik yeşillikler bulunur.",
			icon: Leaf,
		},
		{
			question: "Ürünler ne kadar taze?",
			answer:
				"Tüm ürünlerimiz sipariş gününde dalından toplanır ve 24 saat içinde soğuk zincirle size ulaştırılır. Maksimum tazelik garantisi sunuyoruz.",
			icon: Clock,
		},
		{
			question: "Abonelik sistemi nasıl çalışır?",
			answer:
				"Haftalık, iki haftalık veya aylık periyotlarda düzenli teslimat alabilirsiniz. İstediğiniz zaman duraklatabilir, değiştirebilir veya iptal edebilirsiniz.",
			icon: Users,
		},
		{
			question: "Organik sertifikanız var mı?",
			answer:
				"Evet, Global Gap sertifikasına sahip tesislerimizde hiçbir kimyasal kullanmadan üretim yapıyoruz. Sertifikalarımızı web sitemizde görüntüleyebilirsiniz.",
			icon: Shield,
		},
		{
			question: "Hangi bölgelere teslimat yapıyorsunuz?",
			answer:
				"Şu anda İstanbul, Ankara, İzmir, Bursa ve Antalya'ya teslimat yapmaktayız. Kargo ücreti abonelik paketlerinde ücretsizdir.",
			icon: Truck,
		},
		{
			question: "Memnun kalmazsam ne olur?",
			answer:
				"100% memnuniyet garantisi sunuyoruz. Ürünlerden memnun kalmazsanız, iade edebilir veya değiştirebilirsiniz.",
			icon: Award,
		},
	];

	// Loading state
	if (loading) {
		return (
			<div className="min-h-screen bg-white flex items-center justify-center pt-24">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600 mx-auto mb-4"></div>
					<p className="text-gray-600">Ürün yükleniyor...</p>
				</div>
			</div>
		);
	}

	// Error state
	if (error || !product) {
		notFound();
	}

	const images = getProductImages();
	const discountInfo = getDiscountInfo();

	return (
		<div className="min-h-screen bg-white">
			{/* Success Message */}
			{showSuccessMessage && (
				<div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-top-4 duration-300">
					<div className="bg-gray-600 text-white px-6 py-4 rounded-lg shadow-lg max-w-sm">
						<div className="flex items-start space-x-3 mb-3">
							<CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
							<div className="flex-1">
								<p className="font-medium">Sepete Eklendi!</p>
								<p className="text-sm text-green-100">
									{quantity} adet {product?.name} sepetinize eklendi
								</p>
							</div>
							<button
								type="button"
								onClick={() => setShowSuccessMessage(false)}
								className="text-green-100 hover:text-white transition-colors"
							>
								<X className="w-4 h-4" />
							</button>
						</div>
						<div className="flex space-x-2">
							<button
								type="button"
								onClick={() => {
									setShowSuccessMessage(false);
									window.location.href = "/sepet";
								}}
								className="flex-1 bg-white text-green-600 px-3 py-2 rounded text-sm font-medium hover:bg-green-50 transition-colors"
							>
								Sepete Git
							</button>
							<button
								type="button"
								onClick={() => setShowSuccessMessage(false)}
								className="flex-1 bg-green-700 text-white px-3 py-2 rounded text-sm font-medium hover:bg-green-800 transition-colors"
							>
								Alışverişe Devam
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Section 1: Product Info with Sticky Image and Scrolling Content */}
			<div className="flex">
				{/* Left Side - Sticky Image */}
				<div className="w-1/2 h-screen sticky top-0 bg-gray-50">
					<div className="h-full flex items-center justify-center p-8">
						<div className="max-w-md w-full">
							<img
								src={images[selectedImage]}
								alt={product?.name || "Taze Yeşillikler Paketi"}
								className="w-full h-auto max-h-[500px] object-contain rounded-lg shadow-lg"
								onError={(e) => {
									const target = e.target as HTMLImageElement;
									target.src = "/skycrops-package-product.png";
								}}
							/>
							{/* Thumbnail Images */}
							{images.length > 1 && (
								<div className="flex space-x-2 mt-4 justify-center">
									{images.map((image, index) => (
										<button
											key={`thumbnail-${image.slice(-20)}-${index}`}
											type="button"
											onClick={() => setSelectedImage(index)}
											className={`w-16 h-16 rounded overflow-hidden border-2 transition-colors ${
												selectedImage === index
													? "border-gray-600"
													: "border-gray-200"
											}`}
										>
											<img
												src={image}
												alt={`Thumbnail ${index + 1}`}
												className="w-full h-full object-cover"
												onError={(e) => {
													const target = e.target as HTMLImageElement;
													target.src = "/placeholder.svg";
												}}
											/>
										</button>
									))}
								</div>
							)}
						</div>
					</div>
				</div>

				{/* Right Side - Scrolling Content */}
				<div className="w-1/2 min-h-screen">
					<div className="p-8 pt-32 pb-16">
						{/* Breadcrumb */}
						<div className="mb-8">
							<Link
								href="/abonelik"
								className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors"
							>
								<ArrowLeft className="w-4 h-4 mr-2" />
								Abonelik Sayfasına Dön
							</Link>
						</div>

						<div className="space-y-8">
							{/* Product Title and Price */}
							<div>
								<h1 className="text-4xl font-light mb-4 text-gray-800">
									{product?.name || "Taze Yeşillikler Paketi"}
								</h1>

								{/* Stock Status */}
								<div className="mb-6 space-y-2">
									{product && !product.is_active ? (
										<span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-red-100 text-red-800">
											<div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
											Pasif Ürün
										</span>
									) : product?.in_stock ? (
										<span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
											<div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
											Stokta var ({product.stock_quantity} adet)
										</span>
									) : (
										<span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
											<div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
											Stokta var
										</span>
									)}
								</div>

								{/* Price */}
								<div className="text-4xl font-light text-gray-800 mb-2">
									{product && discountInfo?.hasDiscount ? (
										<div className="space-y-2">
											<div className="flex items-center space-x-3">
												<span className="text-red-600">
													{formatPrice(getCurrentPrice(), product.currency)}
												</span>
												<span className="text-xl text-gray-500 line-through">
													{formatPrice(
														discountInfo.originalPrice,
														product.currency,
													)}
												</span>
												<span className="bg-red-100 text-red-800 text-sm px-3 py-1 rounded-full">
													%{discountInfo.discountPercentage} indirim
												</span>
											</div>
										</div>
									) : (
										<span>
											{product
												? formatPrice(getCurrentPrice(), product.currency)
												: "₺45.90"}
										</span>
									)}
								</div>

								{/* VAT Info */}
								<p className="text-sm text-gray-600 mb-6">KDV dahil</p>
							</div>

							{/* Description */}
							<div>
								<h3 className="font-medium mb-3 text-gray-800 text-lg">
									Ürün Açıklaması
								</h3>
								<p className="text-gray-600 leading-relaxed">
									{product?.description ||
										"Organik ve taze yeşilliklerden oluşan özel paketimiz. Fesleğen, roka, maydanoz, marul ve daha birçok vitamin deposu yeşillik bir arada. Dalından taze toplanır, soğuk zincirle size ulaştırılır."}
								</p>
							</div>

							{/* Purchase Options */}
							{product && (
								<div>
									<h3 className="font-medium mb-4 text-gray-800 text-lg">
										Abonelik Seçenekleri
									</h3>
									{!product.is_active && (
										<div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
											<p className="text-red-700 text-sm">
												Bu ürün şu anda pasif durumda ve satın alınamaz.
											</p>
										</div>
									)}
									<div className="grid grid-cols-1 gap-3">
										{/* Subscription Option */}
										{product.subscription_enabled &&
											product.subscription_intervals.length > 0 && (
												<div
													className={`p-6 rounded-lg border-2 transition-colors ${
														!product.is_active
															? "border-gray-200 bg-gray-50 opacity-60"
															: purchaseType === "subscription"
																? "border-gray-600 bg-gray-50"
																: "border-gray-200"
													}`}
												>
													<button
														onClick={() =>
															product.is_active &&
															setPurchaseType("subscription")
														}
														className={`w-full text-left ${!product.is_active ? "cursor-not-allowed" : ""}`}
														disabled={!product.is_active}
														type="button"
													>
														<div className="flex items-center justify-between mb-4">
															<div>
																<div className="font-medium text-gray-800 text-lg">
																	Abonelik
																</div>
																<div className="text-sm text-gray-600">
																	Düzenli teslimat ile %
																	{Math.round(
																		((product.price -
																			product.subscription_intervals[0].price) /
																			product.price) *
																			100,
																	)}{" "}
																	tasarruf et
																</div>
															</div>
															<div className="text-right">
																<div className="text-xl font-medium text-red-600">
																	{selectedInterval &&
																		formatPrice(
																			selectedInterval.price,
																			selectedInterval.currency,
																		)}
																</div>
																<div className="text-sm text-gray-500 line-through">
																	{formatPrice(product.price, product.currency)}
																</div>
															</div>
														</div>
													</button>

													{/* Subscription Intervals */}
													{purchaseType === "subscription" &&
														product.is_active && (
															<div className="space-y-3 mt-4 pt-4 border-t border-gray-200">
																{product.subscription_intervals.map(
																	(interval) => (
																		<div
																			key={interval.key}
																			className={`p-4 rounded-lg border transition-colors ${
																				selectedInterval?.key === interval.key
																					? "border-gray-600 bg-white"
																					: "border-gray-200 hover:border-gray-300"
																			}`}
																		>
																			<button
																				type="button"
																				onClick={() =>
																					setSelectedInterval(interval)
																				}
																				className="w-full text-left"
																			>
																				<div className="flex items-center justify-between mb-3">
																					<div>
																						<div className="font-medium text-gray-800">
																							{interval.name}
																						</div>
																						<div className="text-sm text-gray-600">
																							{interval.description}
																						</div>
																					</div>
																					<div className="text-right">
																						<div className="font-medium text-gray-800">
																							{formatPrice(
																								interval.price,
																								interval.currency,
																							)}
																						</div>
																						<div className="text-sm text-green-600">
																							%{Math.round(interval.discount)}{" "}
																							indirim
																						</div>
																					</div>
																				</div>
																			</button>

																			{/* Subscription Controls */}
																			{selectedInterval?.key === interval.key &&
																				product.is_active && (
																					<div className="space-y-4 pt-4 border-t border-gray-200">
																						{/* Quantity */}
																						<div className="flex items-center justify-between">
																							<span className="font-medium text-gray-700">
																								Adet:
																							</span>
																							<div className="flex items-center space-x-3">
																								<button
																									type="button"
																									onClick={() =>
																										setQuantity(
																											Math.max(1, quantity - 1),
																										)
																									}
																									className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
																									disabled={quantity <= 1}
																								>
																									<Minus className="w-4 h-4" />
																								</button>
																								<span className="w-16 text-center font-medium text-lg">
																									{quantity}
																								</span>
																								<button
																									type="button"
																									onClick={() =>
																										setQuantity(
																											Math.min(
																												product.stock_quantity,
																												quantity + 1,
																											),
																										)
																									}
																									className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
																									disabled={
																										quantity >=
																										product.stock_quantity
																									}
																								>
																									<Plus className="w-4 h-4" />
																								</button>
																							</div>
																						</div>

																						{/* Delivery Day */}
																						<div>
																							<div className="flex items-center justify-between mb-3">
																								<span className="font-medium text-gray-700">
																									Teslimat Günü:
																								</span>
																								<span className="text-sm text-gray-500">
																									{
																										deliveryDays.find(
																											(d) =>
																												d.id ===
																												selectedDeliveryDay,
																										)?.name
																									}
																								</span>
																							</div>
																							<div className="grid grid-cols-7 gap-2">
																								{deliveryDays.map((day) => (
																									<button
																										key={day.id}
																										type="button"
																										onClick={() =>
																											setSelectedDeliveryDay(
																												day.id,
																											)
																										}
																										className={`p-3 text-sm rounded border transition-colors ${
																											selectedDeliveryDay ===
																											day.id
																												? "border-gray-600 bg-gray-600 text-white"
																												: "border-gray-200 hover:border-gray-300 text-gray-700"
																										}`}
																									>
																										{day.shortName}
																									</button>
																								))}
																							</div>
																						</div>
																					</div>
																				)}
																		</div>
																	),
																)}
															</div>
														)}
												</div>
											)}

										{/* One-time Purchase */}
										{product.is_active && product.one_time_purchase_enabled && (
											<div
												className={`p-6 rounded-lg border-2 transition-colors ${
													purchaseType === "one_time"
														? "border-gray-600 bg-gray-50"
														: "border-gray-200 hover:border-gray-300"
												}`}
											>
												<button
													onClick={() => setPurchaseType("one_time")}
													className="w-full text-left"
													type="button"
												>
													<div className="flex items-center justify-between mb-4">
														<div>
															<div className="font-medium text-gray-800 text-lg">
																Tek Seferlik Satın Al
															</div>
															<div className="text-sm text-gray-600">
																Şimdi satın al, istediğin zaman tekrar sipariş
																ver
															</div>
														</div>
														<div className="text-right">
															<div className="text-xl font-medium text-gray-800">
																{formatPrice(
																	product.sale_price || product.price,
																	product.currency,
																)}
															</div>
														</div>
													</div>
												</button>

												{/* One-time Quantity */}
												{purchaseType === "one_time" && (
													<div className="pt-4 border-t border-gray-200">
														<div className="flex items-center justify-between">
															<span className="font-medium text-gray-700">
																Adet:
															</span>
															<div className="flex items-center space-x-3">
																<button
																	type="button"
																	onClick={() =>
																		setQuantity(Math.max(1, quantity - 1))
																	}
																	className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
																	disabled={quantity <= 1}
																>
																	<Minus className="w-4 h-4" />
																</button>
																<span className="w-16 text-center font-medium text-lg">
																	{quantity}
																</span>
																<button
																	type="button"
																	onClick={() =>
																		setQuantity(
																			Math.min(
																				product.stock_quantity,
																				quantity + 1,
																			),
																		)
																	}
																	className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
																	disabled={quantity >= product.stock_quantity}
																>
																	<Plus className="w-4 h-4" />
																</button>
															</div>
														</div>
													</div>
												)}
											</div>
										)}
									</div>
								</div>
							)}

							{/* Add to Cart Button */}
							<div className="space-y-4">
								<Button
									onClick={handleAddToCart}
									disabled={
										!product?.in_stock ||
										!product?.is_active ||
										addingToCart ||
										quantity <= 0
									}
									className={`w-full py-6 text-lg font-medium ${
										!product?.is_active
											? "bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300"
											: "bg-gray-600 hover:bg-gray-700 text-white"
									}`}
								>
									{addingToCart ? (
										<div className="flex items-center">
											<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-2"></div>
											Sepete Ekleniyor...
										</div>
									) : !product?.is_active ? (
										<div className="flex items-center justify-center">
											<X className="w-5 h-5 mr-2" />
											Pasif Ürün - Satın Alınamaz
										</div>
									) : (
										<div className="flex items-center justify-center">
											<ShoppingCart className="w-5 h-5 mr-2" />
											{purchaseType === "subscription"
												? "Aboneliğe Başla"
												: "Sepete Ekle"}
										</div>
									)}
								</Button>

								{/* Action Buttons */}
								<div className="flex space-x-3">
									<Button variant="outline" className="flex-1 py-3">
										<Heart className="w-4 h-4 mr-2" />
										Favorilere Ekle
									</Button>
									<Button variant="outline" className="flex-1 py-3">
										<Share2 className="w-4 h-4 mr-2" />
										Paylaş
									</Button>
								</div>
							</div>

							{/* Product Features */}
							<div className="grid grid-cols-1 gap-6 pt-8 border-t border-gray-200">
								<div className="flex items-center space-x-4">
									<div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
										<Package className="w-6 h-6 text-green-600" />
									</div>
									<div>
										<div className="font-medium text-gray-800">Taze Ürün</div>
										<div className="text-sm text-gray-600">
											Dalından taze toplanır
										</div>
									</div>
								</div>

								<div className="flex items-center space-x-4">
									<div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
										<Shield className="w-6 h-6 text-green-600" />
									</div>
									<div>
										<div className="font-medium text-gray-800">
											100% Organik
										</div>
										<div className="text-sm text-gray-600">
											Pestisitsiz, doğal
										</div>
									</div>
								</div>

								<div className="flex items-center space-x-4">
									<div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
										<Truck className="w-6 h-6 text-yellow-600" />
									</div>
									<div>
										<div className="font-medium text-gray-800">
											Hızlı Teslimat
										</div>
										<div className="text-sm text-gray-600">
											24-48 saat içinde
										</div>
									</div>
								</div>

								<div className="flex items-center space-x-4">
									<div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
										<Clock className="w-6 h-6 text-purple-600" />
									</div>
									<div>
										<div className="font-medium text-gray-800">
											Güvenli Ödeme
										</div>
										<div className="text-sm text-gray-600">SSL korumalı</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Section 2: Info Left, Video/Picture Right */}
			<div className="py-16 bg-gray-50">
				<div className="mx-12">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						{/* Left - Info */}
						<div className="space-y-6">
							<h2 className="text-3xl font-light text-gray-800">
								Sera Teknolojisi ile Üretim
							</h2>
							<p className="text-lg text-gray-600 leading-relaxed">
								En modern sera teknolojileri kullanarak, controlled environment
								agriculture (CEA) sistemleriyle ürünlerimizi yetiştiriyoruz. Bu
								sayede yıl boyunca aynı kalitede, taze ve besleyici ürünler
								sunabiliyoruz.
							</p>
							<div className="space-y-4">
								<div className="flex items-start space-x-3">
									<CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
									<div>
										<h4 className="font-medium text-gray-800">Su Tasarrufu</h4>
										<p className="text-gray-600">
											Geleneksel tarıma göre %95 daha az su kullanımı
										</p>
									</div>
								</div>
								<div className="flex items-start space-x-3">
									<CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
									<div>
										<h4 className="font-medium text-gray-800">
											Pestisit Kullanmıyoruz
										</h4>
										<p className="text-gray-600">
											Kapalı sistem sayesinde zararlılardan doğal koruma
										</p>
									</div>
								</div>
								<div className="flex items-start space-x-3">
									<CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
									<div>
										<h4 className="font-medium text-gray-800">
											Yıl Boyu Üretim
										</h4>
										<p className="text-gray-600">
											Mevsim şartlarından bağımsız sürekli hasat
										</p>
									</div>
								</div>
							</div>
							<Button className="bg-gray-600 hover:bg-gray-700 text-white">
								<Play className="w-4 h-4 mr-2" />
								Üretim Sürecini İzle
							</Button>
						</div>

						{/* Right - Video/Picture */}
						<div className="relative">
							<div className="aspect-video rounded-lg overflow-hidden bg-gray-200">
								<img
									src="/fresh-vegetables-and-greens-in-modern-greenhouse.png"
									alt="Modern sera üretimi"
									className="w-full h-full object-cover"
								/>
								<div className="absolute inset-0 flex items-center justify-center">
									<button
										type="button"
										className="w-20 h-20 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all"
									>
										<Play className="w-8 h-8 text-gray-600 ml-1" />
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Section 3: Gallery Slider */}
			<div className="py-16">
				<div className="max-w-7xl mx-auto">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-light text-gray-800 mb-4">
							Paket İçeriği
						</h2>
						<p className="text-lg text-gray-600">
							Taze yeşillikler paketimizde bulunan organik ürünler
						</p>
					</div>

					<div className="relative">
						<div
							ref={galleryScrollRef}
							className="flex space-x-6 overflow-x-auto pb-4 horizontal-scroll"
							onScroll={handleGalleryScroll}
							style={{ scrollBehavior: "smooth" }}
						>
							{galleryItems.map((item, index) => (
								<div
									key={`gallery-${item.title}-${index}`}
									className="flex-shrink-0 w-80"
								>
									<div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 h-full">
										<div className="relative overflow-hidden">
											<img
												src={item.image}
												alt={item.title}
												className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
												onError={(e) => {
													const target = e.target as HTMLImageElement;
													target.src = "/placeholder.svg";
												}}
											/>
										</div>
										<div className="p-6">
											<h3 className="font-medium mb-2 text-gray-800 text-lg">
												{item.title}
											</h3>
											<p className="text-gray-600 text-sm mb-4">
												{item.description}
											</p>
											<div className="space-y-2">
												<h4 className="font-medium text-gray-800 text-sm">
													Besin Değerleri:
												</h4>
												<div className="flex flex-wrap gap-2">
													{item.benefits.map((benefit, benefitIndex) => (
														<span
															key={`benefit-${item.title}-${benefit}-${benefitIndex}`}
															className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
														>
															{benefit}
														</span>
													))}
												</div>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>

						{/* Scroll Buttons */}
						{showGalleryLeftButton && (
							<div className="absolute top-1/2 -left-6 transform -translate-y-1/2 z-30">
								<button
									type="button"
									onClick={scrollGalleryLeft}
									className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-300"
								>
									<ChevronLeft className="w-5 h-5 text-gray-600" />
								</button>
							</div>
						)}

						{showGalleryRightButton && (
							<div className="absolute top-1/2 -right-6 transform -translate-y-1/2 z-30">
								<button
									type="button"
									onClick={scrollGalleryRight}
									className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-300"
								>
									<ChevronRight className="w-5 h-5 text-gray-600" />
								</button>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Section 4: FAQ */}
			<div className="py-16 px-6 bg-gray-50">
				<div className="max-w-4xl mx-auto">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-light text-gray-800 mb-4">
							Sıkça Sorulan Sorular
						</h2>
						<p className="text-lg text-gray-600">
							Taze yeşillikler paketi hakkında merak edilenler
						</p>
					</div>

					<div className="grid md:grid-cols-2 gap-8">
						{faqData.map((faq, index) => {
							const IconComponent = faq.icon;
							const colorClasses = [
								{ bg: "bg-green-100", text: "text-green-600" },
								{ bg: "bg-green-100", text: "text-green-600" },
								{ bg: "bg-yellow-100", text: "text-yellow-600" },
								{ bg: "bg-purple-100", text: "text-purple-600" },
								{ bg: "bg-red-100", text: "text-red-600" },
								{ bg: "bg-indigo-100", text: "text-indigo-600" },
							];
							const colorClass = colorClasses[index % colorClasses.length];
							return (
								<div
									key={`faq-${faq.question.slice(0, 20)}-${index}`}
									className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
								>
									<div className="flex items-start space-x-4">
										<div
											className={`w-12 h-12 ${colorClass.bg} rounded-lg flex items-center justify-center flex-shrink-0`}
										>
											<IconComponent className={`w-6 h-6 ${colorClass.text}`} />
										</div>
										<div>
											<h3 className="text-lg font-semibold mb-3 text-gray-800">
												{faq.question}
											</h3>
											<p className="text-gray-600 leading-relaxed">
												{faq.answer}
											</p>
										</div>
									</div>
								</div>
							);
						})}
					</div>

					{/* Contact Section */}
					<div className="bg-gradient-to-r from-gray-600 to-gray-700 rounded-2xl p-8 text-white text-center mt-12">
						<h3 className="text-2xl font-light mb-4">
							Başka Sorularınız mı Var?
						</h3>
						<p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
							Burada bulamadığınız bilgiler için bizimle iletişime geçebilir,
							uzman ekibimizden detaylı bilgi alabilirsiniz.
						</p>
						<div className="flex flex-wrap justify-center gap-4">
							<Link href="/iletisim">
								<Button
									variant="outline"
									className="bg-transparent border-white text-white hover:bg-white hover:text-gray-600"
								>
									<HelpCircle className="w-4 h-4 mr-2" />
									İletişime Geç
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
