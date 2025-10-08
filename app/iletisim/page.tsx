"use client";

import HeroHeader from "@/components/hero-header";
import { Button } from "@/components/ui/button";
import { useFooterColorSetter } from "@/hooks/use-footer-color";
import { useNavigationTransparency } from "@/hooks/use-navigation-transparency";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import type React from "react";
import { memo, useCallback, useId, useMemo, useState } from "react";

interface ContactInfoItemProps {
	icon: React.ReactNode;
	title: string;
	children: React.ReactNode;
}

/**
 * Contact information item component with icon and content
 */
const ContactInfoItem = memo(function ContactInfoItem({
	icon,
	title,
	children,
}: ContactInfoItemProps) {
	return (
		<div className="flex flex-col items-center text-center">
			<div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 transition-transform hover:scale-110">
				{icon}
			</div>
			<div>
				<h3 className="text-xl md:text-2xl font-medium leading-snug mb-2 text-gray-700">
					{title}
				</h3>
				{children}
			</div>
		</div>
	);
});

interface FormInputProps {
	id: string;
	name: string;
	label: string;
	type?: string;
	placeholder: string;
	value: string;
	onChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => void;
	required?: boolean;
	rows?: number;
	isTextarea?: boolean;
	hasPhonePrefix?: boolean;
}

/**
 * Reusable form input component with consistent styling
 */
const FormInput = memo(function FormInput({
	id,
	name,
	label,
	type = "text",
	placeholder,
	value,
	onChange,
	required = false,
	rows,
	isTextarea = false,
	hasPhonePrefix = false,
}: FormInputProps) {
	const inputClassName =
		"w-full px-3.5 py-3.5 text-base border-[1.5px] border-black rounded-lg shadow-[2.5px_3px_0_#000] focus:shadow-[5.5px_7px_0_#000] outline-none transition-all duration-200 ease-in-out bg-white placeholder:text-gray-500 text-gray-800";

	return (
		<div>
			<label
				htmlFor={id}
				className="block text-sm font-medium text-gray-700 mb-2"
			>
				{label} {required && "*"}
			</label>
			{hasPhonePrefix ? (
				<div className="flex">
					<div className="flex items-center px-3.5 py-3.5 border-[1.5px] border-black border-r-0 rounded-l-lg bg-gray-100 text-gray-600 shadow-[2.5px_3px_0_#000]">
						<span className="text-base">+90</span>
					</div>
					<input
						type={type}
						id={id}
						name={name}
						placeholder={placeholder}
						value={value}
						onChange={onChange}
						className={`flex-1 px-3.5 py-3.5 text-base border-[1.5px] border-black rounded-r-lg shadow-[2.5px_3px_0_#000] focus:shadow-[5.5px_7px_0_#000] outline-none transition-all duration-200 ease-in-out bg-white placeholder:text-gray-500 text-gray-800`}
						required={required}
					/>
				</div>
			) : isTextarea ? (
				<textarea
					id={id}
					name={name}
					rows={rows}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					className={`${inputClassName} resize-none`}
					required={required}
				/>
			) : (
				<input
					type={type}
					id={id}
					name={name}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					className={inputClassName}
					required={required}
				/>
			)}
		</div>
	);
});

/**
 * Contact page (Iletisim) component
 * Features:
 * - Hero section with transparent navigation
 * - Contact form with validation
 * - Contact information display
 * - Responsive layout
 * - Accessibility features
 */
