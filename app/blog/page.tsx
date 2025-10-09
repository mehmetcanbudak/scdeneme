"use client";

import HeroHeader from "@/components/hero-header";
import { Button } from "@/components/ui/button";
import { useFooterColorSetter } from "@/hooks/use-footer-color";
import { useHeaderColor } from "@/hooks/use-header-color";
import { useNavigationTransparency } from "@/hooks/use-navigation-transparency";
import { getArticles, getStrapiMediaUrl } from "@/lib/strapi";
import { ArrowRight, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, {
	useCallback,
	useEffect,
	useId,
	useMemo,
	useRef,
	useState,
} from "react";

// ========================================
// Types
// ========================================

/** Minimal type for UI mapping of blog posts */
type UiPost = {
	title: string;
	excerpt?: string;
	date?: string;
	image?: string | null;
	readTime?: string;
	slug: string;
};

/** Props for the BlogCard component */
interface BlogCardProps {
	post: UiPost;
}

/** Props for the ScrollButton component */
interface ScrollButtonProps {
	direction: "left" | "right";
	onClick: () => void;
	visible: boolean;
}

/** Props for the ArticleGrid component */
interface ArticleGridProps {
	articles: UiPost[];
	scrollRef: React.RefObject<HTMLDivElement>;
	onScroll: () => void;
	showLeftButton: boolean;
	showRightButton: boolean;
	onScrollLeft: () => void;
	onScrollRight: () => void;
}

/** Props for the FeaturedPost component */
interface FeaturedPostProps {
	post: UiPost;
}

// ========================================
// Sub-Components
// ========================================

/**
 * BlogCard component displays a single blog post card
 * Memoized to prevent unnecessary re-renders
 */
const BlogCard = React.memo<BlogCardProps>(({ post }) => {
	return (
		<Link
			href={`/blog/${post.slug}`}
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
							<span className="text-xs sm:text-sm">{post.readTime}</span>
						)}
					</div>
					<h3 className="text-xl md:text-2xl font-medium leading-snug mb-3 text-gray-800 group-hover:text-gray-600 transition-colors line-clamp-2">
						{post.title}
					</h3>
					{post.excerpt && (
						<p className="text-base leading-relaxed mb-4 line-clamp-3">
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
	);
});

BlogCard.displayName = "BlogCard";

/**
 * ScrollButton component displays left/right scroll navigation buttons
 * Memoized to prevent unnecessary re-renders
 */
const ScrollButton = React.memo<ScrollButtonProps>(
	({ direction, onClick, visible }) => {
		if (!visible) return null;

		const positionClass =
			direction === "left" ? "-left-2 sm:-left-6" : "-right-2 sm:-right-6";
		const Icon = direction === "left" ? ChevronLeft : ChevronRight;

		return (
			<div
				className={`absolute top-1/2 ${positionClass} transform -translate-y-1/2 z-30`}
			>
				<button
					type="button"
					onClick={onClick}
					className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer hover:shadow-xl transition-all duration-300 touch-manipulation min-w-[44px] min-h-[44px]"
					aria-label={`Scroll ${direction}`}
				>
					<Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
				</button>
			</div>
		);
	},
);

ScrollButton.displayName = "ScrollButton";

/**
 * ArticleGrid component displays a horizontal scrollable grid of articles
 * with navigation buttons. Memoized to prevent unnecessary re-renders
 */
const ArticleGrid = React.memo<ArticleGridProps>(
	({
		articles,
		scrollRef,
		onScroll,
		showLeftButton,
		showRightButton,
		onScrollLeft,
		onScrollRight,
	}) => {
		return (
			<div className="relative">
				<div
					ref={scrollRef}
					className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 horizontal-scroll scrollbar-hide"
					onScroll={onScroll}
					style={{ scrollBehavior: "smooth" }}
				>
					{articles.map((article) => (
						<BlogCard key={article.slug} post={article} />
					))}
				</div>

				<ScrollButton
					direction="left"
					onClick={onScrollLeft}
					visible={showLeftButton}
				/>
				<ScrollButton
					direction="right"
					onClick={onScrollRight}
					visible={showRightButton}
				/>
			</div>
		);
	},
);

ArticleGrid.displayName = "ArticleGrid";

/**
 * FeaturedPost component displays the hero featured blog post
 * Memoized to prevent unnecessary re-renders
 */
const FeaturedPost = React.memo<FeaturedPostProps>(({ post }) => {
	return (
		<div className="bg-green-50 rounded-3xl shadow-sm border border-black p-4 sm:p-6 lg:p-8 hover:shadow-md transition-shadow mb-6 sm:mb-8">
			<p className="text-xs sm:text-sm uppercase tracking-widest text-gray-600 mb-4 sm:mb-6">
				Son Makale
			</p>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
				<div className="order-2 lg:order-1">
					<div className="relative w-full h-48 sm:h-64 lg:h-80 rounded-lg overflow-hidden">
						<Image
							src={post.image || "/placeholder.svg"}
							alt={post.title}
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
							<span className="truncate">{post.date}</span>
						</div>
						{post.readTime && (
							<span className="text-sm text-gray-600">{post.readTime}</span>
						)}
					</div>
					<h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight mb-3 sm:mb-4 text-gray-700">
						{post.title}
					</h2>
					{post.excerpt && (
						<p className="text-lg leading-relaxed mb-4 sm:mb-6">
							{post.excerpt}
						</p>
					)}
					<Link href={`/blog/${post.slug}`}>
						<Button className="uppercase tracking-widest text-xs sm:text-sm py-2.5 sm:py-3 px-4 sm:px-6 touch-manipulation min-h-[44px] w-full sm:w-auto">
							DEVAMINI OKU
							<ArrowRight className="w-4 h-4 ml-2" />
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
});

FeaturedPost.displayName = "FeaturedPost";

// ========================================
// Main Component
// ========================================

/**
 * Blog page component displays blog posts, featured articles, and press releases
 * Includes horizontal scrollable grids with navigation controls and pagination
 */
export default function Blog() {
	// Enable transparent navigation for hero section
	useNavigationTransparency(true);

	// Set header color for blog page
	useHeaderColor("#9AB795");

	// Set footer color to match page background
	useFooterColorSetter("#9AB795");

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

	// ========================================
	// Data Loading
	// ========================================

	useEffect(() => {
		/**
		 * Loads blog posts from the API
		 * @param currentPage - The page number to load
		 */
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

	// ========================================
	// Scroll Handlers
	// ========================================

	/**
	 * Scrolls to the main content section
	 */
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

	/**
	 * Scrolls the blog container to the left
	 */
	const scrollBlogLeft = useCallback(() => {
		const blogContainer = blogScrollRef.current;
		if (blogContainer) {
			const scrollAmount = Math.min(320, blogContainer.clientWidth * 0.8);
			blogContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
		}
	}, []);

	/**
	 * Scrolls the blog container to the right
	 */
	const scrollBlogRight = useCallback(() => {
		const blogContainer = blogScrollRef.current;
		if (blogContainer) {
			const scrollAmount = Math.min(320, blogContainer.clientWidth * 0.8);
			blogContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
		}
	}, []);

	/**
	 * Updates the visibility state of blog scroll buttons based on scroll position
	 */
	const handleBlogScroll = useCallback(() => {
		const blogContainer = blogScrollRef.current;
		if (blogContainer) {
			const { scrollLeft, scrollWidth, clientWidth } = blogContainer;
			setShowBlogLeftButton(scrollLeft > 0);
			setShowBlogRightButton(scrollLeft < scrollWidth - clientWidth - 10);
		}
	}, []);

	/**
	 * Scrolls the press container to the left
	 */
	const scrollPressLeft = useCallback(() => {
		const pressContainer = pressScrollRef.current;
		if (pressContainer) {
			const scrollAmount = Math.min(320, pressContainer.clientWidth * 0.8);
			pressContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
		}
	}, []);

	/**
	 * Scrolls the press container to the right
	 */
	const scrollPressRight = useCallback(() => {
		const pressContainer = pressScrollRef.current;
		if (pressContainer) {
			const scrollAmount = Math.min(320, pressContainer.clientWidth * 0.8);
			pressContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
		}
	}, []);

	/**
	 * Updates the visibility state of press scroll buttons based on scroll position
	 */
	const handlePressScroll = useCallback(() => {
		const pressContainer = pressScrollRef.current;
		if (pressContainer) {
			const { scrollLeft, scrollWidth, clientWidth } = pressContainer;
			setShowPressLeftButton(scrollLeft > 0);
			setShowPressRightButton(scrollLeft < scrollWidth - clientWidth - 10);
		}
	}, []);

	/**
	 * Handles pagination - previous page
	 */
	const handlePreviousPage = useCallback(() => {
		setPage((p) => Math.max(1, p - 1));
	}, []);

	/**
	 * Handles pagination - next page
	 */
	const handleNextPage = useCallback(() => {
		setPage((p) => p + 1);
	}, []);

	// ========================================
	// Memoized Data
	// ========================================

	/**
	 * Press articles data - memoized to prevent recreation on every render
	 */
	const pressArticles = useMemo<UiPost[]>(
		() => [
			{
				title: "İl Tarım Müdürlüğü Kadınlar Günü Kutlaması",
				excerpt:
					"Tekirdağ Valiliği İl Tarım ve Orman Müdürlüğü'ne katılımımız verilecek destek ve 8 Mart Dünya Kadınlar Günü'nü kutlanan için teşekkür ederiz.",
				date: "8 Mart 2024",
				image: "/press-womens-day.png",
				readTime: "3 dk okuma",
				slug: "tarim-mudurlugu",
			},
			{
				title: "Wageningen Üniversitesi Dikey Tarım Programı",
				excerpt:
					"Wageningen Üniversitesi ve Araştırma Merkezi Dikey Tarım Programına Katıldık.",
				date: "5 Mart 2024",
				image: "/press-university-program.png",
				readTime: "4 dk okuma",
				slug: "wagenigen",
			},
			{
				title: "Anadolu Ajansı Skycrops'ta",
				excerpt: "Anadolu Ajansı Skycrops'ta.",
				date: "2 Mart 2024",
				image: "/press-anadolu-agency.png",
				readTime: "2 dk okuma",
				slug: "anadolu-ajans",
			},
		],
		[],
	);

	/**
	 * Hero slides configuration - memoized to prevent recreation
	 */
	const heroSlides = useMemo(
		() => [
			{
				title: "",
				subtitle: "",
				buttonText: "",
				image: "/blog.png",
				mobileImage: "/blog_mobile.svg",
				mobileAlt: "Blog hero görseli",
			},
		],
		[],
	);

	/**
	 * Featured post (first post in the list)
	 */
	const featured = useMemo(() => posts[0], [posts]);

	/**
	 * Blog posts excluding the featured one
	 */
	const blogPosts = useMemo(() => posts.slice(1), [posts]);

	/**
	 * Check if pagination should be shown
	 */
	const showPagination = useMemo(
		() => (pageCount ? pageCount > 1 : page > 1 || posts.length === pageSize),
		[pageCount, page, posts.length, pageSize],
	);

	// ========================================
	// Render
	// ========================================

	return (
		<div className="min-h-screen bg-[#9AB795] relative">
			{/* Fixed header with transparent/scrolled states */}
			<HeroHeader
				slides={heroSlides}
				singleImage={true}
				showDots={false}
				customHeight="100vh"
			/>

			{/* Main content with id and bg-white */}
			<main
				id={contentId}
				className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-8 relative z-10 bg-[#9AB795]"
			>
				<div className="mx-auto max-w-7xl">
					{/* Page Header */}
					<div className="text-center mb-8 sm:mb-12">
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-4 md:mb-6 text-gray-800">
							Blog
						</h1>
						<p className="text-lg leading-relaxed px-4">
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
					) : (
						featured && <FeaturedPost post={featured} />
					)}

					{/* Blog list */}
					{!loading && blogPosts.length > 0 && (
						<div className="bg-green-50 rounded-3xl shadow-sm border border-black p-4 sm:p-6 lg:p-8 hover:shadow-md transition-shadow mb-6 sm:mb-8">
							<div className="text-center mb-8 sm:mb-12">
								<h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight mb-3 sm:mb-4 text-gray-700">
									Blog
								</h2>
								<p className="text-base leading-relaxed px-4">
									Sağlıklı yaşam ve taze sebzeler hakkında güncel içerikler
								</p>
							</div>

							<div className="px-2 sm:px-6">
								<ArticleGrid
									articles={blogPosts}
									scrollRef={blogScrollRef}
									onScroll={handleBlogScroll}
									showLeftButton={showBlogLeftButton}
									showRightButton={showBlogRightButton}
									onScrollLeft={scrollBlogLeft}
									onScrollRight={scrollBlogRight}
								/>
							</div>
						</div>
					)}

					{/* Pagination */}
					{showPagination && (
						<div className="flex items-center justify-center gap-4 mt-6 sm:mt-8">
							<button
								type="button"
								className="px-4 py-2 text-sm border rounded disabled:opacity-50 min-h-[40px]"
								onClick={handlePreviousPage}
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
								onClick={handleNextPage}
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
					<div className="bg-green-50 rounded-3xl shadow-sm border border-black p-4 sm:p-6 lg:p-8 hover:shadow-md transition-shadow">
						<div className="text-center mb-8 sm:mb-12">
							<h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight mb-3 sm:mb-4 text-gray-700">
								Basında Biz
							</h2>
							<p className="text-base leading-relaxed px-4">
								Medyada yer alan haberlerimiz ve etkinliklerimiz
							</p>
						</div>

						<div className="px-2 sm:px-6">
							<ArticleGrid
								articles={pressArticles}
								scrollRef={pressScrollRef}
								onScroll={handlePressScroll}
								showLeftButton={showPressLeftButton}
								showRightButton={showPressRightButton}
								onScrollLeft={scrollPressLeft}
								onScrollRight={scrollPressRight}
							/>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
