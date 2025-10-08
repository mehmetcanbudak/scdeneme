"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/contexts/cart-context";
import { formatPrice } from "@/lib/utils";
import {
	Loader2,
	Minus,
	Plus,
	ShoppingCart as ShoppingCartIcon,
	Trash2,
	X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ShoppingCartProps {
	isOpen?: boolean;
	onClose?: () => void;
	compact?: boolean;
}

export default function ShoppingCart({
	isOpen = true,
	onClose,
	compact = false,
}: ShoppingCartProps) {
	const {
		items,
		totalItems,
		totalPrice,
		isLoading,
		error,
		updateItem,
		removeItem,
		clearCart,
		clearError,
		formatCartItemDescription,
		getProductImage,
	} = useCart();

	const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set());
	const [removingItems, setRemovingItems] = useState<Set<string>>(new Set());

	const handleQuantityUpdate = async (itemId: string, newQuantity: number) => {
		setUpdatingItems((prev) => new Set(prev).add(itemId));
		clearError();

		try {
			const result = await updateItem(itemId, newQuantity);
			if (!result.success) {
				console.error("Failed to update item:", result.message);
			}
		} finally {
			setUpdatingItems((prev) => {
				const newSet = new Set(prev);
				newSet.delete(itemId);
				return newSet;
			});
		}
	};

	const handleRemoveItem = async (itemId: string) => {
		setRemovingItems((prev) => new Set(prev).add(itemId));
		clearError();

		try {
			const result = await removeItem(itemId);
			if (!result.success) {
				console.error("Failed to remove item:", result.message);
			}
		} finally {
			setRemovingItems((prev) => {
				const newSet = new Set(prev);
				newSet.delete(itemId);
				return newSet;
			});
		}
	};

	const handleClearCart = async () => {
		clearError();
		const result = await clearCart();
		if (!result.success) {
			console.error("Failed to clear cart:", result.message);
		}
	};

	if (compact) {
		return (
			<div className="w-80">
				<div className="flex items-center justify-between p-4 border-b">
					<h3 className="text-lg font-semibold flex items-center gap-2">
						<ShoppingCartIcon className="w-5 h-5" />
						Sepetim ({totalItems})
					</h3>
					{onClose && (
						<Button variant="ghost" size="sm" onClick={onClose}>
							<X className="w-4 h-4" />
						</Button>
					)}
				</div>

				{error && (
					<Alert variant="destructive" className="m-4">
						<AlertDescription>{error}</AlertDescription>
					</Alert>
				)}

				<div className="max-h-96 overflow-y-auto">
					{items.length === 0 ? (
						<div className="p-6 text-center text-gray-500">
							<ShoppingCartIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
							<p>Sepetiniz boş</p>
							<p className="text-sm mt-1">
								Ürün eklemek için alışverişe başlayın
							</p>
						</div>
					) : (
						<div className="space-y-2 p-4">
							{items.map((item) => (
								<div
									key={item.id}
									className="flex items-center gap-3 p-2 border rounded-lg"
								>
									<div className="w-12 h-12 relative">
										<Image
											src={getProductImage(item.product)}
											alt={item.product.name}
											fill
											className="object-cover rounded"
										/>
									</div>
									<div className="flex-1 min-w-0">
										<p className="font-medium text-sm truncate">
											{item.product.name}
										</p>
										<p className="text-xs text-gray-600">
											{formatCartItemDescription(item)}
										</p>
										<p className="text-sm font-medium text-green-600">
											{item.formatted_total_price}
										</p>
									</div>
									<div className="flex items-center gap-1">
										<Button
											variant="outline"
											size="sm"
											className="w-6 h-6 p-0"
											onClick={() =>
												handleQuantityUpdate(item.documentId, item.quantity - 1)
											}
											disabled={
												updatingItems.has(item.documentId) || item.quantity <= 1
											}
										>
											<Minus className="w-3 h-3" />
										</Button>
										<span className="w-8 text-center text-sm">
											{updatingItems.has(item.documentId) ? (
												<Loader2 className="w-3 h-3 animate-spin mx-auto" />
											) : (
												item.quantity
											)}
										</span>
										<Button
											variant="outline"
											size="sm"
											className="w-6 h-6 p-0"
											onClick={() =>
												handleQuantityUpdate(item.documentId, item.quantity + 1)
											}
											disabled={updatingItems.has(item.documentId)}
										>
											<Plus className="w-3 h-3" />
										</Button>
										<Button
											variant="ghost"
											size="sm"
											className="w-6 h-6 p-0 text-red-500 hover:text-red-700 ml-1"
											onClick={() => handleRemoveItem(item.documentId)}
											disabled={removingItems.has(item.documentId)}
										>
											{removingItems.has(item.documentId) ? (
												<Loader2 className="w-3 h-3 animate-spin" />
											) : (
												<Trash2 className="w-3 h-3" />
											)}
										</Button>
									</div>
								</div>
							))}
						</div>
					)}
				</div>

				{items.length > 0 && (
					<div className="border-t p-4 space-y-3">
						<div className="flex justify-between items-center font-semibold">
							<span>Toplam:</span>
							<span className="text-lg text-green-600">
								{formatPrice(totalPrice, "TRY")}
							</span>
						</div>
						<div className="space-y-2">
							<Link href="/sepet" className="block w-full">
								<Button className="w-full bg-green-600 hover:bg-green-700 text-white">
									Sepete Git
								</Button>
							</Link>
							<Button
								variant="outline"
								className="w-full text-red-600 border-red-200 hover:bg-red-50"
								onClick={handleClearCart}
								disabled={isLoading}
							>
								Sepeti Temizle
							</Button>
						</div>
					</div>
				)}
			</div>
		);
	}

	return (
		<div className="max-w-4xl mx-auto p-4">
			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<CardTitle className="flex items-center gap-2">
							<ShoppingCartIcon className="w-6 h-6" />
							Alışveriş Sepeti ({totalItems} ürün)
						</CardTitle>
						{items.length > 0 && (
							<Button
								variant="outline"
								className="text-red-600 border-red-200 hover:bg-red-50"
								onClick={handleClearCart}
								disabled={isLoading}
							>
								{isLoading ? (
									<>
										<Loader2 className="w-4 h-4 mr-2 animate-spin" />
										Temizleniyor...
									</>
								) : (
									<>
										<Trash2 className="w-4 h-4 mr-2" />
										Sepeti Temizle
									</>
								)}
							</Button>
						)}
					</div>
				</CardHeader>
				<CardContent>
					{error && (
						<Alert variant="destructive" className="mb-4">
							<AlertDescription>{error}</AlertDescription>
						</Alert>
					)}

					{items.length === 0 ? (
						<div className="text-center py-12">
							<ShoppingCartIcon className="w-24 h-24 mx-auto mb-4 text-gray-300" />
							<h3 className="text-xl font-medium mb-2 text-gray-600">
								Sepetiniz boş
							</h3>
							<p className="text-gray-500 mb-6">
								Ürün eklemek için alışverişe başlayın
							</p>
							<Link href="/urunler">
								<Button className="bg-green-600 hover:bg-green-700 text-white">
									Alışverişe Başla
								</Button>
							</Link>
						</div>
					) : (
						<div className="space-y-4">
							{items.map((item) => (
								<Card key={item.id} className="overflow-hidden">
									<CardContent className="p-4">
										<div className="flex items-center gap-4">
											<div className="w-20 h-20 relative flex-shrink-0">
												<Image
													src={getProductImage(item.product)}
													alt={item.product.name}
													fill
													className="object-cover rounded-lg"
												/>
											</div>
											<div className="flex-1 min-w-0">
												<h3 className="font-medium text-lg mb-1">
													{item.product.name}
												</h3>
												<p className="text-gray-600 mb-2">
													{formatCartItemDescription(item)}
												</p>
												<div className="flex items-center gap-4">
													<div className="flex items-center gap-2">
														<Button
															variant="outline"
															size="sm"
															onClick={() =>
																handleQuantityUpdate(
																	item.documentId,
																	item.quantity - 1,
																)
															}
															disabled={
																updatingItems.has(item.documentId) ||
																item.quantity <= 1
															}
														>
															<Minus className="w-4 h-4" />
														</Button>
														<span className="w-12 text-center font-medium">
															{updatingItems.has(item.documentId) ? (
																<Loader2 className="w-4 h-4 animate-spin mx-auto" />
															) : (
																item.quantity
															)}
														</span>
														<Button
															variant="outline"
															size="sm"
															onClick={() =>
																handleQuantityUpdate(
																	item.documentId,
																	item.quantity + 1,
																)
															}
															disabled={updatingItems.has(item.documentId)}
														>
															<Plus className="w-4 h-4" />
														</Button>
													</div>
													<div className="flex items-center gap-4 ml-auto">
														<div className="text-right">
															<p className="text-sm text-gray-600">
																{item.formatted_unit_price} x {item.quantity}
															</p>
															<p className="font-semibold text-lg text-green-600">
																{item.formatted_total_price}
															</p>
														</div>
														<Button
															variant="outline"
															size="sm"
															className="text-red-600 border-red-200 hover:bg-red-50"
															onClick={() => handleRemoveItem(item.documentId)}
															disabled={removingItems.has(item.documentId)}
														>
															{removingItems.has(item.documentId) ? (
																<Loader2 className="w-4 h-4 animate-spin" />
															) : (
																<Trash2 className="w-4 h-4" />
															)}
														</Button>
													</div>
												</div>
											</div>
										</div>
									</CardContent>
								</Card>
							))}

							{/* Cart Summary */}
							<Card className="bg-gray-50">
								<CardContent className="p-6">
									<div className="flex justify-between items-center mb-4">
										<span className="text-xl font-medium">Toplam:</span>
										<span className="text-2xl font-bold text-green-600">
											{formatPrice(totalPrice, "TRY")}
										</span>
									</div>
									<div className="flex gap-3">
										<Link href="/odeme" className="flex-1">
											<Button className="w-full bg-green-600 hover:bg-green-700 text-white">
												Ödemeye Geç
											</Button>
										</Link>
										<Link href="/urunler">
											<Button variant="outline">Alışverişe Devam Et</Button>
										</Link>
									</div>
								</CardContent>
							</Card>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
