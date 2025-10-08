import type React from "react";
import { memo, useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
		const blogScrollRef = useRef<HTMLDivElement>(null);
		const [showLeftButton, setShowLeftButton] = useState(false);
		const [showRightButton, setShowRightButton] = useState(true);

		/**
		 * Scroll blog container left
		 */
		const scrollBlogLeft = useCallback(() => {
			const blogContainer = blogScrollRef.current;
			if (blogContainer) {
				blogContainer.scrollBy({
					left: -320,
					behavior: "smooth",
				});
			}
		}, []);

		/**
		 * Scroll blog container right
		 */
		const scrollBlogRight = useCallback(() => {
			const blogContainer = blogScrollRef.current;
			if (blogContainer) {
				blogContainer.scrollBy({
					left: 320,
					behavior: "smooth",
				});
			}
		}, []);

		/**
		 * Handle blog scroll event
		 */
		const handleBlogScroll = useCallback(() => {
			const blogContainer = blogScrollRef.current;
			if (blogContainer) {
				const { scrollLeft, scrollWidth, clientWidth } = blogContainer;
				setShowLeftButton(scrollLeft > 0);
				setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
			}
		}, []);

		if (loading) {
			return (
				<section className={`py-16 bg-[#E7EBDE] relative z-10 overflow-x-hidden ${className}`}>
					<div className="mx-12">
						<div className="text-center">
							<p className="text-gray-600">Blog yazıları yükleniyor...</p>
						</div>
					</div>
				</section>
			);
		}

		if (error) {
			return (
				<section className={`py-16 bg-[#E7EBDE] relative z-10 overflow-x-hidden ${className}`}>
					<div className="mx-12">
						<div className="text-center">
							<p className="text-red-600">{error}</p>
						</div>
					</div>
				</section>
			);
		}

		return (
			<section className={`py-16 bg-[#E7EBDE] relative z-10 overflow-x-hidden ${className}`}>
				<div className="mx-12">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight mb-4 md:mb-6 text-gray-800">
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
							{posts.map((post, index) => (
								<Link
									key={`${post.slug}-${index}`}
									href={`/blog/${post.slug}`}
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
											<h3 className="text-xl md:text-2xl font-medium leading-snug mb-3 line-clamp-2">
												{post.title}
											</h3>
											<p className="text-base leading-relaxed line-clamp-3">
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
									type="button"
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
									type="button"
									className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer hover:shadow-xl transition-all duration-300"
								>
									<ChevronRight className="w-5 h-5 text-gray-600" />
								</button>
							</div>
						)}
					</div>

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
