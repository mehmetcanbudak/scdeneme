import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/cms";

// ========================================
// Types
// ========================================

type ArticleData = {
	title: string;
	excerpt?: string;
	content?: string;
	createdAt?: string;
	readTime?: number;
	cover?: { url: string } | null;
};

type PageParams = {
	params: Promise<{ slug: string }>;
};

// ========================================
// Server Functions
// ========================================

async function fetchArticle(slug: string): Promise<ArticleData | null> {
	try {
		const json = await getArticleBySlug(slug);
		return json?.data || null;
	} catch (error) {
		console.error(`Error fetching article ${slug}:`, error);
		return null;
	}
}

export async function generateMetadata({ params: paramsPromise }: PageParams) {
	const { slug } = await paramsPromise;
	try {
		const json = await getArticleBySlug(slug);
		const a = json?.data || {};
		const imgUrl = a?.cover?.url;

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
		} as const;
	} catch {
		return {};
	}
}

export const dynamic = "force-dynamic";

// ========================================
// Helper Functions
// ========================================

function formatDate(dateString: string | undefined): string | undefined {
	if (!dateString) return undefined;
	return new Date(dateString).toLocaleDateString("tr-TR");
}

function formatReadTime(readTime: number | undefined): string | undefined {
	if (!readTime) return undefined;
	return `${readTime} dk okuma`;
}

// ========================================
// Main Component
// ========================================

export default async function BlogArticle({
	params: paramsPromise,
}: PageParams) {
	const params = await paramsPromise;
	const data = await fetchArticle(params.slug);
	if (!data) return notFound();

	const coverUrl = data.cover?.url || null;
	const date = formatDate(data.createdAt);
	const readTime = formatReadTime(data.readTime);

	return (
		<div className="min-h-screen bg-white relative">
			<main className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
				<div className="max-w-4xl mx-auto">
					{/* Back to Blog */}
					<div className="mb-6 sm:mb-8">
						<Link
							href="/blog"
							className="inline-flex items-center text-black hover:text-black transition-colors text-sm sm:text-base py-2 px-3 -mx-3 rounded-md hover:bg-gray-50 touch-manipulation"
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

						<div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2 xs:gap-4 mb-4 sm:mb-6 text-sm text-black">
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

						<h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium mb-4 sm:mb-6 text-black leading-tight">
							{data.title}
						</h1>

						{data.excerpt && (
							<p className="text-base sm:text-lg md:text-xl text-black leading-relaxed mb-6 sm:mb-8">
								{data.excerpt}
							</p>
						)}
					</div>

					{/* Article Content */}
					<div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-sm">
						{data.content && (
							<div
								className="prose prose-sm sm:prose-base lg:prose-lg max-w-none text-black leading-relaxed prose-headings:text-black prose-p:text-black prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-black prose-em:text-black prose-img:rounded-lg prose-img:shadow-md"
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
