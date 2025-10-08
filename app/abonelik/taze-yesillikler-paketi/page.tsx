"use client";

import { useCallback, useEffect, useState } from "react";
import { notFound } from "next/navigation";
import {
	CheckCircle,
	ShoppingCart,
	X,
	Heart,
	Share2,
	Award,
	Clock,
	Leaf,
	Shield,
	Truck,
	Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { useCart } from "@/contexts/cart-context";
import { useNavigationTransparency } from "@/hooks/use-navigation-transparency";
import { apiClient } from "@/lib/api-client";
import StickyImageGallery from "@/components/product/sticky-image-gallery";
import ProductInfoSection from "@/components/product/product-info-section";
import PurchaseOptionsPanel from "@/components/product/purchase-options-panel";
import ProductionVideoSection from "@/components/product/production-video-section";
import GallerySlider from "@/components/product/gallery-slider";
import FAQSection from "@/components/product/faq-section";

/**
 * Subscription interval interface
 */
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

/**
 * Product interface
 */
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
	price_breakdown: any;
	purchase_options: any;
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

/**
 * Purchase type
 */
type PurchaseType = "one_time" | "subscription";

/**
 * Delivery day interface
 */
interface DeliveryDay {
	id: number;
	name: string;
	shortName: string;
	alwaysInactive: boolean;
}

/**
 * Taze Yeşillikler Paketi Product Detail Page
 *
 * @returns {React.ReactElement} Product detail page component
 */
export default function TazeYesilliklerPaketi() {
	const { addItem } = useCart();
	useAuth();

	// Delivery days configuration
	const deliveryDays: DeliveryDay[] = [
		{ id: 1, name: "Pazartesi", shortName: "Pzt", alwaysInactive: true },
		{ id: 2, name: "Salı", shortName: "Sal", alwaysInactive: false },
		{ id: 3, name: "Çarşamba", shortName: "Çar", alwaysInactive: false },
		{ id: 4, name: "Perşembe", shortName: "Per", alwaysInactive: false },
		{ id: 5, name: "Cuma", shortName: "Cum", alwaysInactive: false },
		{ id: 6, name: "Cumartesi", shortName: "Cmt", alwaysInactive: false },
		{ id: 7, name: "Pazar", shortName: "Paz", alwaysInactive: true },
	];

	// State
	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [selectedImage, setSelectedImage] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const [purchaseType, setPurchaseType] =
		useState<PurchaseType>("subscription");
	const [selectedInterval, setSelectedInterval] =
		useState<SubscriptionInterval | null>(null);
	const [selectedDeliveryDay, setSelectedDeliveryDay] = useState<number>(2);
	const [addingToCart, setAddingToCart] = useState(false);
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);
	const [deliveryDayStock, setDeliveryDayStock] = useState<
		Record<number, number>
	>({});

	// Enable navigation transparency
	useNavigationTransparency(false);

	// Fetch delivery day stock
	const fetchDeliveryDayStock = useCallback(async () => {
		try {
			const response = await apiClient.getDeliveryDayStock();
			if (response.data) {
				setDeliveryDayStock(response.data);
			}
		} catch (err) {
			console.error("Error fetching delivery day stock:", err);
		}
	}, []);

	// Fetch product
	const fetchProduct = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);

			const response = await apiClient.getProductBySlug(
				"taze-yesillikler-paketi",
				{ populate: "*" },
			);

			if (response.error) {
				setError(response.error.message);
				return;
			}

			if (response.data) {
				const productData = response.data as Product;
				setProduct(productData);

				if (
					productData.subscription_enabled &&
					productData.subscription_intervals.length > 0
				) {
					setSelectedInterval(productData.subscription_intervals[0]);
				}

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
		fetchDeliveryDayStock();
	}, [fetchProduct, fetchDeliveryDayStock]);

	// Reset quantity when delivery day changes
	useEffect(() => {
		const dayStock = deliveryDayStock[selectedDeliveryDay] ?? 0;
		if (quantity > dayStock) {
			setQuantity(Math.min(1, dayStock));
		}
	}, [selectedDeliveryDay, deliveryDayStock, quantity]);

	// Get product images
	const getProductImages = () => {
		if (!product) return [];

		const images: string[] = [];

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

	// Get current price
	const getCurrentPrice = () => {
		if (!product) return 0;

		if (purchaseType === "subscription" && selectedInterval) {
			return selectedInterval.price;
		}

		return product.sale_price || product.price;
	};

	// Get discount info
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

	// Handle interval change
	const handleIntervalChange = useCallback(
		(interval: SubscriptionInterval | null) => {
			setSelectedInterval(interval);
		},
		[],
	);

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

			setShowSuccessMessage(true);

			setTimeout(() => {
				setShowSuccessMessage(false);
			}, 3000);
		} catch (err) {
			console.error("Error adding to cart:", err);
		} finally {
			setAddingToCart(false);
		}
	};

	// Gallery items data
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

			{/* Section 1: Product Info with Sticky Image */}
			<div className="flex flex-col lg:flex-row">
				{/* Left Side - Sticky Image */}
				<StickyImageGallery
					images={images}
					selectedImage={selectedImage}
					onImageSelect={setSelectedImage}
					productName={product?.name || "Taze Yeşillikler Paketi"}
				/>

				{/* Right Side - Scrolling Content */}
				<div className="w-full lg:w-1/2 min-h-screen">
					<ProductInfoSection
						product={product}
						currentPrice={getCurrentPrice()}
						discountInfo={discountInfo}
						purchaseType={purchaseType}
						addingToCart={addingToCart}
						onAddToCart={handleAddToCart}
					/>

					{/* Purchase Options */}
					<div className="px-4 sm:px-6 lg:px-8 pb-8 space-y-8">
						{product && (
							<PurchaseOptionsPanel
								product={product}
								deliveryDays={deliveryDays}
								deliveryDayStock={deliveryDayStock}
								purchaseType={purchaseType}
								onPurchaseTypeChange={setPurchaseType}
								selectedInterval={selectedInterval}
								onIntervalChange={handleIntervalChange as any}
								quantity={quantity}
								onQuantityChange={setQuantity}
								selectedDeliveryDay={selectedDeliveryDay}
								onDeliveryDayChange={setSelectedDeliveryDay}
							/>
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
					</div>
				</div>
			</div>

			{/* Section 2: Production Video */}
			<ProductionVideoSection />

			{/* Section 3: Gallery Slider */}
			<GallerySlider items={galleryItems} />

			{/* Section 4: FAQ */}
			<FAQSection items={faqData} />
		</div>
	);
}
