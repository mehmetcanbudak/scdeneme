"use client";

import { Minus, Plus } from "lucide-react";
import { memo, useCallback } from "react";

/**
 * Subscription interval interface
 */
interface SubscriptionInterval {
	key: string;
	days: number;
	name: string;
	price: number;
	currency: string;
	discount: number;
	description: string;
}

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
 * Product interface
 */
interface Product {
	id: number;
	name: string;
	price: number;
	sale_price?: number;
	currency: string;
	is_active: boolean;
	subscription_enabled: boolean;
	one_time_purchase_enabled: boolean;
	subscription_intervals: SubscriptionInterval[];
}

/**
 * Purchase type
 */
type PurchaseType = "one_time" | "subscription";

/**
 * Props for PurchaseOptionsPanel component
 */
interface PurchaseOptionsPanelProps {
	/** Product data */
	product: Product;
	/** Delivery days configuration */
	deliveryDays: DeliveryDay[];
	/** Delivery day stock levels */
	deliveryDayStock: Record<number, number>;
	/** Purchase type */
	purchaseType: PurchaseType;
	/** Callback when purchase type changes */
	onPurchaseTypeChange: (type: PurchaseType) => void;
	/** Selected subscription interval */
	selectedInterval: SubscriptionInterval | null;
	/** Callback when interval changes */
	onIntervalChange: (interval: SubscriptionInterval | null) => void;
	/** Quantity */
	quantity: number;
	/** Callback when quantity changes */
	onQuantityChange: (quantity: number) => void;
	/** Selected delivery day */
	selectedDeliveryDay: number;
	/** Callback when delivery day changes */
	onDeliveryDayChange: (dayId: number) => void;
}

/**
 * Purchase Options Panel Component
 * Handles purchase type selection, intervals, quantity, and delivery days
 *
 * @param {PurchaseOptionsPanelProps} props - Component props
 * @returns {React.ReactElement} The purchase options panel component
 */
