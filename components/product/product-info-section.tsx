"use client";

import { memo, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Heart, Package, Share2, Shield, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Product interface
 */
interface Product {
	id: number;
	name: string;
	description?: string;
	is_active: boolean;
	in_stock: boolean;
	stock_quantity: number;
	price: number;
	sale_price?: number;
	currency: string;
}

/**
 * Discount info interface
 */
interface DiscountInfo {
	hasDiscount: boolean;
	originalPrice: number;
	discountedPrice: number;
	discountAmount: number;
	discountPercentage: number;
}

/**
 * Props for ProductInfoSection component
 */
interface ProductInfoSectionProps {
	/** Product data */
	product: Product;
	/** Current price to display */
	currentPrice: number;
	/** Discount information */
	discountInfo: DiscountInfo | null;
	/** Purchase type */
	purchaseType: "one_time" | "subscription";
	/** Whether add to cart is in progress */
	addingToCart: boolean;
	/** Callback when add to cart button is clicked */
	onAddToCart: () => void;
}

/**
 * Product Info Section Component
 * Displays product information including title, price, description, and actions
 *
 * @param {ProductInfoSectionProps} props - Component props
 * @returns {React.ReactElement} The product info section component
 */
const ProductInfoSection: React.FC<ProductInfoSectionProps> = memo(({
	product,
	currentPrice,
	discountInfo,
	purchaseType,
	addingToCart,
	onAddToCart,
}) => {
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
						{product.name}
					</h1>

					{/* Stock Status */}
					<div className="mb-6 space-y-2">
						{!product.is_active ? (
							<span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-red-100 text-red-800">
								<div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
								Pasif Ürün
							</span>
						) : product.in_stock ? (
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
						{discountInfo?.hasDiscount ? (
							<div className="space-y-2">
								<div className="flex items-center space-x-3">
									<span className="text-red-600">
										{formatPrice(currentPrice, product.currency)}
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
								{formatPrice(currentPrice, product.currency)}
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
						{product.description ||
							"Organik ve taze yeşilliklerden oluşan özel paketimiz. Fesleğen, roka, maydanoz, marul ve daha birçok vitamin deposu yeşillik bir arada. Dalından taze toplanır, soğuk zincirle size ulaştırılır."}
					</p>
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
	);
});

ProductInfoSection.displayName = "ProductInfoSection";

export default ProductInfoSection;
