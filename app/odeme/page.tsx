"use client";

import {
	ArrowLeft,
	Clock,
	CreditCard,
	MapPin,
	Plus,
	Shield,
	Truck,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { useCart } from "@/contexts/cart-context";
import { useNavigationTransparency } from "@/hooks/use-navigation-transparency";

interface Address {
	id: number;
	title: string;
	firstName: string;
	lastName: string;
	phone: string;
	addressLine1: string;
	addressLine2?: string;
	city: string;
	district: string;
	postalCode: string;
	isDefault: boolean;
}

export default function CheckoutPage() {
	useNavigationTransparency();

	const { items, summary, isLoading: cartLoading, getProductImage } = useCart();
	const { user, isLoading: authLoading } = useAuth();

	const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
	const [addresses, setAddresses] = useState<Address[]>([]);
	const [showAddressForm, setShowAddressForm] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	// Mock addresses for demo (will be replaced with API calls)
	useEffect(() => {
		const mockAddresses: Address[] = [
			{
				id: 1,
				title: "Ev",
				firstName: "Berkay",
				lastName: "Beyaz",
				phone: "+90 537 331 2999",
				addressLine1: "Atatürk Caddesi No: 123",
				addressLine2: "Daire 5",
				city: "İstanbul",
				district: "Kadıköy",
				postalCode: "34710",
				isDefault: true,
			},
			{
				id: 2,
				title: "İş Yeri",
				firstName: "Berkay",
				lastName: "Beyaz",
				phone: "+90 537 331 2999",
				addressLine1: "Barbaros Bulvarı No: 456",
				addressLine2: "Kat 8 No: 12",
				city: "İstanbul",
				district: "Beşiktaş",
				postalCode: "34340",
				isDefault: false,
			},
		];

		setAddresses(mockAddresses);
		setSelectedAddress(
			mockAddresses.find((addr) => addr.isDefault) || mockAddresses[0],
		);
	}, []);

	// Redirect if cart is empty
	// useEffect(() => {
	//   if (!cartLoading && items.length === 0) {
	//     window.location.href = '/sepet'
	//   }
	// }, [cartLoading, items])

	// Redirect if not logged in (but wait for auth to initialize)
	useEffect(() => {
		// Only check after both auth and cart have been initialized
		if (!authLoading && !cartLoading && user === null) {
			alert("Ödeme yapmak için giriş yapmanız gerekiyor.");
			window.location.href = "/sepet";
		}
	}, [user, authLoading, cartLoading]);

	const formatPrice = (price: number, currency = "TRY") => {
		return `${price.toFixed(2)} ${currency}`;
	};

	const handlePlaceOrder = async () => {
		if (!selectedAddress) {
			alert("Lütfen bir teslimat adresi seçin.");
			return;
		}

		setIsLoading(true);

		try {
			// Here we would integrate with payment API
			// For now, just show success message
			alert("Siparişiniz başarıyla alındı! (Demo)");

			// Redirect to success page
			// window.location.href = '/siparis-basarili'
		} catch (error) {
			console.error("Order placement error:", error);
			alert("Sipariş verirken bir hata oluştu. Lütfen tekrar deneyin.");
		} finally {
			setIsLoading(false);
		}
	};

	if (cartLoading || authLoading) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center pt-24">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600 mx-auto mb-4"></div>
					<p className="text-gray-600">
						{authLoading
							? "Kullanıcı bilgileri yükleniyor..."
							: "Sipariş bilgileri yükleniyor..."}
					</p>
				</div>
			</div>
		);
	}

	if (!user || items.length === 0) {
		return null; // Will redirect above
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<main className="pt-32 pb-8 px-6">
				<div className="mx-12">
					{/* Header */}
					<div className="flex items-center justify-between mb-8">
						<div className="flex items-center space-x-4">
							<Link
								href="/sepet"
								className="flex items-center text-gray-600 hover:text-gray-800"
							>
								<ArrowLeft className="w-5 h-5 mr-2" />
								Sepete Dön
							</Link>
							<div className="h-6 w-px bg-gray-300"></div>
							<h1 className="text-3xl font-bold text-gray-900 flex items-center">
								<CreditCard className="w-8 h-8 mr-3" />
								Ödeme
							</h1>
						</div>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{/* Checkout Form */}
						<div className="lg:col-span-2 space-y-6">
							{/* Delivery Address */}
							<div className="bg-white rounded-lg shadow-sm border border-gray-200">
								<div className="p-6 border-b border-gray-200">
									<h2 className="text-xl font-semibold text-gray-900 flex items-center">
										<MapPin className="w-6 h-6 mr-2" />
										Teslimat Adresi
									</h2>
								</div>

								<div className="p-6">
									{!showAddressForm ? (
										<div className="space-y-4">
											{/* Address Selection */}
											<div className="grid grid-cols-1 gap-4">
												{addresses.map((address) => (
													<div
														key={address.id}
														className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
															selectedAddress?.id === address.id
																? "border-gray-600 bg-gray-50"
																: "border-gray-200 hover:border-gray-300"
														}`}
														onClick={() => setSelectedAddress(address)}
													>
														<div className="flex justify-between items-start">
															<div className="flex-1">
																<div className="flex items-center space-x-2 mb-2">
																	<h3 className="font-medium text-gray-900">
																		{address.title}
																	</h3>
																	{address.isDefault && (
																		<span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
																			Varsayılan
																		</span>
																	)}
																</div>
																<p className="text-gray-700">
																	{address.firstName} {address.lastName}
																</p>
																<p className="text-gray-600 text-sm">
																	{address.addressLine1}
																	{address.addressLine2 &&
																		`, ${address.addressLine2}`}
																</p>
																<p className="text-gray-600 text-sm">
																	{address.district}, {address.city}{" "}
																	{address.postalCode}
																</p>
																<p className="text-gray-600 text-sm">
																	{address.phone}
																</p>
															</div>
															<div
																className={`w-4 h-4 rounded-full border-2 ${
																	selectedAddress?.id === address.id
																		? "border-gray-600 bg-gray-600"
																		: "border-gray-300"
																}`}
															>
																{selectedAddress?.id === address.id && (
																	<div className="w-full h-full rounded-full bg-gray-600"></div>
																)}
															</div>
														</div>
													</div>
												))}
											</div>

											{/* Add New Address Button */}
											<button
												onClick={() => setShowAddressForm(true)}
												className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors flex items-center justify-center space-x-2"
											>
												<Plus className="w-5 h-5" />
												<span>Yeni Adres Ekle</span>
											</button>
										</div>
									) : (
										<div className="space-y-4">
											<h3 className="font-medium text-gray-900">
												Yeni Adres Ekle
											</h3>
											<p className="text-gray-600 text-sm">
												Adres ekleme formu yakında eklenecek...
											</p>
											<Button
												variant="outline"
												onClick={() => setShowAddressForm(false)}
											>
												Geri Dön
											</Button>
										</div>
									)}
								</div>
							</div>

							{/* Delivery Options */}
							<div className="bg-white rounded-lg shadow-sm border border-gray-200">
								<div className="p-6 border-b border-gray-200">
									<h2 className="text-xl font-semibold text-gray-900 flex items-center">
										<Truck className="w-6 h-6 mr-2" />
										Teslimat Seçenekleri
									</h2>
								</div>

								<div className="p-6">
									<div className="space-y-4">
										<div className="p-4 rounded-lg border-2 border-gray-600 bg-gray-50">
											<div className="flex justify-between items-start">
												<div className="flex-1">
													<h3 className="font-medium text-gray-900 flex items-center">
														<Truck className="w-5 h-5 mr-2 text-gray-600" />
														Standart Teslimat
													</h3>
													<p className="text-gray-600 text-sm mt-1">
														1-2 iş günü içinde teslimat
													</p>
												</div>
												<div className="text-right">
													<span className="font-semibold text-gray-600">
														Ücretsiz
													</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* Payment Method */}
							<div className="bg-white rounded-lg shadow-sm border border-gray-200">
								<div className="p-6 border-b border-gray-200">
									<h2 className="text-xl font-semibold text-gray-900 flex items-center">
										<CreditCard className="w-6 h-6 mr-2" />
										Ödeme Yöntemi
									</h2>
								</div>

								<div className="p-6">
									<div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
										<div className="flex items-center text-gray-800 mb-2">
											<Shield className="w-5 h-5 mr-2" />
											<span className="font-medium">Güvenli Ödeme</span>
										</div>
										<p className="text-sm text-gray-700">
											Ödeme işlemi güvenli SSL sertifikası ile korunmaktadır.
											Kredi kartı, banka kartı veya havale ile ödeme
											yapabilirsiniz.
										</p>
									</div>
								</div>
							</div>
						</div>

						{/* Order Summary */}
						<div className="lg:col-span-1">
							<div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-8">
								<div className="p-6 border-b border-gray-200">
									<h2 className="text-xl font-semibold text-gray-900">
										Sipariş Özeti
									</h2>
								</div>

								<div className="p-6">
									{/* Items */}
									<div className="space-y-4 mb-6">
										{items.map((item) => (
											<div key={item.id} className="flex space-x-3">
												<img
													src={getProductImage(item.product)}
													alt={item.product.name}
													className="w-16 h-16 object-cover rounded-lg border border-gray-200"
													onError={(e) => {
														const target = e.target as HTMLImageElement;
														target.src = "/placeholder.svg";
													}}
												/>
												<div className="flex-1 min-w-0">
													<h3 className="font-medium text-gray-900 truncate">
														{item.product.name}
													</h3>
													<div className="flex items-center space-x-2 mt-1">
														{item.purchase_type === "subscription" ? (
															<span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
																<Clock className="w-3 h-3 mr-1" />
																Abonelik
															</span>
														) : (
															<span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
																Tek Seferlik
															</span>
														)}
													</div>
													<div className="flex justify-between items-center mt-2">
														<span className="text-sm text-gray-600">
															{item.quantity} adet
														</span>
														<span className="font-medium text-gray-900">
															{item.formatted_total_price}
														</span>
													</div>
												</div>
											</div>
										))}
									</div>

									{/* Totals */}
									<div className="space-y-3 border-t border-gray-200 pt-4">
										<div className="flex justify-between text-gray-600">
											<span>Ara Toplam</span>
											<span>
												{summary?.formatted_subtotal ||
													formatPrice(summary?.subtotal || 0)}
											</span>
										</div>

										<div className="flex justify-between text-gray-600">
											<span>Kargo</span>
											<span className="text-gray-600">Ücretsiz</span>
										</div>

										<div className="border-t border-gray-200 pt-3">
											<div className="flex justify-between text-lg font-semibold text-gray-900">
												<span>Toplam</span>
												<span>
													{summary?.formatted_subtotal ||
														formatPrice(summary?.subtotal || 0)}
												</span>
											</div>
										</div>
									</div>

									{/* Place Order Button */}
									<div className="mt-6">
										<Button
											size="lg"
											className="w-full bg-gray-600 hover:bg-gray-700"
											onClick={handlePlaceOrder}
											disabled={isLoading || !selectedAddress}
										>
											{isLoading ? (
												<div className="flex items-center">
													<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
													Sipariş Veriliyor...
												</div>
											) : (
												<>
													<CreditCard className="w-5 h-5 mr-2" />
													Siparişi Tamamla
												</>
											)}
										</Button>
									</div>

									{/* Security Info */}
									<div className="mt-4 bg-gray-50 rounded-lg p-3">
										<div className="flex items-center text-gray-600 text-sm">
											<Shield className="w-4 h-4 mr-2" />
											<span>256-bit SSL şifrelemesi ile korunmaktadır</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