const PurchaseOptionsPanel: React.FC<PurchaseOptionsPanelProps> = memo(
	({
		product,
		deliveryDays,
		deliveryDayStock,
		purchaseType,
		onPurchaseTypeChange,
		selectedInterval,
		onIntervalChange,
		quantity,
		onQuantityChange,
		selectedDeliveryDay,
		onDeliveryDayChange,
	}) => {
		/**
		 * Format price with currency
		 */
		const formatPrice = useCallback(
			(price: number, currency: string = "TRY") => {
				return new Intl.NumberFormat("tr-TR", {
					style: "currency",
					currency: currency,
					minimumFractionDigits: 0,
					maximumFractionDigits: 2,
				}).format(price);
			},
			[],
		);

		/**
		 * Decrease quantity
		 */
		const decreaseQuantity = useCallback(() => {
			onQuantityChange(Math.max(1, quantity - 1));
		}, [quantity, onQuantityChange]);

		/**
		 * Increase quantity
		 */
		const increaseQuantity = useCallback(() => {
			const dayStock = deliveryDayStock[selectedDeliveryDay] ?? 0;
			onQuantityChange(Math.min(dayStock, quantity + 1));
		}, [quantity, selectedDeliveryDay, deliveryDayStock, onQuantityChange]);

		return (
			<div>
				<h3 className="font-medium mb-4 text-black text-lg">
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
										product.is_active && onPurchaseTypeChange("subscription")
									}
									className={`w-full text-left ${!product.is_active ? "cursor-not-allowed" : ""}`}
									disabled={!product.is_active}
									type="button"
								>
									<div className="flex items-center justify-between mb-4">
										<div>
											<div className="font-medium text-black text-lg">
												Abonelik
											</div>
											<div className="text-sm text-black">
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
								{purchaseType === "subscription" && product.is_active && (
									<div className="space-y-3 mt-4 pt-4 border-t border-gray-200">
										{product.subscription_intervals.map((interval) => (
											<div
												key={interval.key}
												className={`p-4 rounded-lg border transition-colors ${
													selectedInterval?.key === interval.key
														? "border-gray-600 bg-white"
														: "border-gray-200 bg-white hover:border-gray-300"
												}`}
											>
												<button
													type="button"
													onClick={() => onIntervalChange(interval)}
													className="w-full text-left"
												>
													<div className="flex items-center justify-between mb-3">
														<div>
															<div className="font-medium text-black">
																{interval.name}
															</div>
															<div className="text-sm text-black">
																{interval.description}
															</div>
														</div>
														<div className="text-right">
															<div className="font-medium text-black">
																{formatPrice(interval.price, interval.currency)}
															</div>
															<div className="text-sm text-green-600">
																%{Math.round(interval.discount)} indirim
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
																<span className="font-medium text-black">
																	Adet:
																</span>
																<div className="flex items-center space-x-3">
																	<button
																		type="button"
																		onClick={decreaseQuantity}
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
																		onClick={increaseQuantity}
																		className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
																		disabled={
																			quantity >=
																			(deliveryDayStock[selectedDeliveryDay] ??
																				0)
																		}
																	>
																		<Plus className="w-4 h-4" />
																	</button>
																</div>
															</div>

															{/* Delivery Day */}
															<div>
																<div className="flex items-center justify-between mb-2">
																	<span className="font-medium text-black">
																		Teslimat Günü:
																	</span>
																	<span className="text-sm text-gray-500">
																		{
																			deliveryDays.find(
																				(d) => d.id === selectedDeliveryDay,
																			)?.name
																		}
																	</span>
																</div>
																<div className="grid grid-cols-7 gap-2">
																	{deliveryDays.map((day) => {
																		const stock = deliveryDayStock[day.id] ?? 0;
																		const remainingStock =
																			day.id === selectedDeliveryDay
																				? Math.max(0, stock - quantity)
																				: stock;
																		const isInactive =
																			day.alwaysInactive || stock === 0;
																		const isSelected =
																			selectedDeliveryDay === day.id;

																		return (
																			<div
																				key={day.id}
																				className="flex flex-col"
																			>
																				<button
																					type="button"
																					onClick={() =>
																						!isInactive &&
																						onDeliveryDayChange(day.id)
																					}
																					disabled={isInactive}
																					className={`p-3 text-sm rounded border transition-colors relative ${
																						isInactive
																							? "border-red-200 bg-red-50 text-red-500 cursor-not-allowed"
																							: isSelected
																								? "border-gray-600 bg-gray-600 text-white"
																								: "border-gray-200 hover:border-gray-300 text-black"
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
																					<span className="text-xs text-center mt-1 text-black font-medium">
																						Kalan Stok:
																					</span>
																				) : !day.alwaysInactive ? (
																					<span
																						className={`text-xs text-center mt-1 ${
																							remainingStock === 0
																								? "text-red-500 font-medium"
																								: "text-gray-500"
																						}`}
																					>
																						{remainingStock > 0
																							? `${remainingStock} kota`
																							: "Stok yok"}
																					</span>
																				) : null}
																			</div>
																		);
																	})}
																</div>
															</div>
														</div>
													)}
											</div>
										))}
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
								onClick={() => onPurchaseTypeChange("one_time")}
								className="w-full text-left"
								type="button"
							>
								<div className="flex items-center justify-between mb-4">
									<div>
										<div className="font-medium text-black text-lg">
											Tek Seferlik Satın Al
										</div>
										<div className="text-sm text-black">
											Şimdi satın al, istediğin zaman tekrar sipariş ver
										</div>
									</div>
									<div className="text-right">
										<div className="text-xl font-medium text-black">
											{formatPrice(
												product.sale_price || product.price,
												product.currency,
											)}
										</div>
									</div>
								</div>
							</button>

							{/* One-time Quantity and Delivery Day */}
							{purchaseType === "one_time" && (
								<div className="pt-4 border-t border-gray-200 space-y-4">
									{/* Quantity Selector */}
									<div className="flex items-center justify-between">
										<span className="font-medium text-black">Adet:</span>
										<div className="flex items-center space-x-3">
											<button
												type="button"
												onClick={decreaseQuantity}
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
												onClick={increaseQuantity}
												className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
												disabled={
													quantity >=
													(deliveryDayStock[selectedDeliveryDay] ?? 0)
												}
											>
												<Plus className="w-4 h-4" />
											</button>
										</div>
									</div>

									{/* Delivery Day Selector */}
									<div>
										<div className="flex items-center justify-between mb-2">
											<span className="font-medium text-black">
												Teslimat Günü:
											</span>
											<span className="text-sm text-gray-500">
												{
													deliveryDays.find((d) => d.id === selectedDeliveryDay)
														?.name
												}
											</span>
										</div>
										<div className="grid grid-cols-7 gap-2">
											{deliveryDays.map((day) => {
												const stock = deliveryDayStock[day.id] ?? 0;
												const remainingStock =
													day.id === selectedDeliveryDay
														? Math.max(0, stock - quantity)
														: stock;
												const isInactive = day.alwaysInactive || stock === 0;
												const isSelected = selectedDeliveryDay === day.id;

												return (
													<div key={day.id} className="flex flex-col">
														<button
															type="button"
															onClick={() =>
																!isInactive && onDeliveryDayChange(day.id)
															}
															disabled={isInactive}
															className={`p-3 text-sm rounded border transition-colors relative ${
																isInactive
																	? "border-red-200 bg-red-50 text-red-500 cursor-not-allowed"
																	: isSelected
																		? "border-gray-600 bg-gray-600 text-white"
																		: "border-gray-200 hover:border-gray-300 text-black"
															}`}
														>
															<span
																className={isInactive ? "line-through" : ""}
															>
																{day.shortName}
															</span>
														</button>
														{!day.alwaysInactive && (
															<span
																className={`text-xs text-center mt-1 ${
																	remainingStock === 0
																		? "text-red-500 font-medium"
																		: "text-gray-500"
																}`}
															>
																{remainingStock > 0
																	? `${remainingStock} kota`
																	: "Stok yok"}
															</span>
														)}
													</div>
												);
											})}
										</div>
									</div>

									{/* Summary */}
									<div className="bg-gray-50 p-3 rounded text-sm">
										<p className="text-black">
											<strong>{quantity} adet</strong> ürün,{" "}
											<strong>
												{
													deliveryDays.find((d) => d.id === selectedDeliveryDay)
														?.name
												}
											</strong>{" "}
											günü teslimat edilecek.
										</p>
									</div>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		);
	},
);

PurchaseOptionsPanel.displayName = "PurchaseOptionsPanel";

export default PurchaseOptionsPanel;
