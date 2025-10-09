import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";
import { memo, type ReactNode } from "react";

interface SubscriptionPackageProps {
	id: number;
	name: string;
	description: string;
	image: string;
	originalPrice: string;
	discountedPrice: string;
	badge: string;
	features: string[];
	weeklyItems?: string[];
	onButtonClick?: () => void;
}

export const SubscriptionPackage = memo(function SubscriptionPackage({
	id,
	name,
	description,
	image,
	originalPrice,
	discountedPrice,
	badge,
	features,
	weeklyItems,
	onButtonClick,
}: SubscriptionPackageProps) {
	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
			{/* Package Header */}
			<div className="relative h-80 overflow-hidden">
				<img src={image} alt={name} className="w-full h-full object-cover" />
				<div className="absolute top-6 left-6">
					<span className="bg-gray-600 text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
						{badge}
					</span>
				</div>
			</div>

			{/* Package Content */}
			<div className="p-8">
				<h3 className="text-2xl font-medium mb-4 leading-tight text-black">
					{name}
				</h3>
				<p className="text-black mb-6 text-lg leading-relaxed">{description}</p>

				{/* Weekly Items */}
				{weeklyItems && (
					<div className="mb-8 bg-gray-50 rounded-lg p-6 border border-gray-200">
						<h4 className="font-medium text-black mb-4 flex items-center">
							<Check className="w-5 h-5 text-black mr-2" />
							Bu hafta paketinizde:
						</h4>
						<ul className="space-y-2">
							{weeklyItems.map((item, index) => (
								<li key={index} className="flex items-center text-black">
									<div className="w-2 h-2 bg-gray-600 rounded-full mr-3 flex-shrink-0"></div>
									<span>{item}</span>
								</li>
							))}
						</ul>
					</div>
				)}

				{/* Features */}
				<div className="mb-8">
					<h4 className="font-medium text-black mb-4">Abonelik Avantajları:</h4>
					<ul className="space-y-3">
						{features.map((feature, index) => (
							<li key={index} className="flex items-center text-black">
								<Check className="w-5 h-5 text-black mr-3 flex-shrink-0" />
								<span>{feature}</span>
							</li>
						))}
					</ul>
				</div>

				{/* Pricing */}
				<div className="flex items-center justify-between mb-8 bg-gray-50 rounded-lg p-6 border border-gray-200">
					<div className="flex items-center space-x-4">
						<span className="text-4xl font-bold text-black">
							{discountedPrice}₺
						</span>
						<span className="text-xl text-gray-500 line-through">
							{originalPrice}₺
						</span>
					</div>
					<div className="text-right">
						<div className="text-sm text-black">Aylık</div>
						<div className="text-lg font-semibold text-red-600">
							%33 İndirim
						</div>
					</div>
				</div>

				{/* CTA Button */}
				<Button onClick={onButtonClick} className="w-full py-4 text-lg">
					ABONE OL
				</Button>
			</div>
		</div>
	);
});

interface BenefitCardProps {
	icon: ReactNode;
	title: string;
	description: string;
}

export const BenefitCard = memo(function BenefitCard({
	icon,
	title,
	description,
}: BenefitCardProps) {
	return (
		<div className="bg-[#FDFBE2] p-8 rounded-3xl shadow-sm border border-black text-center group hover:shadow-md transition-all duration-300">
			<div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
				{icon}
			</div>
			<h3 className="text-xl font-medium text-black mb-3">{title}</h3>
			<p className="text-black leading-relaxed">{description}</p>
		</div>
	);
});

interface TestimonialCardProps {
	name: string;
	comment: string;
	rating: number;
}

export const TestimonialCard = memo(function TestimonialCard({
	name,
	comment,
	rating,
}: TestimonialCardProps) {
	return (
		<div className="bg-[#FDFBE2] p-6 rounded-3xl shadow-sm border border-black hover:shadow-md transition-all duration-300">
			<div className="flex items-center mb-4">
				{[...Array(rating)].map((_, i) => (
					<Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
				))}
			</div>
			<p className="text-black mb-6 italic leading-relaxed text-sm">
				"{comment}"
			</p>
			<div className="flex items-center">
				<div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center mr-3">
					<span className="text-xs font-semibold text-white">
						{name.charAt(0)}
					</span>
				</div>
				<div>
					<h4 className="font-medium text-black text-sm">{name}</h4>
					<p className="text-xs text-gray-500">Abone Müşteri</p>
				</div>
			</div>
		</div>
	);
});

interface FAQSectionProps {
	title: string;
	subtitle?: string;
	items: Array<{
		id: string;
		question: string;
		answer: string;
	}>;
}

export const FAQSection = memo(function FAQSection({
	title,
	subtitle,
	items,
}: FAQSectionProps) {
	return (
		<div className="max-w-4xl mx-auto">
			<div className="text-center mb-12">
				<h2 className="text-2xl font-medium mb-4 text-black">{title}</h2>
				{subtitle && <p className="text-black">{subtitle}</p>}
			</div>

			<div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
				<Accordion type="single" collapsible className="w-full">
					{items.map((item) => (
						<AccordionItem
							key={item.id}
							value={item.id}
							className="border-gray-100 px-8 last:border-b-0"
						>
							<AccordionTrigger className="py-6 text-left hover:no-underline hover:bg-gray-50 px-0 rounded-lg transition-all duration-300 text-lg font-medium text-black">
								{item.question}
							</AccordionTrigger>
							<AccordionContent className="pb-6 px-0 text-black leading-relaxed text-base">
								{item.answer}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</div>
	);
});

interface CTASectionProps {
	title: string;
	subtitle: string;
	buttonText: string;
	onButtonClick?: () => void;
	className?: string;
}

export const CTASection = memo(function CTASection({
	title,
	subtitle,
	buttonText,
	onButtonClick,
	className = "",
}: CTASectionProps) {
	return (
		<section className={`py-20 px-6 bg-[#DF626B] ${className}`}>
			<div className="max-w-4xl mx-auto text-center">
				<h2 className="text-4xl md:text-5xl font-light mb-6 text-black">
					{title}
				</h2>
				<p className="text-xl text-black/80 mb-8 max-w-3xl mx-auto leading-relaxed">
					{subtitle}
				</p>
				<Button onClick={onButtonClick} className="px-8 py-4 text-lg">
					{buttonText}
				</Button>
			</div>
		</section>
	);
});
