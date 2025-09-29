import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
async function fetchArticle(slug: string) {
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

export async function generateMetadata({
	params: paramsPromise,
}: {
	params: Promise<{ slug: string }>;
}) {
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

export default async function BlogArticle({
	params: paramsPromise,
}: {
	params: Promise<{ slug: string }>;
}) {
	const params = await paramsPromise;
	const data = await fetchArticle(params.slug);
	if (!data) return notFound();

	// Handle Strapi v5 data structure (fields are directly on data object)
	const a = data || {};
	const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
	const coverUrl = a?.cover?.url
		? a.cover.url.startsWith("http")
			? a.cover.url
			: `${API_URL}${a.cover.url}`
		: null;
	const date = a.publishedAt
		? new Date(a.publishedAt).toLocaleDateString("tr-TR")
		: undefined;
	const readTime = a.readTime ? `${a.readTime} dk okuma` : undefined;

	return (
		<div className="min-h-screen bg-white relative">
			<main className="py-6 px-4 sm:py-8 sm:px-6 lg:py-12 lg:px-8 relative z-10">
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
						<div className="mb-4 sm:mb-6">
							{coverUrl && (
								<div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden">
									<Image
										src={coverUrl}
										alt={a.title}
										fill
										className="object-cover"
										sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
									/>
								</div>
							)}
						</div>

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
							{a.title}
						</h1>

						{a.excerpt && (
							<p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6 sm:mb-8">
								{a.excerpt}
							</p>
						)}
					</div>

					{/* Article Content */}
					<div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-sm">
						{a.content && (
							<div
								className="prose prose-sm sm:prose-base lg:prose-lg max-w-none text-gray-700 leading-relaxed prose-headings:text-gray-800 prose-p:text-gray-700 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-em:text-gray-700"
								dangerouslySetInnerHTML={{ __html: a.content }}
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
