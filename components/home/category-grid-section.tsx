import type React from "react";
import { memo, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

/**
 * Category item interface
 */
interface Category {
	title: string;
	image: string;
	buttonText: string;
	href: string;
}

/**
 * Props for the CategoryGridSection component
 */
interface CategoryGridSectionProps {
	className?: string;
}

/**
 * Category grid section component
 * Displays categories in a responsive grid layout
 *
 * @param {CategoryGridSectionProps} props - Component props
 * @returns {React.ReactElement} The category grid section component
 */
const CategoryGridSection: React.FC<CategoryGridSectionProps> = memo(({ className = "" }) => {
	/**
	 * Categories data with memoization
	 */
	const categories: Category[] = useMemo(
		() => [
			{
				title: "SAĞLIK",
				image: "/fresh-mixed-vegetables-display.png",
				buttonText: "KEŞFET",
				href: "/saglik",
			},
			{
				title: "SERTİFİKALAR VE ANALİZLER",
				image: "/iso.png",
				buttonText: "KEŞFET",
				href: "/sertifikalar",
			},
			{
				title: "SIKÇA SORULAN SORULAR",
				image: "/organic-farming-greenhouse-vegetables.png",
				buttonText: "KEŞFET",
				href: "/sorular",
			},
		],
		[],
	);

	return (
		<section className={`py-16 bg-[#E7EBDE] relative z-10 overflow-x-hidden ${className}`}>
			<div className="mx-12 relative z-10">
				{/* Desktop Grid View */}
				<div className="hidden md:grid md:grid-cols-3 gap-6">
					{categories.map((category, index) => (
						<Link
							key={`${category.href}-${index}`}
							href={category.href}
							className="relative group cursor-pointer overflow-hidden rounded-lg"
						>
							<div className="aspect-square">
								<img
									src={category.image || "/placeholder.svg"}
									alt={category.title}
									className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
								/>
							</div>
							<div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
							<div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
								<h3 className="text-2xl md:text-3xl font-semibold leading-snug mb-4 tracking-wide">
									{category.title}
								</h3>
								<Button
									variant="outline"
									size="sm"
									className="bg-transparent border-white text-white hover:bg-white hover:text-black w-fit uppercase tracking-widest text-xs"
								>
									{category.buttonText}
								</Button>
							</div>
						</Link>
					))}
				</div>

				{/* Mobile List View */}
				<div className="md:hidden space-y-4">
					{categories.map((category, index) => (
						<Link
							key={`${category.href}-mobile-${index}`}
							href={category.href}
							className="relative group cursor-pointer overflow-hidden rounded-lg block"
						>
							<div className="aspect-[16/9]">
								<img
									src={category.image || "/placeholder.svg"}
									alt={category.title}
									className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
								/>
							</div>
							<div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
							<div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
								<h3 className="text-2xl md:text-3xl font-semibold leading-snug mb-4 tracking-wide">
									{category.title}
								</h3>
								<Button
									variant="outline"
									size="sm"
									className="bg-transparent border-white text-white hover:bg-white hover:text-black w-fit uppercase tracking-widest text-sm"
								>
									{category.buttonText}
								</Button>
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
});

CategoryGridSection.displayName = "CategoryGridSection";

export default CategoryGridSection;
