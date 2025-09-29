"use client";

import HeroHeader from "@/components/hero-header";
import { Button } from "@/components/ui/button";
import { useNavigationTransparency } from "@/hooks/use-navigation-transparency";
import { getArticles, getStrapiMediaUrl } from "@/lib/strapi";
import { ArrowRight, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";

// Minimal type for UI mapping
type UiPost = {
	title: string;
	excerpt?: string;
	date?: string;
	image?: string | null;
	readTime?: string;
	slug: string;
};

export default function Blog() {
	// Enable transparent navigation for hero section
	useNavigationTransparency(true);

	const contentId = useId();
	const [posts, setPosts] = useState<UiPost[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const [showBlogLeftButton, setShowBlogLeftButton] = useState(false);
	const [showBlogRightButton, setShowBlogRightButton] = useState(true);
	const [showPressLeftButton, setShowPressLeftButton] = useState(false);
	const [showPressRightButton, setShowPressRightButton] = useState(true);

	const blogScrollRef = useRef<HTMLDivElement>(null);
	const pressScrollRef = useRef<HTMLDivElement>(null);

	// Pagination state
	const [page, setPage] = useState(1);
	const pageSize = 12;
	const [pageCount, setPageCount] = useState<number | null>(null);

	useEffect(() => {
		async function load(currentPage: number) {
			try {
				setLoading(true);
				setError(null);
				const json = await getArticles({
					page: currentPage,
					pageSize,
					preview: true,
				});
				const mapped: UiPost[] = (json?.data ?? []).map((item: unknown) => {
					const a = (item as any)?.attributes ?? (item as any) ?? {};
					const coverUrl = getStrapiMediaUrl(a.cover);
					const date =
						a.publishedAt || a.createdAt
							? new Date(a.publishedAt || a.createdAt).toLocaleDateString(
									"tr-TR",
								)
							: undefined;
					return {
						title: a.title,
						excerpt: a.excerpt,
						date,
						image: coverUrl,
						readTime: a.readTime ? `${a.readTime} dk okuma` : undefined,
						slug: a.slug,
					};
				});
				setPosts(mapped);
				const pg = (json as any)?.meta?.pagination;
				if (pg?.pageCount) setPageCount(pg.pageCount);
			} catch (e: unknown) {
				setError((e as Error)?.message || "İçerik yüklenemedi");
			} finally {
				setLoading(false);
			}
		}
		load(page);
	}, [page]);

	const scrollToContent = useCallback(() => {
		const contentSection = document.getElementById(contentId);
		if (contentSection) {
			const headerHeight = 64;
			const elementPosition =
				contentSection.getBoundingClientRect().top + window.pageYOffset;
			const offsetPosition = elementPosition - headerHeight;

			window.scrollTo({ top: offsetPosition, behavior: "smooth" });
		}
	}, [contentId]);

	// Blog scroll functions
	const scrollBlogLeft = () => {
		const blogContainer = blogScrollRef.current;
		if (blogContainer) {
			const scrollAmount = Math.min(320, blogContainer.clientWidth * 0.8);
			blogContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
		}
	};

	const scrollBlogRight = () => {
		const blogContainer = blogScrollRef.current;
		if (blogContainer) {
			const scrollAmount = Math.min(320, blogContainer.clientWidth * 0.8);
			blogContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
		}
	};

	const handleBlogScroll = () => {
		const blogContainer = blogScrollRef.current;
		if (blogContainer) {
			const { scrollLeft, scrollWidth, clientWidth } = blogContainer;
			setShowBlogLeftButton(scrollLeft > 0);
			setShowBlogRightButton(scrollLeft < scrollWidth - clientWidth - 10);
		}
	};

	// Press scroll functions
	const scrollPressLeft = () => {
		const pressContainer = pressScrollRef.current;
		if (pressContainer) {
			const scrollAmount = Math.min(320, pressContainer.clientWidth * 0.8);
			pressContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
		}
	};

	const scrollPressRight = () => {
		const pressContainer = pressScrollRef.current;
		if (pressContainer) {
			const scrollAmount = Math.min(320, pressContainer.clientWidth * 0.8);
			pressContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
		}
	};

	const handlePressScroll = () => {
		const pressContainer = pressScrollRef.current;
		if (pressContainer) {
			const { scrollLeft, scrollWidth, clientWidth } = pressContainer;
			setShowPressLeftButton(scrollLeft > 0);
			setShowPressRightButton(scrollLeft < scrollWidth - clientWidth - 10);
		}
	};

	const pressArticles = [
		{
			title: "İl Tarım Müdürlüğü Kadınlar Günü Kutlaması",
			excerpt:
				"Tekirdağ Valiliği İl Tarım ve Orman Müdürlüğü'ne katılımımız verilecek destek ve 8 Mart Dünya Kadınlar Günü'nü kutlanan için teşekkür ederiz.",
			date: "8 Mart 2024",
			image: "/press-womens-day.png",
			readTime: "3 dk okuma",
			slug: "il-tarim-mudurlugu-kadinlar-gunu",
		},
		{
			title: "Wageningen Üniversitesi Dikey Tarım Programı",
			excerpt:
				"Wageningen Üniversitesi ve Araştırma Merkezi Dikey Tarım Programına Katıldık.",
			date: "5 Mart 2024",
			image: "/press-university-program.png",
			readTime: "4 dk okuma",
			slug: "wageningen-universitesi-dikey-tarim",
		},
		{
			title: "Anadolu Ajansı Skycrops'ta",
			excerpt: "Anadolu Ajansı Skycrops'ta.",
			date: "2 Mart 2024",
			image: "/press-anadolu-agency.png",
			readTime: "2 dk okuma",
			slug: "anadolu-ajansi-skycrops",
		},
	];

	const featured = posts[0];

	return (
		<div className="min-h-screen bg-white relative">
			{/* Fixed header with transparent/scrolled states */}
			<HeroHeader
				slides={[
					{
						title: "",
						subtitle: "",
						buttonText: "",
						image: "/thelettuceguy.png",
					},
				]}
				onScrollToNext={scrollToContent}
				singleImage={true}
				showDots={false}
				customHeight="65vh"
			/>

			{/* Main content with id and bg-white */}
			<main
				id={contentId}
				className="py-6 px-4 sm:py-8 sm:px-6 lg:py-12 lg:px-8 relative z-10 bg-[#76A4CE]/[0.34]"
			>
				<div className="mx-auto max-w-7xl">
					{/* Page Header */}
					<div className="text-center mb-8 sm:mb-12">
						<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-3 sm:mb-4 tracking-wide text-gray-800">
							Blog
						</h1>
						<p className="text-base sm:text-lg text-gray-600 px-4">
							Ekibimizce yazılan blog yazılarımız.
						</p>
					</div>

					{/* Featured Post */}
					{loading ? (
						<div className="p-6 sm:p-8 text-center text-gray-600">
							Yükleniyor…
						</div>
					) : error ? (
						<div className="p-6 sm:p-8 text-center text-red-600">{error}</div>
					) : posts.length === 0 ? (
						<div className="p-6 sm:p-8 text-center text-gray-600 bg-green-50 rounded-lg">
							Henüz makale yok. Yakında içerikler eklenecek.
						</div>
					) : featured ? (
						<div className="bg-green-50 p-4 sm:p-6 lg:p-8 rounded-lg shadow-sm mb-6 sm:mb-8">
							<p className="text-xs sm:text-sm uppercase tracking-widest text-gray-600 mb-4 sm:mb-6">
								Son Makale
							</p>
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
								<div className="order-2 lg:order-1">
									<div className="relative w-full h-48 sm:h-64 lg:h-80 rounded-lg overflow-hidden">
										<Image
											src={featured.image || "/placeholder.svg"}
											alt={featured.title}
											fill
											className="object-cover"
											sizes="(max-width: 1024px) 100vw, 50vw"
										/>
									</div>
								</div>
								<div className="order-1 lg:order-2">
									<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-3 sm:mb-4">
										<div className="flex items-center text-sm text-gray-600">
											<Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
											<span className="truncate">{featured.date}</span>
										</div>
										{featured.readTime && (
											<span className="text-sm text-gray-600">
												{featured.readTime}
											</span>
										)}
									</div>
									<h2 className="text-lg sm:text-xl lg:text-2xl font-medium mb-3 sm:mb-4 text-gray-700 leading-tight">
										{featured.title}
									</h2>
									{featured.excerpt && (
										<p className="text-gray-600 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
											{featured.excerpt}
										</p>
									)}
									<Link href={`/blog/${featured.slug}`}>
										<Button className="uppercase tracking-widest text-xs sm:text-sm py-2.5 sm:py-3 px-4 sm:px-6 touch-manipulation min-h-[44px] w-full sm:w-auto">
											DEVAMINI OKU
											<ArrowRight className="w-4 h-4 ml-2" />
										</Button>
									</Link>
								</div>
							</div>
						</div>
					) : null}

					{/* Blog list */}
					{!loading && posts.length > 1 && (
						<div className="bg-green-50 p-4 sm:p-6 lg:p-8 rounded-lg shadow-sm mb-6 sm:mb-8">
							<div className="text-center mb-8 sm:mb-12">
								<h2 className="text-xl sm:text-2xl font-medium mb-3 sm:mb-4 text-gray-700">
									Blog
								</h2>
								<p className="text-gray-600 text-sm sm:text-base px-4">
									Sağlıklı yaşam ve taze sebzeler hakkında güncel içerikler
								</p>
							</div>

							<div className="relative">
								<div
									ref={blogScrollRef}
									className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 horizontal-scroll scrollbar-hide"
									onScroll={handleBlogScroll}
									style={{ scrollBehavior: "smooth" }}
								>
									{posts.slice(1).map((post) => (
										<Link
											href={`/blog/${post.slug}`}
											key={post.slug}
											className="flex-shrink-0 w-64 sm:w-72 md:w-80"
										>
											<article className="bg-white rounded-lg overflow-hidden group cursor-pointer h-full border border-gray-100 hover:shadow-lg transition-shadow duration-300 touch-manipulation">
												<div className="relative overflow-hidden">
													<div className="relative w-full h-40 sm:h-44 md:h-48 overflow-hidden">
														<Image
															src={post.image || "/placeholder.svg"}
															alt={post.title}
															fill
															className="object-cover group-hover:scale-105 transition-transform duration-300"
															sizes="(max-width: 640px) 256px, (max-width: 768px) 288px, 320px"
														/>
													</div>
												</div>
												<div className="p-4 sm:p-6">
													<div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2 xs:gap-4 mb-3 text-sm text-gray-600">
														<div className="flex items-center">
															<Calendar className="w-4 h-4 mr-1 flex-shrink-0" />
															<span className="truncate">{post.date}</span>
														</div>
														{post.readTime && (
															<span className="text-xs sm:text-sm">
																{post.readTime}
															</span>
														)}
													</div>
													<h3 className="font-medium mb-3 text-gray-800 leading-tight group-hover:text-gray-600 transition-colors text-sm sm:text-base line-clamp-2">
														{post.title}
													</h3>
													{post.excerpt && (
														<p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
															{post.excerpt}
														</p>
													)}
													<div className="flex items-center text-xs sm:text-sm font-medium uppercase tracking-widest group-hover:text-gray-600 transition-colors">
														DEVAMINI OKU
														<ArrowRight className="w-4 h-4 ml-2" />
													</div>
												</div>
											</article>
										</Link>
									))}
								</div>

								{showBlogLeftButton && (
									<div className="absolute top-1/2 -left-2 sm:-left-6 transform -translate-y-1/2 z-30">
										<button
											type="button"
											onClick={scrollBlogLeft}
											className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer hover:shadow-xl transition-all duration-300 touch-manipulation min-w-[44px] min-h-[44px]"
										>
											<ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
										</button>
									</div>
								)}

								{showBlogRightButton && (
									<div className="absolute top-1/2 -right-2 sm:-right-6 transform -translate-y-1/2 z-30">
										<button
											type="button"
											onClick={scrollBlogRight}
											className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer hover:shadow-xl transition-all duration-300 touch-manipulation min-w-[44px] min-h-[44px]"
										>
											<ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
										</button>
									</div>
								)}
							</div>
						</div>
					)}

					{/* Pagination */}
					{(pageCount
						? pageCount > 1
						: page > 1 || posts.length === pageSize) && (
						<div className="flex items-center justify-center gap-4 mt-6 sm:mt-8">
							<button
								type="button"
								className="px-4 py-2 text-sm border rounded disabled:opacity-50 min-h-[40px]"
								onClick={() => setPage((p) => Math.max(1, p - 1))}
								disabled={page <= 1 || loading}
							>
								Önceki
							</button>
							<span className="text-sm text-gray-600">
								Sayfa {page}
								{pageCount ? ` / ${pageCount}` : ""}
							</span>
							<button
								type="button"
								className="px-4 py-2 text-sm border rounded disabled:opacity-50 min-h-[40px]"
								onClick={() => setPage((p) => p + 1)}
								disabled={
									(pageCount ? page >= pageCount : posts.length < pageSize) ||
									loading
								}
							>
								Sonraki
							</button>
						</div>
					)}

					{/* Press */}
					<div className="bg-green-50 p-4 sm:p-6 lg:p-8 rounded-lg shadow-sm">
						<div className="text-center mb-8 sm:mb-12">
							<h2 className="text-xl sm:text-2xl font-medium mb-3 sm:mb-4 text-gray-700">
								Basında Biz
							</h2>
							<p className="text-gray-600 text-sm sm:text-base px-4">
								Medyada yer alan haberlerimiz ve etkinliklerimiz
							</p>
						</div>

						<div className="relative">
							<div
								ref={pressScrollRef}
								className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 horizontal-scroll scrollbar-hide"
								onScroll={handlePressScroll}
								style={{ scrollBehavior: "smooth" }}
							>
								{pressArticles.map((article) => (
									<Link
										href={`/blog/${article.slug}`}
										key={article.slug}
										className="flex-shrink-0 w-64 sm:w-72 md:w-80"
									>
										<article className="bg-white rounded-lg overflow-hidden group cursor-pointer h-full border border-gray-100 hover:shadow-lg transition-shadow duration-300 touch-manipulation">
											<div className="relative overflow-hidden">
												<div className="relative w-full h-40 sm:h-44 md:h-48 overflow-hidden">
													<Image
														src={article.image || "/placeholder.svg"}
														alt={article.title}
														fill
														className="object-cover group-hover:scale-105 transition-transform duration-300"
														sizes="(max-width: 640px) 256px, (max-width: 768px) 288px, 320px"
													/>
												</div>
											</div>
											<div className="p-4 sm:p-6">
												<div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2 xs:gap-4 mb-3 text-sm text-gray-600">
													<div className="flex items-center">
														<Calendar className="w-4 h-4 mr-1 flex-shrink-0" />
														<span className="truncate">{article.date}</span>
													</div>
													<span className="text-xs sm:text-sm">
														{article.readTime}
													</span>
												</div>
												<h3 className="font-medium mb-3 text-gray-800 leading-tight group-hover:text-gray-600 transition-colors text-sm sm:text-base line-clamp-2">
													{article.title}
												</h3>
												<p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
													{article.excerpt}
												</p>
												<div className="flex items-center text-xs sm:text-sm font-medium uppercase tracking-widest group-hover:text-gray-600 transition-colors">
													DEVAMINI OKU
													<ArrowRight className="w-4 h-4 ml-2" />
												</div>
											</div>
										</article>
									</Link>
								))}
							</div>

							{showPressLeftButton && (
								<div className="absolute top-1/2 -left-2 sm:-left-6 transform -translate-y-1/2 z-30">
									<button
										type="button"
										onClick={scrollPressLeft}
										className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer hover:shadow-xl transition-all duration-300 touch-manipulation min-w-[44px] min-h-[44px]"
									>
										<ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
									</button>
								</div>
							)}

							{showPressRightButton && (
								<div className="absolute top-1/2 -right-2 sm:-right-6 transform -translate-y-1/2 z-30">
									<button
										type="button"
										onClick={scrollPressRight}
										className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer hover:shadow-xl transition-all duration-300 touch-manipulation min-w-[44px] min-h-[44px]"
									>
										<ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
