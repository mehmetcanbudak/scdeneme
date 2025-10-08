"use client";

import { memo, useCallback, useState, useMemo } from "react";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type {
	Product,
	SubscriptionInterval,
	DeliveryDay,
} from "./product-selector";

/**
 * Props for SubscriptionProductPreview component
 */
interface SubscriptionProductPreviewProps {
	/** Product data to display */
	product: Product | null;
	/** Whether product data is loading */
	loading: boolean;
	/** Selected image index */
	selectedImage: number;
	/** Callback when image selection changes */
	onImageSelect: (index: number) => void;
	/** Product images array */
	images: string[];
	/** Delivery days configuration */
	deliveryDays: DeliveryDay[];
	/** Delivery day stock levels */
	deliveryDayStock: Record<number, number>;
	/** Callback when "Add to Cart" is clicked */
	onAddToCart: () => void;
}

/**
 * Subscription Product Preview Component
 * Displays product preview with purchase options for subscription landing page
 *
 * @param {SubscriptionProductPreviewProps} props - Component props
 * @returns {React.ReactElement} The subscription product preview component
 */
const SubscriptionProductPreview: React.FC<SubscriptionProductPreviewProps> = memo(({
	product,
	loading,
	selectedImage,
	onImageSelect,
	images,
	deliveryDays,
	deliveryDayStock,
	onAddToCart,
}) => {
	const [quantity, setQuantity] = useState(1);
	const [selectedDeliveryDay, setSelectedDeliveryDay] = useState<number>(2);
	const [selectedInterval, setSelectedInterval] = useState<SubscriptionInterval | null>(
		product?.subscription_intervals?.[0] || null
	);
	const [purchaseType, setPurchaseType] = useState<"subscription" | "one_time">("subscription");

	/**
	 * Format price with currency
	 */
	const formatPrice = useCallback((price: number, currency: string = "TRY") => {
		return new Intl.NumberFormat("tr-TR", {
			style: "currency",
			currency: currency,
			minimumFractionDigits: 0,
			maximumFractionDigits: 2,
		}).format(price);
	}, []);

	return (
		<div className="grid lg:grid-cols-2 gap-16 items-start">
			{/* Left Column - Product Image */}
			<div className="relative">
				<div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden">
					<Image
						src={images[selectedImage] || "/bundle4.png"}
						alt="Taze Yeşillikler Paketi"
						fill
						className="object-cover"
						onError={(e) => {
							const target = e.target as HTMLImageElement;
							target.src = "/bundle4.png";
						}}
					/>
				</div>

				{/* Thumbnail Images */}
				<div className="flex space-x-3 mt-4 overflow-x-auto">
					{images.map((img, index) => (
						<button
							key={img}
							type="button"
							onClick={() => onImageSelect(index)}
							className={`flex-shrink-0 w-20 h-20 bg-gray-50 rounded-lg overflow-hidden border-2 transition-colors cursor-pointer ${
								selectedImage === index
									? "border-gray-600"
									: "border-gray-200 hover:border-yellow-400"
							}`}
						>
							<div className="relative w-full h-full">
								<Image
									src={img}
									alt={`Product view ${index + 1}`}
									fill
									className="object-cover"
									onError={(e) => {
										const target = e.target as HTMLImageElement;
										target.src = "/bundle4.png";
									}}
								/>
							</div>
						</button>
					))}
				</div>
			</div>

			{/* Right Column - Product Info */}
			<div className="space-y-6">
				{loading ? (
					<div className="animate-pulse space-y-4">
						<div className="h-8 bg-gray-200 rounded w-3/4"></div>
						<div className="h-4 bg-gray-200 rounded w-full"></div>
						<div className="h-4 bg-gray-200 rounded w-5/6"></div>
					</div>
				) : (
					<div>
						<h1 className="text-3xl md:text-4xl font-light mb-2 text-gray-800">
							{product?.name || "Taze Yeşillikler Paketi"}
						</h1>
						<p className="text-gray-600 text-lg italic leading-relaxed">
							{product?.description ||
								product?.short_description ||
								"Dikey tarım ürünleri ile sağlıklı yaşamın keyfini çıkarın. Her hafta 8 adet özenle seçilmiş taptaze yeşillik kapınıza gelir."}
						</p>
					</div>
				)}

				{/* Purchase Options */}
				<div className="space-y-3">
					{/* Subscription Option */}
					<div
						className={`p-4 rounded-lg border-2 transition-colors ${
							purchaseType === "subscription"
								? "border-gray-600 bg-gray-50"
								: "border-gray-200"
						}`}
					>
						<button
							onClick={() => setPurchaseType("subscription")}
							className="w-full text-left"
							type="button"
						>
							<div className="flex items-center justify-between mb-3">
								<div>
									<div className="font-medium text-gray-800">
										Abonelik
									</div>
									<div className="text-sm text-gray-600">
										{selectedInterval
											? `Düzenli teslimat ile %${Math.round(selectedInterval.discount)} tasarruf et`
											: "Düzenli teslimat ile %35 tasarruf et"}
									</div>
								</div>
								<div className="text-right">
									<div className="text-lg font-medium text-red-600">
										{selectedInterval
											? `${product?.currency === "TRY" ? "₺" : ""}${selectedInterval.price.toFixed(2)}`
											: `${product?.currency === "TRY" ? "₺" : ""}${product?.sale_price || product?.price || 350}`}
									</div>
									<div className="text-sm text-gray-500 line-through">
										{product?.price
											? `${product.currency === "TRY" ? "₺" : ""}${product.price.toFixed(2)}`
											: "₺400.00"}
									</div>
								</div>
							</div>
						</button>

						{/* Subscription Details */}
						{purchaseType === "subscription" && (
							<div className="space-y-3 mt-3 pt-3 border-t border-gray-200">
								<div className="space-y-2 text-sm text-gray-700">
									<div>+ %35 indirim ilk üç siparişte, sonrasında %20 indirim</div>
									<div>+ Ücretsiz teslimat</div>
									<div>+ İstediğiniz zaman duraklatın veya iptal edin</div>
									<div>+ Abonelik yaptığınızda özel hediyeler</div>
								</div>

								{/* Delivery Frequency Selector */}
								<div>
									<select
										value={
											selectedInterval?.key ||
											product?.subscription_intervals?.[0]?.key ||
											"weekly"
										}
										onChange={(e) => {
											const interval =
												product?.subscription_intervals?.find(
													(i) => i.key === e.target.value,
												);
											if (interval) {
												setSelectedInterval(interval);
											}
										}}
										className="w-full p-3 border border-gray-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-gray-200 focus:border-gray-400"
									>
										{product?.subscription_intervals?.map(
											(interval) => (
												<option key={interval.key} value={interval.key}>
													{interval.name} -{" "}
													{product.currency === "TRY" ? "₺" : ""}
													{interval.price.toFixed(2)}
												</option>
											),
										)}
									</select>
								</div>

								{/* Quantity Selector */}
								<div className="flex items-center justify-between">
									<span className="text-sm font-medium text-gray-700">
										Adet:
									</span>
									<div className="flex items-center space-x-3">
										<button
											type="button"
											onClick={() =>
												setQuantity(Math.max(1, quantity - 1))
											}
											className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-yellow-50 transition-colors"
											disabled={quantity <= 1}
										>
											<Minus className="w-3 h-3" />
										</button>
										<span className="w-12 text-center font-medium">
											{quantity}
										</span>
										<button
											type="button"
											onClick={() => {
												const dayStock =
													deliveryDayStock[selectedDeliveryDay] ?? 0;
												setQuantity(Math.min(dayStock, quantity + 1));
											}}
											className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-yellow-50 transition-colors"
											disabled={
												quantity >=
												(deliveryDayStock[selectedDeliveryDay] ?? 0)
											}
										>
											<Plus className="w-3 h-3" />
										</button>
									</div>
								</div>

								{/* Delivery Day Selector */}
								<div>
									<div className="flex items-center justify-between mb-2">
										<span className="text-sm font-medium text-gray-700">
											Teslimat Günü:
										</span>
										<span className="text-xs text-gray-500">
											{
												deliveryDays.find(
													(d) => d.id === selectedDeliveryDay,
												)?.name
											}
										</span>
									</div>
									<div className="grid grid-cols-7 gap-1">
										{deliveryDays.map((day) => {
											const stock = deliveryDayStock[day.id] ?? 0;
											const remainingStock =
												day.id === selectedDeliveryDay
													? Math.max(0, stock - quantity)
													: stock;
											const isInactive =
												day.alwaysInactive || stock === 0;
											const isSelected = selectedDeliveryDay === day.id;

											return (
												<div key={day.id} className="flex flex-col">
													<button
														type="button"
														onClick={() =>
															!isInactive &&
															setSelectedDeliveryDay(day.id)
														}
														disabled={isInactive}
														className={`p-2 text-xs rounded border transition-colors ${
															isInactive
																? "border-red-200 bg-red-50 text-red-500 cursor-not-allowed"
																: isSelected
																	? "border-gray-600 bg-gray-600 text-white"
																	: "border-gray-200 hover:border-gray-300 text-gray-700"
														}`}
													>
														<span
															className={
																isInactive ? "line-through" : ""
															}
														>
															{day.shortName}
														</span>
													</button>
													{day.alwaysInactive && day.id === 1 ? (
														<span className="text-[10px] text-center mt-0.5 text-gray-600 font-medium">
															Kalan Stok:
														</span>
													) : !day.alwaysInactive ? (
														<span
															className={`text-[10px] text-center mt-0.5 ${
																remainingStock === 0
																	? "text-red-500 font-medium"
																	: "text-gray-500"
															}`}
														>
															{remainingStock > 0
																? `${remainingStock}`
																: "Yok"}
														</span>
													) : null}
												</div>
											);
										})}
									</div>
								</div>

								{/* Summary */}
								<div className="bg-gray-50 p-3 rounded text-sm">
									<p className="text-gray-700">
										<strong>{quantity} adet</strong> ürün,{" "}
										<strong>
											{selectedInterval?.name?.toLowerCase() ||
												"haftalık"}
										</strong>{" "}
										<strong>
											{
												deliveryDays.find(
													(d) => d.id === selectedDeliveryDay,
												)?.name
											}
										</strong>{" "}
										günleri teslimat edilecek.
									</p>
								</div>
							</div>
						)}
					</div>

					{/* Buy Once Option */}
					<div
						className={`p-4 rounded-lg border-2 transition-colors ${
							purchaseType === "one_time"
								? "border-gray-600 bg-gray-50"
								: "border-gray-200"
						}`}
					>
						<button
							onClick={() => setPurchaseType("one_time")}
							className="w-full text-left"
							type="button"
						>
							<div className="flex items-center justify-between mb-3">
								<div>
									<div className="font-medium text-gray-800">
										Tek Seferlik Satın Al
									</div>
									<div className="text-sm text-gray-600">
										Şimdi satın al, istediğin zaman tekrar sipariş ver
									</div>
								</div>
								<div className="text-right">
									<div className="text-lg font-medium text-red-600">
										{product?.sale_price
											? `${product.currency === "TRY" ? "₺" : ""}${product.sale_price.toFixed(2)}`
											: product?.price
												? `${product.currency === "TRY" ? "₺" : ""}${product.price.toFixed(2)}`
												: "₺350.00"}
									</div>
								</div>
							</div>
						</button>

						{/* One-time Purchase Details */}
						{purchaseType === "one_time" && (
							<div className="space-y-3 mt-3 pt-3 border-t border-gray-200">
								{/* Quantity and delivery day selectors would go here */}
								<div className="bg-gray-50 p-3 rounded text-sm">
									<p className="text-gray-700">
										<strong>{quantity} adet</strong> ürün teslimat edilecek.
									</p>
								</div>
							</div>
						)}
					</div>
				</div>

				{/* Add to Cart Button */}
				<Button
					onClick={onAddToCart}
					className="w-full py-4 text-lg"
				>
					Sepete Ekle
				</Button>

				{/* Product Details Link */}
				<div className="text-center">
					<button
						type="button"
						className="text-gray-600 hover:text-yellow-600 underline text-sm transition-colors"
					>
						Ürün detaylarını gör
					</button>
				</div>
			</div>
		</div>
	);
});

SubscriptionProductPreview.displayName = "SubscriptionProductPreview";

export default SubscriptionProductPreview;
