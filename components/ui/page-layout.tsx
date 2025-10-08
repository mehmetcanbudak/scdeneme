import { memo, type ReactNode } from "react";

interface PageHeaderProps {
	title: string;
	subtitle?: string;
	className?: string;
}

export const PageHeader = memo(function PageHeader({
	title,
	subtitle,
	className = "",
}: PageHeaderProps) {
	return (
		<div className={`text-center mb-12 ${className}`}>
			<h1 className="text-4xl md:text-5xl font-light mb-4 tracking-wide text-gray-800">
				{title}
			</h1>
			{subtitle && (
				<p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
					{subtitle}
				</p>
			)}
		</div>
	);
});

interface SectionProps {
	children: ReactNode;
	className?: string;
	containerClassName?: string;
}

export const Section = memo(function Section({
	children,
	className = "",
	containerClassName = "",
}: SectionProps) {
	return (
		<section className={`py-12 relative z-10 ${className}`}>
			<div className={`mx-12 ${containerClassName}`}>{children}</div>
		</section>
	);
});

interface ContentCardProps {
	children: ReactNode;
	className?: string;
}

export const ContentCard = memo(function ContentCard({
	children,
	className = "",
}: ContentCardProps) {
	return (
		<div
			className={`bg-white p-8 rounded-lg shadow-sm border border-gray-100 ${className}`}
		>
			{children}
		</div>
	);
});

interface FeatureCardProps {
	icon?: ReactNode;
	title: string;
	description: string;
	features?: string[];
	className?: string;
}

export const FeatureCard = memo(function FeatureCard({
	icon,
	title,
	description,
	features,
	className = "",
}: FeatureCardProps) {
	return (
		<div
			className={`bg-white p-8 rounded-lg shadow-sm border border-gray-100 ${className}`}
		>
			{icon && <div className="flex-shrink-0 mb-4">{icon}</div>}
			<h3 className="text-xl font-medium mb-3 text-gray-700">{title}</h3>
			<p className="text-gray-600 mb-4 leading-relaxed">{description}</p>
			{features && (
				<ul className="space-y-2">
					{features.map((feature, idx) => (
						<li key={idx} className="flex items-center text-sm text-gray-600">
							<span className="w-2 h-2 bg-gray-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
							{feature}
						</li>
					))}
				</ul>
			)}
		</div>
	);
});

interface GridProps {
	children: ReactNode;
	cols?: 1 | 2 | 3 | 4;
	gap?: number;
	className?: string;
}

export const Grid = memo(function Grid({
	children,
	cols = 2,
	gap = 8,
	className = "",
}: GridProps) {
	const colsClass = {
		1: "grid-cols-1",
		2: "grid-cols-1 md:grid-cols-2",
		3: "grid-cols-1 md:grid-cols-3",
		4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
	};

	return (
		<div className={`grid ${colsClass[cols]} gap-${gap} ${className}`}>
			{children}
		</div>
	);
});

interface SectionHeaderProps {
	title: string;
	subtitle?: string;
	className?: string;
}

export const SectionHeader = memo(function SectionHeader({
	title,
	subtitle,
	className = "",
}: SectionHeaderProps) {
	return (
		<div className={`text-center mb-12 ${className}`}>
			<h2 className="text-2xl font-medium mb-4 text-white">{title}</h2>
			{subtitle && (
				<p className="text-white/80 max-w-3xl mx-auto leading-relaxed">
					{subtitle}
				</p>
			)}
		</div>
	);
});

interface ImageContentProps {
	imageSrc: string;
	imageAlt: string;
	title: string;
	children: ReactNode;
	imageFirst?: boolean;
	className?: string;
}

export const ImageContent = memo(function ImageContent({
	imageSrc,
	imageAlt,
	title,
	children,
	imageFirst = true,
	className = "",
}: ImageContentProps) {
	return (
		<div
			className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${className}`}
		>
			<div className={`relative ${!imageFirst ? "order-2 md:order-1" : ""}`}>
				<img
					src={imageSrc}
					alt={imageAlt}
					className="w-full h-80 object-cover rounded-lg"
					loading="lazy"
				/>
			</div>
			<div className={imageFirst ? "" : "order-1 md:order-2"}>
				<h2 className="text-2xl font-medium mb-6 text-gray-700">{title}</h2>
				{children}
			</div>
		</div>
	);
});
