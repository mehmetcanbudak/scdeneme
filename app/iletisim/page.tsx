"use client";

import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type React from "react";
import { useCallback, useId, useState } from "react";

//import { ContactDistortion } from "@/components/contact-distortion";
import HeroHeader from "@/components/hero-header";
import { Button } from "@/components/ui/button";
import { useNavigationTransparency } from "@/hooks/use-navigation-transparency";

export default function Iletisim() {
	// Enable transparent navigation for hero section
	useNavigationTransparency(true);

	const mainContentId = useId();
	const formBaseId = useId();

	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		message: "",
		agreeToPolicy: false,
	});

	const scrollToContent = useCallback(() => {
		const contentSection = document.getElementById(mainContentId);
		if (contentSection) {
			const headerHeight = 64;
			const elementPosition =
				contentSection.getBoundingClientRect().top + window.pageYOffset;
			const offsetPosition = elementPosition - headerHeight;

			window.scrollTo({
				top: offsetPosition,
				behavior: "smooth",
			});
		}
	}, [mainContentId]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle form submission
		console.log("Form submitted:", formData);
	};

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => {
		const { name, value, type } = e.target;
		setFormData({
			...formData,
			[name]:
				type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
		});
	};

	return (
		<div className="min-h-screen relative bg-white">
			{/* Navigation is now handled by the shared Navigation component */}

			<HeroHeader
				slides={[
					{
						title: "",
						subtitle: "",
						buttonText: "",
						image: "/tohumlar.png",
					},
				]}
				onScrollToNext={scrollToContent}
				singleImage={true}
				showDots={false}
				customHeight="65vh"
			/>

			<main
				id={mainContentId}
				className="py-12 px-6 relative z-10 bg-[#F6EBE2]
]"
			>
				<div className="mx-12">
					{/* Page Header */}
					<div className="text-center mb-16">
						<h1 className="text-4xl md:text-5xl font-light mb-4 tracking-wide text-gray-800">
							İletişim
						</h1>
						<p className="text-lg text-gray-700">
							Sorularınız için bizimle iletişime geçin. Size hızlıca dönüş
							yapacağız.
						</p>
					</div>

					{/* <ContactDistortion
						className="mb-20"
						items={[
							{
								title: "Kurumsal İş Birlikleri",
								description:
									"Kurumsal dikey tarım çözümleri, franchise modelleri ve yatırımcı ilişkileri için doğru uzmanlarla bağlantı kurun.",
								image: "/fresh-vegetables-and-greens-in-modern-greenhouse.png",
							},
							{
								title: "Teknik Destek",
								description:
									"Ürünlerimiz, otomasyon sistemlerimiz veya operasyonel süreçler hakkında teknik danışmanlık alın.",
								image: "/fresh-leafy-greens-and-herbs-in-baskets.png",
							},
							{
								title: "Tedarik ve Lojistik",
								description:
									"Ürün tedariki, soğuk zincir lojistik ve abonelik teslimatlarıyla ilgili taleplerinizi iletin.",
								image: "/agricultural-figures-with-plants-and-sun.png",
							},
							{
								title: "Medya ve Etkinlik",
								description:
									"Basın, sosyal medya iş birlikleri veya etkinlik konuşmacı taleplerinizi ekibimize iletin.",
								image: "/organic-farming-greenhouse-vegetables.png",
							},
						]}
					/> */}

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
						{/* Contact Form */}
						<div className="bg-[#9bc1ddc4] rounded-3xl shadow-sm border border-black p-8 hover:shadow-md transition-shadow">
							<h2 className="text-2xl font-medium mb-6 text-gray-700 text-center">
								Bize Ulaşın
							</h2>
							<form onSubmit={handleSubmit} className="space-y-6">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<label
											htmlFor={`${formBaseId}-firstName`}
											className="block text-sm font-medium text-gray-700 mb-2"
										>
											Ad *
										</label>
										<input
											type="text"
											id={`${formBaseId}-firstName`}
											name="firstName"
											placeholder="Adınız"
											value={formData.firstName}
											onChange={handleChange}
											className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-blue-50 placeholder:text-gray-500 text-gray-800"
											required
										/>
									</div>

									<div>
										<label
											htmlFor={`${formBaseId}-lastName`}
											className="block text-sm font-medium text-gray-700 mb-2"
										>
											Soyad *
										</label>
										<input
											type="text"
											id={`${formBaseId}-lastName`}
											name="lastName"
											placeholder="Soyadınız"
											value={formData.lastName}
											onChange={handleChange}
											className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-blue-50 placeholder:text-gray-500 text-gray-800"
											required
										/>
									</div>
								</div>

								<div>
									<label
										htmlFor={`${formBaseId}-email`}
										className="block text-sm font-medium text-gray-700 mb-2"
									>
										E-posta *
									</label>
									<input
										type="email"
										id={`${formBaseId}-email`}
										name="email"
										placeholder="ornek@email.com"
										value={formData.email}
										onChange={handleChange}
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-blue-50 placeholder:text-gray-500 text-gray-800"
										required
									/>
								</div>

								<div>
									<label
										htmlFor={`${formBaseId}-phone`}
										className="block text-sm font-medium text-gray-700 mb-2"
									>
										Telefon Numarası *
									</label>
									<div className="flex">
										<div className="flex items-center px-3 py-3 border border-gray-300 border-r-0 rounded-l-lg bg-gray-100 text-gray-600">
											<span className="text-sm">+90</span>
										</div>
										<input
											type="tel"
											id={`${formBaseId}-phone`}
											name="phone"
											placeholder="5XX XXX XX XX"
											value={formData.phone}
											onChange={handleChange}
											className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-blue-50 placeholder:text-gray-500 text-gray-800"
											required
										/>
									</div>
								</div>

								<div>
									<label
										htmlFor={`${formBaseId}-message`}
										className="block text-sm font-medium text-gray-700 mb-2"
									>
										Mesaj *
									</label>
									<textarea
										id={`${formBaseId}-message`}
										name="message"
										rows={6}
										placeholder="Mesajınızı yazın..."
										value={formData.message}
										onChange={handleChange}
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-blue-50 placeholder:text-gray-500 text-gray-800"
										required
									/>
								</div>

								<div className="flex items-start">
									<input
										type="checkbox"
										id={`${formBaseId}-agreeToPolicy`}
										name="agreeToPolicy"
										checked={formData.agreeToPolicy}
										onChange={handleChange}
										className="mt-1 mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
										required
									/>
									<label
										htmlFor={`${formBaseId}-agreeToPolicy`}
										className="text-sm text-gray-700"
									>
										Gizlilik politikamızı kabul ediyorum.{" "}
										<a
											href="#"
											className="text-blue-600 hover:text-blue-800 underline"
										>
											Gizlilik politikası
										</a>
									</label>
								</div>

								<Button type="submit" size="lg" className="w-full">
									<Mail className="w-4 h-4 mr-2" />
									Mesaj Gönder
								</Button>
							</form>
						</div>

						{/* Contact Information */}
						<div className="bg-[#9bc1ddc4] rounded-3xl shadow-sm border border-black p-8 hover:shadow-md transition-shadow">
							<h2 className="text-2xl font-medium mb-6 text-gray-700 text-center">
								İletişim Bilgileri
							</h2>

							<div className="space-y-6">
								<div className="flex flex-col items-center text-center">
									<div className="w-12 h-12 bg-[#77A4CE] rounded-full flex items-center justify-center mb-4">
										<MapPin className="w-5 h-5 text-gray-600" />
									</div>
									<div>
										<h3 className="font-medium mb-2 text-gray-700">Adres</h3>
										<a
											href="https://share.google/cDKuEwHtK70zb8SgS"
											target="_blank"
											rel="noopener noreferrer"
											className="text-gray-600 hover:text-gray-800 transition-colors leading-relaxed"
										>
											Çorlu 1 OSB
											<br />
											Bülent Ecevit Caddesi No:13/1
											<br />
											PK: 59860 – Tekirdağ, Türkiye
										</a>
									</div>
								</div>

								<div className="flex flex-col items-center text-center">
									<div className="w-12 h-12 bg-[#77A4CE] rounded-full flex items-center justify-center mb-4">
										<Phone className="w-5 h-5 text-gray-600" />
									</div>
									<div>
										<h3 className="font-medium mb-2 text-gray-700">Telefon</h3>
										<a
											href="tel:+902826854383"
											className="text-gray-600 hover:text-gray-800 transition-colors"
										>
											+90 282 685 43 83
										</a>
									</div>
								</div>

								<div className="flex flex-col items-center text-center">
									<div className="w-12 h-12 bg-[#77A4CE] rounded-full flex items-center justify-center mb-4">
										<Mail className="w-5 h-5 text-gray-600" />
									</div>
									<div>
										<h3 className="font-medium mb-2 text-gray-700">E-posta</h3>
										<a
											href="mailto:info@skycrops.farm"
											className="text-gray-600 hover:text-gray-800 transition-colors"
										>
											info@skycrops.farm
										</a>
									</div>
								</div>

								<div className="flex flex-col items-center text-center">
									<div className="w-12 h-12 bg-[#77A4CE] rounded-full flex items-center justify-center mb-4">
										<Clock className="w-5 h-5 text-gray-600" />
									</div>
									<div>
										<h3 className="font-medium mb-2 text-gray-700">
											Çalışma Saatleri
										</h3>
										<p className="text-gray-600">
											Pazartesi - Cuma: 9:00 AM - 6:00 PM
											<br />
											Cumartesi: 9:00 AM - 4:00 PM
											<br />
											Pazar: Kapalı
										</p>
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
