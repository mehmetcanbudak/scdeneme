import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// ========================================
// Types
// ========================================

/** Article data structure from Strapi */
interface ArticleData {
	title: string;
	excerpt?: string;
	content?: string;
	publishedAt?: string;
	readTime?: number;
	cover?: {
		url: string;
	};
}

/** Page params structure */
interface PageParams {
	params: Promise<{ slug: string }>;
}

// ========================================
// Server Functions
// ========================================

/**
 * Fetches a single article by slug from Strapi
 * @param slug - The article slug identifier
 * @returns The article data or null if not found
 */
async function fetchArticle(slug: string): Promise<ArticleData | null> {
	try {
		const STRAPI_URL = process.env.NEXT_PUBLIC_API_URL;
		const TOKEN = process.env.STRAPI_API_TOKEN;
		if (!STRAPI_URL) {
			console.error("Missing NEXT_PUBLIC_API_URL");
			return null;
		}

		// Fetch directly from Strapi in production to avoid self-fetch deadlocks
		const headers: HeadersInit = {};
		if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;

		const res = await fetch(
			`${STRAPI_URL}/api/articles/${encodeURIComponent(slug)}/`,
			{
				// Use no-store to ensure fresh content and avoid build-time caching issues on Vercel
				cache: "no-store",
				headers,
			},
		);
		if (!res.ok) {
			console.error("Upstream error fetching article", slug, res.status);
			return null;
		}
		const json = await res.json();
		return json?.data || null;
	} catch (error) {
		console.error(`Error fetching article ${slug}:`, error);
		return null;
	}
}

/**
 * Generates metadata for SEO and social sharing
 * @param params - Page params containing the article slug
 * @returns Metadata object for Next.js
 */
export async function generateMetadata({ params: paramsPromise }: PageParams) {
	const { slug } = await paramsPromise;
	try {
		const STRAPI_URL = process.env.NEXT_PUBLIC_API_URL;
		const TOKEN = process.env.STRAPI_API_TOKEN;
		if (!STRAPI_URL) return {};
		const res = await fetch(
			`${STRAPI_URL}/api/articles/${encodeURIComponent(slug)}/`,
			{
				headers: TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {},
				cache: "force-cache",
			},
		);
		if (!res.ok) return {};
		const json = await res.json();
		const a = json?.data || {};
		const API_URL = STRAPI_URL;
		const imgUrl = a?.cover?.url
			? a.cover.url.startsWith("http")
				? a.cover.url
				: `${API_URL}${a.cover.url}`
			: undefined;

		return {
			title: a?.title ? `${a.title} | Skycrops` : "Blog | Skycrops",
			description: a?.excerpt || undefined,
			openGraph: {
				title: a?.title || "Skycrops Blog",
				description: a?.excerpt || undefined,
				type: "article",
				url: `/blog/${slug}`,
				images: imgUrl ? [{ url: imgUrl }] : undefined,
			},
			alternates: { canonical: `/blog/${slug}` },
		};
	} catch {
		return {};
	}
}

export const dynamic = "force-dynamic";

// ========================================
// Helper Functions
// ========================================

/**
 * Constructs the full cover image URL
 * @param cover - Cover object from Strapi
 * @param apiUrl - Base API URL
 * @returns Full image URL or null
 */
function getCoverUrl(
	cover: { url: string } | undefined,
	apiUrl: string,
): string | null {
	if (!cover?.url) return null;
	return cover.url.startsWith("http") ? cover.url : `${apiUrl}${cover.url}`;
}

/**
 * Formats a date string to Turkish locale
 * @param dateString - ISO date string
 * @returns Formatted date string or undefined
 */
function formatDate(dateString: string | undefined): string | undefined {
	if (!dateString) return undefined;
	return new Date(dateString).toLocaleDateString("tr-TR");
}

/**
 * Formats read time in minutes
 * @param readTime - Read time in minutes
 * @returns Formatted read time string or undefined
 */
function formatReadTime(readTime: number | undefined): string | undefined {
	if (!readTime) return undefined;
	return `${readTime} dk okuma`;
}

// ========================================
// Main Component
// ========================================

/**
 * Blog article detail page component
 * Server-rendered page that displays a single blog article with metadata
 * @param params - Page params containing the article slug
 */
export default async function BlogArticle({
	params: paramsPromise,
}: PageParams) {
	const params = await paramsPromise;
	const data = await fetchArticle(params.slug);
	if (!data) return notFound();

	// Handle Strapi v5 data structure (fields are directly on data object)
	const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
	const coverUrl = getCoverUrl(data.cover, API_URL);
	const date = formatDate(data.publishedAt);
	const readTime = formatReadTime(data.readTime);

	return (
		<div className="min-h-screen bg-white relative">
			<main className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
				<div className="max-w-4xl mx-auto">
					{/* Back to Blog */}
					<div className="mb-6 sm:mb-8">
						<Link
							href="/blog"
							className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors text-sm sm:text-base py-2 px-3 -mx-3 rounded-md hover:bg-gray-50 touch-manipulation"
						>
							<ArrowLeft className="w-4 h-4 mr-2 flex-shrink-0" />
							<span className="hidden xs:inline">Blog'a Dön</span>
							<span className="xs:hidden">Geri</span>
						</Link>
					</div>

					{/* Article Header */}
					<div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-sm mb-6 sm:mb-8">
						{coverUrl && (
							<div className="mb-4 sm:mb-6">
								<div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden">
									<Image
										src={coverUrl}
										alt={data.title}
										fill
										className="object-cover"
										sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 896px"
										priority
									/>
								</div>
							</div>
						)}

						<div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2 xs:gap-4 mb-4 sm:mb-6 text-sm text-gray-600">
							{date && (
								<div className="flex items-center">
									<Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
									<span className="truncate">{date}</span>
								</div>
							)}
							{readTime && (
								<div className="flex items-center">
									<Clock className="w-4 h-4 mr-2 flex-shrink-0" />
									<span>{readTime}</span>
								</div>
							)}
						</div>

						<h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium mb-4 sm:mb-6 text-gray-800 leading-tight">
							{data.title}
						</h1>

						{data.excerpt && (
							<p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed mb-6 sm:mb-8">
								{data.excerpt}
							</p>
						)}
					</div>

					{/* Article Content */}
					<div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-sm">
						{data.content && (
							<div
								className="prose prose-sm sm:prose-base lg:prose-lg max-w-none text-gray-700 leading-relaxed prose-headings:text-gray-800 prose-p:text-gray-700 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-em:text-gray-700 prose-img:rounded-lg prose-img:shadow-md"
								// biome-ignore lint/security/noDangerouslySetInnerHtml: Content is from trusted CMS source
								dangerouslySetInnerHTML={{ __html: data.content }}
							/>
						)}
					</div>

					{/* Back to Blog Footer */}
					<div className="mt-8 sm:mt-12 text-center">
						<Link href="/blog">
							<Button className="uppercase tracking-widest text-xs sm:text-sm py-3 px-6 touch-manipulation min-h-[44px] w-full sm:w-auto">
								<ArrowLeft className="w-4 h-4 mr-2" />
								TÜM YAZILAR
							</Button>
						</Link>
					</div>
				</div>
			</main>
		</div>
	);
}
