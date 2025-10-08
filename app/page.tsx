"use client";

import HeroHeader from "@/components/hero-header";
import BlogSection, { type UiPost } from "@/components/home/blog-section";
import CategoryGridSection from "@/components/home/category-grid-section";
import FeaturesSection from "@/components/home/features-section";
import PackagesFAQSection from "@/components/home/packages-faq-section";
import VegetablesSection from "@/components/home/vegetables-section";
import { useProducts } from "@/contexts/product-context";
import { useNavigationTransparency } from "@/hooks/use-navigation-transparency";
import { getArticles, getStrapiMediaUrl } from "@/lib/strapi";
import { useRouter } from "next/navigation";
import type React from "react";
import { memo, useCallback, useEffect, useMemo, useState } from "react";

/**
 * Slide interface for hero header
 */
interface Slide {
	title: string;
	subtitle: string;
	buttonText: string;
	buttonAction: () => void;
	image: string;
	logo?: string;
	alt: string;
}

/**
 * Home page component
 * Main landing page of the application
 *
 * @returns {React.ReactElement} The home page component
 */
const Home: React.FC = memo(() => {
	const router = useRouter();
	const { featuredProducts } = useProducts();
	const [blogPosts, setBlogPosts] = useState<UiPost[]>([]);
	const [blogLoading, setBlogLoading] = useState<boolean>(false);
	const [blogError, setBlogError] = useState<string | null>(null);

	// Enable transparent navigation for hero section
	useNavigationTransparency(true);

	/**
	 * Slides data for hero header with memoization
	 */
	const slides: Slide[] = useMemo(
		() => [
			{
				title: "",
				subtitle: "",
				buttonText: "ABONE OL",
				buttonAction: () => router.push("/abonelik/taze-yesillikler-paketi"),
				image: "/anasayfa.png",
				alt: "Skycrops - Yaşayan Sebzeler",
			},
		],
		[router],
	);

	/**
	 * Get package image from featured products
	 */
	const packageImage = useMemo(() => {
		if (featuredProducts.length > 0) {
			return featuredProducts[0]?.images?.[0]?.url || "/sebze_paketleri.jpeg";
		}
		return "/sebze_paketleri.jpeg";
	}, [featuredProducts]);

	/**
	 * Fetch blog posts from API
	 */
	useEffect(() => {
		let cancelled = false;
		(async () => {
			try {
				setBlogLoading(true);
				setBlogError(null);
				const json = await getArticles({ page: 1, pageSize: 8, preview: true });
				const mapped: UiPost[] = (json?.data ?? []).map((item: any) => {
					const a = item?.attributes ?? item ?? {};
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
					} as UiPost;
				});
				if (!cancelled) setBlogPosts(mapped);
			} catch (e: any) {
				if (!cancelled) setBlogError(e?.message || "İçerik yüklenemedi");
			} finally {
				if (!cancelled) setBlogLoading(false);
			}
		})();
		return () => {
			cancelled = true;
		};
	}, []);

	/**
	 * Scroll to next section handler
	 */
	const scrollToNextSection = useCallback(() => {
		const nextSection = document.querySelector("#biz-ne-yapiyoruz-section");
		if (nextSection) {
			const headerHeight = 64;
			const elementPosition =
				nextSection.getBoundingClientRect().top + window.pageYOffset;
			const offsetPosition = elementPosition - headerHeight;

			window.scrollTo({
				top: offsetPosition,
				behavior: "smooth",
			});
		}
	}, []);

	return (
		<div className="min-h-screen bg-[#E7EBDE] relative overflow-x-hidden">
			{/* Hero Header Component */}
			<HeroHeader
				slides={slides}
				onScrollToNext={scrollToNextSection}
				singleImage={true}
				showDots={false}
			/>

			{/* Features Section */}
			<FeaturesSection />

			{/* Packages FAQ Section */}
			<PackagesFAQSection packageImage={packageImage} />

			{/* Vegetables Section */}
			<VegetablesSection />

			{/* Blog Section */}
			<BlogSection posts={blogPosts} loading={blogLoading} error={blogError} />

			{/* Category Grid Section */}
			<CategoryGridSection />
		</div>
	);
});

Home.displayName = "Home";

export default Home;
