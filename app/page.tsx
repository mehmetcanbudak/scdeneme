"use client";

import HeroHeader from "@/components/hero-header";
import PackagesFAQSection from "@/components/home/packages-faq-section";
import SubscriptionBenefitsSection from "@/components/home/subscription-benefits-section";
import SustainabilityCTASection from "@/components/home/sustainability-cta-section";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// Lazy load non-critical sections
const BlogSection = dynamic(
	() =>
		import("@/components/home/blog-section").then((mod) => ({
			default: mod.default,
		})),
	{
		loading: () => (
			<div className="h-96 bg-gray-100 animate-pulse rounded-lg" />
		),
		ssr: false,
	},
);

const CategoryGridSection = dynamic(
	() =>
		import("@/components/home/category-grid-section").then((mod) => ({
			default: mod.default,
		})),
	{
		loading: () => (
			<div className="h-64 bg-gray-100 animate-pulse rounded-lg" />
		),
		ssr: false,
	},
);

const VegetablesSection = dynamic(
	() =>
		import("@/components/home/vegetables-section").then((mod) => ({
			default: mod.default,
		})),
	{
		loading: () => (
			<div className="h-96 bg-gray-100 animate-pulse rounded-lg" />
		),
		ssr: false,
	},
);

import type { UiPost } from "@/components/home/blog-section";
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
				mobileImage: "/anasayfa_mobil.svg",
				mobileAlt: "Skycrops - Yaşayan Sebzeler",
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
	 * Fetch blog posts from API with caching
	 */
	useEffect(() => {
		let cancelled = false;
		(async () => {
			try {
				setBlogLoading(true);
				setBlogError(null);

				// Check cache first
				const cacheKey = "blog-posts";
				const cachedData = localStorage.getItem(cacheKey);
				const cacheTimestamp = localStorage.getItem(`${cacheKey}-timestamp`);
				const cacheTTL = 5 * 60 * 1000; // 5 minutes

				if (
					cachedData &&
					cacheTimestamp &&
					Date.now() - parseInt(cacheTimestamp) < cacheTTL
				) {
					if (!cancelled) {
						setBlogPosts(JSON.parse(cachedData));
						setBlogLoading(false);
					}
					return;
				}

				const json = await getArticles({ page: 1, pageSize: 4, preview: true }); // Reduced from 8 to 4
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
				if (!cancelled) {
					setBlogPosts(mapped);
					// Cache the results
					localStorage.setItem(cacheKey, JSON.stringify(mapped));
					localStorage.setItem(`${cacheKey}-timestamp`, Date.now().toString());
				}
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
		// Scroll to the vegetables section (first section after hero)
		const nextSection = document.querySelector("[data-section='vegetables']");
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
				showButton={true}
				customHeight="100vh"
			/>

			{/* Vegetables Section - Farmımızda Yetişen Sebzeler */}
			<Suspense
				fallback={<div className="h-96 bg-gray-100 animate-pulse rounded-lg" />}
			>
				<VegetablesSection />
			</Suspense>

			{/* Packages FAQ Section - Sebze Paketleri */}
			<PackagesFAQSection packageImage={packageImage} />

			{/* Subscription Benefits Section - Her hafta farklı paketler and other 2 boxes */}
			<SubscriptionBenefitsSection />

			{/* Sustainability CTA Section */}
			<SustainabilityCTASection />

			{/* Blog Section */}
			<Suspense
				fallback={<div className="h-96 bg-gray-100 animate-pulse rounded-lg" />}
			>
				<BlogSection
					posts={blogPosts}
					loading={blogLoading}
					error={blogError}
				/>
			</Suspense>

			{/* Category Grid Section */}
			<Suspense
				fallback={<div className="h-64 bg-gray-100 animate-pulse rounded-lg" />}
			>
				<CategoryGridSection />
			</Suspense>
		</div>
	);
});

Home.displayName = "Home";

export default Home;
