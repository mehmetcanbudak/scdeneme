import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import type React from "react";
import { memo, useMemo } from "react";

/**
 * FAQ item interface
 */
interface FAQItem {
	id: string;
	question: string;
	answer: string;
}

/**
 * Props for the PackagesFAQSection component
 */
interface PackagesFAQSectionProps {
	packageImage?: string;
	className?: string;
}

/**
 * Packages FAQ section component
 * Displays package image and FAQ accordion side by side
 *
 * @param {PackagesFAQSectionProps} props - Component props
 * @returns {React.ReactElement} The packages FAQ section component
 */
const PackagesFAQSection: React.FC<PackagesFAQSectionProps> = memo(
	({ packageImage = "/bundle4.png", className = "" }) => {
		/**
		 * FAQ items data with memoization
		 */
		const faqItems: FAQItem[] = useMemo(
			() => [
				{
					id: "item-1",
					question: "Paketlerimiz nasıl hazırlanır?",
					answer:
						"Her paket, taze hasat edilmiş sebzelerimizden özenle seçilerek hazırlanır. Kalite kontrolümüzden geçen ürünler, hijyenik koşullarda paketlenir ve en kısa sürede teslim edilmek üzere hazır hale getirilir.",
				},
				{
					id: "item-2",
					question: "Teslimat süresi ne kadardır?",
					answer:
						"Siparişleriniz genellikle 24 saat içinde hazırlanır ve İstanbul içi teslimat için 2-3 iş günü, diğer bölgeler için 3-5 iş günü sürer. Hafta sonu siparişleri pazartesi günü işleme alınır.",
				},
				{
					id: "item-3",
					question: "Ürünlerin tazeliği nasıl korunur?",
					answer:
						"Ürünlerimiz hasattan sonra hemen soğuk zincirde saklanır ve teslimata kadar bu koşullarda muhafaza edilir. Her paket, teslimattan önce taze kalite kontrolünden geçer.",
				},
				{
					id: "item-4",
					question: "Paket içeriği değiştirilebilir mi?",
					answer:
						"Evet, özel ihtiyaçlarınıza göre paket içeriğini kişiselleştirebilirsiniz. Alerji durumunuz, tercih ettiğiniz sebzeler veya miktar değişiklikleri için müşteri hizmetlerimizle iletişime geçebilirsiniz.",
				},
				{
					id: "item-5",
					question: "İptal ve iade koşulları nelerdir?",
					answer:
						"Siparişiniz ulaştıktan sonra 24 saat içinde ürün kalitesi ile ilgili sorunlarınızı bildirebilirsiniz. Kalite garantisi kapsamındaki ürünler için tam geri ödeme yapılır.",
				},
			],
			[],
		);

		return (
			<section
				className={`py-16 bg-[#E7EBDE] relative z-10 overflow-x-hidden ${className}`}
			>
				<div className="mx-6">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight mb-4 md:mb-6 text-gray-800">
							Sebze Paketleri
						</h2>
						<p className="text-base leading-relaxed">
							En taze sebzellerimizin özenle seçilmiş koleksiyonları, sağlıklı
							yaşamınız için mükemmel paketler şeklinde
						</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
						{/* Package Image - Left Side */}
						<div className="flex items-center justify-center">
							<div className="w-full max-w-xs sm:max-w-sm lg:max-w-xs">
								<Image
									src={packageImage}
									alt="Taze Yeşillikler Paketi"
									width={400}
									height={400}
									className="w-full h-auto object-cover rounded-product shadow-md"
								/>
							</div>
						</div>

						{/* FAQ Accordion - Right Side */}
						<div className="space-y-4">
							<h3 className="text-2xl md:text-3xl font-semibold leading-snug mb-4 md:mb-6 text-gray-700">
								Paketlerimiz Hakkında
							</h3>
							<Accordion type="single" collapsible defaultValue="item-1">
								{faqItems.map((faq) => (
									<AccordionItem
										key={faq.id}
										value={faq.id}
										className="bg-[#F0F9FF] rounded-xl shadow-sm border border-gray-100 px-5 mb-3 overflow-hidden"
									>
										<AccordionTrigger className="hover:no-underline py-4">
											<h4 className="text-xl md:text-2xl font-medium leading-snug text-left text-gray-800">
												{faq.question}
											</h4>
										</AccordionTrigger>
										<AccordionContent className="pb-4 pr-4">
											<p className="text-base leading-relaxed">{faq.answer}</p>
										</AccordionContent>
									</AccordionItem>
								))}
							</Accordion>
						</div>
					</div>
				</div>
			</section>
		);
	},
);

PackagesFAQSection.displayName = "PackagesFAQSection";

export default PackagesFAQSection;