export default function Iletisim() {
	// Enable transparent navigation for hero section
	useNavigationTransparency(true);

	// Set footer color to match page background
	useFooterColorSetter("#A5D4D9");

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

	/**
	 * Scroll to main content section
	 */
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

	/**
	 * Handle form submission
	 */
	const handleSubmit = useCallback(
		(e: React.FormEvent) => {
			e.preventDefault();
			// Handle form submission
			console.log("Form submitted:", formData);
		},
		[formData],
	);

	/**
	 * Handle form field changes
	 */
	const handleChange = useCallback(
		(
			e: React.ChangeEvent<
				HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
			>,
		) => {
			const { name, value, type } = e.target;
			setFormData((prev) => ({
				...prev,
				[name]:
					type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
			}));
		},
		[],
	);

	/**
	 * Hero slides configuration
	 */
	const heroSlides = useMemo(
		() => [
			{
				title: "",
				subtitle: "",
				buttonText: "",
				image: "/iletisim.png",
				mobileImage: "/iletisim_mobile.svg",
				mobileAlt: "İletişim hero görseli",
			},
		],
		[],
	);

	/**
	 * Contact information items
	 */
	const contactInfoItems = useMemo(
		() => [
			{
				icon: <MapPin className="w-5 h-5 text-gray-600" />,
				title: "Adres",
				content: (
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
				),
			},
			{
				icon: <Phone className="w-5 h-5 text-gray-600" />,
				title: "Telefon",
				content: (
					<a
						href="tel:+902826854383"
						className="text-gray-600 hover:text-gray-800 transition-colors"
					>
						+90 282 685 43 83
					</a>
				),
			},
			{
				icon: <Mail className="w-5 h-5 text-gray-600" />,
				title: "E-posta",
				content: (
					<a
						href="mailto:info@skycrops.farm"
						className="text-gray-600 hover:text-gray-800 transition-colors"
					>
						info@skycrops.farm
					</a>
				),
			},
			{
				icon: <Clock className="w-5 h-5 text-gray-600" />,
				title: "Çalışma Saatleri",
				content: (
					<p className="text-gray-600">
						Pazartesi - Cuma: 9:00 AM - 6:00 PM
						<br />
						Cumartesi: 9:00 AM - 4:00 PM
						<br />
						Pazar: Kapalı
					</p>
				),
			},
		],
		[],
	);

	return (
		<div className="min-h-screen relative bg-[#A5D4D9]">
			{/* Hero Section */}
			<HeroHeader
				slides={heroSlides}
				onScrollToNext={scrollToContent}
				singleImage={true}
				showDots={false}
				customHeight="100vh"
			/>

			{/* Main Content */}
			<main
				id={mainContentId}
				className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-8 relative z-10 bg-[#A5D4D9]"
			>
				<div className="mx-auto max-w-7xl">
					{/* Page Header */}
					<div className="text-center mb-12 sm:mb-16">
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-4 md:mb-6 text-gray-800">
							İletişim
						</h1>
						<p className="text-lg leading-relaxed text-gray-700">
							Sorularınız için bizimle iletişime geçin. Size hızlıca dönüş
							yapacağız.
						</p>
					</div>

					{/* Contact Form and Information Grid */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-16">
						{/* Contact Form */}
						<div className="bg-[#FDFBE2] rounded-3xl shadow-sm border border-black p-6 sm:p-8 hover:shadow-md transition-shadow">
							<h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight mb-4 md:mb-6 text-gray-700 text-center">
								Bize Ulaşın
							</h2>
							<form onSubmit={handleSubmit} className="space-y-6">
								{/* Name Fields */}
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<FormInput
										id={`${formBaseId}-firstName`}
										name="firstName"
										label="Ad"
										placeholder="Adınız"
										value={formData.firstName}
										onChange={handleChange}
										required
									/>
									<FormInput
										id={`${formBaseId}-lastName`}
										name="lastName"
										label="Soyad"
										placeholder="Soyadınız"
										value={formData.lastName}
										onChange={handleChange}
										required
									/>
								</div>

								{/* Email Field */}
								<FormInput
									id={`${formBaseId}-email`}
									name="email"
									label="E-posta"
									type="email"
									placeholder="ornek@email.com"
									value={formData.email}
									onChange={handleChange}
									required
								/>

								{/* Phone Field */}
								<FormInput
									id={`${formBaseId}-phone`}
									name="phone"
									label="Telefon Numarası"
									type="tel"
									placeholder="5XX XXX XX XX"
									value={formData.phone}
									onChange={handleChange}
									hasPhonePrefix
									required
								/>

								{/* Message Field */}
								<FormInput
									id={`${formBaseId}-message`}
									name="message"
									label="Mesaj"
									placeholder="Mesajınızı yazın..."
									value={formData.message}
									onChange={handleChange}
									isTextarea
									rows={6}
									required
								/>

								{/* Privacy Policy Checkbox */}
								<div className="flex items-start">
									<input
										type="checkbox"
										id={`${formBaseId}-agreeToPolicy`}
										name="agreeToPolicy"
										checked={formData.agreeToPolicy}
										onChange={handleChange}
										className="mt-1 mr-3 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
										required
									/>
									<label
										htmlFor={`${formBaseId}-agreeToPolicy`}
										className="text-sm text-gray-700"
									>
										Gizlilik politikamızı kabul ediyorum.{" "}
										<Link
											href="/gizlilik-politikasi"
											className="text-green-600 hover:text-green-800 underline"
										>
											Gizlilik politikası
										</Link>
									</label>
								</div>

								{/* Submit Button */}
								<Button type="submit" size="lg" className="w-full">
									<Mail className="w-4 h-4 mr-2" />
									Mesaj Gönder
								</Button>
							</form>
						</div>

						{/* Contact Information */}
						<div className="bg-[#FDFBE2] rounded-3xl shadow-sm border border-black p-6 sm:p-8 hover:shadow-md transition-shadow">
							<h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight mb-4 md:mb-6 text-gray-700 text-center">
								İletişim Bilgileri
							</h2>

							<div className="space-y-6">
								{contactInfoItems.map((item, index) => (
									<ContactInfoItem
										key={`${item.title}-${index}`}
										icon={item.icon}
										title={item.title}
									>
										{item.content}
									</ContactInfoItem>
								))}
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
