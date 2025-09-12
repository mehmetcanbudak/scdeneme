"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useNavigationTransparency } from "@/hooks/use-navigation-transparency";
import { useProducts } from "@/contexts/product-context";
import { useCart } from "@/contexts/cart-context";
import HeroHeader from "@/components/hero-header";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

export default function Home() {
	const router = useRouter();
	const {
		products,
		featuredProducts,
		isLoading: productsLoading,
	} = useProducts();
	const { addItem } = useCart();
	const [showLeftButton, setShowLeftButton] = useState(false);
	const [showRightButton, setShowRightButton] = useState(true);
	const [showHerbsLeftButton, setShowHerbsLeftButton] = useState(false);
	const [showHerbsRightButton, setShowHerbsRightButton] = useState(true);
	const [isHerbsUserInteracting, setIsHerbsUserInteracting] = useState(false);

	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const blogScrollRef = useRef<HTMLDivElement>(null);
	const herbsScrollRef = useRef<HTMLDivElement>(null);

	// Enable transparent navigation for hero section
	useNavigationTransparency(true);

	const slides = [
		{
			title: "SKYCROPS",
			subtitle: "YAŞAYAN SEBZELER",
			buttonText: "ABONE OL",
			buttonAction: () => router.push("/abonelik/taze-yesillikler-paketi"),
			image: "/agricultural-figures-with-plants-and-sun.png",
		},
	];

	const vegetables = [
		{ name: "KIVIRCIK", subtitle: "TAZE YAPRAKLAR", image: "/kivircik.png" },
		{ name: "FESLEĞEN", subtitle: "AROMATIK BİTKİ", image: "/feslegen.png" },
		{ name: "MAYDANOZ", subtitle: "VİTAMİN DEPOSU", image: "/maydanoz.png" },
		{
			name: "LOLLO ROSSO",
			subtitle: "KIRMIZI YAPRAK",
			image: "/lollo-rosso.png",
		},
		{ name: "REYHAN", subtitle: "AROMATIK NANE", image: "/reyhan.png" },
		{ name: "ROKA", subtitle: "ACIMSI LEZZET", image: "/roka.png" },
		{ name: "KEKİK", subtitle: "AROMATIK OT", image: "/kekik.png" },
		{
			name: "YAĞLI YAPRAK",
			subtitle: "TAZE YEŞİLLİK",
			image: "/yagli-yaprak.png",
		},
	];

	// Use real products for packages, fallback to static data
	const packages =
		featuredProducts.length > 0
			? featuredProducts.slice(0, 1).map((product, index) => ({
					id: product.id,
					name: product.name,
					description:
						product.description ||
						"Taze ve sağlıklı ürünlerimizden özenle seçilmiş paket",
					price: product.price.toFixed(2),
					originalPrice: (product.price * 1.2).toFixed(2), // 20% discount
					image: product.images?.[0]?.url || "/bundle4.png",
				}))
			: [
					{
						id: 1,
						name: "Taze Yeşillikler Paketi",
						description: "Kıvırcık, roka ve tereotundan taze karışım",
						price: "24.99",
						originalPrice: "29.99",
						image: "/bundle4.png",
					},
				];

	const blogPosts = [
		{
			title: "Peki Dikey Tarım Nedir?",
			excerpt: "Dikey tarım hakkında bilmeniz gereken her şey...",
			date: "17 Tem 2025",
			image: "/blog-vertical-farming.png",
			type: "blog",
		},
		{
			title: "İl Tarım Müdürlüğü Kadınlar Günü Kutlaması",
			excerpt:
				"Tekirdağ Valiliği İl Tarım ve Orman Müdürlüğü'ne katılımımız...",
			date: "8 Mar 2025",
			image: "/press-womens-day.png",
			type: "press",
		},
		{
			title: "Wageningen Üniversitesi Dikey Tarım Programı",
			excerpt:
				"Wageningen Üniversitesi ve Araştırma Merkezi Dikey Tarım Programına katıldık...",
			date: "17 Mar 2025",
			image: "/press-university-program.png",
			type: "press",
		},
		{
			title: "Anadolu Ajansı Skycrops'ta",
			excerpt: "Anadolu Ajansı Skycrops'ta...",
			date: "3 Mar 2025",
			image: "/press-anadolu-agency.png",
			type: "press",
		},
		{
			title: "Dikey Tarımda Yenilikler",
			excerpt: "Teknolojinin tarımdaki rolü ve gelecek...",
			date: "15 Şub 2025",
			image: "/blog-vertical-farming.png",
			type: "blog",
		},
	];

	useEffect(() => {
		const container = scrollContainerRef.current;
		if (!container) return;

		const scrollWidth = container.scrollWidth;
		const clientWidth = container.clientWidth;
		let scrollPosition = 0;

		const autoScroll = () => {
			scrollPosition += 1;
			if (scrollPosition >= scrollWidth - clientWidth) {
				scrollPosition = 0;
			}
			container.scrollLeft = scrollPosition;
		};

		const interval = setInterval(autoScroll, 50);
		return () => clearInterval(interval);
	}, []);

	// Initialize herbs scroll state
	useEffect(() => {
		handleHerbsScroll();
	}, []);

	// Handle screen resize for herbs section
	useEffect(() => {
		const handleResize = () => {
			const herbsContainer = herbsScrollRef.current;
			if (herbsContainer) {
				const isMobile = window.innerWidth < 768;
				if (isMobile) {
					herbsContainer.style.overflowX = "auto";
				} else {
					herbsContainer.style.overflowX = "hidden";
					herbsContainer.scrollLeft = 0; // Reset scroll position on desktop
				}
			}
		};

		// Initial check
		handleResize();

		// Add resize listener
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// Auto-scroll herbs section when user is not interacting (mobile only)
	useEffect(() => {
		const herbsContainer = herbsScrollRef.current;
		if (!herbsContainer || isHerbsUserInteracting) return;

		// Check if we're on mobile (screen width < 768px)
		const isMobile = window.innerWidth < 768;
		if (!isMobile) return;

		const scrollWidth = herbsContainer.scrollWidth;
		const clientWidth = herbsContainer.clientWidth;
		let scrollPosition = 0;

		const autoScroll = () => {
			if (isHerbsUserInteracting) return;

			scrollPosition += 1;
			if (scrollPosition >= scrollWidth - clientWidth) {
				scrollPosition = 0;
			}
			herbsContainer.scrollLeft = scrollPosition;
		};

		const interval = setInterval(autoScroll, 50);
		return () => clearInterval(interval);
	}, [isHerbsUserInteracting]);

	const scrollToNextSection = () => {
		const nextSection = document.querySelector("#biz-ne-yapiyoruz-section");
		if (nextSection) {
			const headerHeight = 64; // Navigation height after removing banner
			const elementPosition =
				nextSection.getBoundingClientRect().top + window.pageYOffset;
			const offsetPosition = elementPosition - headerHeight;

			window.scrollTo({
				top: offsetPosition,
				behavior: "smooth",
			});
		}
	};

	const scrollBlogLeft = () => {
		const blogContainer = blogScrollRef.current;
		if (blogContainer) {
			blogContainer.scrollBy({
				left: -320, // Width of one blog card plus gap
				behavior: "smooth",
			});
		}
	};

	const scrollBlogRight = () => {
		const blogContainer = blogScrollRef.current;
		if (blogContainer) {
			blogContainer.scrollBy({
				left: 320, // Width of one blog card plus gap
				behavior: "smooth",
			});
		}
	};

	const handleBlogScroll = () => {
		const blogContainer = blogScrollRef.current;
		if (blogContainer) {
			const { scrollLeft, scrollWidth, clientWidth } = blogContainer;
			setShowLeftButton(scrollLeft > 0);
			setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
		}
	};

	// Herbs scroll functions
	const scrollHerbsLeft = () => {
		setIsHerbsUserInteracting(true);
		const herbsContainer = herbsScrollRef.current;
		if (herbsContainer) {
			herbsContainer.scrollBy({
				left: -200, // Width of one herb card plus gap
				behavior: "smooth",
			});
		}
		// Reset user interaction after a delay
		setTimeout(() => {
			setIsHerbsUserInteracting(false);
		}, 2000);
	};

	const scrollHerbsRight = () => {
		setIsHerbsUserInteracting(true);
		const herbsContainer = herbsScrollRef.current;
		if (herbsContainer) {
			herbsContainer.scrollBy({
				left: 200, // Width of one herb card plus gap
				behavior: "smooth",
			});
		}
		// Reset user interaction after a delay
		setTimeout(() => {
			setIsHerbsUserInteracting(false);
		}, 2000);
	};

	const handleHerbsScroll = () => {
		const herbsContainer = herbsScrollRef.current;
		if (herbsContainer) {
			const { scrollLeft, scrollWidth, clientWidth } = herbsContainer;
			setShowHerbsLeftButton(scrollLeft > 0);
			setShowHerbsRightButton(scrollLeft < scrollWidth - clientWidth - 10);
		}
	};

	const handleHerbsTouchStart = () => {
		setIsHerbsUserInteracting(true);
	};

	const handleHerbsTouchEnd = () => {
		// Reset user interaction after a delay to allow auto-scroll to resume
		setTimeout(() => {
			setIsHerbsUserInteracting(false);
		}, 2000); // 2 second delay before resuming auto-scroll
	};

	const handleHerbsMouseDown = () => {
		setIsHerbsUserInteracting(true);
	};

	const handleHerbsMouseUp = () => {
		// Reset user interaction after a delay to allow auto-scroll to resume
		setTimeout(() => {
			setIsHerbsUserInteracting(false);
		}, 2000); // 2 second delay before resuming auto-scroll
	};

	return (
		<div className="min-h-screen bg-white relative overflow-x-hidden">
			{/* Hero Header Component */}
			<HeroHeader
				slides={slides}
				onScrollToNext={scrollToNextSection}
				singleImage={true}
				showDots={false}
			/>

			{/* Biz Ne Yapıyoruz Section */}
			<section id="biz-ne-yapiyoruz-section" className="py-16 px-6 bg-white relative z-10 overflow-x-hidden">
				<div className="max-w-6xl mx-auto">
					<div className="text-center mb-12">
						<h2 className="text-4xl md:text-5xl font-light mb-8 tracking-wide text-gray-800">
							Biz Ne Yapıyoruz
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
							<div className="text-center">
								<div className="w-24 h-24 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
									<img
										src="/Frame 169.svg"
										alt="Skycrops Icon"
										className="w-24 h-24 object-contain"
									/>
								</div>
								<h3 className="text-xl font-medium mb-2 text-gray-800">
									Biz Skycrops
								</h3>
								<p className="text-gray-600 text-sm">
									Modern dikey tarım teknolojisiyle geleceğin tarımını
									şekillendiriyoruz
								</p>
							</div>
							<div className="text-center">
								<div className="w-24 h-24 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
									<img
										src="/Frame 169.svg"
										alt="Skycrops Icon"
										className="w-24 h-24 object-contain"
									/>
								</div>
								<h3 className="text-xl font-medium mb-2 text-gray-800">
									Kapalı Alanda Dikey Tarım
								</h3>
								<p className="text-gray-600 text-sm">
									Kontrollü ortamda sürdürülebilir ve verimli üretim
									gerçekleştiriyoruz
								</p>
							</div>
							<div className="text-center">
								<div className="w-24 h-24 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
									<img
										src="/Frame 169.svg"
										alt="Skycrops Icon"
										className="w-24 h-24 object-contain"
									/>
								</div>
								<h3 className="text-xl font-medium mb-2 text-gray-800">
									Pestisitiz Hormonsuz
								</h3>
								<p className="text-gray-600 text-sm">
									Kimyevi müdahale olmadan doğal yöntemlerle sağlıklı ürünler
									yetiştiriyoruz
								</p>
							</div>
							<div className="text-center">
								<div className="w-24 h-24 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
									<img
										src="/Frame 169.svg"
										alt="Skycrops Icon"
										className="w-24 h-24 object-contain"
									/>
								</div>
								<h3 className="text-xl font-medium mb-2 text-gray-800">
									Taptaze Yeşillikleri Ulaştırıyoruz
								</h3>
								<p className="text-gray-600 text-sm">
									Hasattan dakikalar sonra kapınıza kadar taze ürünlerimizi
									getiriyoruz
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="py-16 px-6 bg-gray-50 relative z-10 overflow-x-hidden">
				<div className="max-w-6xl mx-auto">
					<div className="text-center mb-12">
						<h2 className="text-4xl md:text-5xl font-light mb-4 tracking-wide text-gray-800">
							Sebze Paketleri
						</h2>
						<p className="text-gray-600">
							En taze sebzellerimizin özenle seçilmiş koleksiyonları, sağlıklı
							yaşamınız için mükemmel paketler şeklinde
						</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
						{/* Package Card - Left Side */}
						<div className="space-y-6">
							{packages.map((pkg, index) => (
								<div
									key={index}
									className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
								>
									{/* Bundle Image - Top */}
									<div className="aspect-[4/3]">
										<img
											src={pkg.image || "/placeholder.svg"}
											alt={pkg.name}
											className="w-full h-full object-cover"
										/>
									</div>

									{/* Product Info - Bottom */}
									<div className="p-6">
										<h3 className="font-medium text-2xl mb-3 text-gray-800">{pkg.name}</h3>
										<p className="text-gray-600 text-base mb-6 leading-relaxed">
											{pkg.description}
										</p>
										<div className="flex items-center justify-between mb-6">
											<div className="flex items-center space-x-3">
												<span className="text-3xl font-light text-gray-800">
													{pkg.price} TL
												</span>
												<span className="text-gray-400 line-through text-lg">
													{pkg.originalPrice} TL
												</span>
											</div>
										</div>
										<Button
											className="w-full bg-gray-600 hover:bg-gray-700 text-white uppercase tracking-wide py-3 text-base font-medium"
											onClick={() => {
												if (pkg.id) {
													addItem(pkg.id, 1);
												}
											}}
										>
											Sepete Ekle
										</Button>
									</div>
								</div>
							))}
						</div>

						{/* FAQ Accordion - Right Side */}
						<div className="bg-white rounded-lg p-8 shadow-sm">
							<h3 className="text-3xl font-medium mb-8 text-gray-700">
								Paketlerimiz Hakkında
							</h3>
							<Accordion type="single" collapsible className="space-y-6">
								<AccordionItem value="item-1" className="border-gray-200">
									<AccordionTrigger className="text-left hover:no-underline text-lg font-medium text-gray-800 py-4">
										Paketlerimiz nasıl hazırlanır?
									</AccordionTrigger>
									<AccordionContent className="text-gray-600 leading-relaxed text-base pb-4">
										Her paket, taze hasat edilmiş sebzelerimizden özenle seçilerek hazırlanır.
										Kalite kontrolümüzden geçen ürünler, hijyenik koşullarda paketlenir ve
										en kısa sürede teslim edilmek üzere hazır hale getirilir.
									</AccordionContent>
								</AccordionItem>

								<AccordionItem value="item-2" className="border-gray-200">
									<AccordionTrigger className="text-left hover:no-underline text-lg font-medium text-gray-800 py-4">
										Teslimat süresi ne kadardır?
									</AccordionTrigger>
									<AccordionContent className="text-gray-600 leading-relaxed text-base pb-4">
										Siparişleriniz genellikle 24 saat içinde hazırlanır ve İstanbul içi teslimat
										için 2-3 iş günü, diğer bölgeler için 3-5 iş günü sürer. Hafta sonu
										siparişleri pazartesi günü işleme alınır.
									</AccordionContent>
								</AccordionItem>

								<AccordionItem value="item-3" className="border-gray-200">
									<AccordionTrigger className="text-left hover:no-underline text-lg font-medium text-gray-800 py-4">
										Ürünlerin tazeliği nasıl korunur?
									</AccordionTrigger>
									<AccordionContent className="text-gray-600 leading-relaxed text-base pb-4">
										Ürünlerimiz hasattan sonra hemen soğuk zincirde saklanır ve teslimata
										kadar bu koşullarda muhafaza edilir. Her paket, teslimattan önce taze
										kalite kontrolünden geçer.
									</AccordionContent>
								</AccordionItem>

								<AccordionItem value="item-4" className="border-gray-200">
									<AccordionTrigger className="text-left hover:no-underline text-lg font-medium text-gray-800 py-4">
										Paket içeriği değiştirilebilir mi?
									</AccordionTrigger>
									<AccordionContent className="text-gray-600 leading-relaxed text-base pb-4">
										Evet, özel ihtiyaçlarınıza göre paket içeriğini kişiselleştirebilirsiniz.
										Alerji durumunuz, tercih ettiğiniz sebzeler veya miktar değişiklikleri
										için müşteri hizmetlerimizle iletişime geçebilirsiniz.
									</AccordionContent>
								</AccordionItem>

								<AccordionItem value="item-5" className="border-gray-200">
									<AccordionTrigger className="text-left hover:no-underline text-lg font-medium text-gray-800 py-4">
										İptal ve iade koşulları nelerdir?
									</AccordionTrigger>
									<AccordionContent className="text-gray-600 leading-relaxed text-base pb-4">
										Siparişiniz ulaştıktan sonra 24 saat içinde ürün kalitesi ile ilgili
										sorunlarınızı bildirebilirsiniz. Kalite garantisi kapsamındaki ürünler
										için tam geri ödeme yapılır.
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						</div>
					</div>
				</div>
			</section>

			<section
				id="vegetables-section"
				className="py-16 bg-white relative z-10 overflow-x-hidden"
			>
				<div className="max-w-6xl mx-auto px-6">
					<div className="text-center mb-12">
						<h2 className="text-4xl md:text-5xl font-light mb-4 tracking-wide text-gray-800">
							Farmımızda Yetişen Sebzeler
						</h2>
						<p className="text-gray-600 text-lg mt-4">
							1 ay içiinde farmımızda yetiştirdiğimiz bütün çesitler evinize
							ulaşmış olacak.
						</p>
					</div>
				</div>

				<div className="relative w-full pl-16 pr-16">
					{/* Mobile: Horizontal scrollable herbs */}
					<div
						ref={herbsScrollRef}
						className="flex space-x-8 overflow-x-auto pb-4 px-6 herbs-scroll md:hidden"
						onScroll={handleHerbsScroll}
						onTouchStart={handleHerbsTouchStart}
						onTouchEnd={handleHerbsTouchEnd}
						onMouseDown={handleHerbsMouseDown}
						onMouseUp={handleHerbsMouseUp}
					>
						{vegetables.concat(vegetables).map((vegetable, index) => (
							<div
								key={index}
								className="flex-shrink-0 text-center group cursor-pointer w-32"
							>
								<div className="relative mb-4 overflow-hidden rounded-full w-32 h-32 mx-auto">
									<img
										src={vegetable.image || "/placeholder.svg"}
										alt={vegetable.name}
										className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
									/>
								</div>
								<h3 className="font-medium text-sm mb-1 tracking-wide">
									{vegetable.name}
								</h3>
								<p className="text-xs text-gray-600 uppercase tracking-widest">
									{vegetable.subtitle}
								</p>
							</div>
						))}
					</div>

					{/* Desktop: Grid layout herbs */}
					<div className="hidden md:grid md:grid-cols-4 lg:grid-cols-8 gap-8 px-6">
						{vegetables.map((vegetable, index) => (
							<div key={index} className="text-center group cursor-pointer">
								<div className="relative mb-4 overflow-hidden rounded-full w-32 h-32 mx-auto">
									<img
										src={vegetable.image || "/placeholder.svg"}
										alt={vegetable.name}
										className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
									/>
								</div>
								<h3 className="font-medium text-sm mb-1 tracking-wide">
									{vegetable.name}
								</h3>
								<p className="text-xs text-gray-600 uppercase tracking-widest">
									{vegetable.subtitle}
								</p>
							</div>
						))}
					</div>

					{/* Herbs Navigation Buttons - Mobile Only */}
					{showHerbsLeftButton && (
						<div className="absolute top-1/2 left-2 transform -translate-y-1/2 z-30 md:hidden">
							<button
								onClick={scrollHerbsLeft}
								className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer hover:shadow-xl transition-all duration-300"
							>
								<ChevronLeft className="w-5 h-5 text-gray-600" />
							</button>
						</div>
					)}

					{showHerbsRightButton && (
						<div className="absolute top-1/2 right-2 transform -translate-y-1/2 z-30 md:hidden">
							<button
								onClick={scrollHerbsRight}
								className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer hover:shadow-xl transition-all duration-300"
							>
								<ChevronRight className="w-5 h-5 text-gray-600" />
							</button>
						</div>
					)}
				</div>
			</section>

			<section className="py-16 px-6 bg-white relative z-10 overflow-x-hidden">
				<div className="max-w-6xl mx-auto">
					<div className="text-center mb-12">
						<h2 className="text-4xl md:text-5xl font-light mb-4 tracking-wide text-gray-800">
							Blog - Basında Biz
						</h2>
					</div>

					<div className="relative pl-16 pr-16">
						<div
							ref={blogScrollRef}
							className="flex space-x-6 overflow-x-auto pb-4"
							onScroll={handleBlogScroll}
							style={{
								scrollBehavior: "smooth",
								scrollbarWidth: "none",
								msOverflowStyle: "none",
								maxWidth: "100vw",
								width: "100%",
							}}
						>
							{blogPosts.map((post, index) => (
								<Link
									key={index}
									href={`/blog/${post.title.toLowerCase().replace(/\s+/g, "-").replace(/[?]/g, "")}`}
									className="flex-shrink-0 w-80"
								>
									<div className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer h-full">
										<div className="aspect-video">
											<img
												src={post.image || "/placeholder.svg"}
												alt={post.title}
												className="w-full h-full object-cover"
											/>
										</div>
										<div className="p-6">
											<div className="text-sm text-gray-500 mb-2">
												{post.date}
											</div>
											<h3 className="font-medium text-lg mb-3 line-clamp-2">
												{post.title}
											</h3>
											<p className="text-sm text-gray-600 line-clamp-3">
												{post.excerpt}
											</p>
										</div>
									</div>
								</Link>
							))}
						</div>

						{showLeftButton && (
							<div className="absolute top-1/2 left-2 transform -translate-y-1/2 z-30">
								<button
									onClick={scrollBlogLeft}
									className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer hover:shadow-xl transition-all duration-300"
								>
									<ChevronLeft className="w-5 h-5 text-gray-600" />
								</button>
							</div>
						)}

						{showRightButton && (
							<div className="absolute top-1/2 right-2 transform -translate-y-1/2 z-30">
								<button
									onClick={scrollBlogRight}
									className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer hover:shadow-xl transition-all duration-300"
								>
									<ChevronRight className="w-5 h-5 text-gray-600" />
								</button>
							</div>
						)}
					</div>

					<div className="text-center mt-8">
						<Link href="/blog">
							<Button
								variant="outline"
								className="border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white px-8 py-3 uppercase tracking-widest bg-transparent"
							>
								Tümünü Gör
							</Button>
						</Link>
					</div>
				</div>
			</section>

			{/* Category Grid */}
			<section className="py-16 px-6 bg-white relative z-10 overflow-x-hidden">
				<div className="max-w-6xl mx-auto relative z-10">
					{/* Desktop Grid View */}
					<div className="hidden md:grid md:grid-cols-3 gap-6">
						{[
							{
								title: "SAĞLIK",
								image: "/fresh-mixed-vegetables-display.png",
								buttonText: "KEŞFET",
								href: "/saglik",
							},
							{
								title: "SERTİFİKALAR VE ANALİZLER",
								image: "/iso.png",
								buttonText: "KEŞFET",
								href: "/sertifikalar",
							},
							{
								title: "SIKÇA SORULAN SORULAR",
								image: "/organic-farming-greenhouse-vegetables.png",
								buttonText: "KEŞFET",
								href: "/sorular",
							},
						].map((category, index) => (
							<Link
								key={index}
								href={category.href}
								className="relative group cursor-pointer overflow-hidden rounded-lg"
							>
								<div className="aspect-square">
									<img
										src={category.image || "/placeholder.svg"}
										alt={category.title}
										className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
									/>
								</div>
								<div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300"></div>
								<div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
									<h3 className="text-xl font-light mb-4 tracking-wide">
										{category.title}
									</h3>
									<Button
										variant="outline"
										size="sm"
										className="bg-transparent border-white text-white hover:bg-white hover:text-black w-fit uppercase tracking-widest text-xs"
									>
										{category.buttonText}
									</Button>
								</div>
							</Link>
						))}
					</div>

					{/* Mobile List View */}
					<div className="md:hidden space-y-4">
						{[
							{
								title: "SAĞLIK",
								image: "/fresh-mixed-vegetables-display.png",
								buttonText: "KEŞFET",
								href: "/saglik",
							},
							{
								title: "SERTİFİKALAR VE ANALİZLER",
								image: "/iso.png",
								buttonText: "KEŞFET",
								href: "/sertifikalar",
							},
							{
								title: "SIKÇA SORULAN SORULAR",
								image: "/organic-farming-greenhouse-vegetables.png",
								buttonText: "KEŞFET",
								href: "/sorular",
							},
						].map((category, index) => (
							<Link
								key={index}
								href={category.href}
								className="relative group cursor-pointer overflow-hidden rounded-lg block"
							>
								<div className="aspect-[16/9]">
									<img
										src={category.image || "/placeholder.svg"}
										alt={category.title}
										className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
									/>
								</div>
								<div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300"></div>
								<div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
									<h3 className="text-xl font-light mb-4 tracking-wide">
										{category.title}
									</h3>
									<Button
										variant="outline"
										size="sm"
										className="bg-transparent border-white text-white hover:bg-white hover:text-black w-fit uppercase tracking-widest text-sm"
									>
										{category.buttonText}
									</Button>
								</div>
							</Link>
						))}
					</div>
				</div>
			</section>
		</div>
	);
}
