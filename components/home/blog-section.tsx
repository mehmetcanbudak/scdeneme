import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { memo } from "react";

/**
 * Blog post UI type
 */
export type UiPost = {
	title: string;
	excerpt?: string;
	date?: string;
	image?: string | null;
	readTime?: string;
	slug: string;
};

/**
 * Props for the BlogSection component
 */
interface BlogSectionProps {
	posts: UiPost[];
	loading?: boolean;
	error?: string | null;
	className?: string;
}

/**
 * Blog section component
 * Displays blog posts in a horizontal scrollable layout
 *
 * @param {BlogSectionProps} props - Component props
 * @returns {React.ReactElement} The blog section component
 */
const BlogSection: React.FC<BlogSectionProps> = memo(
	({ posts, loading = false, error = null, className = "" }) => {
		if (loading) {
			return (
				<section
					className={`py-16 bg-[#E7EBDE] relative z-10 overflow-x-hidden ${className}`}
				>
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="text-center">
							<p className="text-black">Blog yazıları yükleniyor...</p>
						</div>
					</div>
				</section>
			);
		}

		if (error) {
			return (
				<section
					className={`py-16 bg-[#E7EBDE] relative z-10 overflow-x-hidden ${className}`}
				>
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="text-center">
							<p className="text-red-600">{error}</p>
						</div>
					</div>
				</section>
			);
		}

		return (
			<section
				className={`py-16 bg-[#E7EBDE] relative z-10 overflow-x-hidden ${className}`}
			>
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight mb-4 md:mb-6 text-black">
							Blog - Basında Biz
						</h2>
					</div>
				</div>

				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="space-y-6">
						{posts.map((post, index) => (
							<Link
								key={`${post.slug}-${index}`}
								href={`/blog/${post.slug}`}
								className="block"
							>
								<div className="bg-green-50 rounded-3xl shadow-sm border border-black p-4 sm:p-6 lg:p-8 hover:shadow-md transition-shadow">
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
												<div className="flex items-center text-sm text-black">
													<span className="truncate">{post.date}</span>
												</div>
												{post.readTime && (
													<span className="text-sm text-black">
														{post.readTime}
													</span>
												)}
											</div>
											<h3 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight mb-3 sm:mb-4 text-black">
												{post.title}
											</h3>
											{post.excerpt && (
												<p className="text-lg leading-relaxed mb-4 sm:mb-6">
													{post.excerpt}
												</p>
											)}
											<div className="flex items-center text-xs sm:text-sm font-medium uppercase tracking-widest text-black">
												DEVAMINI OKU
												<ArrowRight className="w-4 h-4 ml-2" />
											</div>
										</div>
									</div>
								</div>
							</Link>
						))}
					</div>
				</div>

				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="text-center mt-8">
						<Link href="/blog">
							<Button className="px-8 py-3 uppercase tracking-widest">
								Tümünü Gör
							</Button>
						</Link>
					</div>
				</div>
			</section>
		);
	},
);

BlogSection.displayName = "BlogSection";

export default BlogSection;
