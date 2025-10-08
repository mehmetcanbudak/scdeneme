import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type React from "react";
import {
	memo,
	useCallback,
	useEffect,
	useId,
	useMemo,
	useRef,
	useState,
} from "react";

/**
 * Vegetable item interface
 */
interface Vegetable {
	name: string;
	subtitle: string;
	image: string;
}

/**
 * Props for the VegetablesSection component
 */
interface VegetablesSectionProps {
	className?: string;
}

/**
 * Vegetables section component
 * Displays vegetables in a horizontal scrollable layout with auto-scroll for all screen sizes
 *
 * @param {VegetablesSectionProps} props - Component props
 * @returns {React.ReactElement} The vegetables section component
 */
const VegetablesSection: React.FC<VegetablesSectionProps> = memo(
	({ className = "" }) => {
		const router = useRouter();
		const sectionId = useId();
		const scrollRef = useRef<HTMLDivElement>(null);
		const [showLeftButton, setShowLeftButton] = useState(false);
		const [showRightButton, setShowRightButton] = useState(true);
		const [isUserInteracting, setIsUserInteracting] = useState(false);

		/**
		 * Vegetables data with memoization
		 */
		const vegetables: Vegetable[] = useMemo(
			() => [
				{
					name: "ARUGULA",
					subtitle: "ACIMSI LEZZET",
					image: "/farmımızda_yetisen_sebzeler/arugula.svg",
				},
				{
					name: "AMARANT",
					subtitle: "SÜPER BESİN",
					image: "/farmımızda_yetisen_sebzeler/amarant.svg",
				},
				{
					name: "DEREOTU",
					subtitle: "AROMATIK OT",
					image: "/farmımızda_yetisen_sebzeler/dereotu.svg",
				},
				{
					name: "ENDİVYEN",
					subtitle: "ACIMSI YAPRAK",
					image: "/farmımızda_yetisen_sebzeler/endivyen.svg",
				},
				{
					name: "FESLEĞEN",
					subtitle: "AROMATIK BİTKİ",
					image: "/farmımızda_yetisen_sebzeler/feslegen.svg",
				},
				{
					name: "FRENK SOĞANI",
					subtitle: "TAZE YEŞİLLİK",
					image: "/farmımızda_yetisen_sebzeler/frenk_sogani.svg",
				},
				{
					name: "ISPANAK",
					subtitle: "VİTAMİN DEPOSU",
					image: "/farmımızda_yetisen_sebzeler/ispanak.svg",
				},
				{
					name: "KALE",
					subtitle: "SÜPER BESİN",
					image: "/farmımızda_yetisen_sebzeler/kale.svg",
				},
				{
					name: "KEKİK",
					subtitle: "AROMATIK OT",
					image: "/farmımızda_yetisen_sebzeler/kekik.svg",
				},
				{
					name: "KIRMIZI YAĞLI YAPRAK",
					subtitle: "KIRMIZI YAPRAK",
					image: "/farmımızda_yetisen_sebzeler/kirmizi_ yagli_yaprak.svg",
				},
				{
					name: "KIRMIZI DAMARLI KUZUKULAĞI",
					subtitle: "ÖZEL ÇEŞİT",
					image: "/farmımızda_yetisen_sebzeler/kirmizi_damarli_kuzukulagi.svg",
				},
				{
					name: "KIVIRCIK",
					subtitle: "TAZE YAPRAKLAR",
					image: "/farmımızda_yetisen_sebzeler/kivircik.svg",
				},
				{
					name: "KUZUKULAĞI",
					subtitle: "TAZE YAPRAKLAR",
					image: "/farmımızda_yetisen_sebzeler/kuzukulagi.svg",
				},
				{
					name: "LOLLO ROSSO",
					subtitle: "KIRMIZI YAPRAK",
					image: "/farmımızda_yetisen_sebzeler/lolorosso.svg",
				},
				{
					name: "MAYDANOZ",
					subtitle: "VİTAMİN DEPOSU",
					image: "/farmımızda_yetisen_sebzeler/maydanoz.svg",
				},
				{
					name: "MİZUNA",
					subtitle: "JAPON YAPRAGI",
					image: "/farmımızda_yetisen_sebzeler/mizuna.svg",
				},
				{
					name: "MOR FESLEĞEN",
					subtitle: "AROMATIK REYHAN",
					image: "/farmımızda_yetisen_sebzeler/mor_feslegen(reyhan).svg",
				},
				{
					name: "NANE",
					subtitle: "FERAHLATICI OT",
					image: "/farmımızda_yetisen_sebzeler/nane.svg",
				},
				{
					name: "PAZI",
					subtitle: "TAZE YEŞİLLİK",
					image: "/farmımızda_yetisen_sebzeler/pazi.svg",
				},
				{
					name: "YEŞİL YAĞLI YAPRAK",
					subtitle: "TAZE YEŞİLLİK",
					image: "/farmımızda_yetisen_sebzeler/yesil_yaglı_yaprak.svg",
				},
			],
			[],
		);

		/**
		 * Handle scroll event
		 */
		const handleScroll = useCallback(() => {
			const container = scrollRef.current;
			if (container) {
				const { scrollLeft, scrollWidth, clientWidth } = container;
				setShowLeftButton(scrollLeft > 0);
				setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
			}
		}, []);

		/**
		 * Scroll left
		 */
		const scrollLeft = useCallback(() => {
			setIsUserInteracting(true);
			const container = scrollRef.current;
			if (container) {
				container.scrollBy({
					left: -300,
					behavior: "smooth",
				});
			}
			setTimeout(() => {
				setIsUserInteracting(false);
			}, 2000);
		}, []);

		/**
		 * Scroll right
		 */
		const scrollRight = useCallback(() => {
			setIsUserInteracting(true);
			const container = scrollRef.current;
			if (container) {
				container.scrollBy({
					left: 300,
					behavior: "smooth",
				});
			}
			setTimeout(() => {
				setIsUserInteracting(false);
			}, 2000);
		}, []);

		/**
		 * Handle touch/mouse start
		 */
		const handleInteractionStart = useCallback(() => {
			setIsUserInteracting(true);
		}, []);

		/**
		 * Handle touch/mouse end
		 */
		const handleInteractionEnd = useCallback(() => {
			setTimeout(() => {
				setIsUserInteracting(false);
			}, 2000);
		}, []);

		// Initialize scroll state
		useEffect(() => {
			handleScroll();
		}, [handleScroll]);

		// Auto-scroll when user is not interacting
		useEffect(() => {
			const container = scrollRef.current;
			if (!container || isUserInteracting) return;

			const scrollWidth = container.scrollWidth;
			const clientWidth = container.clientWidth;
			let scrollPosition = container.scrollLeft;

			const autoScroll = () => {
				if (isUserInteracting) return;

				scrollPosition += 1;
				if (scrollPosition >= scrollWidth - clientWidth) {
					scrollPosition = 0;
				}
				container.scrollLeft = scrollPosition;
			};

			const interval = setInterval(autoScroll, 30);
			return () => clearInterval(interval);
		}, [isUserInteracting]);

		return (
			<section
				id={sectionId}
				className={`py-16 bg-[#E7EBDE] relative z-10 ${className}`}
			>
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					{/* Subscription CTA Button */}
					<div className="text-center mb-12">
						<div className="bg-[#fbf9d5] rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
							<h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
								Sürdürülebilir Tarıma Hemen Katılın!
							</h3>
							<p className="text-gray-600 mb-6 leading-relaxed">
								Skycrops abonelik sistemiyle dikey tarım ürünleri ile sağlıklı
								yaşamın keyfini çıkarın.
							</p>
							<p className="text-gray-600 mb-8 leading-relaxed">
								Çevre dostu üretim ile taze ürünler her hafta kapınızda!
							</p>
							<Button
								onClick={() => router.push("/abonelik/taze-yesillikler-paketi")}
								className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold px-8 py-3 rounded-full border border-gray-300 transition-all duration-300 hover:shadow-lg"
							>
								Şimdi Abone Ol
							</Button>
						</div>
					</div>

					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight mb-4 md:mb-6 text-gray-800">
							Farmımızda Yetişen Sebzeler
						</h2>
						<p className="text-base leading-relaxed mt-4">
							1 ay içiinde farmımızda yetiştirdiğimiz bütün çesitler evinize
							ulaşmış olacak.
						</p>
					</div>
				</div>

				{/* Horizontal scrollable vegetables for all screen sizes */}
				<div className="relative w-full px-16">
					<section
						ref={scrollRef}
						className="flex space-x-8 overflow-x-auto pb-4 px-6 scrollbar-hide"
						style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
						onScroll={handleScroll}
						onTouchStart={handleInteractionStart}
						onTouchEnd={handleInteractionEnd}
						onMouseDown={handleInteractionStart}
						onMouseUp={handleInteractionEnd}
						aria-label="Vegetables scrollable list"
					>
						{vegetables.concat(vegetables).map((vegetable, index) => (
							<div
								key={`${vegetable.name}-${index}`}
								className="flex-shrink-0 text-center group w-40 sm:w-44 md:w-48"
							>
								<div className="relative mb-4 overflow-hidden rounded-full w-40 h-40 sm:w-44 sm:h-44 md:w-48 md:h-48 mx-auto">
									<Image
										src={vegetable.image || "/placeholder.svg"}
										alt={vegetable.name}
										width={192}
										height={192}
										className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
										quality={85}
										sizes="(max-width: 640px) 160px, (max-width: 768px) 176px, 192px"
										draggable={false}
									/>
								</div>
								<h3 className="text-xl md:text-2xl font-medium leading-snug mb-1 tracking-wide">
									{vegetable.name}
								</h3>
								<p className="text-sm text-gray-600 uppercase tracking-widest">
									{vegetable.subtitle}
								</p>
							</div>
						))}
					</section>

					{/* Navigation Buttons */}
					{showLeftButton && (
						<div className="absolute top-1/2 left-2 transform -translate-y-1/2 z-30">
							<button
								onClick={scrollLeft}
								type="button"
								className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer hover:shadow-xl transition-all duration-300"
								aria-label="Scroll left"
							>
								<ChevronLeft className="w-5 h-5 text-gray-600" />
							</button>
						</div>
					)}

					{showRightButton && (
						<div className="absolute top-1/2 right-2 transform -translate-y-1/2 z-30">
							<button
								onClick={scrollRight}
								type="button"
								className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer hover:shadow-xl transition-all duration-300"
								aria-label="Scroll right"
							>
								<ChevronRight className="w-5 h-5 text-gray-600" />
							</button>
						</div>
					)}
				</div>
			</section>
		);
	},
);

VegetablesSection.displayName = "VegetablesSection";

export default VegetablesSection;
