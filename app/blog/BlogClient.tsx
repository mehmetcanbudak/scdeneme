"use client";

import HeroHeader from "@/components/hero-header";
import { Button } from "@/components/ui/button";
import { useNavigationTransparency } from "@/hooks/use-navigation-transparency";
import { getArticles, getMediaUrl } from "@/lib/cms";
import { ArrowRight, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";

export type UiPost = {
	title: string;
	excerpt?: string;
	date?: string;
	image?: string | null;
	readTime?: string;
	slug: string;
};

export default function BlogClient({
	initialPosts,
	initialPageCount,
}: {
	initialPosts: UiPost[];
	initialPageCount?: number | null;
}) {
	useNavigationTransparency(true);

	const contentId = useId();
	const [posts, setPosts] = useState<UiPost[]>(initialPosts);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [page, setPage] = useState(1);
	const pageSize = 12;
	const [pageCount, setPageCount] = useState<number | null>(
		initialPageCount ?? null,
	);

	const blogScrollRef = useRef<HTMLDivElement>(null);
	const pressScrollRef = useRef<HTMLDivElement>(null);
	const [showBlogLeftButton, setShowBlogLeftButton] = useState(false);
	const [showBlogRightButton, setShowBlogRightButton] = useState(true);
	const [showPressLeftButton, setShowPressLeftButton] = useState(false);
	const [showPressRightButton, setShowPressRightButton] = useState(true);

	// Hydrate page 1 on the client if server failed to provide initial posts
	useEffect(() => {
		if ((initialPosts?.length ?? 0) > 0) return;
		let cancelled = false;
		(async () => {
			try {
				setLoading(true);
				setError(null);
				const json = await getArticles({ page: 1, pageSize });
				const mapped: UiPost[] = (json?.data ?? []).map((item: any) => {
					const a = item?.attributes ?? item ?? {};
					const coverUrl = getMediaUrl(a.cover);
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
					} as UiPost;
				});
				if (!cancelled) {
					setPosts(mapped);
					const pg = json?.meta?.pagination;
					if (pg?.pageCount) setPageCount(pg.pageCount);
				}
			} catch (e: any) {
				if (!cancelled) setError(e?.message || "İçerik yüklenemedi");
			} finally {
				if (!cancelled) setLoading(false);
			}
		})();
		return () => {
			cancelled = true;
		};
	}, [initialPosts]);

	// Fetch next pages client-side only when page changes (keep page 1 from server if provided)
	useEffect(() => {
		if (page === 1) return; // handled by initial props or the hydration effect above
		let cancelled = false;
		(async () => {
			try {
				setLoading(true);
				setError(null);
				const json = await getArticles({ page, pageSize });
				const mapped: UiPost[] = (json?.data ?? []).map((item: any) => {
					const a = item?.attributes ?? item ?? {};
					const coverUrl = getMediaUrl(a.cover);
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
					} as UiPost;
				});
				if (!cancelled) {
					setPosts(mapped);
					const pg = json?.meta?.pagination;
					if (pg?.pageCount) setPageCount(pg.pageCount);
				}
			} catch (e: any) {
				if (!cancelled) setError(e?.message || "İçerik yüklenemedi");
			} finally {
				if (!cancelled) setLoading(false);
			}
		})();
		return () => {
			cancelled = true;
		};
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

	const featured = posts[0];

	return (
		<div className="min-h-screen bg-white relative">
			{/* Hero */}
			<HeroHeader
				slides={[
					{
						title: "",
						subtitle: "",
						buttonText: "",
						image: "/thelettuceguy.png",
						mobileImage: "/blog_mobile.svg",
						mobileAlt: "Blog hero görseli",
					},
				]}
				singleImage
				showDots={false}
				customHeight="100vh"
			/>

			<main
				id={contentId}
				className="py-6 px-4 sm:py-8 sm:px-6 lg:py-12 lg:px-8 relative z-10 bg-[#76A4CE]/[0.34]"
			>
				<div className="mx-auto max-w-7xl">
					{/* Header */}
					<div className="text-center mb-8 sm:mb-12">
						<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-3 sm:mb-4 tracking-wide text-black">
							Blog
						</h1>
					</div>

					{/* Featured / Empty / Error */}
					{loading ? (
						<div className="p-6 sm:p-8 text-center text-black">Yükleniyor…</div>
					) : error ? (
						<div className="p-6 sm:p-8 text-center text-red-600">{error}</div>
					) : posts.length === 0 ? (
						<div className="p-6 sm:p-8 text-center text-black bg-green-50 rounded-lg">
							Henüz makale yok. Yakında içerikler eklenecek.
						</div>
					) : featured ? (
						<div className="bg-green-50 p-4 sm:p-6 lg:p-8 rounded-lg shadow-sm mb-6 sm:mb-8">
							<p className="text-xs sm:text-sm uppercase tracking-widest text-black mb-4 sm:mb-6">
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
											sizes="(max-width:1024px) 100vw, 50vw"
										/>
									</div>
								</div>
								<div className="order-1 lg:order-2">
									<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-3 sm:mb-4">
										<div className="flex items-center text-sm text-black">
											<Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
											<span className="truncate">{featured.date}</span>
										</div>
										{featured.readTime && (
											<span className="text-sm text-black">
												{featured.readTime}
											</span>
										)}
									</div>
									<h2 className="text-lg sm:text-xl lg:text-2xl font-medium mb-3 sm:mb-4 text-black leading-tight">
										{featured.title}
									</h2>
									{featured.excerpt && (
										<p className="text-black leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
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

					{/* List */}
					{!loading && posts.length > 1 && (
						<div className="bg-green-50 p-4 sm:p-6 lg:p-8 rounded-lg shadow-sm mb-6 sm:mb-8">
							<div className="text-center mb-8 sm:mb-12">
								<h2 className="text-xl sm:text-2xl font-medium mb-3 sm:mb-4 text-black">
									Blog
								</h2>
								<p className="text-black text-sm sm:text-base px-4">
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
													<div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2 xs:gap-4 mb-3 text-sm text-black">
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
													<h3 className="font-medium mb-3 text-black leading-tight group-hover:text-black transition-colors text-sm sm:text-base line-clamp-2">
														{post.title}
													</h3>
													{post.excerpt && (
														<p className="text-black text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
															{post.excerpt}
														</p>
													)}
													<div className="flex items-center text-xs sm:text-sm font-medium uppercase tracking-widest group-hover:text-black transition-colors">
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
											<ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
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
											<ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
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
							<span className="text-sm text-black">
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

					{/* Press (static content retained) */}
					{/* You can keep your existing press section here or remove if not needed */}
				</div>
			</main>
		</div>
	);
}
