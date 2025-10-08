"use client";

import { memo } from "react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import Link from "next/link";

/**
 * FAQ item interface
 */
interface FAQItem {
	question: string;
	answer: string;
	icon: LucideIcon;
}

/**
 * Props for FAQSection component
 */
interface FAQSectionProps {
	/** Array of FAQ items to display */
	items: FAQItem[];
}

/**
 * FAQ Section Component
 * Displays frequently asked questions in a grid layout
 *
 * @param {FAQSectionProps} props - Component props
 * @returns {React.ReactElement} The FAQ section component
 */
const FAQSection: React.FC<FAQSectionProps> = memo(({ items }) => {
	const colorClasses = [
		{ bg: "bg-green-100", text: "text-green-600" },
		{ bg: "bg-green-100", text: "text-green-600" },
		{ bg: "bg-yellow-100", text: "text-yellow-600" },
		{ bg: "bg-purple-100", text: "text-purple-600" },
		{ bg: "bg-red-100", text: "text-red-600" },
		{ bg: "bg-indigo-100", text: "text-indigo-600" },
	];

	return (
		<div className="py-16 px-6 bg-gray-50">
			<div className="max-w-4xl mx-auto">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-light text-gray-800 mb-4">
						Sıkça Sorulan Sorular
					</h2>
					<p className="text-lg text-gray-600">
						Taze yeşillikler paketi hakkında merak edilenler
					</p>
				</div>

				<div className="grid md:grid-cols-2 gap-8">
					{items.map((faq, index) => {
						const IconComponent = faq.icon;
						const colorClass = colorClasses[index % colorClasses.length];
						return (
							<div
								key={`faq-${faq.question.slice(0, 20)}-${index}`}
								className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
							>
								<div className="flex items-start space-x-4">
									<div
										className={`w-12 h-12 ${colorClass.bg} rounded-lg flex items-center justify-center flex-shrink-0`}
									>
										<IconComponent className={`w-6 h-6 ${colorClass.text}`} />
									</div>
									<div>
										<h3 className="text-lg font-semibold mb-3 text-gray-800">
											{faq.question}
										</h3>
										<p className="text-gray-600 leading-relaxed">
											{faq.answer}
										</p>
									</div>
								</div>
							</div>
						);
					})}
				</div>

				{/* Contact Section */}
				<div className="bg-gradient-to-r from-gray-600 to-gray-700 rounded-2xl p-8 text-white text-center mt-12">
					<h3 className="text-2xl font-light mb-4">
						Başka Sorularınız mı Var?
					</h3>
					<p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
						Burada bulamadığınız bilgiler için bizimle iletişime geçebilir,
						uzman ekibimizden detaylı bilgi alabilirsiniz.
					</p>
					<div className="flex flex-wrap justify-center gap-4">
						<Link href="/iletisim">
							<Button
								variant="outline"
								className="bg-transparent border-white text-white hover:bg-white hover:text-gray-600"
							>
								<HelpCircle className="w-4 h-4 mr-2" />
								İletişime Geç
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
});

FAQSection.displayName = "FAQSection";

export default FAQSection;
